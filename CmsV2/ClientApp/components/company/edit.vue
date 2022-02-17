<template>
    <modal
        id="modal-dashbroad"
        :title="id > 0 ? 'Cập nhật doanh nghiệp' : 'Thêm doanh nghiệp'"
        :width="1200"
        @close="closePopup()"
    >
        <div slot="body">
            <div class="mt-element-step" v-if="!id">
                <div class="row step-line">
                    <div class="col-md-4 mt-step-col first done" :class="step >= 1 ? 'done' : ''">
                        <div class="mt-step-number bg-white">1</div>
                        <div class="mt-step-title uppercase font-grey-cascade"></div>
                        <div class="mt-step-content font-grey-cascade">Thông tin</div>
                    </div>
                    <div class="col-md-4 mt-step-col" :class="step >= 2 ? 'done' : ''">
                        <div class="mt-step-number bg-white">2</div>
                        <div class="mt-step-title uppercase font-grey-cascade"></div>
                        <div class="mt-step-content font-grey-cascade">Chi nhánh, phòng ban</div>
                    </div>
                    <div class="col-md-4 mt-step-col last" :class="step >= 3 ? 'done' : ''">
                        <div class="mt-step-number bg-white">3</div>
                        <div class="mt-step-title uppercase font-grey-cascade"></div>
                        <div class="mt-step-content font-grey-cascade">Quyền và thông tin mặc định</div>
                    </div>
                </div>
            </div>
            <div class="row" v-if="step == 1">
                <div class="col-sm-7">
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="form-group">
                                <label>Tên doanh nghiệp</label>
                                <input
                                    v-model="form.name"
                                    type="text"
                                    placeholder="Nhập tên doanh nghiệp"
                                    class="form-control"
                                />
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Code</label>
                                <input
                                    v-model="form.code"
                                    type="text"
                                    placeholder="1,2,3,.."
                                    class="form-control"
                                />
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Domain</label>
                                <input
                                    v-model="form.domain"
                                    class="form-control"
                                    placeholder="Domain.."
                                />
                            </div>
                        </div>
                        <div class="col-sm-12" v-if="!id">
                            <div class="form-group">
                                <label>Tài khoản khởi tạo</label>
                                <input
                                    v-model="form.userName"
                                    class="form-control"
                                    placeholder="Tên đăng nhập.."
                                />
                            </div>
                        </div>
                        <!-- <div class="col-sm-6">
                            <div class="form-group">
                                <label>Loại hệ thống</label>
                                <select v-model="form.typeId" class="form-control">
                                    <option :value="0">Tất cả</option>
                                    <option :value="1">Du học</option>
                                    <option :value="2">Xuất khẩu lao động</option>
                                 
                                </select>
                            </div>
                        </div> -->
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Trạng thái</label>
                                <select v-model="form.status" class="form-control">
                                    <option :value="1">Đang sử dụng</option>
                                    <option :value="0">Ngừng sử dụng</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-5">
                    <div class="form-group">
                        <label class="col-12 text-center">Logo</label>
                        <div class="text-center">
                            <photo :src="form.logo" :width="150" style="max-width:150px" />
                            <br />
                            <button
                                type="button"
                                class="btn btn-success waves-effect waves-light mt-1"
                                @click="changePhoto('logo')"
                            >Chọn ảnh</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" v-if="step == 2">
                <div class="col-xl-6 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Chi nhánh</h3>
                            </div>
                            <div class="kt-portlet__head-toolbar">
                                <button
                                    class="btn btn-primary"
                                    @click="$refs.branch.openPopup()"
                                >Thêm mới</button>
                            </div>
                        </div>
                        <div>
                            <branch :isShowInModal="true" ref="branch" :companyId="form.id" />
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Phòng ban</h3>
                            </div>
                            <div class="kt-portlet__head-toolbar">
                                <button
                                    class="btn btn-primary"
                                    @click="$refs.department.openPopup()"
                                >Thêm mới</button>
                            </div>
                        </div>
                        <div>
                            <department
                                :isShowInModal="true"
                                ref="department"
                                :companyId="form.id"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" v-if="step == 3">
                <div class="col-6 form-group">
                    <label>Chọn công ty để sao chép</label>
                    <fselect :options="lstCompany" v-model="step3Data.company"></fselect>
                </div>
                <div class="col-6 form-group">
                    <fieldset class="p-2">
                        <legend class="font-weight-bold">Chọn chức năng muốn sao chép</legend>
                        <label v-for="item in lstFunction" :key="item.id" class="kt-checkbox mr-2">
                            <input
                                v-model="step3Data.lstFunctionSelect"
                                :value="item.id"
                                type="checkbox"
                            />
                            {{ item.name }}
                            <span />
                        </label>
                    </fieldset>
                </div>
                <span class="text-danger">(*) Chọn công ty và chức năng để cập nhật</span>
            </div>
        </div>
        <div slot="footer">
            <div class="row">
                <div class="col-sm-12">
                    <button class="btn btn-cyan" @click="save()">
                        <span>{{step >= 3 ? 'Lưu lại' : 'Tiếp theo'}}</span>
                    </button>
                    <button class="btn btn-danger" @click="closePopup">
                        <span>Đóng</span>
                    </button>
                </div>
            </div>
        </div>
        <div slot="outside">
            <!-- :exts="'" -->
            <file-manager
                v-if="showFileManager"
                @close="showFileManager = false"
                @insert="selectFile"
            />
        </div>
    </modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import branch from '../companybranch/index';
import department from '../companydepartment/index';
export default {
    name: 'CompanyEdit',
    components: { branch, department },
    props: ['id', 'lstCompany'],
    data() {
        return {
            form: {
                name: '',
                logo: '',
                description: '',
                typeId: 0,
                code: '',
                id: 0,
                domain: '',
                permissions: '',
                userName: '',
                status: 1,
            },
            selectedFile: null,
            showFileManager: false,
            isLoader: false,
            photoField: 'logo',
            permissionList: null,
            selectAll: false,
            permissionSelected: [],
            callTypeCount: 0,
            step: 1,
            step3Data: {
                company: 0,
                lstFunctionSelect: [],
            },
            lstFunction: [
                { id: 'Permission', name: 'Quyền' },
                { id: 'PermissionGroup', name: 'Nhóm quyền' },
                { id: 'Config', name: 'Cấu hình' },
                // { id: 'ForeignFormTemplate', name: 'Mẫu form ngoại du học' },
                // { id: 'FormHardTemplate', name: 'Mẫu form cứng' },
            ],
        };
    },
    watch: {
        selectAll(val) {
            this.permissionSelected = [];
            if (val) {
                for (var group of this.permissionList) {
                    for (var per of group.permission) {
                        this.permissionSelected.push(per.code);
                    }
                }
            }
        },
        'form.typeId'() {
            if (this.callTypeCount > 0 && this.form.typeId > 0) this.getSystemType();
            this.callTypeCount = 1;
        },
    },
    computed: {
        ...mapGetters(['systemTypeList']),
    },
    methods: {
        ...mapActions(['getSystemTypeList']),
        changeGroup(id, checked) {
            var per = _.find(this.permissionList, ['id', id]).permission;
            if (checked) {
                for (let p of per) {
                    if (this.permissionSelected.indexOf(p.code) == -1)
                        this.permissionSelected.push(p.code);
                }
            } else {
                for (let p of per) {
                    if (this.permissionSelected.indexOf(p.code) !== -1)
                        this.permissionSelected.splice(this.permissionSelected.indexOf(p.code), 1);
                }
            }
        },
        closePopup() {
            this.$emit('closePopup');
        },
        selectFile(val) {
            // this.form[this.photoField] = val[0].logo;
            this.form.logo = val[0].url;
        },
        getDetail() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'company',
                    fn: 'get-by-id',
                    id: this.id,
                },
            })
                .then((response) => {
                    loading.hide();
                    if (response.success) {
                        this.form = Object.assign(this.form, response.data);
                        this.isLoader = true;
                        if (!this.form.permissions) this.permissionSelected = [];
                        else this.permissionSelected = JSON.parse(this.form.permissions);
                    }
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        save() {
            var isNewCompany = this.form.id > 0 ? false : true;
            if (this.step == 1) {
                if (this.form.name == '') {
                    return this.$message('Bạn vui lòng nhập tên doanh nghiệp!', 'error');
                }

                this.form.permissions = JSON.stringify(this.permissionSelected);
                this.$http({
                    data: {
                        m: 'company',
                        fn: 'save-company',
                        ...this.form,
                    },
                })
                    .then((response) => {
                        //this.$message('Lưu thành công!');
                        //this.$emit('closePopup');
                        this.form.id = response.data.id;
                        if (isNewCompany) this.step++;
                        else this.step = 3;
                    })
                    .catch((err) => {
                        return this.$message(err.message, 'error');
                    });
            } else if (this.step == 2) this.step++;
            else if (this.step == 3) {
                if (
                    !isNewCompany &&
                    (!this.step3Data.company || this.step3Data.lstFunctionSelect.length == 0)
                ) {
                    this.$message('Lưu thành công!');
                    return;
                }
                if (!this.step3Data.company) {
                    return this.$message('Vui lòng chọn công ty để sao chép!', 'error');
                }
                if (!this.step3Data.lstFunctionSelect) {
                    return this.$message('Vui lòng chọn chức năng để sao chép!', 'error');
                }
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'company',
                        fn: 'copy-functions',
                        company: this.step3Data.company,
                        newCompany: this.form.id,
                        functions: JSON.stringify(this.step3Data.lstFunctionSelect),
                    },
                })
                    .then(() => {
                        loading.hide();
                        this.$message('Lưu thành công!');
                        //this.$emit('closePopup');
                    })
                    .catch((err) => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            }
        },
        changePhoto(field) {
            this.photoField = field;
            this.showFileManager = true;
        },
        getSystemType() {
            this.$http({
                data: {
                    m: 'system',
                    fn: 'system-type-by-id',
                    id: this.form.typeId,
                },
            })
                .then((response) => {
                    if (response.success) {
                        if (!response.data.permissions) this.permissionSelected = [];
                        else this.permissionSelected = JSON.parse(response.data.permissions);
                    }
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
        getPermission() {
            this.$http({
                data: {
                    m: 'security',
                    fn: 'permission-list',
                },
            })
                .then((response) => {
                    this.permissionList = response.data;
                    this.permissionList = _.map(this.permissionList, (o) => {
                        o.isChecked = false;
                        return o;
                    });
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
    },
    created() {
        this.getPermission();
        this.getSystemTypeList();
        this.form.id = this.id;
        if (this.form.id > 0) this.getDetail();
        else {
            _.forEach(this.lstFunction, (o) => {
                this.step3Data.lstFunctionSelect.push(o.id);
            });
        }
    },
};
</script>
<style>
.deadlineClass {
    color: #ff0000;
}

#editor .ql-tooltip[data-mode='video'] {
    left: 25% !important;
    top: 35% !important;
}

#editor .ql-tooltip[data-mode='video'] input {
    height: 80px !important;
    width: 400px !important;
}

#editor {
    height: 600px;
}

#news-avatar {
    width: 100px;
    height: 100px;
}

#news-wrapper .mu-text-field-label,
#news-wrapper .common-label {
    font-weight: bold;
    color: #000;
}

#related-course ul {
    margin: 10px 0;
}

#related-course {
    margin: 20px 0;
}

#related-course > button {
    height: 25px !important;
}

#related-course li button {
    height: 18px !important;
    width: 20px !important;
    position: absolute;
    top: 8px;
    left: 8px;
}

#related-course li button > div {
    padding: 0px !important;
}

#related-course li {
    position: relative;
    padding-left: 40px;
    padding: 8px 0 8px 50px;
    background: #f1f1f1;
    margin-bottom: 2px;
}

.mt-element-step .step-line .mt-step-number {
    font-size: 26px;
    border-radius: 50% !important;
    display: inline-block;
    margin: auto auto 5px;
    padding: 9px;
    border: 3px solid #e5e5e5;
    position: relative;
    z-index: 5;
    height: 60px;
    width: 60px;
    text-align: center;
}

.mt-element-step .step-line .done .mt-step-number {
    color: #26c281 !important;
    border-color: #26c281 !important;
}

.mt-element-step .step-line .error .mt-step-number {
    color: #e7505a !important;
    border-color: #e7505a !important;
}

.mt-element-step .step-line .error .mt-step-content,
.mt-element-step .step-line .error .mt-step-title {
    color: #e7505a !important;
}

.mt-element-step .step-line .mt-step-title {
    font-size: 20px;
    font-weight: 400;
    position: relative;
}

.mt-element-step .step-line .mt-step-col {
    padding: 20px 0;
    text-align: center;
}

.mt-element-step .step-line .done .mt-step-title:after,
.mt-element-step .step-line .done .mt-step-title:before {
    background-color: #26c281;
}

.mt-element-step .step-line .mt-step-title:after {
    left: 50%;
}

.mt-element-step .step-line .mt-step-title:after,
.mt-element-step .step-line .mt-step-title:before {
    content: '';
    height: 3px;
    width: 50%;
    position: absolute;
    background-color: #e5e5e5;
    top: -32px;
    z-index: 4;
    transform: translateY(-100%);
}

/* .mt-step-col.first .mt-step-title::before {
    display: none;
}

.mt-step-col.last .mt-step-title::after {
    display: none;
} */

.mt-element-step .step-line .error .mt-step-title:after,
.mt-element-step .step-line .error .mt-step-title:before {
    background-color: #e7505a;
}

.mt-element-step .step-line .mt-step-title:before {
    right: 50%;
}

.mt-element-step {
    border-bottom: 1px solid #ccc;
    margin-bottom: 30px;
    margin-left: -9px;
    margin-right: -9px;
}
</style>
