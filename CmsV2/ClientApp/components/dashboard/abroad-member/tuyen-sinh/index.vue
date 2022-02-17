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
                                <h6 class="text-uppercase mb-3">Học sinh chờ thi</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalMemeberWaitInterviewPeriod" />
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
                                <h6 class="text-uppercase mb-3">Học sinh hủy bỏ</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalMemberCancel" />
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
                                <i class="fa fa-graduation-cap float-right"></i>
                            </div>
                            <div class="text-white">
                                <h6 class="text-uppercase mb-3">Tổng học sinh</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalMember" />
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
                                <i class="fa fa-handshake float-right"></i>
                            </div>
                            <div class="text-white">
                                <h6 class="text-uppercase mb-3">Tổng cộng tác viên</h6>
                                <h4 class="mb-4">
                                    <label style="margin-bottom: 0px;">
                                        <animated-number-display :value="data.totalCollaborator" />
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
                                <h3 class="kt-portlet__head-title">Biểu đồ tăng trưởng: Số lượng học sinh theo tháng</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <!--begin::k-widget4-->
                            <div class="kt-widget4">
                                <div class="kt-widget14__chart" style="width: 100%;">
                                    <apexchart type="line" width="100%" :options="chartOptions" :series="series" v-if="isLoaded" />
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
                                <h3 class="kt-portlet__head-title">Biểu đồ tỉ trọng các dịch vụ</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <!--begin::k-widget4-->
                            <div class="kt-widget4">
                                <div class="kt-widget14__chart" style="width: 100%;">
                                    <apexchart type=donut width="80%" :options="chartOptionsService" :series="seriesService" v-if="isLoaded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-12 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Học sinh mới</h3>
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
                                                Giới tính
                                            </th>
                                            <th>
                                                Chi nhánh
                                            </th>
                                            <th>
                                                Loại hình
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="kt-datatable__body">
                                        <tr v-for="(item,index) in data.listNewMemeber" :key="index">
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
                                                <data-label :value="item.gender" type="gender"></data-label>
                                            </td>
                                            <td>
                                                {{_.find(appSettings.branchList,['id',item.branchId])?_.find(appSettings.branchList,['id',item.branchId]).name:'--'}}
                                            </td>
                                            <td>
                                                {{item.memberTypeName}}
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
                                <h3 class="kt-portlet__head-title">Học sinh hủy</h3>
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
                                        <tr v-for="(item,index) in data.listMemeberCancel" :key="index">
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
                <!--<div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    begin:: Widgets/Download Files
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">h/s bay trong : tuần - tháng - năm</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            begin::k-widget4
                            <div class="kt-widget4">
                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">Dương Minh Hiếu</a>
                                    <div class="kt-widget4__tools">20,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">Phùng Anh Tú</a>
                                    <div class="kt-widget4__tools">24,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">Bùi Ngọc Dư</a>
                                    <div class="kt-widget4__tools">23,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">Đàm Quang Tuyển</a>
                                    <div class="kt-widget4__tools">10,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">Đào Văn Dương</a>
                                    <div class="kt-widget4__tools">15,000,000</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    begin:: Widgets/Download Files
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Học viên mới nhập cảnh</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            begin::k-widget4
                            <div class="kt-widget4">
                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">Dương Minh Hiếu</a>
                                    <div class="kt-widget4__tools">20,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">Phùng Anh Tú</a>
                                    <div class="kt-widget4__tools">24,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">Bùi Ngọc Dư</a>
                                    <div class="kt-widget4__tools">23,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">Đàm Quang Tuyển</a>
                                    <div class="kt-widget4__tools">10,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">Đào Văn Dương</a>
                                    <div class="kt-widget4__tools">15,000,000</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    begin:: Widgets/Download Files
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Học sinh mới có COE</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            begin::k-widget4
                            <div class="kt-widget4">
                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">Nguyễn Thị Thủy</a>
                                    <div class="kt-widget4__tools">2,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">Lê Xuân Qúy</a>
                                    <div class="kt-widget4__tools">4,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">Nguyễn Văn Thiệu</a>
                                    <div class="kt-widget4__tools">3,500,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">Nguyễn Văn Toàn</a>
                                    <div class="kt-widget4__tools">3,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">Nguyễn Văn Hiếu</a>
                                    <div class="kt-widget4__tools">6,000,000</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>-->


                <div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Cộng tác viên mới</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <!--begin::k-widget4-->
                            <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                                <thead class="kt-datatable__head">
                                    <tr>
                                        <th>
                                            Mã CTV
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
                                    <tr v-for="(item,index) in data.listNewCollaborator" :key="index">
                                        <td>
                                            {{item.code}}
                                        </td>
                                        <td>
                                            {{item.fullName}}
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
                <div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    <!--begin:: Widgets/Download Files-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Top 10 CTV tốt nhất</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                                <thead class="kt-datatable__head">
                                    <tr>
                                        <th>
                                            Mã CTV
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
                                        <th>
                                            SL học viên giới thiệu
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="kt-datatable__body">
                                    <tr v-for="(item,index) in data.ListGoodCollaborator" :key="index">
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
                                        <td>
                                            <number-display :value="item.countMember" />
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
                                    </tr>
                                </thead>
                                <tbody class="kt-datatable__body">
                                    <tr v-for="(item,index) in data.listNewLaborOrder" :key="index">
                                        <td class="cursor-pointer">
                                            <RouterLink :to="`/ts/labor-order/${item.id}`">{{item.code}}</RouterLink>
                                        </td>
                                        <td class="cursor-pointer">
                                            <RouterLink :to="`/ts/labor-order/${item.id}`"> {{item.name}}</RouterLink>
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
                                <h3 class="kt-portlet__head-title">Đơn hàng đang tuyển</h3>
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
                                    <tr v-for="(item,index) in data.listRecruitingLaborOrder" :key="index">
                                        <td class="cursor-pointer">
                                            <RouterLink :to="`/ts/labor-order/${item.id}`">{{item.code}}</RouterLink>
                                        </td>
                                        <td class="cursor-pointer">
                                            <RouterLink :to="`/ts/labor-order/${item.id}`">{{item.name}}</RouterLink>

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
                                <h3 class="kt-portlet__head-title">Đơn cần gấp</h3>
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
                                    <tr v-for="(item,index) in data.listUrentLaborOrder" :key="index">
                                        <td class="cursor-pointer">
                                            <RouterLink :to="`/ts/labor-order/${item.id}`">{{item.code}}</RouterLink>
                                        </td>
                                        <td class="cursor-pointer">
                                            <RouterLink :to="`/ts/labor-order/${item.id}`"> {{item.name}}</RouterLink>
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
                <!--<div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    begin:: Widgets/Download Files
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Duyệt Ds thi tuyển</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            begin::k-widget4
                            <div class="kt-widget4">
                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">KOBE TOYO</a>
                                    <div class="kt-widget4__tools">90,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">UNITAS KOFU</a>
                                    <div class="kt-widget4__tools">40,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">UNITAS TOKYO</a>
                                    <div class="kt-widget4__tools">120,500,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">TOUA 分校者</a>
                                    <div class="kt-widget4__tools">93,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">JOHOKU</a>
                                    <div class="kt-widget4__tools">86,000,000</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>-->
                <!--<div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
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
                </div>
                <div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    begin:: Widgets/Download Files
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">H.s thi trượt mới</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                                <thead class="kt-datatable__head">
                                    <tr>
                                        <th>
                                            Tên HV
                                        </th>
                                        <th>
                                            Đơn hàng
                                        </th>
                                        <th>
                                            Ngày
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="kt-datatable__body">
                                    <tr v-for="(item,index) in data.listNewMemberByExamFail" :key="index">
                                        <td>
                                            {{item.laborMemberName}}
                                        </td>
                                        <td>
                                            {{item.laborOrderName}}
                                        </td>
                                        <td>
                                            {{item.createdDate | moment('DD/MM/YYYY')}}
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
                                <h3 class="kt-portlet__head-title">H/s thi đỗ mới</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <table class="kt-datatable__table table-striped table-hover table-bordered" width="100%">
                                <thead class="kt-datatable__head">
                                    <tr>
                                        <th>
                                            Tên HV
                                        </th>
                                        <th>
                                            Đơn hàng
                                        </th>
                                        <th>
                                            Ngày
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="kt-datatable__body">
                                    <tr v-for="(item,index) in data.listNewMemberByExamPass" :key="index">
                                        <td>
                                            {{item.laborMemberName}}
                                        </td>
                                        <td>
                                            {{item.laborOrderName}}
                                        </td>
                                        <td>
                                            {{item.createdDate | moment('DD/MM/YYYY')}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>-->
                <!--<div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    begin:: Widgets/Download Files
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">H/s bị từ chối thi tuyển</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            begin::k-widget4
                            <div class="kt-widget4">
                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">KOBE TOYO</a>
                                    <div class="kt-widget4__tools">90,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">UNITAS KOFU</a>
                                    <div class="kt-widget4__tools">40,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">UNITAS TOKYO</a>
                                    <div class="kt-widget4__tools">120,500,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">TOUA 分校者</a>
                                    <div class="kt-widget4__tools">93,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">JOHOKU</a>
                                    <div class="kt-widget4__tools">86,000,000</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                    begin:: Widgets/Download Files
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">H/s bị từ chối thi tuyển</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            begin::k-widget4
                            <div class="kt-widget4">
                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">KOBE TOYO</a>
                                    <div class="kt-widget4__tools">90,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">UNITAS KOFU</a>
                                    <div class="kt-widget4__tools">40,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">UNITAS TOKYO</a>
                                    <div class="kt-widget4__tools">120,500,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">TOUA 分校者</a>
                                    <div class="kt-widget4__tools">93,000,000</div>
                                </div>

                                <div class="kt-widget4__item">
                                    <a href="#" class="kt-widget4__title">JOHOKU</a>
                                    <div class="kt-widget4__tools">86,000,000</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>-->
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
                        m: 'dashboardAbroad',
                        fn: 'get-data-ts',

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