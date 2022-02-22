<template>
    <modalv2
        id="modal-edit-class"
        :title="`${userId ? 'Chỉnh sửa' : 'Thêm mới'} người dùng`"
        @close="close"
        :width="600"
    >
        <div slot="body">
            <ul class="lst-info">
                <template v-if="!userId">
                    <li class="d-flex flex-column">
                        <label class="txt-tit"
                            >Tên tài khoản <label class="text-danger">*</label></label
                        >
                        <input
                            type="text"
                            class="form-control"
                            v-model="form.userName"
                            placeholder="Tên tài khoản.."
                        />
                    </li>
                    <li class="d-flex flex-column">
                        <label class="txt-tit">Mật khẩu <label class="text-danger">*</label></label>
                        <input
                            type="password"
                            class="form-control"
                            v-model="form.passWord"
                            placeholder="Mật khẩu"
                        />
                    </li>
                </template>
                <li class="d-flex flex-column">
                    <label class="txt-tit"
                        >Nhóm tài khoản <label class="text-danger">*</label></label
                    >
                    <v-select
                        v-model="form.userPositionId"
                        :options="userPosition"
                        :reduce="(n) => n.userPositionId"
                        :selectable="(option) => !option.isAdministrator"
                        label="userPositionName"
                        placeholder="Chọn nhóm tài khoản"
                    />
                </li>
                <li class="d-flex flex-column">
                    <label class="txt-tit">Họ và tên</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="form.fullName"
                        placeholder="Nhập họ tên"
                    />
                </li>
                <li class="d-flex flex-column">
                    <label class="txt-tit">Số điện thoại</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="form.numberPhone"
                        placeholder="Nhập số điện thoại"
                    />
                </li>
                <li class="d-flex flex-column">
                    <label class="txt-tit">Email</label>
                    <input
                        type="email"
                        class="form-control"
                        v-model="form.email"
                        placeholder="Nhập email"
                        v-validate="'email'"
                        name="Email"
                    />
                    <span v-show="errors.has('Email')" class="text-danger">
                        {{ errors.first('Email') }}
                    </span>
                </li>
                <li class="d-flex flex-column">
                    <label class="txt-tit">Địa chỉ</label>
                    <textarea
                        class="form-control"
                        v-model="form.address"
                        placeholder="Nhập địa chỉ"
                    />
                </li>
                <li class="d-flex flex-column">
                    <label class="txt-tit">Trạng thái <label class="text-danger">*</label></label>
                    <v-select
                        v-model="form.status"
                        :options="userStatus"
                        :reduce="(n) => n.id"
                        label="name"
                        placeholder="Chọn trạng thái"
                        name="Trạng thái"
                        v-validate="'required'"
                    />
                    <span v-show="errors.has('Trạng thái')" class="text-danger">
                        {{ errors.first('Trạng thái') }}
                    </span>
                </li>
                <li class="d-flex flex-column">
                    <label class="txt-tit">Ảnh đại diện</label>
                    <img :src="`${form.avatar ? (storageUrl + '/' + form.avatar) : '/img/46.png'}`" width="150" height="150" class="m-auto rounded-circle">
                    <upload-avatar :exts="'png;jpg;jpeg'" :multiple="false" @uploaded="fileUploaded" class="mt-2" />
                </li>
            </ul>
        </div>
        <div slot="footer">
            <button class="btn btn-primary" @click="save">
                <span>Lưu</span>
            </button>
            <button class="btn btn-secondary" @click="close">Đóng</button>
        </div>
    </modalv2>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axiosService from '../../core/utils/axiosService';
import UploadAvatar from '../_common/file-select/upload-avatar.vue'
export default {
    props: ['userId'],
    components: {
        UploadAvatar,
    },
    data() {
        return {
            form: {},
            userPosition: [],
        };
    },
    computed: {
        ...mapGetters(['userStatus']),
        storageUrl(){
            return this.appSettings.storageDomain
        }
    },
    methods: {
        ...mapActions(['updateAvatar']),
        getById() {
            if (this.userId) {
                axiosService.get(`api/User/${this.userId}`).then(({ data }) => {
                    if (data.success) {
                        this.form = data.responseData;
                    }
                });
            }
        },
        userPositionDropdown() {
            axiosService.get(`api/Position/dropdown`).then(({ data }) => {
                if (data.success) {
                    this.userPosition = data.responseData.map(n => ({...n, disabled: true}));
                }
            });
        },
        save() {
            if (this.userId) {
                axiosService.put(`api/User/update/${this.userId}`, this.form).then(({ data }) => {
                    if (data.success) {
                        if(this.form.userId == this.currentUser.userId){
                            const currentUser = this.currentUser;
                            currentUser.avatar = this.form.avatar;
                            this.updateAvatar(currentUser)
                        }
                        this.$message('Cập nhật thông tin tài khoản thành công !');
                        this.$emit('close', true);
                    } else {
                        this.$message('Cập nhật thông tin tài khoản thất bại !', 'error');
                    }
                });
            } else {
                if (!this.form.userName || !this.form.passWord) {
                    this.$message('Tài khoản/mật khẩu không thể để trống !', 'error');
                    return;
                }
                this.$validator.validate().then((valid) => {
                    if (valid) {
                        axiosService.post(`api/User/create`, this.form).then(({ data }) => {
                            if (data.success) {
                                this.$message('Thêm mới tài khoản thành công !');
                                this.$emit('close', true);
                            } else {
                                this.$message('Thêm mới tài khoản thất bại !', 'error');
                            }
                        });
                    }
                });
            }
        },
        fileUploaded(file){
            if(file){
                this.form.avatar = file.path;
            }
        },
        close() {
            this.$emit('close', false);
        },
    },
    created() {
        this.userPositionDropdown();
        this.getById();
    },
};
</script>

<style scoped>
.preview{
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid #e5e5e5;
    padding: 10px;
}
</style>