<template>
    <div class="row">
        <div class="kt-portlet col-md-6" :class="isCRM ? 'col-md-12' : ''">
            <div class="kt-portlet__head pl-3" v-if="!isCRM">
                <div class="kt-portlet__head-label">
                    <h3 class="kt-portlet__head-title">Thông tin nguồn</h3>
                </div>
            </div>
            <div class="kt-form" style="    margin: 10px 10px 10px 10px;">
                <div class="row" v-if="isEdit && !isCRM">
                    <div class="col-md-12 form-group">
                        <template v-if="objData.sourceType == 1 && objData.collaboratorId">
                            <label v-if="CTV">
                                Nguồn cộng tác viên:
                                <router-link
                                    :to="`/collaborator/${type}/${CTV.id}`"
                                >{{CTV.fullName}}</router-link>
                            </label>
                        </template>
                        <template v-else-if="objData.sourceType == 1 && !objData.collaboratorId">
                            <label>Nguồn nhân viên: {{sourceInfo}}</label>
                        </template>
                        <template
                            v-else-if="objData.sourceType == 0 && (sourceInfo || objData.sourceCampaign || objData.sourceMembership)"
                        >
                            <label>Nguồn tự nhiên: {{sourceInfo}}</label>
                            <div class="form-group">Chiến dịch:{{objData.sourceCampaign}}</div>
                            <div class="form-group">
                                Nhân viên phụ trách:
                                <fselect
                                    :disabled="true"
                                    :options="listUsers"
                                    v-model="objData.sourceMembership"
                                    label="fullName"
                                ></fselect>
                            </div>
                        </template>
                        <template
                            v-else-if="objData.sourceType == 2 && ((schoolAbroad && schoolAbroad.schoolName) || sourceInfo)"
                        >
                            <label v-if="type == 1 && schoolAbroad">
                                Nguồn trường học:
                                <router-link
                                    :to="`/collaborate-school/${type}/${schoolAbroad.id}`"
                                >{{schoolAbroad.schoolName}}</router-link>
                            </label>
                            <label v-else>Nguồn trường học: {{sourceInfo}}</label>
                        </template>
                    </div>
                    <div class="col-md-12 form-group">
                        <button class="btn btn-brand" @click="isEdit = false">Sửa/Thêm</button>
                    </div>
                </div>
                <div
                    id="kt_apps_user_list_datatable"
                    class="kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--loaded"
                    v-else
                >
                    <!--begin::Portlet-->
                    <!--begin: Datatable -->
                    <b-tabs class="mt-3" :lazy="true" v-model="objData.sourceType">
                        <b-tab
                            :title="isCRM ? 'Nguồn marketing' : 'Nguồn tự nhiên'"
                            @click="changetab()"
                        >
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Hình thức tiếp cận</label>
                                    <fselect
                                        :options="listSource"
                                        v-model="objData.sourceId"
                                        label="value"
                                    ></fselect>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Chiến dịch</label>
                                    <input v-model="objData.sourceCampaign" class="form-control" />
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Nhân viên phụ trách</label>
                                    <fselect
                                        :options="listUsers"
                                        v-model="objData.sourceMembership"
                                        label="fullName"
                                    ></fselect>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Nhân viên - Cộng tác viên" @click="changetab()">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="form-group col-12" style="margin-bottom: 1rem;">
                                            <input
                                                class="form-control"
                                                placeholder="Tìm nhân viên"
                                                v-model="form.keyWord"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-6">
                                            <!-- <fselect v-model="form.companyBranchId"
                                                     placeholder="---Lọc theo chi nhánh---"
                                            :options="branchList" />-->
                                            <branch-select
                                                v-model="form.companyBranchId"
                                                v-if="isLoader"
                                                placeholder="---Lọc theo chi nhánh---"
                                            />
                                        </div>
                                        <div class="form-group col-6">
                                            <fselect
                                                v-model="form.departmentId"
                                                placeholder="---Lọc theo phòng ban---"
                                                :options="departmentList"
                                            />
                                        </div>
                                    </div>
                                    <div class="form-group ml-4">
                                        <div class="kt-checkbox-list">
                                            <div
                                                class="row"
                                                v-for="u in listAllDataUser"
                                                :key="'u_' + u.userId"
                                            >
                                                <label class="kt-checkbox">
                                                    <input
                                                        v-model="selectedUser"
                                                        type="checkbox"
                                                        :value="u.userId"
                                                        v-if="selectedUser==u.userId"
                                                    />
                                                    <input
                                                        v-model="selectedUser"
                                                        type="radio"
                                                        :value="u.userId"
                                                    />
                                                    {{ u.userName }}
                                                    <span />
                                                </label>
                                                <span
                                                    class="width-30 btn btn-sm btn-label-brand p-1 btn-label-success"
                                                    style="height:22px;line-height: 15px; margin-left:10px;"
                                                >NV</span>
                                                <div
                                                    class="row col-12 ml-3"
                                                    v-for="item in u.listCollaborator"
                                                    :key="item.id"
                                                >
                                                    <label class="kt-checkbox">
                                                        <input
                                                            v-model="selectedCollaborator"
                                                            type="checkbox"
                                                            v-if="selectedCollaborator==item.id"
                                                        />
                                                        <input
                                                            v-model="selectedCollaborator"
                                                            type="radio"
                                                            :value="item.id"
                                                            v-else
                                                        />
                                                        {{ item.fullName }}
                                                        <span />
                                                    </label>
                                                    <span
                                                        class="width-30 btn btn-sm btn-label-brand p-1 btn-label-danger"
                                                        style="height:22px;line-height: 15px; margin-left:10px;"
                                                    >CTV</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="pr-4 pl-4">
                                        <pager
                                            :total="totalUser"
                                            :page-index="form.pageIndex"
                                            @change="pageChange"
                                            :pageSize="10"
                                        />
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab
                            :title="isCRM ? 'Trường trung học phổ thông' : 'Trường học'"
                            @click="changetab()"
                        >
                            <label>{{isCRM ? 'Trường trung học phổ thông' : 'Trường học'}}</label>
                            <school
                                v-if=" type == 2"
                                v-model="objData.sourceId"
                                :value="objData.sourceId"
                                lang="vi"
                                :key="objData.sourceId"
                                :type="isCRM ? '3' : ''"
                            />
                            <fselect
                                class="form-group"
                                v-model="objData.sourceId"
                                :options="listSchoolCollaborator"
                                v-if="listSchoolCollaborator  && type == 1"
                                label="schoolName"
                            />
                        </b-tab>
                    </b-tabs>
                    <div class="row mt-2" v-if="!isCRM">
                        <div class="col-sm-12">
                            <button class="btn btn-cyan" @click="save">
                                <i class="fa fa-save" /> Lưu lại
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!--end::Portlet-->
        </div>

        <div class="kt-portlet col-md-6" v-if="!isCRM">
            <div class="kt-portlet__head pl-3">
                <div class="kt-portlet__head-label">
                    <h3 class="kt-portlet__head-title">Duyệt nguồn</h3>
                </div>
            </div>
            <div class="kt-form" style="    margin: 10px 10px 10px 10px;">
                <div
                    id="kt_apps_user_list_datatable"
                    class="kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--loaded"
                >
                    <!--begin::Portlet-->
                    <!--begin: Datatable -->
                    <div class="row form-group">
                        <div class="form-group col-lg-12">
                            <label>Trạng thái nguồn</label>
                            <div class="input-group">
                                <div class="p-0">
                                    <fselect
                                        v-if="isLoader"
                                        v-model="sourceStatus"
                                        :options="sourceConfirmStatusList"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-lg-6" v-if="confirmBy">
                            <label>Người duyệt nguồn</label>
                            <div class="input-group">
                                <input type="text" :value="confirmBy" disabled class="form-control" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div v-if="permissionConfirmSource" class="col-sm-12">
                            <button class="btn btn-cyan" type="button" @click="sourceConfirm()">
                                <i class="fa fa-check-square" />Duyệt nguồn
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!--end::Portlet-->
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    components: {},
    props: {
        sourceType: {
            type: Number,
            default: 0,
        },
        sourceId: {
            type: Number,
            default: null,
        },
        type: {
            type: Number,
            default: null,
        },
        collaboratorId: {
            type: Number,
            default: null,
        },
        sourceCampaign: {
            type: String,
            default: null,
        },
        sourceMembership: {
            type: Number,
            default: null,
        },
        isCRM: {
            type: Boolean,
            default: false,
        },
        sourceConfirmStatus: {
            type: Number,
            default: null,
        },
        sourceConfirmBy: {
            type: String,
            default: null,
        },
        permissionCode: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            CTV: null,
            sourceInfo: '',
            isEdit: true,
            objData: {
                sourceId: null,
                collaboratorId: null,
                sourceType: 0,
                memberId: this.$route.params.id,
                sourceCampaign: '',
                sourceMembership: null,
            },
            form: {
                departmentId: 0,
                companyBranchId: 0,
                keyWord: '',
                pageIndex: 1,
                pageSize: 10,
                type: this.type,
                permissionCode: '',
            },
            schoolAbroad: null,
            selectedUser: null,
            selectedCollaborator: null,
            isShowChooseUser: false,
            listCollaborator: [],
            listAllDataUser: [],
            isLoader: false,
            totalUser: 0,
            confirmBy: '',
            sourceStatus: null,
            sourceConfirmStatusList: [
                { id: 1, name: 'Chưa duyệt' },
                { id: 2, name: 'Đang xử lý' },
                { id: 3, name: 'Đã duyệt' },
                { id: 4, name: 'Từ chối' },
            ],
            permissionConfirmSource: false,
        };
    },
    watch: {
        'form.departmentId'() {
            this.form.pageIndex = 1;
            this.getListAllDataUser();
            //this.getListUserByShare(this.form);
            this.selectAll = false;
        },
        'form.companyBranchId'() {
            this.form.pageIndex = 1;
            this.getListAllDataUser();
            //this.getListUserByShare(this.form);
            this.selectAll = false;
        },
        'form.keyWord'(val) {
            this.$set(this.form, 'keyWord', val);
            this.getListAllDataUser();
            //this.getListUserByShare(this.form);
        },
        selectedUser() {
            if (this.selectedUser && this.selectedUser > 0) {
                this.selectedCollaborator = null;
                this.objData.sourceId = this.selectedUser;
                this.objData.collaboratorId = 0;
                this.getSourceInfo();
            } else this.objData.sourceId = null;
        },
        selectedCollaborator() {
            if (this.selectedCollaborator && this.selectedCollaborator > 0) {
                this.selectedUser = null;
                this.objData.sourceId = 0;
                this.objData.collaboratorId = this.selectedCollaborator;
                this.getSourceInfo();
            } else this.objData.collaboratorId = null;
        },
        listUser() {
            if (!this.sourceInfo) this.getSourceInfo();
        },
        listCollaborator() {
            if (!this.sourceInfo) this.getSourceInfo();
        },
    },
    computed: {
        ...mapGetters(['departmentList', 'branchList', 'listUsers', 'listSchoolCollaborator']),
        getListAfterLoad() {
            return this.listCollaborator;
        },
        listSource() {
            return _.filter(this.appSettings.categoryItem, ['code', 'Source']);
        },
    },
    created() {
        this.checkPermisstionConfirmSource();
        this.getListAllDataUser();
        this.getListUsers({ status: 1, isSystem: false, isExcCurrent: false });
        if (this.sourceType != null) this.objData.sourceType = this.sourceType;
        if (this.sourceId) {
            this.objData.sourceId = this.sourceId;
            this.selectedUser = this.sourceId;
        }
        if (this.collaboratorId) {
            this.objData.collaboratorId = this.collaboratorId | null;
            this.selectedCollaborator = this.collaboratorId | null;
        }
        if (this.sourceConfirmStatus) {
            this.sourceStatus = this.sourceConfirmStatus;
        }
        if (this.sourceConfirmBy) {
            this.confirmBy = this.sourceConfirmBy;
        }
        if (this.sourceCampaign) this.objData.sourceCampaign = this.sourceCampaign;
        if (this.sourceMembership) this.objData.sourceMembership = this.sourceMembership;
        this.getDepartmentList({ pageSize: 1000 });

        //this.getListUserByShare(this.form);
        this.getListCollaborator();
        this.getSchoolCollaborator();
        //this.getListSource();

        this.getSourceInfo();
    },
    methods: {
        ...mapActions([
            'getDepartmentList',
            'getListUserByShare',
            'getListUsers',
            'schoolById',
            'getSchoolCollaborator',
            // 'permissionCode',
        ]),
        getSourceInfo() {
            if (
                this.objData.sourceType == 0 &&
                this.objData.sourceId &&
                this.objData.sourceId > 0 &&
                this.appSettings.categoryItem
            ) {
                var obj = _.find(this.appSettings.categoryItem, (o) => {
                    return o.id == this.objData.sourceId && o.code == 'Source';
                });
                if (obj) this.sourceInfo = obj.value;
            }
            if (
                this.objData.sourceType == 1 &&
                this.objData.sourceId &&
                this.objData.sourceId > 0
            ) {
                var user = _.find(this.listUsers, (o) => {
                    return o.id == this.objData.sourceId;
                });
                if (user) this.sourceInfo = user.fullName;
            }
            if (
                this.objData.sourceType == 1 &&
                !this.objData.sourceId &&
                !this.objData.collaboratorId
            ) {
                this.sourceInfo = '';
            }
            if (
                this.objData.sourceType == 1 &&
                this.objData.collaboratorId &&
                this.objData.collaboratorId > 0 &&
                this.listCollaborator &&
                this.listCollaborator.length > 0
            ) {
                var collaborator = _.find(this.listCollaborator, (o) => {
                    return o.id == this.objData.collaboratorId;
                });
                this.CTV = collaborator;
                if (collaborator) {
                    var userOwned = _.find(this.listUsers, (o) => {
                        return o.id == collaborator.userOwnedId;
                    });
                    if (userOwned) {
                        this.sourceInfo = collaborator.fullName + ' - ' + userOwned.fullName;
                    } else this.sourceInfo = collaborator.fullName;
                }
            }
            if (
                this.objData.sourceType == 2 &&
                this.objData.sourceId &&
                this.objData.sourceId > 0
            ) {
                if (this.type == 2) {
                    this.schoolById(this.objData.sourceId).then((o) => {
                        this.sourceInfo = o.name;
                    });
                } else {
                    var dd = _.find(this.listSchoolCollaborator, (o) => {
                        return o.id == this.objData.sourceId;
                    });
                    console.log('dd', dd);
                    if (dd) this.schoolAbroad = dd;
                }
            }
            this.isLoader = true;
        },
        checkPermisstionConfirmSource() {
            var m = '';
            if (this.type == 1) m = 'AbroadMemberSourceConfirm';
            else m = 'LaborMemberSourceConfirm';
            let permission = _.find(this.appSettings.userPermission, (o) => {
                return o.code == m;
            });
            if (permission) return (this.permissionConfirmSource = true);
            else return (this.permissionConfirmSource = false);
        },
        sourceConfirm() {
            if (!this.sourceStatus) {
                return this.$message('Bạn vui lòng nhập chọn trạng thái nguồn!', 'error');
            }
            var m = '';
            if (this.type == 2) m = 'labormember';
            else m = 'abroadmember';
            this.$http({
                data: {
                    m: m,
                    fn: 'source-confirm',
                    id: this.$route.params.id,
                    status: this.sourceStatus,
                },
            })
                .then(() => {
                    this.$message('Cập nhật trạng thái nguồn thành công!');
                    this.confirmBy = this.currentUser.userName;
                })
                .catch(() => {});
        },

        openChooseUser() {
            this.isShowChooseUser = true;
        },

        setUserSource(val) {
            if (val) {
                this.objData.userSourceId = val.id;
                this.objData.collaboratorId = null;
                this.isShowChooseUser = false;
            }
        },
        setCollaboratorId(val) {
            if (val) {
                this.objData.userSourceId = null;
                this.objData.collaboratorId = val;
                this.isShowChooseUser = false;
            }
        },
        pageChange(pageNum) {
            this.$set(this.form, 'pageIndex', pageNum);
            this.getListAllDataUser();
            //this.getListUserByShare(this.form);
        },

        save() {
            if (this.objData.sourceId == null && this.objData.collaboratorId == null) {
                return this.$message('Bạn vui lòng chọn nguồn!', 'error');
            }
            if (this.objData.sourceType == 0) {
                this.objData.collaboratorId = null;
            } else if (this.objData.sourceType == 1) {
                this.objData.sourceCampaign = '';
                this.objData.sourceMembership = null;
            } else if (this.objData.sourceType == 2) {
                this.objData.sourceCampaign = '';
                (this.objData.sourceMembership = null), (this.objData.collaboratorId = null);
            }

            var m = '';
            if (this.type == 2) m = 'labormember';
            else m = 'abroadmember';
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: m,
                    fn: 'save-source',
                    ...this.objData,
                },
            })
                .then((res) => {
                    loading.hide();
                    if (res.success == true) {
                        this.isEdit = true;
                        this.$message('Lưu thành công!');
                        this.getSourceInfo();
                    } else if (res.success == false) {
                        this.$message('Chưa lưu được');
                    }
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        getListCollaborator() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'collaborator',
                    fn: 'list-for-labor-member-edit',
                    userOwnedId: 0,
                    pageSize: 10000,
                    type: this.type,
                },
            })
                .then((response) => {
                    loading.hide();
                    this.listCollaborator = response.data;
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        getListAllDataUser() {
            this.$http({
                data: {
                    m: 'collaborator',
                    fn: 'list-collarator-user',
                    ...this.form,
                    permissionCode: this.permissionCode,
                },
            })
                .then((response) => {
                    this.listAllDataUser = response.data;
                    this.totalUser = response.totalRow;
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
        getListCollaborator_User() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'collaborator',
                    fn: 'list-collarator-user',
                    pageSize: 10000,
                    ...this.form,
                    permissionCode: this.permissionCode,
                },
            })
                .then((response) => {
                    loading.hide();
                    this.listCollaborator_User = response.data;
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        getListSource() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'category',
                    fn: 'list-item',
                    catId: 34,
                },
            })
                .then((response) => {
                    loading.hide();
                    this.listSource = response.data;
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        getListCollaboratorByUserId(userId) {
            return _.filter(this.getListAfterLoad, ['userOwnedId', userId]);
        },
        changetab() {
            this.objData.sourceId = null;
        },
    },
};
</script>
<style scoped>
#view-only-form .process-form-display-wrapper > div {
    pointer-events: none;
}

.kt-wizard-v2 .kt-wizard-v2__aside {
    padding: 1rem 2rem 1rem 1rem;
}

.kt-wizard-v2 .kt-wizard-v2__aside {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 200px;
    flex: 0 0 200px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 200px;
}

.kt-wizard-v2
    .kt-wizard-v2__aside
    .kt-wizard-v2__nav
    .kt-wizard-v2__nav-items
    .kt-wizard-v2__nav-item
    .kt-wizard-v2__nav-body
    .kt-wizard-v2__nav-icon {
    font-size: 2rem;
}

.kt-wizard-v2
    .kt-wizard-v2__aside
    .kt-wizard-v2__nav
    .kt-wizard-v2__nav-items
    .kt-wizard-v2__nav-item
    .kt-wizard-v2__nav-body
    .kt-wizard-v2__nav-label
    .kt-wizard-v2__nav-label-title {
    font-size: 1rem;
}

.process-form-display-wrapper {
    border: solid 1px #ddd;
    padding: 10px;
    overflow: auto;
    margin: 10px;
}
</style>
<style>
#form-template-process-wrapper .nav-pills,
#form-template-process-wrapper .nav-tabs {
    margin: 0;
}

#form-template-process-wrapper .card-header {
    padding-bottom: 0;
}
</style>