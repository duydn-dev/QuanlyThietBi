<template>
    <modal :title="form.id > 0 ? 'Sửa phòng ban' : 'Thêm phòng ban'" @close="closePopup()">
        <div slot="body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Tên phòng ban</label>
                                <input
                                    v-model="form.name"
                                    type="text"
                                    placeholder="Nhập tên phòng ban"
                                    class="form-control"
                                />
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Phòng cấp cha</label>
                                <fselect
                                    v-if="departmentList && isLoader"
                                    v-model="form.parentId"
                                    :options="departmentList"
                                    placeholder="Chọn cấp cha"
                                />
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Trưởng đơn vị</label>
                                <select
                                    v-if="listUsers"
                                    v-model="form.managerId"
                                    class="form-control"
                                >
                                    <option :value="0">Chọn trưởng đơn vị</option>
                                    <option
                                        v-for="(item, index) in listUsers"
                                        :key="index"
                                        :value="item.id"
                                    >{{ item.fullName }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Trạng thái</label>
                                <select v-model="form.status" class="form-control">
                                    <option :value="1">Đang hoạt động</option>
                                    <option :value="2">Ngừng hoạt động</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer" class="row">
            <div class="col-sm-12">
                <button class="btn btn-cyan" @click="save()">
                    <span>Lưu lại</span>
                </button>
                <button class="btn btn-danger" @click="closePopup()">
                    <span>Hủy</span>
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'DepartmentEdit',
    props: ['id', 'companyId'],
    data() {
        return {
            form: {
                name: '',
                status: 1,
                parentId: 0,
                managerId: 0,
                id: 0,
                company: this.companyId
            },
            isLoader: false
        };
    },
    computed: {
        ...mapGetters(['departmentList', 'listUsers'])
    },
    methods: {
        ...mapActions(['getDepartmentList', 'getListUsers']),
        save() {
            var me = this.form;
            if (me.name == '') {
                return this.$message('Bạn vui lòng nhập tên phòng ban!', 'error');
            }
            this.$http({
                data: {
                    m: 'companydepartment',
                    fn: 'save',
                    ...this.form
                }
            })
                .then(res => {
                    if (res.success) {
                        this.$message('Lưu thành công!');
                        this.closePopup();
                    }
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        },
        getDetail() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'companydepartment',
                    fn: 'detail',
                    id: this.id
                }
            })
                .then(response => {
                    loading.hide();
                    if (response.success) {
                        this.form = Object.assign(this.form, response.data);
                        this.isLoader = true;
                    }
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        closePopup() {
            this.$emit('closePopup');
        }
    },
    created() {
        this.getListUsers({
            status: 1,
            pageIndex: 1,
            pageSize: 100
        });
        this.getDepartmentList({
            status: 1,
            pageIndex: 1,
            pageSize: 100
        });
        if (this.id > 0) this.getDetail();
        else this.isLoader = true;
    }
};
</script>
