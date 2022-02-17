<template>
  <wrapper>
    <template slot="header">
      <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Quản lý người dùng</h3>

        <span class="kt-subheader__separator kt-subheader__separator--v" />
      </div>

      <div class="kt-subheader__toolbar">
        <button
          class="btn btn-primary"
          @click="exportAccount"
          v-if="isPermission(permissions.exportUser)"
        >
          <i class="fas fa-file-excel"></i>Export tài khoản
        </button>
        <button
          class="btn btn-primary"
          @click="importAccount"
        >
          <i class="fa fa-upload"></i>Import tài khoản
        </button>
        <button
          @click="openPopup()"
          class="btn btn-brand"
        >
          <i class="fa fa-plus-square"></i>Tạo mới
        </button>
      </div>
    </template>
    <div id="dynamic-filter-wrapper">
      <div class="kt-form">
        <div class="kt-margin-l-20 kt-margin-t-20 kt-margin-r-20 row">
          <div class="form-group col-lg-3 col-xl-2">
            <label>Từ khóa</label>
            <input
              v-model="objData.keyword"
              type="text"
              class="form-control"
              placeholder="Từ khóa..."
              @keyup.enter="getlistData"
            />
          </div>
          <!-- <div class="form-group col-lg-3 col-xl-2" v-if="appSettings.branchList">
                        <label>Chi nhánh</label>

                        <branch-select v-model="objData.branchId" placeholder="---Chi nhánh---" />
                    </div> -->
          <div
            class="form-group col-lg-3 col-xl-2"
            v-if="departmentList"
          >
            <label>Phòng ban</label>
            <fselect
              v-model="objData.departmentId"
              placeholder="---Tất cả---"
              :options="departmentList"
            />
          </div>
          <div class="form-group col-lg-3 col-xl-2">
            <label>Trạng thái</label>
            <fselect
              v-model="objData.status"
              v-if="listStatus"
              placeholder="---Tất cả---"
              :options="listStatus"
              :multiple="false"
            />
          </div>
          <div
            class="form-group col-lg-3 col-xl-2"
            v-if="appSettings.memberType"
          >
            <label>Loại hình</label>
            <fselect
              v-model="objData.memberTypeId"
              placeholder="---Tất cả---"
              :options="appSettings.memberType"
            />
          </div>
          <div
            class="form-group col-lg-3 col-xl-2"
            v-if="listRole"
          >
            <label>Vai trò</label>
            <fselect
              v-model="objData.roleId"
              placeholder="---Tất cả---"
              label="roleName"
              :options="listRole"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      id="kt_content"
      class="kt-content kt-grid__item kt-grid__item--fluid"
    >
      <!--begin::Portlet-->
      <div class="kt-portlet kt-portlet--mobile">
        <div class="kt-portlet__body kt-portlet__body--fit">
          <!--begin: Datatable -->
          <div
            id="kt_apps_user_list_datatable"
            class="kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--loaded"
          >
            <table class="kt-datatable__table">
              <thead class="kt-datatable__head">
                <tr>
                  <th class="width-50">#</th>
                  <th>Tên đăng nhập</th>
                  <th>Họ tên</th>
                  <th>Ngày tạo</th>
                  <th>Chi nhánh</th>
                  <th>Phòng/nhóm</th>
                  <th class="text-center width-160">Thao tác</th>
                </tr>
              </thead>
              <tbody class="kt-datatable__body">
                <tr
                  v-for="(item, index) in listData"
                  :key="'user' + item.id"
                >
                  <th scope="row">{{ index + rowNum + 1 }}</th>
                  <td>
                    <div class="kt-user-card-v2">
                      <div class="kt-user-card-v2__pic">
                        <avatar
                          :username="item.userName"
                          css-class="kt-badge kt-badge--xl"
                        />
                      </div>
                      <div class="kt-user-card-v2__details">
                        <a class="kt-user-card-v2__name">
                          {{
                                                    item.userName
                                                    }}
                        </a>
                        <span class="kt-user-card-v2__desc">
                          {{ item.roleName }}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{{ item.fullName }}</td>
                  <td>{{ item.createdDate | moment('DD/MM/YYYY') }}</td>
                  <td>{{ item.companyBranch }}</td>
                  <td>{{ getDepartmentName(item.departmentId) }}</td>
                  <td class="btn-action width-160">
                    <!-- <span
                                            v-if="isPermission(permissions.crmManagement) && !item.isSystem"
                                            title="Phân quyền kho chung"
                                            class="btn btn-primary"
                                            @click="openPopupSettingWareHouse(item.id, item.userName)"
                                        >
                                            <i class="fa fa-warehouse" />
                                        </span>-->
                    <span
                      v-if="
                                                isPermission(permissions.userUpdatePermission) &&
                                                !item.isSystem
                                            "
                      title="Phân quyền"
                      class="btn btn-warning"
                      @click="
                                                openPopupSetting(item.id, item.userName, item.role)
                                            "
                    >
                      <i class="fa fa-cog" />
                    </span>
                    <span
                      title="Sửa"
                      class="btn btn-primary"
                      @click="openPopup(item.id)"
                    >
                      <i class="fa fa-edit" />
                    </span>
                    <span
                      title="Đổi mật khẩu"
                      class="btn btn-dark"
                      @click="resetPass(item)"
                    >
                      <i class="fas fa-sync-alt" />
                    </span>
                    <span
                      v-if="
                                                appSettings.companies &&
                                                appSettings.currentCompany.isSystem
                                            "
                      title="Đăng nhập"
                      class="btn btn-danger mt-1"
                      @click="login(item.id)"
                    >
                      <i class="fa fa-sign-in-alt" />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pr-4 pl-4">
              <pager
                :total="totalRow"
                :page-index="objData.pageIndex"
                @change="pageChange"
              />
            </div>
          </div>

          <!--end: Datatable -->
        </div>
      </div>
      <!--end::Portlet-->
    </div>

    <modal
      v-if="popupResetPass"
      id="modal-resetpass"
      :footer="false"
      :width="400"
      :title="`Đổi mật khẩu: <b>${memberName}</b>`"
      @close="popupResetPass = false"
    >
      <div slot="body">
        <div class="form-group">
          <label>Nhập mật khẩu mới</label>
          <input
            v-model="passReset"
            class="form-control"
            placeholder="Nhập mật khẩu mới"
            type="password"
          />
        </div>
        <button
          class="btn btn-primary"
          secondary
          @click="comfirmResetPass()"
        >
          Xác nhận
        </button>
      </div>
    </modal>
    <modal
      v-if="popupAdd"
      id="modal-dashbroad"
      :footer="false"
      :title="memberId > 0 ? 'Cập nhật người dùng' : 'Thêm người dùng'"
      @close="popupAdd = false"
    >
      <div slot="body">
        <edit
          :member-id="memberId"
          @closePopup="closePopup()"
        />
      </div>
    </modal>

    <permission
      v-if="popupSetting"
      :memberId="memberId"
      :roleId="role"
      :name="userName"
      @closePopup="closePopupSetting()"
    />

    <import-account
      ref="importAccount"
      @reloadData="getlistData"
    />
  </wrapper>
</template>
<script>
import edit from './edit';
//import permission from './permission';
import permission from './permission_new';
import { mapGetters, mapActions } from 'vuex';
import importAccount from './import-account';
export default {
    name: 'UserIndex',
    components: {
        edit,
        permission,
        importAccount
    },
    data() {
        return {
            popupResetPass: false,
            resetMemberName: '',
            resetMemberId: 0,
            passReset: '',
            objData: {
                keyword: '',
                status: 1,
                roleId: 0,
                pageIndex: 1,
                pageSize: 20,
                departmentId: 0,
                branchId: 0,
                memberTypeId: 0
            },
            listData: [],
            listRole: [],
            totalRow: 0,
            timeDelay: null,
            popupAdd: false,
            popupSetting: false,
            popupListCollarator: false,
            isShowPopupWareHouse: false,
            memberId: 0,
            userName: '',
            role: 0,
            listStatus: [
                { id: 1, name: 'Hoạt động' },
                { id: 0, name: 'Khóa' }
            ]
        };
    },
    computed: {
        ...mapGetters(['system', 'departmentList']),
        rowNum() {
            return (this.objData.pageIndex - 1) * this.objData.pageSize;
        }
    },
    watch: {
        //'objData.keyword'() {
        //    this.$set(this.objData, 'pageIndex', 1);
        //    this.getlistData();
        //},
        'objData.status'() {
            this.$set(this.objData, 'pageIndex', 1);
            this.getlistData();
        },
        'objData.roleId'() {
            if (!this.objData.roleId) this.objData.roleId = 0;
            this.$set(this.objData, 'pageIndex', 1);
            this.getlistData();
        },
        'objData.departmentId'() {
            this.$set(this.objData, 'pageIndex', 1);
            this.getlistData();
        },
        'objData.branchId'() {
            this.$set(this.objData, 'pageIndex', 1);
            this.getlistData();
        },
        'objData.memberTypeId'() {
            this.$set(this.objData, 'pageIndex', 1);
            this.getlistData();
        }
    },
    methods: {
        ...mapActions(['initSystem', 'updateAppSettings', 'getDepartmentList']),
        pageChange(pageNum) {
            this.$set(this.objData, 'pageIndex', pageNum);
            this.getlistData();
        },
        getDepartmentName(id) {
            if (this.departmentList) {
                var o = _.find(this.departmentList, ['id', id]);
                if (o) return o.name;
            }
            return '';
        },
        comfirmResetPass() {
            if (!this.passReset) {
                this.$alert('Thông báo', this.$t('Label.RequiredNewPassword'), 'error');
                return;
            }
            if (this.resetMemberId <= 0) {
                this.$alert('Thông báo', 'Xảy ra lỗi', 'error');
                return;
            }

            this.$http({
                data: {
                    m: 'user',
                    fn: 'reset_pass',
                    id: this.resetMemberId,
                    password: this.passReset
                }
            }).then(response => {
                if (response.success) {
                    this.popupResetPass = false;
                    this.$alert(
                        'Thông báo',
                        this.$t('Label.ChangePasswordSuccessfully'),
                        'success'
                    );
                }
            });
        },
        resetPass(item) {
            this.memberName = item.userName;
            this.resetMemberId = item.id;
            this.popupResetPass = true;
        },
        openPopup(id) {
            this.memberId = id || 0;
            this.popupAdd = true;
        },
        closePopup() {
            this.popupAdd = false;
            this.getlistData();
        },
        openPopupSettingWareHouse(id, userName) {
            this.memberId = id || 0;
            this.isShowPopupWareHouse = true;
            this.userName = userName;
        },
        closePopupSettingWareHouse() {
            this.isShowPopupWareHouse = false;
            this.getlistData();
        },
        openPopupSetting(id, userName, role) {
            this.memberId = id || 0;
            this.role = role;
            this.userName = userName;
            this.popupSetting = true;
        },
        closePopupSetting() {
            this.popupSetting = false;
            this.getlistData();
        },

        getListRole() {
            this.$http({
                data: {
                    m: 'security',
                    fn: 'role_get_list'
                }
            })
                .then(response => {
                    if (response.success) {
                        this.listRole = response.data;
                    }
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        },
        getlistData() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'user',
                    fn: 'get_list',
                    ...this.objData
                }
            })
                .then(response => {
                    loading.hide();
                    this.listData = response.data;
                    this.totalRow = response.totalRow;
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        login(id) {
            this.$http({
                data: {
                    m: 'user',
                    fn: 'get-token',
                    userId: id
                }
            })
                .then(response => {
                    this.appSettings.token = response.data;
                    this.initSystem({ debug: true }).then(() => {
                        this.done = true;
                        let tempSettings = this.appSettings;
                        var enumCustomFieldObjects = {};
                        for (var i = 0; i < this.system.customFieldObjects.length; i++) {
                            enumCustomFieldObjects[
                                this.system.customFieldObjects[i].name
                            ] = this.system.customFieldObjects[i].id;
                        }
                        tempSettings.enumCustomFieldObjects = enumCustomFieldObjects;
                        tempSettings = Object.assign(tempSettings, this.system);
                        this.updateAppSettings(tempSettings);
                    });
                    this.$router.push('/');
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        },
        openListCollaborator(id) {
            this.passingDataCollarator = id;
            this.popupListCollarator = true;
        },
        importAccount() {
            this.$refs.importAccount.showModalImport();
        },
        exportAccount() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'user',
                    fn: 'export-user',
                    ...this.objData
                }
            })
                .then(response => {
                    loading.hide();
                    window.open(response.data);
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        }
    },
    created() {
        this.getListRole();
        this.getlistData();
        this.getDepartmentList();
    }
};
</script>
