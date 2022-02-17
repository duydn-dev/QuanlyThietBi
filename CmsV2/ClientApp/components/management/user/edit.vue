<template>
  
        <ul class="lst-info" v-if="form">
            <li class="d-flex flex-column">
                <label class="txt-tit">{{ $t('Label.Username') }}</label>

                <template>
                    <input
                        v-if="memberId > 0"
                        v-model="form.userName"
                        type="text"
                        class="txt-ipt"
                        :label="$t('Label.Username')"
                        :placeholder="$t('Label.Username')"
                        disabled
                    />
                    <input
                        v-else
                        v-model="form.userName"
                        type="text"
                        class="txt-ipt"
                        :label="$t('Label.Username')"
                        :placeholder="$t('Label.Username')"
                    />
                </template>
            </li>
            <li class="d-flex flex-column" v-if="memberId <= 0">
                <label class="txt-tit">{{ $t('Label.Password') }}</label>
                <input
                    v-model="form.password"
                    class="form-control"
                    type="password"
                    :label="$t('Label.Password')"
                    :placeholder="$t('Label.Password')"
                />
            </li>
            <li class="d-flex flex-column">
                <label class="txt-tit">{{ $t('Label.FullName') }}</label>
                <input
                    v-model="form.fullName"
                    type="text"
                    class="txt-ipt"
                    :label="$t('Label.FullName')"
                    :placeholder="$t('Label.FullName')"
                />
            </li>
            <li class="d-flex flex-column">
                <label class="txt-tit">Ngày sinh</label>
                <datetimepicker
                            v-model="form.dateOfBirth"
                            v-if="isLoader"
                            type="date"
                            name="Ngày sinh"
                        />
            </li>
            <li class="two-col d-flex">
                <div class="col-input d-flex flex-column">
                    <label class="txt-tit">Điện thoại</label>
                    <input
                        type="number"
                        class="txt-ipt"
                        placeholder="Nhập  số điện thoại"
                        v-model="form.mobile"
                    />
                </div>
                <div class="col-input d-flex flex-column">
                    <label class="txt-tit">Email</label>
                    <input
                        type="text"
                        class="txt-ipt"
                        placeholder="Nhập email"
                        v-model="form.email"
                    />
                </div>
            </li>
            <li class="two-col d-flex">
                <div class="col-input d-flex flex-column">
                    <label class="txt-tit">Phòng ban/Nhóm</label>
                    <div class="custom-input js-selbox selbox type2">
                        <fselect
                            v-if="departmentList && isLoader"
                            v-model="form.departmentId"
                            :options="departmentList"
                            placeholder="Chọn phòng ban/nhóm"
                        />
                    </div>
                </div>
                <div class="col-input d-flex flex-column">
                    <label class="txt-tit">Chọn nhóm quyền</label>
                    <!-- [D] Thêm class "open" vào class "selbox" để mở selecbox -->
                    <div class="custom-input js-selbox selbox type2">
                        <select v-model="form.role" class="form-select">
                            <option :value="0">Chọn vai trò</option>
                            <template v-if="listRole && listRole.length > 0">
                                <option
                                    v-for="role in listRole"
                                    :key="'role_' + role.id"
                                    :value="role.id"
                                >
                                    {{ role.roleName }}
                                </option>
                            </template>
                        </select>
                    </div>
                </div>
            </li>
            <li class="two-col d-flex">
                <div class="col-input d-flex flex-column">
                    <label class="txt-tit">{{ $t('Label.Status') }}</label>
                    <!-- [D] Thêm class "open" vào class "selbox" để mở selecbox -->
                    <div class="custom-input js-selbox selbox type2">
                        <select v-model="form.status" class="form-select">
                            <option :value="1">{{ $t('Label.Active') }}</option>
                            <option :value="0">{{ $t('Label.Locked') }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-input d-flex flex-column">
                    <label class="txt-tit">Chức danh</label>
                    <div class="custom-input js-selbox selbox type2">
                        <select-category
                            type="position"
                            v-model="form.positionId"
                            placeholder="Chức danh"
                            v-if="isLoader"
                        />
                    </div>
                </div>
            </li>
        </ul>

      
    
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Edit',
    components: {  },
    props: ['memberId'],
    data() {
        return {
            form: {
                userName: '',
                password: '',
                fullName: '',
                email: '',
                status: 1,
                gender: 1,
                role: '0',
                mobile: '',
                level: 0,
                note: '',
                avatar: '',
                CompanyIds: '',
                companyBranchId: 0,
                departmentId: 0,
                isBranch: false,
                isStaff: false,
                abroadMemberTypeIds: [],
                laborMemberTypeIds: [],
                dateOfBirth:null,
            },
            isLoader: false,
            listRole: [],
            selectedChannel: null,
            objChangeMemberMananger: null,
        };
    },
    computed: {
        ...mapGetters(['departmentList']),
    },
    methods: {
        ...mapActions(['getDepartmentList']),
        submitMember() {
            var me = this;
            if (!this.form.fullName) {
                return this.$message(this.$t('Label.RequiredFullname'), 'error');
            }
            if (!this.form.userName) {
                return this.$message(this.$t('Label.RequiredUsername'), 'error');
            }
            if (!this.form.password && this.memberId == 0) {
                return this.$message(this.$t('Label.RequiredPasword'), 'error');
            }
            if (this.form.role == 0) {
                return this.$message(this.$t('Label.RequiredRole'), 'error');
            }
            // if (!this.form.companyBranchId) {
            //     return this.$message('Bắt buộc chọn chi nhánh', 'error');
            // }

            this.form.abroadMemberTypeIds = JSON.stringify(this.form.abroadMemberTypeIds);
            this.form.laborMemberTypeIds = JSON.stringify(this.form.laborMemberTypeIds);
            this.$http({
                data: {
                    m: 'user',
                    fn: 'save',
                    id: me.memberId,
                    ...this.form,
                },
            })
                .then((response) => {
                    if (response.success) {
                        let data = response.data;
                        if (data && this.objectValid(data)) {
                            this.$confirm(
                                'Có một số học viên đang được quản lý bởi người dùng, vui lòng chọn người quản lý mới'
                            ).then(() => {
                                this.objChangeMemberMananger = data;
                            });
                            this.form.abroadMemberTypeIds = JSON.parse(
                                this.form.abroadMemberTypeIds
                            );
                            this.form.laborMemberTypeIds = JSON.parse(this.form.laborMemberTypeIds);
                        } else {
                            this.$message(this.$t('Label.Successful'));
                            me.$emit('closePopup');
                        }
                    }
                })
                .catch((ex) => {
                    this.form.abroadMemberTypeIds = JSON.parse(this.form.abroadMemberTypeIds);
                    this.form.laborMemberTypeIds = JSON.parse(this.form.laborMemberTypeIds);
                    return this.$message(ex.message, 'error');
                });
        },
        closePopup() {
            this.$emit('closePopup');
        },
        objectValid(obj) {
            if (!obj) return false;
            let valid = false;
            for (var value in obj) {
                if (obj[value]) {
                    valid = true;
                    break;
                }
            }

            return valid;
        },
        onAvatarChange(val) {
            this.form.avatar = val;
        },
        getListRole() {
            this.$http({
                data: {
                    m: 'security',
                    fn: 'role_get_list',
                },
            })
                .then((response) => {
                    if (response.success) {
                        this.listRole = response.data;
                    }
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
        getUser() {
            this.$http({
                data: {
                    m: 'user',
                    fn: 'get_detail',
                    id: this.memberId,
                },
            })
                .then((response) => {
                    if (response.success) {
                        this.form = response.data;
                        if (
                            this.form.abroadMemberTypeIds &&
                            typeof this.form.abroadMemberTypeIds == 'string'
                        )
                            this.form.abroadMemberTypeIds = JSON.parse(
                                this.form.abroadMemberTypeIds
                            );
                        if (
                            this.form.laborMemberTypeIds &&
                            typeof this.form.laborMemberTypeIds == 'string'
                        )
                            this.form.laborMemberTypeIds = JSON.parse(this.form.laborMemberTypeIds);
                    }
                    this.isLoader = true;
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
    },
    created() {
        this.getDepartmentList({ pageSize: 100 });
        this.getListRole();
        if (this.memberId > 0) this.getUser();
        else this.isLoader = true;
    },
};
</script>
<style scoped>
.dn-content-left {
    max-width: 800px;
    margin: 0 auto;
}

.student-avatar {
    width: 90px;
    height: 135px;
}

input[type='file'] {
    display: none;
}

.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 5px 8px;
    cursor: pointer;
}

@media (max-width: 767px) {
    .md-layout {
        flex-direction: column;
    }
}

.ai-info-member {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
}

.ai-info-member .info {
    margin-left: 20px;
}
</style>
