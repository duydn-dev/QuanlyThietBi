<template>
    <div>
        <div class="kt-portlet kt-portlet--height-fluid">
            <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                    <h3 class="kt-portlet__head-title">Thống kê học sinh theo tháng</h3>
                </div>
            </div>

            <div class="kt-portlet__body">
                <!--begin::k-widget4-->
                <div class="kt-widget4">
                    <div class="row">
                        <div class="form-group col-6">
                            <label>
                                Lọc theo năm
                            </label>
                            <fselect :options="listYear" placeholder="Chọn năm" v-model="year">

                            </fselect>
                        </div>
                    </div>
                    <div class="kt-widget14__chart" style="width: 100%;">
                        <apexchart ref="chart" type="line" width="100%" :options="chartOptions" :series="series" v-if="isLoaded" :key="countChange" />
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
        computed: {
            listYear() {
                let arr = [];
                for (var i = 0; i < 5; i++) {
                    let y = new Date().getFullYear() - 4 + i;
                    let obj = { id: y, name: 'Năm ' + y };
                    arr.push(obj);
                }
                return arr;
            }
        },
        data() {
            return {
                year: new Date().getFullYear(),
                isLoaded: false,
                series: [
                    {
                        name: "Học viên",
                        data: []
                    },
                ],
                chartOptions: {
                    chart: {
                        height: 350,
                        type: 'line',
                        dropShadow: {
                            enabled: true,
                            color: '#000',
                            top: 18,
                            left: 7,
                            blur: 10,
                            opacity: 0.2
                        },
                        toolbar: {
                            show: false
                        }
                    },
                    colors: ['#77B6EA', '#545454'],
                    dataLabels: {
                        enabled: true,
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    title: {
                        text: 'Học viên theo tháng',
                        align: 'left'
                    },
                    grid: {
                        borderColor: '#e7e7e7',
                        row: {
                            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.5
                        },
                    },
                    markers: {
                        size: 1
                    },
                    xaxis: {
                        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                        title: {
                            text: 'Tháng'
                        }
                    },
                    yaxis: {
                        title: {
                            text: 'Số lượng học viên'
                        },
                        min: 0,
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'right',
                        floating: true,
                        offsetY: -25,
                        offsetX: -5
                    }
                },
                countChange: 0
            }
        },
        watch: {
            'year'() {
                this.getData();
            }
        },
        methods: {
            getData() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'dashboardAbroad',
                        fn: 'get-data-member-by-month',
                        year: this.year

                    }
                })
                    .then(response => {
                        loading.hide();
                        //Chart Số lượng học viên theo tháng
                        this.series[0].data = _.map(response.data.listMemberByMonth, 'count');
                        //this.chartOptions.xaxis.categories = _.map(response.data.listMemberByMonth, 'key');
                        this.countChange++;
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