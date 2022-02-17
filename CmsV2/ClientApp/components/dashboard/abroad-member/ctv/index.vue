<template>
    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" style="min-height: 80vh;">
        <div id="kt_subheader" class="kt-subheader kt-grid__item">
            <div class="kt-subheader__main">
                <h3 class="kt-subheader__title">Tổng quan</h3>
                <span class="kt-subheader__separator kt-subheader__separator--v" />

                <div id="kt_subheader_search" class="kt-subheader__group"></div>
            </div>
        </div>
        <div id="kt_content"
             class="kt-content  kt-grid__item kt-grid__item--fluid">
            <div class="row">
                <div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Học sinh mới vào đơn</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <!--begin::k-widget4-->
                            <div class="kt-widget4">
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
                                        <tr v-for="(item,index) in data.listNewMemberByCollaboraror" :key="index">
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
                                <!--<div class="kt-widget4__item" v-for="item in data.listNewMember">
                                    <a href="#" class="kt-widget4__title">{{item.code}}</a>
                                    <a href="#" class="kt-widget4__title">{{item.name}}</a>
                                    <div class="kt-widget4__tools">{{item.dateOfBirth | moment('DD/MM/YYYY')}}</div>
                                    <div class="kt-widget4__tools">{{_.find(appSettings.branchList,['id',item.branchId])?_.find(appSettings.branchList,['id',item.branchId]).name:'--'}}</div>
                                </div>-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Học sinh mới duyệt nguồn</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <!--begin::k-widget4-->
                            <div class="kt-widget4">
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
                                        <tr v-for="(item,index) in data.listNewMemberConfirmSource" :key="index">
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
                <div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Học sinh nhập học</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <!--begin::k-widget4-->
                            <div class="kt-widget4">
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
                                        <tr v-for="(item,index) in data.listNewMemberAdmissionByCollaborator" :key="index">
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
                <div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Học sinh trúng tuyển</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <!--begin::k-widget4-->
                            <div class="kt-widget4">
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
                                        <tr v-for="(item,index) in data.listNewMemberElectByCollaborator" :key="index">
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
                <div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Học sinh xuất cảnh</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <!--begin::k-widget4-->
                            <div class="kt-widget4">
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
                                        <tr v-for="(item,index) in data.listCancelMember" :key="index">
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
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [],
        data() {
            return {
                data: [],
                isLoaded: false,
                seriesService: [],
                chartOptionsService: {
                    labels: [],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }],
                    plotOptions: {
                        pie: {
                            size: undefined,
                            customScale: 1,
                            offsetX: 0,
                            offsetY: 0,
                            expandOnClick: true,
                            donut: {
                                size: '65%',
                                background: 'transparent',
                                labels: {
                                    show: true,
                                    name: {
                                        show: false,
                                        fontSize: '22px',
                                        fontFamily: 'Helvetica, Arial, sans-serif',
                                        color: undefined,
                                        offsetY: -10
                                    },
                                    value: {
                                        show: true,
                                        fontSize: '22px',
                                        fontFamily: 'Helvetica, Arial, sans-serif',
                                        color: undefined,
                                        offsetY: 2,
                                        formatter: function (val) {
                                            return val
                                        }
                                    },
                                    total: {
                                        show: true,
                                        label: 'Total',
                                        color: '#373d3f',
                                        formatter: function (w) {
                                            return w.globals.seriesTotals.reduce((a, b) => {
                                                return a + b
                                            }, 0)
                                        }
                                    }
                                }
                            },
                        }
                    },
                },
                series: [{
                    name: "Học viên",
                    data: []
                }],
                chartOptions: {
                    chart: {
                        height: 350,
                        type: 'line',
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    title: {
                        text: 'Học viên theo tháng',
                        align: 'left'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        categories: [],
                    }
                },
            }
        },
        methods: {
            getDataDashboard() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'dashboardLabor',
                        fn: 'get-data-ctv',

                    }
                })
                    .then(response => {
                        loading.hide();
                        this.data = response.data;

                        //chart tỉ trọng dịch vụ
                        this.chartOptionsService.labels.length = 0;
                        this.seriesService.length = 0;
                        this.seriesService = _.map(response.data.listMemberGroupByService, 'count');
                        this.chartOptionsService.labels = _.map(response.data.listMemberGroupByService, 'key');
                        //Chart Số lượng học viên theo tháng
                        this.series[0].data = _.map(response.data.listMemberGroupByMonth, 'count');
                        this.chartOptions.xaxis.categories = _.map(response.data.listMemberGroupByMonth, (o) => {
                            return o.month + '-' + o.year;
                        });
                        this.isLoaded = true;
                    })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            },
            getMoneyByType(objectType, type) {
                let temp = _.find(this.lstData, o => {
                    return o.objectType == objectType && o.type == type;
                });
                if (temp) return temp.money;

                return 0;
            }
        },
        created() {
            this.getDataDashboard();
        }
    };
</script>

<style scoped>
</style>