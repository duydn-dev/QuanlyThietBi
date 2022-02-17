<template>
    <management-wrapper>
        <template slot="header-search">
            <div class="app-search">
                <div class="topbar-search position-relative">
                    <input
                        type="text"
                        class="form-control ipt-search"
                        placeholder="Nhập từ khóa tìm kiếm"
                        v-model="objData.keyword"
                        @keyup.enter="getlistData"
                    />
                    <button class="btn-search" type="submit">
                        <img src="/assets-v2/images/icon-search.svg" alt="" />
                    </button>
                </div>
            </div>
        </template>
        <div class="box box-manage-room">
            <div class="box-head d-flex flex-column">
                <strong class="txt-head txt-border-bottom">Quản lý người dùng</strong>
                <div class="group-right d-flex flex-wrap align-items-center justify-content-end">
                    <div class="group-right-sel d-flex align-items-center">
                        <div class="custom-input js-selbox selbox type2">
                            <fselect
                                v-model="objData.departmentId"
                                placeholder="---Phòng ban---"
                                :options="departmentList"
                            />
                        </div>
                        <div class="custom-input js-selbox selbox type2">
                            <fselect
                                v-model="objData.status"
                                v-if="listStatus"
                                placeholder="---Trạng thái---"
                                :options="listStatus"
                                :multiple="false"
                            />
                        </div>
                        <div
                            class="custom-input js-selbox selbox type2"
                            v-if="appSettings.memberType"
                        >
                            <fselect
                                v-model="objData.memberTypeId"
                                placeholder="---Loại hình---"
                                :options="appSettings.memberType"
                            />
                        </div>
                        <div class="custom-input js-selbox selbox type2" v-if="listRole">
                            <fselect
                                v-model="objData.roleId"
                                placeholder="---Nhóm quyền---"
                                label="roleName"
                                :options="listRole"
                            />
                        </div>
                    </div>
                    <div class="group-right-btn d-flex align-items-center">
                        <button
                            type="button"
                            class="btn-evt btn-export d-flex align-items-center"
                            title="Export tài khoản"
                            @click="exportAccount"
                            v-if="isPermission(permissions.exportUser)"
                        >
                            <i class="bi bi-plus"></i>
                            <span>Export tài khoản</span>
                        </button>
                        <button
                            type="button"
                            class="btn-evt btn-import d-flex align-items-center"
                            title="Import tài khoản"
                            @click="importAccount"
                        >
                            <i class="bi bi-plus"></i>
                            <span>Import tài khoản</span>
                        </button>
                        <button
                            type="button"
                            class="btn-evt btn-create js-btnCreate d-flex align-items-center"
                            title="Tạo mới"
                            @click="openPopup()"
                        >
                            <i class="bi bi-plus"></i>
                            <span>Tạo mới</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="box-ct box-tbl-ct">
                <div class="tbl-wrap">
                    <table class="tbl">
                        <colgroup>
                            <col width="4%" />
                            <col width="14%" />
                            <col width="15%" />
                            <col width="13%" />
                            <col width="10%" />
                            <col width="15%" />
                            <col width="29%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th class="txt-tit text-start">Tên đăng nhập</th>
                                <th>Họ tên</th>
                                <th>Ngày tạo</th>
                                <th>Chi nhánh</th>
                                <th>Phòng/nhóm</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in listData" :key="'user' + item.id">
                                <td>{{ index + rowNum + 1 }}</td>
                                <td class="txt-tit text-start">
                                    <div class="d-flex align-items-center">
                                        <span
                                            class="
                                                u-avt
                                                d-flex
                                                align-items-center
                                                justify-content-center
                                            "
                                        >
                                            <avatar
                                                :username="item.userName"
                                                css-class="kt-badge kt-badge--xl"
                                            />
                                        </span>
                                        <span class="u-name d-flex flex-column"
                                            ><em>{{ item.userName }}</em> {{ item.roleName }}</span
                                        >
                                    </div>
                                </td>
                                <td>{{ item.fullName }}</td>
                                <td>{{ item.createdDate | moment('DD/MM/YYYY') }}</td>
                                <td>{{ item.companyBranch }}</td>
                                <td>{{ getDepartmentName(item.departmentId) }}</td>
                                <td class="btn-wrap">
                                    <button
                                        type="button"
                                        class="btn btn-success"
                                        v-if="
                                            isPermission(permissions.userUpdatePermission) &&
                                            !item.isSystem
                                        "
                                        @click="openPopupSetting(item.id, item.userName, item.role)"
                                    >
                                        Phân quyền
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-warning"
                                        @click="openPopup(item.id)"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        @click="resetPass(item)"
                                    >
                                        Đổi mật khẩu
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-login"
                                        v-if="
                                            appSettings.companies &&
                                            appSettings.currentCompany.isSystem
                                        "
                                    >
                                        Đăng nhập
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <pagerv2
                        :total="totalRow"
                        :page-index="objData.pageIndex"
                        @change="pageChange"
                    />
                </div>
            </div>
        </div>

        <modalv2
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
                <button class="btn btn-primary" secondary @click="comfirmResetPass()">
                    Xác nhận
                </button>
            </div>
        </modalv2>
        <modalv2
            v-if="popupAdd"
            id="modal-dashbroad"
            :footer="true"
            :title="memberId > 0 ? 'Cập nhật người dùng' : 'Thêm người dùng'"
            @close="popupAdd = false"
        >
            <div slot="body">
                <edit :member-id="memberId" @closePopup="closePopup()" ref="editmember" />
            </div>
            <div slot="footer">
                <button type="button" class="btn btn-secondary" @click="closePopup">Hủy</button>
                <button type="button" class="btn btn-primary" @click="submitMember()">
                    <span v-if="memberId > 0">{{ $t('Label.Update') }}</span>
                    <span v-else>{{ $t('Label.Add') }}</span>
                </button>
            </div>
        </modalv2>

        <permission
            v-if="popupSetting"
            :memberId="memberId"
            :roleId="role"
            :name="userName"
            @closePopup="closePopupSetting()"
        />

        <import-account ref="importAccount" @reloadData="getlistData" />
    </management-wrapper>
</template>
    

<style scoped>
.general-user-wrap .custom-input.selbox {
    max-width: 220px;
}
.tbl-wrap .tbl .txt-tit .u-avt {
    width: 50px;
    height: 50px;
}
</style>
<script>
import edit from './edit';
import managementWrapper from '../management-wrapper.vue';
//import permission from './permission';
import permission from './permission';
import { mapGetters, mapActions } from 'vuex';
import importAccount from './import-account';
export default {
    name: 'UserIndex',
    components: {
        edit,
        permission,
        importAccount,
        managementWrapper,
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
                memberTypeId: 0,
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
                { id: 0, name: 'Khóa' },
            ],
        };
    },
    computed: {
        ...mapGetters(['system', 'departmentList']),
        rowNum() {
            return (this.objData.pageIndex - 1) * this.objData.pageSize;
        },
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
        },
    },
    methods: {
        ...mapActions(['initSystem', 'updateAppSettings', 'getDepartmentList']),
        submitMember() {
            this.$refs.editmember.submitMember();
        },
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
                    password: this.passReset,
                },
            }).then((response) => {
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
        getlistData() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'user',
                    fn: 'get_list',
                    ...this.objData,
                },
            })
                .then((response) => {
                    loading.hide();
                    this.listData = response.data;
                    this.totalRow = response.totalRow;
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        login(id) {
            this.$http({
                data: {
                    m: 'user',
                    fn: 'get-token',
                    userId: id,
                },
            })
                .then((response) => {
                    this.appSettings.token = response.data;
                    this.initSystem({ debug: true }).then(() => {
                        this.done = true;
                        let tempSettings = this.appSettings;
                        var enumCustomFieldObjects = {};
                        for (var i = 0; i < this.system.customFieldObjects.length; i++) {
                            enumCustomFieldObjects[this.system.customFieldObjects[i].name] =
                                this.system.customFieldObjects[i].id;
                        }
                        tempSettings.enumCustomFieldObjects = enumCustomFieldObjects;
                        tempSettings = Object.assign(tempSettings, this.system);
                        this.updateAppSettings(tempSettings);
                    });
                    this.$router.push('/');
                })
                .catch((err) => {
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
                    ...this.objData,
                },
            })
                .then((response) => {
                    loading.hide();
                    window.open(response.data);
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
    },
    created() {
        if (!this.isPermission(['userManagement'])) {
            this.$error('Bạn không có quyền truy cập trang này!');
            this.$router.push('/');
            return;
        }
        this.getListRole();
        this.getlistData();
        this.getDepartmentList();
    },
};
</script>
