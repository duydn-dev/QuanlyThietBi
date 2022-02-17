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
                                <h6 class="text-uppercase mb-3">Tổng số nghiệp đoàn</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display v-if="data.listSyndicationAndCompany" :value="data.listSyndicationAndCompany.length"></animated-number-display>
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
                </div>
                <div class="col-xl-3 col-md-3">
                    <div class="card card-finance">
                        <div class="card-body">
                            <div class="card-finance-icon">
                                <i class="fa fa-file float-right"></i>
                            </div>
                            <div class="text-white">
                                <h6 class="text-uppercase mb-3">Tổng đơn hàng tuyển</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalOrder" />
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
                                        <animated-number-display :value="data.totalMemberExport" />
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
                                <h3 class="kt-portlet__head-title">Đơn hàng tuyển theo tháng</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <!--begin::k-widget4-->
                            <div class="kt-widget4">
                                <div class="kt-widget14__chart" style="width: 100%;">
                                    <apexchart type="area" width="100%" :options="chartOptions" :series="series" v-if="isLoaded" />
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
                                <h3 class="kt-portlet__head-title">Đơn hàng mới</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                                <thead class="kt-datatable__head">
                                    <tr>
                                        <th>
                                            Mã ĐH
                                        </th>
                                        <th>
                                            Tên
                                        </th>
                                        <th>
                                            Nghiệp đoàn
                                        </th>
                                        <th>
                                            Ngành nghề
                                        </th>
                                        <th>Chỉ tiêu</th>
                                    </tr>
                                </thead>
                                <tbody class="kt-datatable__body">
                                    <tr v-for="(item,index) in data.listNewLaborOrder" :key="index">
                                        <td class="cursor-pointer">
                                            <RouterLink :to="`/labor-order/${item.id}`">{{item.code}}</RouterLink>
                                        </td>
                                        <td class="cursor-pointer">
                                            <RouterLink :to="`/labor-order/${item.id}`">{{item.name}}</RouterLink>
                                        </td>
                                        <td>
                                            {{item.syndicationName}}
                                        </td>
                                        <td>
                                            <data-label :value="item.careerId" type="job_title" lang="vi" />
                                        </td>
                                        <td>
                                            <badgeOrderQuantityMember :man="item.quantityMan" :women="item.quantityWoman" :all="item.unlimitedRecruitment" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!--<div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    begin:: Widgets/Download Files
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Đơn hàng đã duyệt</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                                <thead class="kt-datatable__head">
                                    <tr>
                                        <th>
                                            Mã ĐH
                                        </th>
                                        <th>
                                            Tên
                                        </th>
                                        <th>
                                            Nghiệp đoàn
                                        </th>
                                        <th>
                                            Ngành nghề
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="kt-datatable__body">
                                    <tr v-for="(item,index) in data.listNewLaborOrderIsConfirmation" :key="index">
                                        <td class="cursor-pointer">
                                            <RouterLink :to="`/labor-order/${item.id}`">{{item.code}}</RouterLink>
                                        </td>
                                        <td class="cursor-pointer">
                                            <RouterLink :to="`/labor-order/${item.id}`">{{item.name}}</RouterLink>
                                        </td>
                                        <td>
                                            {{item.syndicationName}}
                                        </td>
                                        <td>
                                            <data-label :value="item.careerId" type="job_title" lang="vi" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    begin:: Widgets/Download Files
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Đơn hàng chờ duyệt</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                                <thead class="kt-datatable__head">
                                    <tr>
                                        <th>
                                            Mã ĐH
                                        </th>
                                        <th>
                                            Tên
                                        </th>
                                        <th>
                                            Nghiệp đoàn
                                        </th>
                                        <th>
                                            Ngành nghề
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="kt-datatable__body">
                                    <tr v-for="(item,index) in data.listNewLaborOrderWaitConfirmation" :key="index">
                                        <td class="cursor-pointer">
                                            <RouterLink :to="`/labor-order/${item.id}`">{{item.code}}</RouterLink>
                                        </td>
                                        <td class="cursor-pointer">
                                            <RouterLink :to="`/labor-order/${item.id}`">{{item.name}}</RouterLink>
                                        </td>
                                        <td>
                                            {{item.syndicationName}}
                                        </td>
                                        <td>
                                            <data-label :value="item.careerId" type="job_title" lang="vi" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>-->
                
                <div class="col-xl-6 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Nghiệp đoàn có doanh thu cao</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                                <thead class="kt-datatable__head">
                                    <tr>
                                        <th>
                                            Mã NĐ
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
                                    <tr v-for="(item,index) in data.listSyndicationMostRevenue" :key="index">
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
                <!--<div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    begin:: Widgets/Download Files
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Học sinh đã có tư cách lưu trú</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            begin::k-widget4
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
                                        <tr v-for="(item,index) in data.listMemberHasResidence" :key="index">
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
                    begin:: Widgets/Download Files
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Học sinh sắp về nước</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            begin::k-widget4
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
                                        <tr v-for="(item,index) in data.listMemberComeback" :key="index">
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
                    begin:: Widgets/Download Files
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Sự vụ mới</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                                <thead class="kt-datatable__head">
                                    <tr>
                                        <th>
                                            Sự vụ
                                        </th>
                                        <th>
                                            Học viên
                                        </th>
                                        <th>
                                            Trạng thái
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="kt-datatable__body">
                                    <tr v-for="(item,index) in data.listNewIncident" :key="index">
                                        <td>
                                            {{item.title}}
                                        </td>
                                        <td>
                                            {{item.laborMemberName}}
                                        </td>
                                        <td>
                                            <span v-if="item.status==0">Chưa xử lý</span>
                                            <span v-if="item.status==1">Đã xử lý</span>
                                            <span v-if="item.status==2">Đang xử lý</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>-->
            </div>
        </div>
    </div>
</template>
<script>
    import badgeOrderQuantityMember from '../../../_common/badge-order-quantity-member';
    import listMemberBoughtAirticket from './component/list-member-bought-airticket';
    export default {
        components: {
            badgeOrderQuantityMember,listMemberBoughtAirticket
        },
        props: [],
        data() {
            return {
                typeDateFilter:1,
                data: [],
                isLoaded: false,
                series: [{
                    name: 'Đã duyệt',
                    data: []
                }, {
                    name: 'Chưa duyệt',
                    data: []
                }],
                chartOptions: {
                    chart: {
                        height: 350,
                        type: 'area'
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    xaxis: {
                        type: 'string',
                        categories: []
                    },
                    tooltip: {
                        x: {
                            format: ''
                        },
                    },
                },
            }
        },
        methods: {
            getDataDashboard() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'dashboardLabor',
                        fn: 'get-data-dn',
                        typeDateFilter: this.typeDateFilter

                    }
                })
                    .then(response => {
                        loading.hide();
                        this.data = response.data;
                        //Chart Số lượng học viên theo tháng
                        this.series[0].data = _.map(response.data.listOrderGroupByIsconfirm, 'countIsConfirm');
                        this.series[1].data = _.map(response.data.listOrderGroupByIsconfirm, 'countNotIsConfirm');
                        this.chartOptions.xaxis.categories = _.map(response.data.listOrderGroupByIsconfirm, 'key');
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