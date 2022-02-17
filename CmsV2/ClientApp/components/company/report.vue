<template>
    <div class="row" v-if="lstCompany">
        <div class="col-4 form-group mb-2">
            <label>Ngày tìm kiếm:</label>
            <datetimepicker
                v-model="dateFilter"
                type="date"
                :range="true"
                :fullWidth="false"
                v-if="isLoader"
            />
        </div>
        <div class="col-12">
            <alert v-if="lstCompany.length == 0" />
            <div
                v-else
                id="kt_apps_user_list_datatable"
                class="kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--loaded"
            >
                <table class="kt-datatable__table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th class="width-80">STT</th>
                            <th>Công ty</th>
                            <th v-for="step in lstFunction" :key="step.id">{{step.name}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in lstCompany" :key="item.id">
                            <td class="text-center">{{index + rowNum + 1}}</td>
                            <td>{{item.name}}</td>
                            <td v-for="step in lstFunction" :key="`${step.id}_td`">
                                <numberDisplay :value="getValueByFunction(item.id, step.id)" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="pr-4 pl-4">
                    <pager :total="totalRow" :page-index="objData.pageIndex" @change="pageChange" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import numberDisplay from '../_common/number-display';
import moment from 'moment';
export default {
    components: { numberDisplay },
    props: ['lstCompany'],
    data() {
        return {
            branchList: null,
            listData: null,
            objData: {
                pageIndex: 1,
                pageSize: 20,
                branchId: 0,
                fromDate: new Date(),
                toDate: new Date()
            },
            dateFilter: [moment().add(-7, 'days'), moment()],
            totalRow: 0,
            lstFunction: [
                { id: 'NewMember', name: 'Học viên mới' },
                { id: 'FormCreated', name: 'Form được tạo' },
                { id: 'FormTranslate', name: 'Dịch mẫu' }
            ],
            isLoader: false
        };
    },
    computed: {
        rowNum() {
            return (this.objData.pageIndex - 1) * this.objData.pageSize;
        }
    },
    watch: {
        'objData.branchId'() {
            this.searchData();
        },
        dateFilter() {
            console.log('vao');
            this.searchData();
        }
    },
    methods: {
        getValueByFunction(companyId, type) {
            if (!companyId || !type) return 0;
            let temp = _.find(this.listData, o => {
                return o.companyId == companyId && o.type == type;
            });
            if (temp) return temp.value;

            return 0;
        },
        searchData() {
            this.objData.pageIndex = 1;
            this.getData();
        },
        pageChange(pageNum) {
            this.$set(this.objData, 'pageIndex', pageNum);
            this.getData();
        },
        getData() {
            let loading = this.$loading.show();
            if (this.dateFilter && (this.dateFilter.fromDate || this.dateFilter.toDate)) {
                this.objData.fromDate = this.dateFilter.fromDate;
                this.objData.toDate = this.dateFilter.toDate;
            } else {
                this.objData.fromDate = null;
                this.objData.toDate = null;
            }

            this.$http({
                data: {
                    m: 'Company',
                    fn: 'company-report',
                    ...this.objData
                }
            })
                .then(response => {
                    loading.hide();
                    this.listData = response.data;
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        }
    },
    created() {
        console.log(this.dateFilter);
        this.isLoader = true;
        //this.getData();
    }
};
</script>

<style>
</style>