<template>
    <div>
        <div class="kt-portlet kt-portlet--height-fluid">
            <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                    <h3 class="kt-portlet__head-title">Danh sách học sinh bay</h3>
                </div>
            </div>

            <div class="kt-portlet__body">
                <!--begin::k-widget4-->
                <div class="kt-widget4">
                    <div class="row">
                        <div class="form-group">
                            <label>
                                Lọc theo
                            </label>
                            <select v-model="typeDateFilter" class="form-control">
                                <option value=1>Tuần</option>
                                <option value=2>Tháng</option>
                                <option value=3>Năm</option>
                            </select>
                        </div>
                    </div>
                    <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                        <thead class="kt-datatable__head">
                            <tr>
                                <th>
                                    Mã HS
                                </th>
                                <th>
                                    Tên
                                </th>
                                <th>
                                    Ngày sinh
                                </th>
                                <th>
                                    Chi nhánh
                                </th>
                            </tr>
                        </thead>
                        <tbody class="kt-datatable__body">
                            <tr v-for="(item,index) in data" :key="index">
                                <td>
                                    {{item.code}}
                                </td>
                                <td>
                                    {{item.name}}
                                </td>
                                <td>
                                    {{item.dateOfBirth | moment('DD/MM/YYYY')}}
                                </td>
                                <td>
                                    {{_.find(appSettings.branchList,['id',item.branchId])?_.find(appSettings.branchList,['id',item.branchId]).name:'--'}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        components: {
        },
        props: [],
        data() {
            return {
                typeDateFilter: 1,
                data: [],
                isLoaded: false,
            }
        },
        watch: {
            'typeDateFilter'() {
                this.getData();
            }
        },
        methods: {
            getData() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'dashboardAbroad',
                        fn: 'get-data-dn-bought-airticket',
                        typeDateFilter: this.typeDateFilter

                    }
                })
                    .then(response => {
                        loading.hide();
                        this.data = response.data;
                        this.isLoaded = true;
                    })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            },
        },
        created() {
            this.getData();
        }
    };
</script>

<style scoped>
</style>