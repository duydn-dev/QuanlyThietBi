<template>
    <managementwrapper>
        <div class="box">
            <div class="box-head d-flex justify-content-between">
                <strong class="txt-head">Quản lý Nhóm quyền</strong>
                <div class="group-right d-flex align-items-center">
                    <!-- <div class="form-wrap">
                        <input type="text" id="generalSearch" class="form-control ipt-search" placeholder="Từ khóa">
                    </div> -->
                    <button type="button" class="btn-evt btn-create js-btnCreate d-flex align-items-center"
                    @click="openPopup()">
                        <i class="bi bi-plus"></i>
                        <span>Tạo mới</span>
                    </button>
                </div>
            </div>
            <div class="box-ct box-tbl-ct">
                <div class="tbl-wrap">
                    <table class="tbl">
                        <colgroup>
                            <col width="4%">
                            <col width="70%">
                            <col width="26%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th class="txt-tit text-start">Nhóm quyền</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody v-if="listData">
                            <tr v-for="(item, index) in listData" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td class="txt-tit text-start">{{ item.roleName }}</td>
                                <td class="btn-wrap">
                                    <!-- <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#popDecentralization">Phân quyền</button>
                                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#popEventGroup">Sửa</button>
                                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#popDelete">Xóa</button> -->
                                    <button class="btn btn-success"
                                                :title="$t('Label.PermissionSetup')"
                                                @click="openPopupSetting(item.id, item.roleName)">
                                            Phân quyền
                                    </button>
                                    <button class="btn btn-warning"
                                            :title="$t('Label.Edit')"
                                            @click="openPopup(item.id)">
                                        Sửa
                                    </button>
                                    <button class="btn btn-danger"
                                            :disabled="item.isSystem"
                                            :title="$t('Label.Remove')"
                                            @click="remove(item.id)">
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>

        
        <!--end::Portlet-->
        <modalv2 v-if="popupAdd"
               id="modal-edit-class"
               :width="600"
               :title="roleId > 0 ? 'Cập nhật nhóm người dùng' : 'Tạo mới nhóm người dùng'"
               @close="popupAdd = false">
            <div v-if="orderDetail" slot="body">
                <!-- <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Tên nhóm</label>
                            <input v-model="orderDetail.roleName"
                                   type="text"
                                   class="form-control"
                                   placeholder="Nhập tên nhóm" />
                        </div>
                    </div>
                </div> -->
                <div class="d-flex flex-column">
                        <label class="txt-tit">Tên nhóm</label>
                        <input class="txt-ipt" placeholder="Nhập tên nhóm" v-model="orderDetail.roleName">
                    </div>
            </div>
            <div slot="footer">
                <button class="btn btn-primary" @click="save()">
                    <span>{{ $t('Label.Save') }}</span>
                </button>
            </div>
        </modalv2>
        <permission v-if="popupSetting" :id="roleId" :name="roleName" @closePopup="popupSetting = false" />
    </managementwrapper>
</template>
<script>
    
    import permission from './permission'
    export default {
        name: 'RoleIndex',        
        components: {
            permission
        },
        data() {
            return {
                popupAdd: false,
                popupSetting: false,
                roleName: '',
                roleId: 0,
                isUpdateUser: false,
                listData: [],
                orderDetail: {
                    id: 0,
                    roleName: ''
                }
            };
        },
        watch: {
        },
        created() {
            if(!this.isPermission(['roleManagement'])){
                this.$error('Bạn không có quyền truy cập trang này!');
                this.$router.push('/');
                return;
            }
            this.getList();
        },
        methods: {
            openPopup(id) {
                this.orderDetail.id = id || 0;
                this.popupAdd = true;
                if (this.orderDetail.id > 0) this.getDetail();
                else
                    this.orderDetail = {
                        id: 0,
                        name: '',
                        nameJP: ''
                    };
            },
            closePopup() {
                this.popupAdd = false;
            },
            openPopupSetting(roleId, roleName) {
                this.roleId = roleId;
                this.roleName = roleName;
                this.popupSetting = true;
            },
            closePopupSetting() {
                this.popupSetting = false;
            },
            getList() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'role_get_list'
                    }
                })
                    .then(response => {
                        loading.hide();
                        if (response.success) {
                            this.listData = response.data;
                        }
                    })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            },
            getDetail() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'role_get_by_id',
                        id: this.orderDetail.id
                    }
                })
                    .then(response => {
                        if (response.success) {
                            this.orderDetail = response.data;
                        }
                        loading.hide();
                    })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            },
            save() {
                var me = this;
                if (me.orderDetail.roleName == '') {
                    return this.$message('Bạn vui lòng nhập tên vai trò!', 'error');
                }
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'role_save',
                        ...this.orderDetail
                    }
                })
                    .then(() => {
                        loading.hide();
                        this.closePopup();
                        this.$message(this.$t('Label.Successful'));
                        me.getList();
                    })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            },
            remove(id) {
                this.$confirm('Xóa vai trò?').then(() => {
                    let loading = this.$loading.show();
                    this.$http({
                        data: {
                            m: 'security',
                            fn: 'role_remove',
                            id: id
                        }
                    })
                        .then(response => {
                            if (response.success) {
                                loading.hide();
                                this.getList();
                            }
                            loading.hide();
                        })
                        .catch(err => {
                            loading.hide();
                            return this.$message(err.message, 'error');
                        });
                });
            },

        }
    };
</script>
