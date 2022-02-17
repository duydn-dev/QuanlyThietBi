<template>
    <modal :title="form.id > 0 ? 'Sửa phòng ban' : 'Thêm phòng ban'" @close="closePopup()">
        <div slot="body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Tên phòng ban</label>
                                <input v-model="form.name"
                                       type="text"
                                       placeholder="Nhập tên phòng ban"
                                       class="form-control" />
                            </div>
                        </div>
                        <div class="form-group col-md-12">
                            <label>Loại hình</label>
                            <fselect v-model="form.typeId"
                                     :options="allTypes" v-if="allTypes && isLoader"/>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Trưởng phòng</label>
                                <fselect :options="listUsers" v-model="form.managerId" label="fullName" placeholder="Chọn trưởng phòng" v-if="isLoader" />
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Trưởng nhóm</label>
                                <fselect :options="listUsers" v-model="form.leaderId" label="fullName" placeholder="Chọn trưởng nhóm" v-if="isLoader"/>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Cán bộ xử lý</label>
                                <UserSelect :ids="branchUsers"
                                            :isShowBranch="true"
                                            :isShowDepartment="false"
                                            v-model="staffUsers"
                                            :src="staffUsers"
                                            @close="closeAction()" />
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Cán bộ chi nhánh</label>
                                <UserSelect :ids="branchUsers"
                                            :isShowBranch="true"
                                            :isShowDepartment="false"
                                            v-model="branchUsers"
                                            :src="branchUsers"
                                            @close="closeAction()" />
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
    import UserSelect from '../../_common/user-select/index';
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'DepartmentEditEdu',
        components: { UserSelect },
        props: ['id'],
        data() {
            return {
                form: {
                    name: '',
                    status: 1,
                    parentId: 0,
                    typeId:0,
                    managerId: 0,
                    leaderId: 0,
                    branchUsers: '',
                    staffUsers:'',
                    id: 0
                },
                allTypes: [],
                staffUsers: [],
                branchUsers: [],
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
                if (this.branchUsers)
                    this.form.branchUsers = JSON.stringify(_.map(this.branchUsers, 'id'));
                if (this.staffUsers)
                    this.form.staffUsers = JSON.stringify(_.map(this.staffUsers, 'id'));
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
            listTypes() {
                this.$http({
                    data: {
                        m: 'abroadmember',
                        fn: 'list-types'
                    }
                })
                    .then(res => {
                        this.allTypes = res.data
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
                            this.branchUsers = response.data.branchUsers;
                            this.staffUsers = response.data.staffUsers;
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
            this.listTypes();
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
