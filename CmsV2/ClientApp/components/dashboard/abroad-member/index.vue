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
            <div class="row mb-4 mt-3">
                <div class="col-xl-3 col-md-3">
                    <div class="card card-finance">
                        <div class="card-body">
                            <div class="card-finance-icon">
                                <i class="fa fa-users float-right"></i>
                            </div>
                            <div class="text-white">
                                <h6 class="text-uppercase mb-3">Tổng số nhân viên</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalNewUser" />
                                    </label>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-3">
                    <div class="card card-finance">
                        <div class="card-body">
                            <div class="card-finance-icon">
                                <i class="fa fa-ban float-right"></i>
                            </div>
                            <div class="text-white">
                                <h6 class="text-uppercase mb-3">Tổng số nhân viên đã nghỉ việc</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalNewUserCancel" />
                                    </label>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-3">
                    <div class="card card-finance">
                        <div class="card-body">
                            <div class="card-finance-icon">
                                <i class="fa fa-code-branch float-right"></i>
                            </div>
                            <div class="text-white">
                                <h6 class="text-uppercase mb-3">Tổng số chi nhánh</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalBranch" />
                                    </label>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-3">
                    <div class="card card-finance">
                        <div class="card-body">
                            <div class="card-finance-icon">
                                <i class="fa fa-plane float-right"></i>
                            </div>
                            <div class="text-white">
                                <h6 class="text-uppercase mb-3">Tổng số học sinh đã xuất cảnh</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalMemberFlew" />
                                    </label>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-6 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <listMemberByYear></listMemberByYear>
                </div>
                <div class="col-xl-6 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <rateCOE></rateCOE>
                </div>
                <div class="col-xl-3 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Tổng doanh thu theo ngày</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <!--begin::k-widget4-->
                            <div class="kt-widget4">
                                <div class="kt-widget14__chart" style="width: 100%;">
                                    <h3><animated-number-display :value="data.totalRevenueByDate?data.totalRevenueByDate:0"></animated-number-display> VNĐ </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Tổng doanh thu theo tuần</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <!--begin::k-widget4-->
                            <div class="kt-widget4">
                                <div class="kt-widget14__chart" style="width: 100%;">
                                    <h3><animated-number-display :value="data.totalRevenueByWeek?data.totalRevenueByWeek:0"></animated-number-display> VNĐ</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Tổng doanh thu theo tháng</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <!--begin::k-widget4-->
                            <div class="kt-widget4">
                                <div class="kt-widget14__chart" style="width: 100%;">
                                    <h3><animated-number-display :value="data.totalRevenueByMonth?data.totalRevenueByMonth:0"></animated-number-display> VNĐ</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Chi nhánh có doanh thu cao nhất</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <!--begin::k-widget4-->
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <td style="width: 50%;">Tên chi nhánh</td>
                                            <td class="text-center" style="width: 50%;">Mục tiêu</td>
                                            <td class="text-right" style="width: 50%;">Doanh thu</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-for="(item,index) in data.listRevenueByBranch">
                                            <tr :key="`row_1_${index}`">
                                                <td>{{item.branchName}}</td>
                                                <td class="kt-align-right kt-font-bold text-center">
                                                    <number-display :value="item.taget" />
                                                </td>
                                                <td class="kt-align-right kt-font-bold">
                                                    <number-display :value="item.totalMoney" />
                                                </td>
                                            </tr>
                                            <tr :key="`row_2_${index}`">
                                                <td colspan="3">
                                                    <div class="progress m-progress--sm"
                                                         style="height:5px;">
                                                        <div class="progress-bar bg-success"
                                                             role="progressbar"
                                                             :style="{ width: `${item.percentCompleted}%` }"
                                                             aria-valuenow="75"
                                                             aria-valuemin="0"
                                                             aria-valuemax="100"></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Doanh thu tổng theo nhóm dịch vụ</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <!--begin::k-widget4-->
                            <div class="kt-widget4">
                                <div class="kt-widget14__chart" style="width: 100%;">
                                    <apexchart type=donut width="80%" :options="chartOptionsRevenueService" :series="seriesRevenueService" v-if="isLoaded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <customerByMonth></customerByMonth>
                </div>
                <div class="col-xl-12 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <listFinanceByMonth></listFinanceByMonth>
                </div>
                <div class="col-xl-6 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Trường học có doanh thu cao</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                                <thead class="kt-datatable__head">
                                    <tr>
                                        <th>
                                            Mã trường
                                        </th>
                                        <th>
                                            Tên
                                        </th>
                                        <th>
                                            Số lượng học viên
                                        </th>
                                        <th>
                                            Tổng doanh thu
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="kt-datatable__body">
                                    <tr v-for="(item,index) in data.listAbroadSchoolMostRevenue" :key="index">
                                        <td class="cursor-pointer">
                                            <RouterLink :to="`/syndication/${item.id}`">{{item.code}}</RouterLink>
                                        </td>
                                        <td class="cursor-pointer">
                                            <RouterLink :to="`/syndication/${item.id}`">{{item.name}}</RouterLink>
                                        </td>
                                        <td>
                                            <number-display :value="item.countMember" />
                                        </td>
                                        <td>
                                            <number-display :value="item.totalManangerFee" /> VNĐ
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <listNewUser></listNewUser>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import listFinanceByMonth from './widget/list-finance-by-month';
    import listNewUser from './widget/list-new-user';
    import customerByMonth from './widget/customer-by-month';
    import listMemberByYear from './widget/list-member-by-year';
    import rateCOE from './widget/rate-COE-by-enrollment';
    export default {
        props: [],
        components: { listFinanceByMonth, listNewUser, customerByMonth,listMemberByYear,rateCOE },
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
                                        fontSize: '100px',
                                        fontFamily: 'Helvetica, Arial, sans-serif',
                                        color: undefined,
                                        offsetY: 2,
                                        formatter: function (val) {
                                            return  val
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
                seriesFinance: [{
                    name: 'Thu',
                    data: []
                }, {
                    name: 'Chi',
                    data: []
                }],
                chartOptionsFinance: {
                    chart: {
                        type: 'bar',
                        height: 350
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '55%',
                            endingShape: 'flat'
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                    },
                    xaxis: {
                        categories: [],
                    },
                    yaxis: {
                        title: {
                            text: 'Số học sinh'
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return val + "Học viên"
                            }
                        }
                    }
                },
                seriesRevenueService: [],
                chartOptionsRevenueService: {
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
                                        formatter: val=> {
                                            return this.getNumberFormat(val) + 'VNĐ';
                                        }
                                    },
                                    total: {
                                        show: true,
                                        label: 'Total',
                                        color: '#373d3f',
                                        formatter: w=> {
                                            let total = w.globals.seriesTotals.reduce((a, b) => {
                                                return a + b
                                            }, 0);
                                            return this.getNumberFormat(total) + 'VNĐ';
                                        }
                                    }
                                }
                            },
                        }
                    },
                },
            }

        },
        methods: {
            getDataDashboard() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'dashboardAbroad',
                        fn: 'get-data-dashboard',

                    }
                })
                    .then(response => {
                        loading.hide();
                        this.data = response.data;
                        //chart tỉ trọng dịch vụ
                        this.seriesService = _.map(response.data.listMemberGroupByService, 'count');
                        this.chartOptionsService.labels = _.map(response.data.listMemberGroupByService, 'key');
                        //chart doanh thu theo dịch vụ
                        this.seriesRevenueService = _.map(response.data.listRevenueByService, 'sum');
                        this.chartOptionsRevenueService.labels = _.map(response.data.listRevenueByService, 'key');
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