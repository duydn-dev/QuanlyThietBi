<template>
    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor row">
        <div id="kt_subheader" class="kt-subheader   kt-grid__item">
            <div class="kt-subheader__main ">
                <h3 class="kt-subheader__title">
                    Thống kê - Chi tiết
                </h3>
            </div>
        </div>
        <div class="row ml-5">
            <button type="button" class="btn btn-secondary">
                <RouterLink to="/dashboard/abroad">
                    <span>Tổng quan</span>
                </RouterLink>
            </button>
            <button type="button" class="btn btn-success">
                <RouterLink to="/dashboard/abroad-persional">
                    <span style="color:white">Chi tiết</span>
                </RouterLink>
            </button>
        </div>
        <!--<iframe src="https://docs.google.com/spreadsheets/d/1GOdxc9ZMtOaaAjwMM6y3koxrQjvlR1b9BNWLq8UlQ5c/edit?usp=drive_web&ouid=105361933199259251573" ></iframe>-->

        <div id="kt_content" class="kt-content  kt-grid__item kt-grid__item--fluid">
            <div class="kt-container  kt-grid__item kt-grid__item--fluid">
                <!--Begin::Dashboard 2-->
                <!--Begin::Row-->
                <div class="row">
                    <div class="col-xl-4 col-lg-4">
                        <!--begin:: Widgets/Daily Sales-->
                        <div class="kt-portlet kt-portlet--height-fluid">
                            <div class="kt-widget14">
                                <div class="kt-widget14__header">
                                    <h3 class="kt-widget14__title">
                                        Học viên
                                    </h3>
                                    <span class="kt-widget14__desc">
                                        Phân bổ học viên theo kỳ
                                    </span>
                                </div>
                                <div class="kt-widget14__chart" style="width: 100%;">
                                    <apexchart type=bar width="100%" :options="chartOptionsBar" :series="seriesBar" v-if="isLoadedBarChart" />
                                </div>
                            </div>
                        </div>
                        <!--end:: Widgets/Daily Sales-->
                    </div>
                    <div class="col-xl-4 col-lg-4">
                        <!--begin:: Widgets/Profit Share-->
                        <div class="kt-portlet kt-portlet--height-fluid">
                            <div class="kt-widget14">
                                <div class="kt-widget14__header">
                                    <h3 class="kt-widget14__title">
                                        Hồ sơ
                                    </h3>
                                    <span class="kt-widget14__desc">
                                        Thống kê hồ sơ du học
                                    </span>
                                </div>
                                <div class="kt-widget14__content">
                                    <div class="kt-widget14__chart" style="width: 100%;">
                                        <apexchart type=donut width="90%" :options="chartOptionsProfile" :series="seriesProfile" v-if="seriesProfile.length>0" />
                                    </div>
                                    <div class="kt-widget14__legends">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--end:: Widgets/Profit Share-->
                    </div>
                    <div class="col-xl-4 col-lg-4">
                        <!--begin:: Widgets/Revenue Change-->
                        <div class="kt-portlet kt-portlet--height-fluid">
                            <div class="kt-widget14">
                                <div class="kt-widget14__header">
                                    <h3 class="kt-widget14__title">
                                        Loại hình
                                    </h3>
                                    <span class="kt-widget14__desc">
                                        Phân bổ học viên theo loại hình du học
                                    </span>
                                </div>
                                <div class="kt-widget14__content">
                                    <div class="kt-widget14__chart" style="width: 100%;">
                                        <apexchart type=donut width="100%" :options="chartOptions" :series="series" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--end:: Widgets/Revenue Change-->
                    </div>
                </div>
                <!--End::Row-->
                <!--Begin::Row-->
                <statByBranch @data="getDataProfile" />
                <!--End::Row-->
                <!--Begin::Row-->
                <!--End::Row-->
                <!--End::Dashboard 2-->
            </div>

        </div>
    </div>
</template>
<script>
    import statByBranch from './stats-by-branch';

    export default {
        name: 'abroad-statistic-dashboard',
        components: { statByBranch },
        data() {
            return {
                statistic: null,
                series: [],
                chartOptions: {
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
                    }
                },
                countTotal: 0,
                allData: [],
                seriesProfile: [],
                chartOptionsProfile: {
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
                                        fontSize: '16px',
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
                    }
                },
                chartOptionsBar: {
                    chart: {
                        id: 'basic-bar'
                    },
                    xaxis: {
                        categories: []
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            endingShape: 'flat',
                            columnWidth: '70%',
                            barHeight: '20%',
                            distributed: false,
                            colors: {
                                ranges: [{
                                    from: 0,
                                    to: 0,
                                    color: undefined
                                }],
                                backgroundBarColors: [],
                                backgroundBarOpacity: 1,
                            },
                            dataLabels: {
                                position: 'top',
                                maxItems: 100,
                                hideOverflowingLabels: true,
                            }
                        }
                    }
                },
                seriesBar: [{
                    name: 'Học viên',
                    data: []
                }],
                mode: 1,
                isLoadedBarChart: false
            }
        },
        watch: {
            'mode'(val) {
                if (val == 0) this.$router.push(`/dashboard/abroad`);
            }
        },
        methods: {
            doStatistics() {
                //statistics
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        fn: "statistics",
                        m: "abroadStatistic"
                    }
                }).then((response) => {
                    loading.hide();
                    this.statistic = response.data;
                });
            },
            //List học viên theo kỳ tuyển sinh
            getDataMemberByEnrollmentPeriod() {
                //statistics
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        fn: "statistics-by-enrollmentperiod",
                        m: "abroadStatistic"
                    }
                }).then((response) => {
                    loading.hide();
                    if (this.chartOptionsBar) this.chartOptionsBar.xaxis.categories = [];
                    if (this.seriesBar) this.seriesBar[0].data = [];
                    var count = 0;
                    var sumOther = 0;
                    _.each(response.data, (o) => {
                        if (count < 10) {
                            let date = new Date(o.enrollmentPeriod);
                            this.chartOptionsBar.xaxis.categories.push(o.enrollmentPeriod ? 'Kỳ: ' + (date.getMonth() + 1) + '/' + date.getFullYear() : '--');
                            this.seriesBar[0].data.push(o.count);
                            count++;
                        } else {
                            sumOther += o.count;
                        }
                    });
                    if (sumOther > 0) {
                        this.chartOptionsBar.xaxis.categories.push('Khác');
                        this.seriesBar[0].data.push(sumOther);
                    }
                    this.isLoadedBarChart = true;

                });
            },
            getDataForChart() {
                //statistics
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: "abroadStatistic",
                        fn: "statistics-by-type",

                    }
                }).then((response) => {
                    loading.hide();
                    this.countTotal = 0;
                    _.each(response.data, (o) => {
                        this.series.push(o.count);
                        this.chartOptions.labels.push(o.typeName);
                        this.countTotal = this.countTotal + o.count;
                    })
                })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            },
            getDataProfile(val) {
                this.allData = [];
                this.allData = val;
                this.seriesProfile = [];
                if (this.chartOptionsProfile)
                    this.chartOptionsProfile.labels = [];
                this.seriesProfile.push(this.SumInputing(val));
                this.chartOptionsProfile.labels.push('Đang nhập');
                this.seriesProfile.push(this.SumTranslating(val));
                this.chartOptionsProfile.labels.push('Đang dịch');
                this.seriesProfile.push(this.SumInputError(val));
                this.chartOptionsProfile.labels.push('Đang dựng');
                this.seriesProfile.push(this.SumProfile(val) - this.SumInputing(val) - this.SumTranslating(val) - this.SumInputError(val));
                this.chartOptionsProfile.labels.push('Khác');

            },
            SumProfile(val) {
                let sum = 0;
                _.each(val, (o) => {
                    sum = sum + o.countInputing + o.countInputDone + o.countTranslating + o.countTranslateDone + o.countInputError;
                })
                return sum;
            },
            SumInputing(val) {
                let sum = 0;
                _.each(val, (o) => {
                    sum += o.countInputing;
                });
                return sum;
            },
            SumTranslating(val) {
                let sum = 0;
                _.each(val, (o) => {
                    sum += o.countTranslating;
                });
                return sum;
            },
            SumInputError(val) {
                let sum = 0;
                _.each(val, (o) => {
                    sum += o.countInputError;
                });
                return sum;
            },
        },
        created() {
            this.doStatistics();
            this.getDataForChart();
            this.getDataMemberByEnrollmentPeriod();
        }
    }
</script>
