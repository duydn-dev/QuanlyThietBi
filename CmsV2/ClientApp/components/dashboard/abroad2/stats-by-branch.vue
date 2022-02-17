<template>
    <div class="row">
        <div class="col-xl-12 order-lg-1 order-xl-1">
            <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                <div class="kt-portlet__head kt-portlet__head--lg kt-portlet__head--noborder kt-portlet__head--break-sm">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title">
                            Thống kê hồ sơ
                        </h3>
                    </div>
                </div>
                <div align="right">
                    <div class="form-group col-md-3 float-right">
                        <label>Chọn loại hình du học</label>
                        <fselect v-model="memberTypeId"
                                 :options="allTypes" v-if="allTypes.length>0" placeholder="---Tất cả---" />
                    </div>
                </div>
                <div class="kt-portlet__body kt-portlet__body--fit">
                    <!--begin: Datatable -->
                    <div class="kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--scroll kt-datatable--loaded" id="kt_datatable_latest_orders" style="">
                        <table class="kt-datatable__table mt-3">
                            <thead>
                                <tr>
                                    <th rowspan="2">#</th>
                                    <th rowspan="2">Họ tên HV</th>
                                    <th rowspan="2">Tổng số</th>
                                    <th class="text-center" colspan="6">Dựng hồ sơ</th>
                                    <!--<th colspan="4">Gửi trường</th>
                        <th colspan="2">Gửi Cục</th>
                        <th colspan="4">Nộp tiền</th>-->
                                </tr>
                                <tr>
                                    <td class="text-center" v-if="isPermission(['AbroadMemberFormInput'])">Đang nhập</td>
                                    <td class="text-center" v-if="isPermission(['AbroadMemberFormInput'])">Đã nhập</td>
                                    <td class="text-center">Nhập Lỗi</td>
                                    <td class="text-center" v-if="isPermission(['AbroadMemberFormTranslate'])">Đang dịch</td>
                                    <td class="text-center" v-if="isPermission(['AbroadMemberFormTranslate'])">Đã dịch</td>
                                    <td class="text-center">Dựng</td>
                                    <!--<td>Đã gửi - Chờ PV</td><td>Đậu PV</td><td>Gửi bản Scan</td><td>Gửi bản gốc</td><td>Đã gửi</td><td>Đậu COE</td><td>Đang đợi</td><td>Đã nộp</td><td>Gửi điện tín</td><td>Đã Có thư mời</td>-->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in statistic" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>
                                        <router-link :to="`/abroad-member/detail/${item.aboardMemberId}`" v-if="isPermission(['AbroadMemberFormInput'])" style="color:black">
                                             {{item.aboardMemberName}}
                                        </router-link> 
                                    </td>
                                    <td>1</td>
                                    <td class="text-center"  v-if="isPermission(['AbroadMemberFormInput'])">{{item.countInputing}}</td>
                                    <td class="text-center"  v-if="isPermission(['AbroadMemberFormInput'])">{{item.countInputDone}}</td>
                                    <td class="text-center" :class="{'bg-danger text-white':item.countInputError>0}">{{item.countInputError}}</td>
                                    <td class="text-center"  v-if="isPermission(['AbroadMemberFormTranslate'])">{{item.countTranslating}}</td>
                                    <td class="text-center" v-if="isPermission(['AbroadMemberFormTranslate'])">{{item.countTranslateDone}}</td>
                                    <!--<td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>-->
                                    <td class="text-center"></td>
                                </tr>
                                <tr style="color:blue">
                                    <td colspan="2">Tổng số</td>
                                    <td class="text-center">{{statistic.length}}</td>
                                    <td class="text-center">{{SumCountInputing(statistic)}}</td>
                                    <td class="text-center">{{SumCountInputDone(statistic)}}</td>
                                    <td class="text-center">{{SumCountInputError(statistic)}}</td>
                                    <td class="text-center">{{SumCountTranslating(statistic)}}</td>
                                    <td class="text-center">{{SumCountTranslateDone(statistic)}}</td>
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
                                    <td>-</td>
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
            inputStaff: {
                type: Boolean,
                default: true
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
                        fn: "get-list-data-personal",
                        m: "abroadStatistic",
                        memberTypeId: this.memberTypeId,
                        onlyInput: true
                    }
                }).then(response => {
                    loading.hide();
                    this.statistic = response.data;
                    console.log('13413413431234', response);
                    this.$emit('data', this.statistic);
                })
                    .catch(err => {
                        loading.hide();
                    return this.$message(err.message, 'error');
                });
            },
            SumCountInputing(list) {
                let sum = 0;
                _.each(list, (o) => {
                    sum += o.countInputing;
                });
                return sum;
            },
            SumCountInputDone(list) {
                let sum = 0;
                _.each(list, (o) => {
                    sum += o.countInputDone;
                });
                return sum;
            },
            SumCountTranslating(list) {
                let sum = 0;
                _.each(list, (o) => {
                    sum += o.countTranslating;
                });
                return sum;
            },
            SumCountTranslateDone(list) {
                let sum = 0;
                _.each(list, (o) => {
                    sum += o.countTranslateDone;
                });
                return sum;
            },
            SumCountInputError(list) {
                let sum = 0;
                _.each(list, (o) => {
                    sum += o.countInputError;
                });
                return sum;
            },
            CountTranslateProfile(val) {
                let s = _.countBy(val, (o) => {
                    return o == 2;
                }).true;
                 return s;
            },
            CountBuildProfile(val) {
                let s = _.countBy(val, (o) => {
                    return o == 3;
                }).true;
                 return s;
            },
            CountSchoolStatus(val) {
                let s = _.countBy(val, (o) => {
                    return o == 3;
                }).true;
                 return s;
            },
            SumCountTotal(val) {
                let sum = 0;
                _.each(val, (o) => {
                    sum = sum + o.countTotal;
                });
                return sum;
            },
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
