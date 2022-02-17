<template>
    <div>
        <div class="kt-portlet kt-portlet--height-fluid">
            <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                    <h3 class="kt-portlet__head-title">Nghiệp đoàn theo nhóm dịch vụ</h3>
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
                        <apexchart type=pie width="80%" :options="chartOptionsSchoolService" :series="seriesSchoolService" v-if="isLoaded" :key="countChange" />
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
                month: new Date().getMonth() + 1,
                isLoaded: false,
                listMonth: [{ id: 1, name: 'Tháng 1' }, { id: 2, name: 'Tháng 2' }, { id: 3, name: 'Tháng 3' }, { id: 4, name: 'Tháng 4' }, { id: 5, name: 'Tháng 5' }, { id: 6, name: 'Tháng 6' }, { id: 7, name: 'Tháng 7' }, { id: 8, name: 'Tháng 8' }, { id: 9, name: 'Tháng 9' }, { id: 10, name: 'Tháng 10' }, { id: 11, name: 'Tháng 11' }, { id: 12, name: 'Tháng 12' }],

                seriesSchoolService: [],
                chartOptionsSchoolService: {
                    chart: {
                        width: 380,
                        type: 'pie',
                    },
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
                    }]
                },
                countChange: 0
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
                        fn: 'get-data-syndication-by-month',
                        month: this.month

                    }
                })
                    .then(response => {
                        loading.hide();
                        //chart trường tuyển theo dịch vụ
                        this.seriesSchoolService = _.map(response.data.listSyndicationByType, 'count');
                        this.chartOptionsSchoolService.labels = _.map(response.data.listSyndicationByType, 'key');
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