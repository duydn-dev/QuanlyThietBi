<template>
    <wrapper>
        <template slot="header">
            <template v-if="!isShowInModal">
                <div class="kt-subheader__main">
                    <h3 class="kt-subheader__title">Quản lý chi nhánh</h3>

                    <span class="kt-subheader__separator kt-subheader__separator--v" />

                    <div id="kt_subheader_search" class="kt-subheader__group">
                        <div id="kt_subheader_search_form" class="kt-margin-l-20">
                            <div class="kt-input-icon kt-input-icon--right kt-subheader__search">
                                <input id="generalSearch"
                                       type="text"
                                       class="form-control"
                                       placeholder="Search..."
                                       v-model="objData.keyword" />
                                <span class="kt-input-icon__icon kt-input-icon__icon--right">
                                    <span>
                                        <i class="fa fa-search" />
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="kt-subheader__toolbar">
                    <button @click="openPopup()" class="btn btn-brand">
                        <i class="fa fa-plus-square"></i> Tạo mới
                    </button>
                </div>
            </template>
        </template>
        <div id="kt_content"
             class="kt-grid__item kt-grid__item--fluid"
             :class="!isShowInModal ?  'kt-content' : ''">
            <div class="kt-portlet p-4">
                <alert v-if="totalRow == 0" />
                <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                    <thead class="kt-datatable__head">
                        <tr>
                            <th class="width-50 text-center">STT</th>
                            <th>Tên chi nhánh</th>
                            <th>GĐ đại diện</th>
                            <th>Mục tiêu KD</th>
                            <th>Tổng nhân viên</th>
                            <th>Đang làm việc</th>
                            <th>Đã nghỉ</th>
                            <th>Trạng thái</th>
                            <th class="text-center" width="15%">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody class="kt-datatable__body">
                        <tr v-for="(item, i) in listData" :key="item.id">
                            <th class="text-center" scope="row">
                                <div class="kt-widget4__pic kt-widget4__pic--pic">
                                    <stt :val="i + 1" />
                                </div>
                            </th>
                            <td class="pt-3 pb-3">
                                <a href="javascript:;" @click="openPopup(item.id)">{{ item.name }}</a>
                            </td>
                            <td class="pt-3 pb-3">
                                {{item.representativeDirector}}
                            </td>
                            <td class="pt-3 pb-3">{{`${item.kpi} %`}}</td>
                            <td class="pt-3 pb-3">
                                {{item.totalUser}}
                            </td>
                            <td class="pt-3 pb-3">
                                {{item.totalUserIsActive}}
                            </td>
                            <td class="pt-3 pb-3">
                                {{item.totalUserUnActive}}
                            </td>
                            <td class="pt-3 pb-3">
                                <span v-if="item.status==1"
                                      class="btn btn-sm btn-label-brand btn-bold kt-width">Đang hoạt động</span>
                                <span v-if="item.status==2"
                                      class="btn btn-sm btn-label-danger btn-bold kt-width">Ngừng hoạt động</span>
                            </td>
                            <td class="btn-action width-160 text-center">
                                <span title="Thêm mục tiêu"
                                      class="btn btn-success"
                                      @click="openPopupKPI(item.id,item.name)">
                                    <i class="fa fa-plus" /> Thêm mục tiêu
                                </span>
                                <span title="Sửa"
                                      class="btn btn-primary"
                                      @click="openPopup(item.id)">
                                    <i class="fa fa-edit" />
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!--<div v-if="listData" class="kt-widget4">
                    <div v-for="(item, i) in listData" :key="item.id" class="kt-widget4__item">
                        <div class="kt-widget4__pic kt-widget4__pic--pic">
                            <stt :val="i + 1" />
                        </div>
                        <div class="kt-widget4__info">
                            <a class="kt-widget4__username">{{ item.name }}</a>
                            <p class="kt-widget4__text">{{ item.name }}</p>
                        </div>
                        <span class="btn-action">
                            <span class="btn btn-sm btn-label-brand btn-bold"
                                  @click="openPopup(item.id)">
                                <i class="fa fa-edit" />
                            </span>
                        </span>
                    </div>
                </div>-->
                <pager :total="totalRow" :page-index="objData.pageIndex" @change="pageChange" />
            </div>
        </div>
        <edit v-if="popupAdd" :id="id" @closePopup="closePopup()" :companyId="companyId" />
        <kpi v-if="popupKPI" :branchName="branchName" @closePopup="closePopupKPI()" :companyBranchId="companyBranchId" />
    </wrapper>
</template>
<script>
    import edit from './edit';
    import kpi from './component/kpi-modal';
    import { mapActions } from 'vuex';
    export default {
        props: ['isShowInModal', 'companyId'],
        name: 'CompanyBranch',
        components: { edit, kpi },
        data() {
            return {
                objData: {
                    keyword: '',
                    //languageCode: 'vi-VN',
                    //typeName: '',
                    //status: 1,
                    pageIndex: 1,
                    pageSize: 20,
                    company: this.companyId
                    //zoneId: 0
                },
                id: 0,
                branchName: '',
                companyBranchId: 0,
                listData: [],
                totalRow: 0,
                popupAdd: false,
                popupKPI: false,
            };
        },
        computed: {
            rowNum() {
                return (this.objData.pageIndex - 1) * this.objData.pageSize;
            }
        },
        watch: {
            //Search theo keyword
            'objData.keyword'(val) {
                clearTimeout(this.timeDelay);
                this.timeDelay = setTimeout(() => {
                    this.$set(this.objData, 'keyword', val);
                    this.getListData();
                }, 500);
            },
            companyId() {
                this.objData.companyId = this.companyId;
            }
        },
        methods: {
            ...mapActions(['getBranchList']),
            getListData() {
                let loading = this.$loading.show();
                this.getBranchList(this.objData)
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
            pageChange(pageNum) {
                this.$set(this.objData, 'pageIndex', pageNum);
                this.getListData();
            },
            openPopup(id) {
                this.id = id || 0;
                this.popupAdd = true;
            },
            openPopupKPI(id, name) {
                this.companyBranchId = id || 0;
                this.branchName = name;
                this.popupKPI = true;
            },
            closePopup() {
                this.popupAdd = false;
                this.getListData();
            },
            closePopupKPI() {
                this.popupKPI = false;
                this.getListData();
            },
            getDetail() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'company',
                        fn: 'branch-detail',
                        id: this.form.id
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
            remove(id) {
                this.$confirm(this.$t('Label.AreYouSure')).then(() => {
                    let loading = this.$loading.show();
                    this.$http({
                        data: {
                            m: 'company',
                            fn: 'branch-delete',
                            id: id
                        }
                    })
                        .then(() => {
                            this.getListData();
                            loading.hide();
                        })
                        .catch(err => {
                            loading.hide();
                            return this.$message(err.message, 'error');
                        });
                });
            }
        },
        created() {
            this.getListData();
        }
    };
</script>
<style scoped>
    .stt {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        text-align: center;
        vertical-align: middle;
        background-color: rgb(255, 64, 129);
        font: 13px/42px Helvetica, Arial, sans-serif;
        color: rgb(255, 154, 219);
        float: left;
        margin-right: 10px;
        margin-top: 5px;
    }

    .NewsItemTitle1 {
        clear: right;
        color: #444;
        cursor: pointer;
        display: inline-block;
        font-size: 16px;
        line-height: 51px; /*//25*/
        padding-right: 20px;
        font-weight: bold;
        margin: 0;
        padding-bottom: 5px;
    }

    .action-btnn {
        width: 55px;
        position: absolute;
        right: 0;
        top: 25px;
        display: none;
        background: #f1f1f1;
    }
</style>
