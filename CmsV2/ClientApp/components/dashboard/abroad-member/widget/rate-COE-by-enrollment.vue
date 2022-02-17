<template>
    <div>
        <div class="kt-portlet kt-portlet--height-fluid">
            <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                    <h3 class="kt-portlet__head-title">Tỉ lệ đậu COE/ Tư cách lưu trú</h3>
                </div>
            </div>

            <div class="kt-portlet__body">
                <!--begin::k-widget4-->
                <div class="kt-widget4">
                    <div class="row">
                        <div class="form-group col-6">
                            <label>
                                Lọc theo kỳ tuyển
                            </label>
                            <datetimepicker placeholder="Chọn tháng" v-model="enrollment" type="month">
                            </datetimepicker>
                        </div>
                    </div>
                    <apexchart type=radialBar width="65%" :options="chartOptionsCOE" :series="seriesCOE" v-if="isLoaded" />
                </div>
                <table class="table">
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tổng số học viên:</td>
                            <td class="kt-align-right kt-font-bold">
                                <number-display :value="data.rateCOE.totalMember" />
                            </td>
                        </tr>
                        <tr>
                            <td>Học viên có COE:</td>
                            <td class="kt-align-right kt-font-bold">
                                <number-display :value="data.rateCOE.totalMemberCOE" />
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                enrollment: null,
                isLoaded: false,
                data:[],
                seriesCOE: [],
                chartOptionsCOE: {
                    chart: {
                        height: 350,
                        type: 'radialBar',
                        toolbar: {
                            show: true
                        }
                    },
                    plotOptions: {
                        radialBar: {
                            startAngle: -135,
                            endAngle: 225,
                            hollow: {
                                margin: 0,
                                size: '70%',
                                background: '#fff',
                                image: undefined,
                                imageOffsetX: 0,
                                imageOffsetY: 0,
                                position: 'front',
                                dropShadow: {
                                    enabled: true,
                                    top: 3,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.24
                                }
                            },
                            track: {
                                background: '#fff',
                                strokeWidth: '67%',
                                margin: 0, // margin is in pixels
                                dropShadow: {
                                    enabled: true,
                                    top: -3,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.35
                                }
                            },

                            dataLabels: {
                                show: true,
                                name: {
                                    offsetY: 50,
                                    show: true,
                                    color: '#888',
                                    fontSize: '17px'
                                },
                                value: {
                                    formatter: function (val) {
                                        return parseInt(val)+' %';
                                    },
                                    color: '#111',
                                    fontSize: '36px',
                                    show: true,
                                }
                            }
                        }
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shade: 'dark',
                            type: 'horizontal',
                            shadeIntensity: 0.5,
                            gradientToColors: ['#ABE5A1'],
                            inverseColors: true,
                            opacityFrom: 1,
                            opacityTo: 1,
                            stops: [0, 100]
                        }
                    },
                    stroke: {
                        lineCap: 'round'
                    },
                    labels: [''],
                },
            }
        },
        watch: {
            'enrollment'() {
                this.getData();
            }
        },
        methods: {
            getData() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'dashboardAbroad',
                        fn: 'get-Rate-COE-by-enrollment',
                        enrollment: this.enrollment

                    }
                })
                    .then(response => {
                        loading.hide();
                        this.data = response.data;
                        //Char COE
                        let percent = response.data.rateCOE.totalMember ? parseInt(response.data.rateCOE.totalMemberCOE / response.data.rateCOE.totalMember * 100) : 30;
                        this.seriesCOE = [percent];
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