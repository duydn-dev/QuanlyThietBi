<template>
    <div class="row">
        <div class="col-12" v-if="isFselect">
            <fselect
                v-model="selectedData"
                placeholder="---Tất cả---"
                :options="listData"
                :multiple="false"
            />
        </div>

        <div class="col-12" v-else>
            <v-select
                @search="fetchOptions"
                v-model="selectedData"
                :options="listData"
                :filterable="false"
                placeholder="Nhập tên kỳ để tìm kiếm"
                @search:focus="getSchoolInterviewPeriod"
                label="name"
                v-if="!disabled"
            >
                <!-- v-b-tooltip.focus="'Nhập vào ô tìm kiếm để hiển thị thêm danh sách kết quả'" -->
                <span slot="no-options" style="color:#a8a6a6">Không có dữ liệu</span>
            </v-select>
            <input
                class="form-control"
                disabled="true"
                v-bind:value="selectedData != null ? selectedData.name: ''"
                v-else
            />
        </div>
        <!-- <div class="col-2">
            <button v-if="!disabled" class="btn btn-default" @click="search">Tìm kiếm</button>
        </div>-->
        <!-- <modal
            :title="'Chọn đơn hàng'"
            :width="1000"
            @close="isShowModal = false"
            v-if="isShowModal"
        >
            <div slot="body">
                <div class="row">
                    <div class="col-lg-4 col-12 form-group">
                        <label>Từ khóa</label>
                        <input type="text" v-model="objData.keyword" class="form-control" />
                    </div>
                    <div class="form-group col-lg-4">
                        <label>Nghiệp đoàn</label>
                        <fselect
                            placeholder="---Tất cả---"
                            v-model="objData.schoolId"
                            :options="getSynList"
                        />
                    </div>
                    <div class="form-group col-lg-4">
                        <label>Công ty</label>
                        <fselect
                            placeholder="---Tất cả---"
                            v-model="objData.synCompanyId"
                            :options="allSynCom"
                        />
                    </div>
                 
                </div>

                <div class="row">
                    <div class="col-12">
                        <alert v-if="!listData || listData.length == 0" />
                        <div
                            v-else
                            id="kt_apps_user_list_datatable"
                            class="kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--loaded"
                        >
                            <table class="kt-datatable__table" style="overflow:auto;">
                                <thead class="kt-datatable__head">
                                    <tr>
                                        <th class="width-50"></th>
                                        <th>Tên đơn hàng</th>
                                        <th>Số lượng tuyển</th>
                                        <th>Ngày tuyển</th>
                                        <th>Ngày hết hạn</th>
                                        <th>Mức độ ưu tiên</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody class="kt-datatable__body">
                                    <tr v-for="(item) in listData" :key="item.id">
                                        <th scope="row">
                                            <label class="kt-checkbox kt-mbt">
                                                <input
                                                    v-model="selecteMemberId"
                                                    type="radio"
                                                    :value="item.id"
                                                />
                                                <span class="kt-t" />
                                            </label>
                                        </th>

                                        <td>
                                            <span title="Chi tiết">
                                                <a>{{ item.name || '---' }}</a>
                                                <p
                                                    class="kt-widget11__sub"
                                                >{{ item.otherName || '---' }}</p>
                                            </span>
                                        </td>
                                        <td>
                                            <span v-if="item.quantityMan">
                                                {{item.quantityMan}} Nam
                                                <br />
                                            </span>
                                            <span
                                                v-if="item.quantityWoman"
                                            >{{item.quantityWoman}} Nữ</span>
                                        </td>
                                        <td>
                                            {{
                                            item.applicationDate | moment('DD/MM/YYYY')
                                            }}
                                        </td>
                                        <td>{{item.deadlineDate | moment('DD/MM/YYYY')}}</td>
                                        <td>
                                            <badgeOrderPriority :priority="item.priority" />
                                        </td>
                                        <td>
                                            <badgeOrderStatus :status="item.status" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="row">
                <div class="col-sm-12">
                    <button class="btn btn-primary" secondary @click="choice()">
                        <i class="fa fa-save" />
                        Chọn
                    </button>
                    <button class="btn btn-danger" @click="isShowModal = false">
                        <span>Thoát</span>
                    </button>
                </div>
            </div>
        </modal>-->
    </div>
</template>

<script>
// import badgeOrderPriority from '../_common/badge-order-priority';
// import badgeOrderStatus from '../_common/badge-order-status.vue';
//import { mapActions } from 'vuex';
export default {
    props: ['schoolId', 'memberId', 'value', 'disabled', 'isFselect', 'status', 'memberTypeId'],
    //components: { badgeOrderPriority, badgeOrderStatus },
    data() {
        return {
            objData: {
                pageIndex: this.isFselect ? 0 : 1,
                pageSize: 20,
                keyword: '',
                schoolId: this.schoolId,
                memberId: this.memberId,
                status: this.status,
                memberTypeId: this.memberTypeId,
            },
            listData: [],
            selectedData: null,
            isShowModal: false,
            selecteMemberId: 0,
        };
    },
    watch: {
        selectedData() {
            var val = this.selectedData;
            if (this.isFselect) return this.$emit('input', val);

            if (val) {
                this.$emit('input', val.id);
            } else this.$emit('input', null);
        },
        'objData.keyword'(val) {
            clearTimeout(this.timeDelay);
            this.timeDelay = setTimeout(() => {
                this.$set(this.objData, 'keyword', val);
                this.getListData();
            }, 500);
        },
        'objData.schoolId'() {
            if (this.isShowModal) this.getListData();
        },
        'objData.synCompanyId'() {
            this.getListData();
        },
        schoolId() {
            this.objData.schoolId = this.schoolId;
            this.getSchoolInterviewPeriod();
        },
        memberId() {
            this.objData.memberId = this.memberId;
            this.getSchoolInterviewPeriod();
        },
        memberTypeId() {
            this.objData.memberTypeId = this.memberTypeId;
            this.getSchoolInterviewPeriod();
        },
    },
    methods: {
        fetchOptions(keyword, loading) {
            loading(true);
            this.objData.keyword = keyword;
            this.getSchoolInterviewPeriod(loading);
        },
        getSchoolInterviewPeriod(loading) {
            this.$http({
                data: {
                    m: ' AbroadSchoolInterviewPeriod',
                    fn: 'school-interview-period-finance',
                    ...this.objData,
                },
            })
                .then((res) => {
                    this.listData = res.data;
                    if (this.memberId && this.listData && this.listData.length > 0)
                        this.selectedData = this.listData[0];
                    else this.selectedData = null;
                    this.listData.unshift({ id: -1, name: 'Chưa vào kỳ' });
                    if (loading) loading(false);
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
        search() {
            this.isShowModal = true;
        },
        getDetail() {
            let loading = this.$loading.show();
            this.selecteMemberId = 0;
            this.$http({
                data: {
                    m: 'AbroadSchoolInterviewPeriod',
                    fn: 'school-interview-period-finance',
                    pageIndex: 1,
                    pageSize: 1,
                    id: this.value,
                },
            })
                .then((response) => {
                    loading.hide();
                    this.selectedData = response.data[0];
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        choice() {
            if (!this.selecteMemberId) return this.$error('Vui lòng chọn đơn hàng');
            else {
                let temp = _.find(this.listData, ['id', this.selecteMemberId]);
                this.selectedData = { id: temp.id, name: temp.name };
                this.isShowModal = false;
            }
        },
    },
    created() {
        if (this.value && this.value > 0) {
            this.getDetail();
        }

        if (this.isFselect) this.getSchoolInterviewPeriod();
    },
};
</script>

<style>
</style>