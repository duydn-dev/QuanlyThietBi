<template>
    <wrapper>
        <template slot="header">
            <div class="kt-subheader__main">
                <h3 class="kt-subheader__title">Quản lý hệ thống</h3>

                <span class="kt-subheader__separator kt-subheader__separator--v" />

                <div id="kt_subheader_search" class="kt-subheader__group">
                    <div id="kt_subheader_search_form" class="kt-margin-l-20">
                        <div class="kt-input-icon kt-input-icon--right kt-subheader__search">
                            <input id="generalSearch"
                                   type="text"
                                   class="form-control"
                                   placeholder="Search..."
                                   v-model="objData.keyword"
                                   @keyup.13="getListData()" />
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
        <div id="kt_content" class="kt-content kt-grid__item kt-grid__item--fluid">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__body kt-portlet__body--fit mt-3 mb-3">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="container-fluid">
                                <b-tabs content-class="mt-3">
                                    <b-tab title="Quản lý công ty/ tổ chức" active>
                                        <div class="container-fluid">
                                            <div v-if="listData" class="row">
                                                <div class="col-12">
                                                    <table class="kt-datatable__table table-striped table-hover table-bordered"
                                                           width="100%">
                                                        <thead class="kt-datatable__head">
                                                            <tr>
                                                                <th>Id</th>
                                                                <th>Logo</th>
                                                                <th>Tên công ty</th>
                                                                <th>Domain</th>
                                                                <th>Is System</th>
                                                                <th>Trạng thái</th>
                                                                <th>Tác vụ</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="kt-datatable__body">
                                                            <tr v-for="(item, index) in listData"
                                                                :key="index">
                                                                <td class="pt-3 pb-3">{{item.id}}</td>
                                                                <td class="pt-3 pb-3">
                                                                    <avatar :src="item.logo"
                                                                            :username="item.name"
                                                                            css-class="kt-widget__img"
                                                                            :size="50" />
                                                                </td>
                                                                <td class="pt-3 pb-3">
                                                                    {{ item.name }}
                                                                </td>
                                                                <td class="pt-3 pb-3">
                                                                    <a :href="'http://'+item.domain"
                                                                       target="_blank">{{ item.domain }}</a>
                                                                </td>
                                                                <td>
                                                                    <i class="fa fa-check"
                                                                       v-if="item.isSystem"></i>
                                                                </td>
                                                                <td>
                                                                    <status-label :status="item.status" />
                                                                </td>
                                                                <td>
                                                                    <button type="button"
                                                                            class="btn btn-primary"
                                                                            @click="openPopup(item.id)">
                                                                        <i class="fa fa-edit"></i>Sửa
                                                                    </button>
                                                                    <button type="button"
                                                                            class="btn btn-success"
                                                                            @click="openPopupPermission(item.id)">
                                                                        <i class="fa fa-cog"></i>Phân quyền
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </b-tab>
                                    <b-tab title="Quản lý quyền">
                                        <commonPermission />
                                    </b-tab>
                                    <b-tab title="Họp trực tuyến">
                                        <meetSetting />
                                    </b-tab>
                                </b-tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <edit v-if="popupAdd" :id="id" @closePopup="closePopup()" :lstCompany="listData" />
        <permission v-if="popupPermission" :id="id" @closePopup="popupPermission = false" />
    </wrapper>
</template>
<script>
    import edit from './edit';
    import commonPermission from './common-permission';
    import permission from './permission';
    import meetSetting from './meet-setting';
    export default {
        name: 'CompanyManager',
        components: {
            edit,
            commonPermission,
            permission,
            meetSetting
        },
        data() {
            return {
                objData: {
                    keyword: '',
                    //languageCode: 'vi-VN',
                    //typeName: '',
                    //status: 1,
                    pageIndex: 1,
                    pageSize: 20
                    //zoneId: 0
                },
                listData: [],
                totalRow: 0,
                popupAdd: false,
                popupPermission: false,
                id: 0
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
            //Search theo status
            //'objData.languageCode'(val) {
            //    this.$set(this.objData, 'languageCode', val);
            //    this.getListData();
            //},
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
                        fn: 'list',
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
            pageChange(pageNum) {
                this.$set(this.objData, 'pageIndex', pageNum);
                this.getListData();
            },
            remove(id) {
                this.$confirm(this.$t('Label.AreYouSure')).then(() => {
                    let loading = this.$loading.show();
                    this.$http({
                        data: {
                            m: 'company',
                            fn: 'remove-company',
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
            },
            saveMove() {
                this.$http({
                    data: {
                        m: 'company',
                        fn: 'save-priority',
                        listData: JSON.stringify(this.listData)
                    }
                })
                    .then(response => {
                        this.listData = response.data;
                        this.totalRows = response.totalRows;
                        this.$notify({
                            group: 'foo',
                            duration: 1000,
                            title: this.$t('Label.Successful')
                        });
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });
            },
            openPopup(id) {
                this.id = id || 0;
                this.popupAdd = true;
            },
            closePopup() {
                this.popupAdd = false;
                this.getListData();
            },
            openPopupPermission(id) {
                this.id = id || 0;
                this.popupPermission = true;
            }
        }
    };
</script>
