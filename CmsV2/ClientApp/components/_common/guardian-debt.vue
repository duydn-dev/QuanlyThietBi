<template>
    <modal
        :width="isHaveDebt ? 1200 : 800"
        title="Trạng thái tài chính học viên"
        @close="close"
        :isModalHeader="true"
        v-if="isShow"
    >
        <div slot="body">
            <div class="row">
                <div class="col-lg-6 col-12 form-group" v-if="systemTypeId == 2">
                    <label>Chọn chi nhánh đào tạo</label>
                    <fselect
                        v-model="branchId"
                        v-if="enterpriseBranchList"
                        placeholder="Chọn chi nhánh"
                        :options="enterpriseBranchList"
                    />
                </div>
                <div class="col-12" style="min-height: 500px">
                    <div
                        id="kt_apps_user_list_datatable"
                        class="kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--loaded date-in-table"
                    >
                        <table
                            class="kt-datatable__table table-striped table-hover table-bordered"
                            style="overflow: auto"
                        >
                            <thead>
                                <th class="text-center">Học viên</th>
                                <th class="text-center">Trạng thái tài chính</th>
                                <template v-if="isHaveDebt">
                                    <th class="text-center" style="width: 30%">Người bảo lãnh</th>
                                    <th class="text-center">Hạn thanh toán</th>
                                </template>
                            </thead>
                            <tbody>
                                <tr v-for="item in lstMember" :key="item.objectId">
                                    <td>{{item.title}}</td>
                                    <td class="text-center" style="font-size: 15px">
                                        <span
                                            class="badge badge-pill badge-success"
                                            v-if="!item.isDebt"
                                        >Hoàn thành</span>
                                        <template v-else>
                                            <span class="badge badge-pill badge-danger">
                                                Nợ:
                                                <number-display :value="item.money" />
                                            </span>
                                        </template>
                                    </td>
                                    <template v-if="isHaveDebt">
                                        <td>
                                            <userAutoComplete
                                                v-model="item.guardianDebtUserId"
                                                :isWithUserName="true"
                                                v-if="item.isDebt"
                                            />
                                        </td>
                                        <td>
                                            <datetimepicker
                                                v-model="item.debtNotificationDate"
                                                type="date"
                                                style="width:100%"
                                                v-if="item.isDebt"
                                            />
                                        </td>
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer" class="row">
            <div class="col-sm-12">
                <button class="btn btn-cyan" @click="save()">
                    <span>Lưu lại</span>
                </button>
                <button class="btn btn-danger" @click="close()">
                    <span>Thoát</span>
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
import userAutoComplete from './user-select/user-autocomplete-v2';
import { mapGetters, mapActions } from 'vuex';
export default {
    props: ['members', 'systemTypeId'],
    components: { userAutoComplete },
    data() {
        return {
            lstMember: [],
            isShow: false,
            branchId: 0,
        };
    },
    computed: {
        isHaveDebt() {
            return this.lstMember.filter((c) => c.isDebt).length > 0;
        },
        ...mapGetters(['enterpriseBranchList']),
    },
    methods: {
        ...mapActions(['getEnterpriseBranchList']),
        close() {
            this.$emit('close');
        },
        getDebtStatus() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'FinanceBill',
                    fn: 'list-member-debt',
                    memberIds: JSON.stringify(this.members.map((c) => c.id)),
                },
            })
                .then((response) => {
                    let temps = response.data;
                    let tempArray = [];
                    for (const item of this.members) {
                        let temp = temps.find((c) => c.objectId == item.id);
                        if (temp) {
                            temp.isDebt = true;
                            tempArray.push({ ...temp, ...item });
                        } else {
                            temp = {
                                objectId: item.id,
                                title: item.title,
                                isDebt: false,
                                objectType: 1,
                            };
                            tempArray.push(temp);
                        }
                    }

                    this.lstMember = tempArray;
                    loading.hide();
                    this.isShow = true;
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        save() {
            let isValid = true;
            for (const item of this.lstMember) {
                if (item.isDebt && (!item.guardianDebtUserId || !item.debtNotificationDate)) {
                    isValid = false;
                    break;
                }
            }

            if (!isValid)
                return this.$error(
                    'Vui lòng nhập vào đầy đủ thông tin người bảo lãnh và thời gian thông báo'
                );

            if (!this.branchId && this.systemTypeId == 2) return this.$error('Vui lòng nhập chi nhánh đào tạo học viên');
            

            this.$emit('save', this.lstMember, this.branchId);
        },
    },
    created() {
        this.getEnterpriseBranchList();
        this.getDebtStatus();
    },
};
</script>

<style >
.date-in-table .mx-calendar th:first-child,
.date-in-table .mx-calendar tr td:first-child {
    padding-left: 0 !important ;
}
</style>