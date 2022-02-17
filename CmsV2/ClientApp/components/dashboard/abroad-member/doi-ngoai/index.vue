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
                                <i class="fa fa-building float-right"></i>
                            </div>
                            <div class="text-white">
                                <h6 class="text-uppercase mb-3">Tổng số trường</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalAbroadSchool"></animated-number-display>
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
                                <h6 class="text-uppercase mb-3">Tổng số trường có học bổng</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalAbroadSchoolHasScholarship"></animated-number-display>
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
                                <h6 class="text-uppercase mb-3">Tổng số trường hỗ trợ việc làm thêm cho DHS</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalAbroadSchoolHasPartTimeJob"></animated-number-display>
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
                                <h6 class="text-uppercase mb-3">Tổng số trường có tỉ lệ CEO trên 85%</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalAbroadSchoolCOEMoreThan"></animated-number-display>
                                    </label>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div class="col-xl-3 col-md-3">
                    <div class="card card-finance">
                        <div class="card-body">
                            <div class="card-finance-icon">
                                <i class="fa fa-user float-right"></i>
                            </div>
                            <div class="text-white">
                                <h6 class="text-uppercase mb-3">Tổng số công ty</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="countCompany(data.listSyndicationAndCompany)" />
                                    </label>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>-->
                <div class="col-xl-3 col-md-3">
                    <div class="card card-finance">
                        <div class="card-body">
                            <div class="card-finance-icon">
                                <i class="fa fa-file float-right"></i>
                            </div>
                            <div class="text-white">
                                <h6 class="text-uppercase mb-3">Tổng số kỳ tuyển</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalInterviewPeriod" />
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
                                <h6 class="text-uppercase mb-3">Tổng học sinh bay</h6>
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
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Kỳ tuyển theo tháng</h3>
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
                                <h3 class="kt-portlet__head-title">Kỳ tuyển mới mới</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                                <thead class="kt-datatable__head">
                                    <tr>
                                        <th>
                                            Mã KT
                                        </th>
                                        <th>
                                            Tên kỳ tuyển
                                        </th>
                                        <th>
                                            Tên trường
                                        </th>
                                        <th>Chỉ tiêu</th>
                                    </tr>
                                </thead>
                                <tbody class="kt-datatable__body">
                                    <tr v-for="(item,index) in data.listAbroadSchoolInterviewPeriod" :key="index">
                                        <td class="cursor-pointer">
                                            <RouterLink :to="`/abroad-school-interview-period/${item.id}`">{{item.code}}</RouterLink>
                                        </td>
                                        <td class="cursor-pointer">
                                            <RouterLink :to="`/abroad-school-interview-period/${item.id}`">{{item.title}}</RouterLink>
                                        </td>
                                        <td>
                                            {{item.nameSchool}}
                                        </td>
                                        <td>
                                            <number-display :value="item.numberOfRecruitment"></number-display>
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
                    <listMemberBoughtAirticket></listMemberBoughtAirticket>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import listMemberBoughtAirticket from './component/list-member-bought-airticket';
    export default {
        components: {
            listMemberBoughtAirticket
        },
        props: [],
        data() {
            return {
                typeDateFilter: 1,
                data: [],
                isLoaded: false,
                series: [{
                    name: 'Đã duyệt',
                    data: [],
                }, {
                    name: 'Chưa duyệt',
                    data: []
                }],
                chartOptions: {
                    chart: {
                        type: 'bar',
                        height: 350,
                        stacked: true,
                        toolbar: {
                            show: true
                        },
                        zoom: {
                            enabled: true
                        }
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            legend: {
                                position: 'bottom',
                                offsetX: -10,
                                offsetY: 0
                            }
                        }
                    }],
                    plotOptions: {
                        bar: {
                            horizontal: false,
                        },
                    },
                    xaxis: {
                        type: 'string',
                        categories: [
                        ],
                        labels: {
                            show: true,
                            rotate: -45,
                            rotateAlways: false,
                        }
                    },
                    legend: {
                        position: 'right',
                        offsetY: 40
                    },
                    fill: {
                        opacity: 1,
                        colors: ['#00e396', '#feb019']
                    },
                    colors: ['#00e396', '#feb019']
                },
            }
        },
        methods: {
            getDataDashboard() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'dashboardAbroad',
                        fn: 'get-data-dn',
                        typeDateFilter: this.typeDateFilter

                    }
                })
                    .then(response => {
                        loading.hide();
                        this.data = response.data;
                        //Chart Số lượng học viên theo tháng
                        this.series[0].data = _.map(response.data.listAbroadMemberInterviewPeriodGroupByMonth, 'countAbroadInterviewPeriodPass');
                        this.series[1].data = _.map(response.data.listAbroadMemberInterviewPeriodGroupByMonth, 'countAbroadInterviewPeriodNotPass');
                        this.chartOptions.xaxis.categories = _.map(response.data.listAbroadMemberInterviewPeriodGroupByMonth, 'key');
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