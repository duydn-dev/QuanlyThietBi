<template>
    <modal :title="mode=='list'?`Quản lý mục tiêu doanh thu: Chi nhánh ${branchName}`:`Mục tiêu kinh doanh tháng ${month}`"
           @close="closePopup()" widths="50%">
        <div slot="body">
            <div class="row" v-if="mode=='list'">
                <div class="form-group col-sm-6">
                    <label>Năm</label>
                    <datetimepicker v-model="year"
                                    type="year"
                                    placeholder="Chọn năm" />
                </div>
                <div class="col-sm-12" v-if="data.length==0">
                    <button title="Thêm mới mục tiêu"
                            class="btn btn-success"
                            @click="addNewKPI()">
                        <i class="fa fa-plus" /> Thêm mới
                    </button>
                </div>
                <div class="col-sm-12" v-else>
                    <table class="table">
                        <thead>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in data" :key="index">
                                <td>{{`Tháng ${item.month}`}}</td>
                                <td class="kt-align-right kt-font-bold">
                                    <span v-if="item.money"><number-display :value="item.money"></number-display> VNĐ</span>
                                    <span v-else> <button class="btn btn-success" @click="editKPIByMonth(item.month,item.year)">Thêm</button></span>
                                    &nbsp;
                                    <button title="Sửa"
                                            class="btn btn-primary"
                                            @click="editKPIByMonth(item.month,item.year)">
                                        <i class="fa fa-edit" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-if="mode=='edit'">
                <fieldset class="form-group border p-2">
                    <legend class="w-auto kt-badge kt-badge--inline kt-badge--brand">Tổng</legend>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Mục tiêu</label>
                                <div class="input-group mb-3">
                                    <numberic v-model="kpi.money"></numberic>
                                    <div class="input-group-append">
                                        <span class="input-group-text">VNĐ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Ghi chú</label>
                                <textarea v-model="kpi.description"
                                          class="form-control"
                                          placeholder="Nhập giới thiệu.." />
                            </div>
                        </div>
                    </div>
                </fieldset>
                <!--<fieldset class="form-group border p-2">
                    <legend class="w-auto kt-badge kt-badge--inline kt-badge--brand">2. Doanh thu thị trường Đài Loan</legend>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Mục tiêu</label>
                                <div class="input-group mb-3">
                                    <numberic v-model="kpi2.money"></numberic>
                                    <div class="input-group-append">
                                        <span class="input-group-text">VNĐ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Ghi chú</label>
                                <textarea v-model="kpi2.description"
                                          class="form-control"
                                          placeholder="Nhập giới thiệu.." />
                            </div>
                        </div>
                    </div>
                </fieldset>-->
            </div>
        </div>
        <div slot="footer">
            <div class="row" v-if="mode=='list'">
                <div class="col-sm-12">
                    <button class="btn btn-danger" @click="closePopup">
                        <span>Đóng</span>
                    </button>
                </div>
            </div>
            <div class="row" v-else>
                <div class="col-sm-12">
                    <button class="btn btn-cyan" @click="save()">
                        <span>Lưu lại</span>
                    </button>
                    <button class="btn btn-danger" @click="mode='list'">
                        <span>Quay lại</span>
                    </button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
    export default {
        name: 'CompanyEdit',
        props: ['id', 'companyBranchId', 'branchName'],
        data() {
            return {
                form: {
                },
                data: [],
                popupAdd: false,
                isLoader: false,
                mode: 'list',
                month: 1,
                year: new Date(),
                kpi: {
                    month: null,
                    money: 0,
                    description: '',
                    companyBranchId: this.companyBranchId
                },
            };
        },
        created() {
            this.getData();
        },
        watch: {
            'year'() {
                this.getData();
            }
        },
        methods: {
            getData() {
                let year = new Date(this.year);
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'company',
                        fn: 'get-list-kpi',
                        year: year == "Invalid Date" ? this.year : year.getFullYear(),
                        companyBranchId: this.companyBranchId
                    }
                })
                    .then(response => {
                        loading.hide();
                        if (response.success) {
                            this.data = response.data;
                            this.isLoader = true;
                        }
                    })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            },
            save() {
                let list = [this.kpi];
                this.$http({
                    data: {
                        m: 'company',
                        fn: 'kpi-save',
                        data: JSON.stringify(list)
                    }
                })
                    .then(res => {
                        if (res.success) {
                            this.$message('Lưu thành công!');
                            this.getData();
                            this.mode = 'list';
                        }
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });
            },
            closePopup() {
                this.$emit('closePopup');
            },
            changePhoto(field) {
                this.photoField = field;
                this.showFileManager = true;
            },
            editKPIByMonth(month, year) {
                this.month = month;
                this.$http({
                    data: {
                        m: 'company',
                        fn: 'get-kpi-by-month',
                        year: year,
                        month: month,
                        companyBranchId: this.companyBranchId
                    }
                })
                    .then(res => {
                        if (res.success) {
                            this.kpi = res.data;
                            this.mode = 'edit';
                        }
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });

            },
            addNewKPI() {
                let year = new Date(this.year);
                this.$http({
                    data: {
                        m: 'company',
                        fn: 'add-new-kpi',
                        year: year == "Invalid Date" ? this.year : this.year.getFullYear(),
                        companyBranchId: this.companyBranchId
                    }
                })
                    .then(res => {
                        if (res.success) {
                            this.$message('Lưu thành công!');
                            this.getData();
                        }
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });
            }
        }
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
</style>
<style scoped>
    .input-group-append{
        height: 34px !important;
    }
</style>
