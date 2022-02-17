<template>
    <div>
        <div class="kt-portlet kt-portlet--height-fluid">
            <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                    <h3 class="kt-portlet__head-title">Nhân viên mới vào hệ thống</h3>
                </div>
            </div>

            <div class="kt-portlet__body">
                <!--begin::k-widget4-->
                <div class="kt-widget4">
                    <div class="row">
                        <div class="form-group col-6">
                            <label>
                                Lọc theo tháng
                            </label>
                            <fselect :options="listMonth" placeholder="Chọn tháng" v-model="month">

                            </fselect>
                        </div>
                    </div>
                    <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                        <thead class="kt-datatable__head">
                            <tr>
                                <th>
                                    Họ tên
                                </th>
                                <th>
                                    Phòng
                                </th>
                                <th>
                                    Chi nhánh
                                </th>
                                <th>
                                    Ngày làm việc
                                </th>
                            </tr>
                        </thead>
                        <tbody class="kt-datatable__body">
                            <tr v-for="(item,index) in data" :key="index">
                                <td>
                                    <div class="kt-user-card-v2">
                                        <div class="kt-user-card-v2__pic">
                                            <avatar :username="item.userName" css-class="kt-badge kt-badge--xl" />
                                        </div>
                                        <div class="kt-user-card-v2__details">
                                            <a class="kt-user-card-v2__name">{{ item.fullName }}</a>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {{item.departmentName}}
                                </td>
                                <td>
                                    {{item.branchName}}
                                </td>
                                <td>
                                    {{item.createdDate| moment('DD/MM/YY')}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row pt-3">
                        <div class="form-group col-6">
                            <RouterLink :to="`/user`">
                                <a class="kt-user-card-v2__name">Xem thêm >>></a>
                            </RouterLink>
                        </div>
                    </div>
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
                month: new Date().getMonth()+1,
                isLoaded: false,
                listMonth: [{ id: 1, name: 'Tháng 1' }, { id: 2, name: 'Tháng 2' }, { id: 3, name: 'Tháng 3' }, { id: 4, name: 'Tháng 4' }, { id: 5, name: 'Tháng 5' }, { id: 6, name: 'Tháng 6' }, { id: 7, name: 'Tháng 7' }, { id: 8, name: 'Tháng 8' }, { id: 9, name: 'Tháng 9' }, { id: 10, name: 'Tháng 10' }, { id: 11, name: 'Tháng 11' }, { id: 12, name: 'Tháng 12' }],
                data:[],
            }
        },
        watch: {
            'month'() {
                this.getData();
            }
        },
        methods: {
            getData() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'dashboardAbroad',
                        fn: 'get-new-user-by-month',
                        month: this.month

                    }
                })
                    .then(response => {
                        loading.hide();
                        this.data = response.data.listNewUser;
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