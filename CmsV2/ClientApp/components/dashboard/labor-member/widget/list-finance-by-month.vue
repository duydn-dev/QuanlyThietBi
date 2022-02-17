<template>
    <div>
        <div class="kt-portlet kt-portlet--height-fluid">
            <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                    <h3 class="kt-portlet__head-title">Thống kê thu chi theo tháng trong năm</h3>
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
                    <div class="kt-widget14__chart" style="width: 100%;">
                        <apexchart type=bar width="80%" :options="chartOptionsFinance" :series="seriesFinance" v-if="isLoaded" :key="countChange" />
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
                month: null,
                isLoaded: false,
                listMonth: [{ id: 1, name: 'Tháng 1' }, { id: 2, name: 'Tháng 2' }, { id: 3, name: 'Tháng 3' }, { id: 4, name: 'Tháng 4' }, { id: 5, name: 'Tháng 5' }, { id: 6, name: 'Tháng 6' }, { id: 7, name: 'Tháng 7' }, { id: 8, name: 'Tháng 8' }, { id: 9, name: 'Tháng 9' }, { id: 10, name: 'Tháng 10' }, { id: 11, name: 'Tháng 11' }, { id: 12, name: 'Tháng 12' }],
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
                            columnWidth: '30%',
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
                            text: 'Số tiền'
                        }
                    },
                    fill: {
                        opacity: 1,
                        colors: ['#7569b3','#bcbbdd']
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return val;
                            }
                        }
                    },
                    colors: ['#7569b3','#bcbbdd']
                },
                countChange:0
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
                        m: 'dashboardLabor',
                        fn: 'get-data-finance-by-month',
                        month: this.month

                    }
                })
                    .then(response => {
                        loading.hide();
                        //Chart thu chi theo tháng trong năm
                        this.seriesFinance[0].data = _.map(response.data.listFinanceByMonth, 'revenue');
                        this.seriesFinance[1].data = _.map(response.data.listFinanceByMonth, 'expense');
                        this.chartOptionsFinance.xaxis.categories = _.map(response.data.listFinanceByMonth, 'key');
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