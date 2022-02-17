<template>
    <div class="row">
        <div class="col-10">
            <v-select
                @search="fetchOptions"
                v-model="selectedData"
                :options="listData"
                :filterable="false"
                placeholder="Nhập tên đơn hàng để tìm kiếm"
                @search:focus="getSchool"
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
        <div class="col-2">
            <button v-if="!disabled" class="btn btn-default" @click="search">Tìm kiếm</button>
        </div>
        <modal
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
                            v-model="objData.synId"
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
                    <!-- <div class="form-group col-lg-2">
                        <label>Loại hình xuất khẩu</label>
                        <fselect
                            v-model="objData.memberTypeId"
                            :options="allTypes"
                            v-if="allTypes"
                            placeholder="---Tất cả---"
                        />
                    </div>-->
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
                                        <!-- <th>Số học viên</th> -->
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
                                        <!-- priority-->
                                        <td>
                                            <badgeOrderPriority :priority="item.priority" />
                                        </td>
                                        <!-- status-->
                                        <td>
                                            <badgeOrderStatus :status="item.status" />
                                        </td>
                                        <!-- <td>
                                            {{
                                            item.countMem != 0
                                            ? item.countMem + ' học viên'
                                            : 'chưa có'
                                            }}
                                        </td>-->
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
        </modal>
    </div>
</template>

<script>
import badgeOrderPriority from '../_common/badge-order-priority';
import badgeOrderStatus from '../_common/badge-order-status.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    props: ['syndicationId', 'companyId', 'value', 'disabled', 'memberId', 'collaboratorId', 'userId'],
    components: { badgeOrderPriority, badgeOrderStatus },
    data() {
        return {
            objData: {
                pageIndex: 1,
                pageSize: 20,
                keyword: '',
                synId: this.syndicationId,
                synCompanyId: this.companyId,
                memberId: this.memberId,
                collaboratorId: this.collaboratorId,
                userId: this.userId,
            },
            listData: [],
            selectedData: null,
            isShowModal: false,
            selecteMemberId: 0
        };
    },
    computed: {
        ...mapGetters(['getSynList', 'allSynCom'])
    },
    watch: {
        selectedData() {
            var val = this.selectedData;
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
        'objData.synId'() {
            if (this.isShowModal) this.getListData();
        },
        'objData.synCompanyId'() {
            this.getListData();
        },
        syndicationId() {
            this.objData.synId = this.syndicationId;
            this.getListData();
        },
        memberId() {
            this.objData.memberId = this.memberId;
        },
        collaboratorId() {
            this.objData.collaboratorId = this.collaboratorId;
        },
        userId() {
            this.objData.userId = this.userId;
        }
    },
    methods: {
        ...mapActions(['getLaborOrderDetail', 'getListSynSelect', 'getListSynComSelect']),
        fetchOptions(keyword, loading) {
            loading(true);
            this.objData.keyword = keyword;
            this.getSchool(loading);
        },
        getSchool(loading) {
            this.$http({
                data: {
                    m: 'LaborOrder',
                    fn: 'get-list',
                    ...this.objData
                }
            })
                .then(res => {
                    this.listData = res.data;
                    if (loading) loading(false);
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        },
        search() {
            this.isShowModal = true;
            this.getListSynSelect();
            this.getListSynComSelect();
            this.getListData();
        },
        getListData() {
            let loading = this.$loading.show();
            this.selecteMemberId = 0;
            this.$http({
                data: {
                    m: 'labororder',
                    fn: 'get-list',
                    ...this.objData
                }
            })
                .then(response => {
                    loading.hide();
                    this.listData = response.data;
                    //this.totalRow = response.totalRow;
                })
                .catch(err => {
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
        }
    },
    created() {
        console.log(this.memberId);
        if (this.value && this.value > 0) {
            this.getLaborOrderDetail(this.value).then(response => {
                this.selectedData = response.data.order;
                console.log(this.selectedData);
            });
        }
    }
};
</script>

<style>
</style>