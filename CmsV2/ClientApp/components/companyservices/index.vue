<template>
    <wrapper>
        <template slot="header">
            <div class="kt-subheader__main">
                <h3 class="kt-subheader__title">
                    Quản lý dịch vụ
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
            <div class="kt-portlet p-3">
                <div v-if="listData" class="kt-widget4">
                    <div v-for="(item, i) in listData" :key="item.id" class="kt-widget4__item">
                        <div class="kt-widget4__pic kt-widget4__pic--pic pr-0">
                            <stt :val="i + 1" />
                        </div>
                        <div class="kt-widget4__info">
                            <a class="kt-widget4__username">
                                {{ item.name }}
                            </a>
                            <p class="kt-widget4__text">
                                <span>
                                    Trạng Thái: <b v-if="item.status == 1">Đang sử dụng</b><b v-else>Ngừng sử dụng</b>
                                </span>
                            </p>
                        </div>
                        <span class="btn-action">
                            <button class="btn btn-primary" @click="openPopup(item.id)">
                                <i class="fa fa-edit" />
                            </button>
                            <button class="btn btn-danger" @click="remove(item.id)">
                                <i class="fa fa-trash-alt" />
                            </button>
                        </span>
                    </div>
                </div>
                <pager :total="totalRow" :page-index="objData.pageIndex" @change="pageChange" />
            </div>
        </div>

        <edit v-if="popupAdd" :id="id" @closePopup="closePopup" />
    </wrapper>
</template>
<script>
    import edit from './edit';
    export default {
        name: 'CompanyBranch',
        components: { edit },
        data() {
            return {
                objData: {
                    keyword: '',
                    status: 0,
                    pageIndex: 1,
                    pageSize: 20
                },
                id: 0,
                listData: [],
                totalRow: 0,
                popupAdd: false,

                stt: 1
            };
        },
        computed: {
            rowNum() {
                return (this.objData.pageIndex - 1) * this.objData.pageSize;
            }
        },
        watch: {
            'objData.keyword'(val) {
                clearTimeout(this.timeDelay);
                this.timeDelay = setTimeout(() => {
                    this.$set(this.objData, 'keyword', val);
                    this.getListData();
                }, 500);
            },
            'objData.status'(val) {
                this.$set(this.objData, 'status', val);
                this.getListData();
            },
            'objData.typeName'() {
                this.getListData();
            }
        },
        created() {
            this.getListData();
        },
        methods: {
            getListData() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'company',
                        fn: 'service-list',
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
            getDetail() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'company',
                        fn: 'service-by-id',
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
            pageChange(pageNum) {
                this.$set(this.objData, 'pageIndex', pageNum);
                this.getListData();
            },
            openPopup(item) {
                this.popupAdd = true;
                this.id = item || 0;
            },
            closePopup() {
                this.popupAdd = false;
                this.getListData();
            },
            remove(id) {
                this.$confirm(this.$t('Label.AreYouSure')).then(() => {
                    let loading = this.$loading.show();
                    this.$http({
                        data: {
                            m: 'company',
                            fn: 'remove-company-service',
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
</style>
