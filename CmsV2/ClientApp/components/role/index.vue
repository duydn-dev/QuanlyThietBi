<template>
    <wrapper>
        <template slot="header">
            <div class="kt-subheader__main">
                <h3 class="kt-subheader__title">
                    Quản lý nhóm người dùng
                </h3>

                <span class="kt-subheader__separator kt-subheader__separator--v" />

                <div id="kt_subheader_search" class="kt-subheader__group">
                    <form id="kt_subheader_search_form" class="kt-margin-l-20">
                        <div class="kt-input-icon kt-input-icon--right kt-subheader__search">
                            <input id="generalSearch"
                                   type="text"
                                   class="form-control"
                                   placeholder="Search..." />
                            <span class="kt-input-icon__icon kt-input-icon__icon--right">
                                <span>
                                    <i class="fa fa-search" />
                                </span>
                            </span>
                        </div>
                    </form>
                </div>
            </div>

            <div class="kt-subheader__toolbar">
                <button @click="openPopup()" class="btn btn-brand">
                    <i class="fa fa-plus-square"></i> Tạo mới
                </button>
            </div>
        </template>
        <div id="kt_content" class="kt-content  kt-grid__item kt-grid__item--fluid">
            <!--begin::Portlet-->
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__body kt-portlet__body--fit">
                    <!--begin: Datatable -->
                    <div id="kt_apps_user_list_datatable"
                         class="kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--loaded">
                        <table class="kt-datatable__table">
                            <thead slot="header">
                                <tr>
                                    <th>{{ $t('Label.Stt') }}</th>
                                    <th>{{ $t('Label.Role') }}</th>
                                    <th class="text-center width-250">
                                        {{ $t('Label.Action') }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-if="listData">
                                <tr v-for="(item, index) in listData" :key="item.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.roleName }}</td>
                                    <td class="text-center btn-action">
                                        <button class="btn btn-primary"
                                                :title="$t('Label.PermissionSetup')"
                                                @click="openPopupSetting(item.id, item.roleName)">
                                            <i class="fa fa-cog" />
                                        </button>
                                        <button class="btn btn-warning"
                                                :title="$t('Label.Edit')"
                                                @click="openPopup(item.id)">
                                            <i class="fa fa-edit" />
                                        </button>
                                        <button class="btn btn-danger"
                                                :disabled="item.isSystem"
                                                :title="$t('Label.Remove')"
                                                @click="remove(item.id)">
                                            <i class="fa fa-trash-alt" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!--end::Portlet-->
        <modal v-if="popupAdd"
               id="modal-edit-class"
               :width="600"
               :title="roleId > 0 ? 'Cập nhật nhóm người dùng' : 'Tạo mới nhóm người dùng'"
               @close="popupAdd = false">
            <div v-if="orderDetail" slot="body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Tên nhóm</label>
                            <input v-model="orderDetail.roleName"
                                   type="text"
                                   class="form-control"
                                   placeholder="Nhập tên nhóm" />
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-primary" @click="save()">
                    <span>{{ $t('Label.Save') }}</span>
                </button>
            </div>
        </modal>
        <permission v-if="popupSetting" :id="roleId" :name="roleName" @closePopup="popupSetting = false" />
    </wrapper>
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
