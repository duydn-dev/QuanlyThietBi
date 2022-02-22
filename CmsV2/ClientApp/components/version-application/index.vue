<template>
    <wrapper>
        <template slot="header">
            <div class="kt-subheader__main">
                <h3 class="kt-subheader__title">Quản lý phiên bản ứng dụng</h3>

                <span class="kt-subheader__separator kt-subheader__separator--v" />
                <!--<div id="kt_subheader_search" class="kt-subheader__group">
                    <form class="kt-margin-l-20">
                        <select v-model="objData.status"
                                class="form-control form-control-sm"
                                @change="getListData()">
                            <option value="-1">---Chọn trạng thái---</option>
                            <option v-for="item in listStatus" :value="item.id" :key="item.id">{{item.name}}</option>
                        </select>
                    </form>
                </div>-->
            </div>
        </template>
        <div id="kt_content" class="kt-content kt-grid__item kt-grid__item--fluid">
            <div id="kt_apps_dictionary_group_list_datatable"
                 class="kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--loaded">
                <table class="kt-datatable__table">
                    <thead class="kt-datatable__head">
                        <tr>
                            <th class="width-100 text-center">#</th>
                            <th>App</th>
                            <th>Tên phiên bản hiện tại</th>
                            <th>Yêu cầu Update</th>
                            <th>Cho hệ điều hành</th>
                            <th class="text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody class="kt-datatable__body">
                        <tr v-for="(items, index) in listData" :key="index">
                            <th class="text-center" scope="row">#{{ items.id }}</th>
                            <td>{{ items.appName }}</td>
                            <td>{{ items.name }}</td>
                            <td>{{ items.status }}</td>
                            <td>{{ items.type }}</td>
                            <td class="btn-action width-160 text-center">
                                <span title="Xem nội dung"
                                      class="btn btn-primary"
                                      @click="openPopup(items.id)">
                                    <i class="fa fa-edit" />
                                </span>
                                <!--<span title="Xóa" class="btn btn-danger" @click="remove(listData.id)">
                                    <i class="fas fa-trash" />
                                </span>-->
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!--<div class="pr-4 pl-4">
                    <pager :total="totalRow" :page-index="objData.pageIndex" @change="pageChange" />
                </div>-->
            </div>
        </div>
        <error-report-edit v-if="popupAdd" :id="id" @closePopup="closePopup" />
    </wrapper>
</template>
<script>
    import errorReportEdit from './edit';
    export default {
        name: 'error-report',
        components: { errorReportEdit },
        data() {
            return {
                objData: {
                    typeError: 0,
                    status: -1,
                    pageIndex: 1,
                    pageSize: 20,
                    languageCode: -1,
                },
                status: 'Không bắt buộc',
                id: 0,
                listData: [],
                totalRow: 0,
                popupAdd: false,
                listStatus: [
                    {
                        id: 0,
                        name: 'Chờ kiểm duyệt',
                    },
                    {
                        id: 1,
                        name: 'Đang xử lý',
                    },
                    {
                        id: 2,
                        name: 'Hoàn thành',
                    },
                ],
            };
        },
        computed: {
            rowNum() {
                return (this.objData.pageIndex - 1) * this.objData.pageSize;
            },
        },
        watch: {},
        created() {
            this.getListData();
        },
        methods: {
            getListData() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'VersionApp',
                        fn: 'list',
                        ...this.objData,
                    },
                })
                    .then((response) => {
                        loading.hide();
                        console.log(response.data);
                        this.listData = response.data;
                        _.forEach(this.listData, (a) => {
                            if (a.requireUpdate == 1) {
                                a.status = 'Yêu cầu bắt buộc';
                            } else a.status = 'không bắt buộc';
                        });
                    })
                    .catch((err) => {
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

            closePopup() {
                this.popupAdd = false;
                this.getListData();
            },
            linkPage(url) {
                window.open(`${url}`, '_blank');
            },
            remove(id) {
                this.$confirm('Bạn có chắc muốn xóa thông tin trường này?').then(() => {
                    let loading = this.$loading.show();
                    this.$http({
                        data: {
                            m: 'errorreport',
                            fn: 'remove',
                            id: id,
                        },
                    })
                        .then(() => {
                            loading.hide();
                            this.getListData();
                        })
                        .catch((err) => {
                            loading.hide();
                            return this.$message(err.message, 'error');
                        });
                });
            },
        },
    };
</script>
<style scoped>
    .kt-width {
        width: 100px;
    }
</style>