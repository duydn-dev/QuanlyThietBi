<template>

    <div class="row">
        <div class="col-xl-12 order-lg-1 order-xl-1">
            <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                <div class="kt-portlet__head kt-portlet__head--lg kt-portlet__head--noborder kt-portlet__head--break-sm">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title">
                            Thống kê hồ sơ theo chi nhánh
                        </h3>
                    </div>
                </div>
                <div class="kt-portlet__body kt-portlet__body--fit">
                    <div align="right">
                        <div class="form-group col-md-3 float-right">
                            <label>Chọn loại hình du học</label>
                            <fselect v-model="memberTypeId"
                                     :options="allTypes" v-if="allTypes.length>0" placeholder="---Tất cả---" />
                        </div>
                    </div>
                    <!--begin: Datatable -->
                    <div class="kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--scroll kt-datatable--loaded" id="kt_datatable_latest_orders" style="">
                        <table class="table table-bordered table-striped table-hover table-sm mt-3">
                            <thead>
                                <tr>
                                    <th rowspan="2">#</th>
                                    <th rowspan="2">Chi nhánh</th>
                                    <th rowspan="2">Tổng số</th>
                                    <th colspan="5">Dựng hồ sơ</th>
                                    <!--<th colspan="4">Gửi trường</th>
                                    <th colspan="2">Gửi Cục</th>
                                    <th colspan="4">Nộp tiền</th>-->
                                    <!--<th colspan="4">Làm Visa</th>
                                    <th colspan="3">Hoàn thành</th>
                                    <th colspan="5">Hủy hồ sơ</th>-->
                                </tr>
                                <tr>
                                    <td>Đang nhập</td>
                                    <td>Đã nhập</td>
                                    <td>Đang dịch</td>
                                    <td>Đã dịch</td>
                                    <td>Dựng</td>
                                    <!--<td>Đã gửi - Chờ PV</td><td>Đậu PV</td><td>Gửi bản Scan</td><td>Gửi bản gốc</td><td>Đã gửi</td><td>Đậu COE</td><td>Đang đợi</td><td>Đã nộp</td><td>Gửi điện tín</td><td>Đã Có thư mời</td>-->
                                    <!--<td>Chờ xếp lịch</td>
                                    <td>Đợi PV</td>
                                    <td>Chờ kết quả</td>
                                    <td>OK</td>
                                    <td>Chờ bay</td>
                                    <td>Đã xuất cảnh</td>
                                    <td>Đã tổng hợp</td>
                                    <td>Trường từ chối</td>
                                    <td>Trượt trường</td>
                                    <td>Trượt COE</td>
                                    <td>Trượt Visa</td>
                                    <td>Hủy - khác</td>-->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in statistic" :key="index">
                                    <td class="text-center">{{index+1}}</td>
                                    <td>{{item.companyBranchName}}</td>
                                    <td class="text-center">{{item.countTotal}}</td>
                                    <td class="text-center">{{CountInputProfile(item.profileStatus)}}</td>
                                    <td class="text-center">{{CountInputedProfile(item.profileStatus)}}</td>
                                    <td class="text-center">{{CountTranslateProfile(item.profileStatus)}}</td>
                                    <td class="text-center">{{CountTranslatedProfile(item.profileStatus)}}</td>
                                    <td class="text-center">{{CountBuildProfile(item.profileStatus)}}</td>
                                    <!--<td class="text-center">{{CountSchoolStatus(item.status)}}</td>-->
                                    <!--<td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>-->
                                    <!--<td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>-->
                                    <!--<td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>-->
                                </tr>


                                <!--<tr><td>2</td><td>O2 THÁI NGUYÊN</td><td>26</td><td class="text-center">23</td><td class="text-center">3</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>
                                <tr><td>3</td><td>O2 HẢI PHÒNG - HURECO</td><td>14</td><td class="text-center">11</td><td class="text-center">1</td><td class="text-center"></td><td class="text-center">2</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>
                                <tr><td>4</td><td>O2 BẮC GIANG</td><td>39</td><td class="text-center">24</td><td class="text-center">5</td><td class="text-center">5</td><td class="text-center">3</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td></tr>
                                <tr><td>5</td><td>O2 THĂNG LONG</td><td>13</td><td class="text-center">9</td><td class="text-center">1</td><td class="text-center"></td><td class="text-center">3</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>
                                <tr><td>6</td><td>O2 HÀ NỘI</td><td>26</td><td class="text-center">17</td><td class="text-center">4</td><td class="text-center"></td><td class="text-center">3</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>
                                <tr><td>7</td><td>O2 BẮC NINH</td><td>7</td><td class="text-center">4</td><td class="text-center">2</td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>
                                <tr><td>8</td><td>O2 HẢI DƯƠNG</td><td>23</td><td class="text-center">11</td><td class="text-center">6</td><td class="text-center">2</td><td class="text-center">1</td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>
                                <tr><td>9</td><td>O2 NAM ĐỊNH - NINACO</td><td>28</td><td class="text-center">21</td><td class="text-center">2</td><td class="text-center"></td><td class="text-center">5</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>
                                <tr><td>10</td><td>O2 THÁI BÌNH</td><td>18</td><td class="text-center">12</td><td class="text-center">6</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>
                                <tr><td>11</td><td>O2 Nghệ An</td><td>12</td><td class="text-center">7</td><td class="text-center">1</td><td class="text-center"></td><td class="text-center">4</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>
                                <tr><td>12</td><td>O2 Đồng Tháp</td><td>11</td><td class="text-center"></td><td class="text-center">1</td><td class="text-center">2</td><td class="text-center">6</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">2</td></tr>
                                <tr><td>13</td><td>ĐĂK LĂK</td><td>25</td><td class="text-center">15</td><td class="text-center"></td><td class="text-center">1</td><td class="text-center">4</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center">3</td></tr>
                                <tr><td>14</td><td>O2 Gia Lai</td><td>10</td><td class="text-center">8</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">2</td></tr>
                                <tr><td>15</td><td>O2 Cần Thơ - INMEKO</td><td>39</td><td class="text-center">32</td><td class="text-center"></td><td class="text-center">2</td><td class="text-center">3</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td></tr>
                                <tr><td>16</td><td>O2 Cà Mau</td><td>17</td><td class="text-center">12</td><td class="text-center"></td><td class="text-center">1</td><td class="text-center">2</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td></tr>
                                <tr><td>17</td><td>O2 HCM</td><td>47</td><td class="text-center">28</td><td class="text-center">1</td><td class="text-center">3</td><td class="text-center">4</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center">4</td><td class="text-center"></td><td class="text-center"></td><td class="text-center">4</td><td class="text-center"></td><td class="text-center">2</td></tr>
                                <tr><td>18</td><td>LẦM ĐỒNG</td><td>15</td><td class="text-center">7</td><td class="text-center"></td><td class="text-center">1</td><td class="text-center">4</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>
                                <tr><td>19</td><td>KHÁNH HÒA</td><td>5</td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center">2</td></tr>
                                <tr><td>20</td><td>O2 THANH HÓA</td><td>8</td><td class="text-center">2</td><td class="text-center"></td><td class="text-center">4</td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td></tr>
                                <tr><td>21</td><td>O2 Bình Dương</td><td>4</td><td class="text-center">4</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>
                                <tr><td>22</td><td>O2 PHÚ THỌ</td><td>9</td><td class="text-center">3</td><td class="text-center"></td><td class="text-center"></td><td class="text-center">4</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td></tr>
                                <tr><td>23</td><td>CN-Test</td><td>4</td><td class="text-center">2</td><td class="text-center">1</td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>
                                <tr><td>24</td><td>O2 TT Huế</td><td>2</td><td class="text-center">1</td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>
                                <tr><td>25</td><td>O2 Tây Nguyên</td><td>6</td><td class="text-center">4</td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center">1</td><td class="text-center"></td></tr>-->
                                <tr style="color:blue">
                                    <td colspan="2" class="text-center">Tổng số</td>
                                    <td class="text-center">{{SumCountTotal(statistic)}}</td>
                                    <td class="text-center">{{SumCountInputProfile(statistic)}}</td>
                                    <td class="text-center">{{SumCountInputedProfile(statistic)}}</td>
                                    <td class="text-center">{{SumCountTranslateProfile(statistic)}}</td>
                                    <td class="text-center">{{SumCountTranslatedProfile(statistic)}}</td>
                                    <td class="text-center">{{SumCountBuildProfile(statistic)}}</td>
                                    <!--<td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>-->
                                    <!--<td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>-->
                                    <!--<td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>-->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--end: Datatable -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'abroad-statistic-by-branch',
        props: {
            branchId: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                statistic: [],
                memberTypeId: null,
                allTypes: [],
            }
        },
        methods: {
            listTypes() {
                this.$http({
                    data: {
                        m: 'abroadmember',
                        fn: 'list-types'
                    }
                })
                    .then(res => {
                        this.allTypes = res.data
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });

            },
            doStatistics() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        fn: "get-list-data",
                        m: "abroadStatistic",
                        memberTypeId: this.memberTypeId,
                        branchId: this.branchId
                    }
                }).then(response => {
                    loading.hide();
                    this.statistic = response.data;
                    console.log('412341', this.statistic);

                    this.$emit('data', this.statistic);
                })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            },
            CountInputProfile(val) {
                let s = _.countBy(val, (o) => {
                    return o == 1;
                }).true;
                return s ? s : 0;
            },
            CountInputedProfile(val) {
                let s = _.countBy(val, (o) => {
                    return o == -1;
                }).true;
                return s ? s : 0;
            },
            CountTranslateProfile(val) {
                let s = _.countBy(val, (o) => {
                    return o == 2;
                }).true;
                return s ? s : 0;
            },
            CountTranslatedProfile(val) {
                let s = _.countBy(val, (o) => {
                    return o == -2;
                }).true;
                return s ? s : 0;
            },
            CountBuildProfile(val) {
                let s = _.countBy(val, (o) => {
                    return o == 3;
                }).true;
                return s ? s : 0;
            },
            CountSchoolStatus(val) {
                let s = _.countBy(val, (o) => {
                    return o == 3;
                }).true;
                return s ? s : 0;
            },
            SumCountTotal(val) {
                let sum = 0;
                _.each(val, (o) => {
                    sum = sum + o.countTotal;
                });
                return sum;
            },
            SumCountInputProfile(val) {
                let sum = 0;
                _.each(val, (o) => {
                    sum = sum + this.CountInputProfile(o.profileStatus);
                });
                return sum;
            },
            SumCountInputedProfile(val) {
                let sum = 0;
                _.each(val, (o) => {
                    sum = sum + this.CountInputedProfile(o.profileStatus);
                });
                return sum;
            },
            SumCountTranslateProfile(val) {
                let sum = 0;
                _.each(val, (o) => {
                    sum = sum + this.CountTranslateProfile(o.profileStatus);
                });
                return sum;
            },
            SumCountTranslatedProfile(val) {
                let sum = 0;
                _.each(val, (o) => {
                    sum = sum + this.CountTranslatedProfile(o.profileStatus);
                });
                return sum;
            },
            SumCountBuildProfile(val) {
                let sum = 0;
                _.each(val, (o) => {
                    sum = sum + this.CountBuildProfile(o.profileStatus);
                });
                return sum;
            }
        },
        watch: {
            'memberTypeId'() {
                this.doStatistics();
            }
        },
        created() {
            this.listTypes();
            this.doStatistics();
        }
    }
</script>
