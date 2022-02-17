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
                                <i class="fa fa-chart-line float-right"></i>
                            </div>
                            <div class="text-white">
                                <h6 class="text-uppercase mb-3">Tổng học sinh đỗ</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalMemberExamPass" />
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
                                <i class="fa fa-building float-right"></i>
                            </div>
                            <div class="text-white">
                                <h6 class="text-uppercase mb-3">Tổng nghiệp đoàn</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display v-if="data.listSyndicationAndCompany" :value="data.listSyndicationAndCompany.length" />
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
                                <i class="fa fa-check-square float-right"></i>
                            </div>
                            <div class="text-white">
                                <h6 class="text-uppercase mb-3">Tổng cty xác nhận nghề nghiệp</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalCompanyConfirm" />
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
                                <i class="fa fa-file float-right"></i>
                            </div>
                            <div class="text-white">
                                <h6 class="text-uppercase mb-3">Tổng đơn hàng</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalLaborOrderIsConfirmation" />
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
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Thống kê học sinh đỗ / trượt tư cách lưu trú theo tháng</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <!--begin::k-widget4-->
                            <div class="kt-widget4">
                                <div class="kt-widget14__chart" style="width: 100%;">
                                    <apexchart type="bar" width="100%" :options="chartOptions" :series="series" v-if="isLoaded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Hồ sơ hoàn thành</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                                <thead class="kt-datatable__head">
                                    <tr>
                                        <th>
                                            Tên Học viên
                                        </th>
                                        <th>
                                            Đơn hàng
                                        </th>
                                        <th>
                                            Trạng thái
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="kt-datatable__body">
                                    <tr v-for="(item,index) in data.listProfileComplete" :key="index">
                                        <td>
                                            {{item.memberName}}
                                        </td>
                                        <td>
                                            {{item.laborOrderName}}
                                        </td>
                                        <td>
                                            Đã hoàn thành
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Hồ sơ đang xử lý</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                                <thead class="kt-datatable__head">
                                    <tr>
                                        <th>
                                            Tên Học viên
                                        </th>
                                        <th>
                                            Đơn hàng
                                        </th>
                                        <th>
                                            Trạng thái
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="kt-datatable__body">
                                    <tr v-for="(item,index) in data.listProfileProcessing" :key="index">
                                        <td>
                                            {{item.memberName}}
                                        </td>
                                        <td>
                                            {{item.laborOrderName}}
                                        </td>
                                        <td>
                                            Chưa hoàn thành
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Học sinh có tư cách lưu trú mới</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                                <thead class="kt-datatable__head">
                                    <tr>
                                        <th>Mã HV</th>
                                        <th>
                                            Tên Học viên
                                        </th>
                                        <th>
                                            Đơn hàng
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="kt-datatable__body">
                                    <tr v-for="(item,index) in data.listMemberHasResidence" :key="index">
                                        <td>
                                            {{item.memberCode}}
                                        </td>
                                        <td>
                                            {{item.laborMemberName}}
                                        </td>
                                        <td>
                                            {{item.laborOrderName}}
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
                    name: 'Đã có',
                    data: []
                }, {
                    name: 'Chưa có',
                    data: []
                }],
                chartOptions: {
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
                                return  val + "Học viên"
                            }
                        }
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
                        fn: 'get-data-hsn',

                    }
                })
                    .then(response => {
                        loading.hide();
                        this.data = response.data;
                        this.series[0].data = _.map(response.data.listMemberHasResidenceGroupByMonth, 'countHasResidence');
                        this.series[1].data = _.map(response.data.listMemberHasResidenceGroupByMonth, 'countNotResidence');
                        this.chartOptions.xaxis.categories = _.map(response.data.listMemberHasResidenceGroupByMonth, 'key');
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
            },
            countCompany(data) {
                let count = 0;
                _.forEach(data, (o) => {
                    count += o.length;
                })
                return count;
            }
        },
        created() {
            this.getDataDashboard();
        }
    };
</script>

<style scoped>
</style>