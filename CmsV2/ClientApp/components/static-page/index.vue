<template>
    <wrapper>
        <template slot="header">
            <div class="kt-subheader__main">
                <h3 class="kt-subheader__title">Trang tĩnh</h3>
                <span class="kt-subheader__separator kt-subheader__separator--v" />
                <div id="kt_subheader_search" class="kt-subheader__group">
                    <div id="kt_subheader_search_form" class="kt-margin-l-20">
                        <div class="kt-input-icon kt-input-icon--right kt-subheader__search">
                            <input id="generalSearch"
                                   ref="inputSearch"
                                   v-model="objData.keyword"
                                   type="text"
                                   class="form-control"
                                   placeholder="Tìm kiếm..."
                                   @keyup.13="getListData" />
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
                <router-link to="/static-page/0" class="btn btn-brand">
                    <i class="fa fa-plus-square"></i> Tạo mới
                </router-link>
            </div>
        </template>
        <div id="kt_content" class="kt-content kt-grid__item kt-grid__item--fluid">
            <!--begin::Portlet-->
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__body kt-portlet__body--fit">
                    <!--begin: Datatable -->
                    <div id="kt_apps_user_list_datatable"
                         class="kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--loaded"
                         v-if="totalRow !=0">
                        <table class="kt-datatable__table table-striped table-hover table-bordered">
                            <thead class="kt-datatable__head">
                                <tr>
                                    <th class="width-50">STT</th>
                                    <th>Tiêu đề</th>
                                    <th>Loại</th>
                                    <th class="text-center">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody class="kt-datatable__body">
                                <tr v-for="(item, index) in listData" :key="item.id">
                                    <th scope="row">{{ index + rowNum + 1 }}</th>
                                    <td>{{ item.title || '---' }}</td>
                                    <td>{{getType(item.type)}}</td>
                                    <td class="text-center btn-action width-100">
                                        <router-link :to="`/static-page/${item.id}`">
                                            <span title="Sửa" class="btn btn-primary">
                                                <i class="fa fa-edit" />
                                            </span>
                                        </router-link>

                                        <span title="Xóa"
                                              class="btn btn-danger"
                                              @click="remove(item)">
                                            <i class="fas fa-trash-alt" />
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="pr-4 pl-4">
                            <pager :total="totalRow"
                                   :page-index="objData.pageIndex"
                                   @change="pageChange" />
                        </div>
                    </div>
                    <alert v-if="totalRow == 0" />
                </div>
            </div>
        </div>
    </wrapper>
</template>
<script>
    export default {
        name: 'About-noboro',
        components: {},
        data() {
            return {
                objData: {
                    keyword: '',
                    type: '',
                    pageIndex: 1,
                    pageSize: 20,
                },
                listData: [],
                totalRow: 0,
            };
        },
        computed: {
            rowNum() {
                return (this.objData.pageIndex - 1) * this.objData.pageSize;
            },
            listType() {
                if (this.appSettings.configs.staticPageType)
                    return this.appSettings.configs.staticPageType;

                return [];
            },
        },
        watch: {},
        created() {
            this.getListData();
        },
        methods: {
            pageChange(pageNum) {
                this.$set(this.objData, 'pageIndex', pageNum);
                this.getlistData();
            },
            getListData() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'staticpage',
                        fn: 'list',
                        ...this.objData,
                    },
                })
                    .then((response) => {
                        this.listData = response.data;
                        this.totalRow = response.totalRow;
                        loading.hide();
                    })
                    .catch((err) => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            },
            remove(item) {
                this.$confirm(`Bạn đang xóa <b>${item.title}</b> <br/> Bạn có muốn tiếp tục ?`).then(
                    () => {
                        let loading = this.$loading.show();
                        this.$http({
                            data: {
                                m: 'staticpage',
                                fn: 'remove',
                                id: item.id,
                            },
                        })
                            .then((res) => {
                                loading.hide();
                                if (res.success) {
                                    this.getListData();
                                    return this.$message(`Xóa thành công`);
                                } else {
                                    return this.$message('Xóa thất bại, xin thử lại', 'error');
                                }
                            })
                            .catch((err) => {
                                loading.hide();
                                return this.$message(err.message, 'error');
                            });
                    }
                );
            },

            getType(id) {
                let temp = this.listType.find((c) => c.code == id);
                if (temp) return temp.name;
                return '';
            },
        },
    };
</script>
