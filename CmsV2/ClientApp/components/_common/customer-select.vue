<template>
    <div>
        <v-select
            @search="fetchOptions"
            v-model="selectedData"
            :options="listData"
            :filterable="false"
            :placeholder="`Nhập ${title} để tìm kiếm`"
            v-b-tooltip.focus="'Nhập vào ô tìm kiếm để hiển thị thêm danh sách kết quả'"
            label="name"
            @search:focus="getData"
            v-if="!disabled"
        >
            <span slot="no-options" style="color:#a8a6a6">Không có dữ liệu</span>
        </v-select>
        <input
            class="form-control"
            disabled="true"
            v-bind:value="selectedData != null ? selectedData.name: ''"
            v-else
        />

        <!-- @search:focus="getData" -->
    </div>
</template>

<script>
export default {
    props: [
        'systemTypeId',
        'objectType',
        'objectId',
        'disabled',
        'orderId',
        'abroadSchoolInterviewPeriodId',
        'isReturnValue',
        'schoolCollaborateId',
    ],
    data() {
        return {
            objData: {
                pageIndex: 1,
                pageSize: 20,
                keyword: '',
                systemTypeId: this.systemTypeId,
                objectType: this.objectType,
                orderId: this.orderId,
                abroadSchoolInterviewPeriodId: this.abroadSchoolInterviewPeriodId,
                schoolCollaborateId: this.schoolCollaborateId,
            },
            listData: [],
            selectedData: null,
            commitWatch: true,
        };
    },
    watch: {
        selectedData() {
            // if (!this.commitWatch) {
            //     this.commitWatch = true;
            //     return;
            // }
            var val = {};
            val = Object.assign(val, this.selectedData);
            if (this.objectType == 1) {
                val = {
                    id: val.id,
                    name: val.memberName,
                    address: val.address,
                    memberTypeId: val.memberTypeId,
                };
            }
            if (val) {
                if (this.isReturnValue) this.$emit('input', val.id);
                else this.$emit('input', val);
            } else this.$emit('input', null);
        },
        objectType() {
            this.objData.objectType = this.objectType;
            this.objData.keyword = '';
            this.selectedData = null;
        },
    },
    methods: {
        fetchOptions(keyword, loading) {
            loading(true);
            this.objData.keyword = keyword;
            this.getData(loading);
        },
        getApi() {
            // switch (this.objectType) {
            //     case 1:
            //         if (this.systemTypeId == 1)
            //             //abroad
            //             return { m: 'FinanceBill', fn: 'object-list' };
            //         else if (this.systemTypeId == 2)
            //             //abroad
            //             return { m: 'FinanceBill', fn: 'object-list' };
            //         else return null;
            //     case 2:
            //         return { m: 'FinanceBill', fn: 'object-list' };

            //     case 3:
            //         return { m: 'FinanceBill', fn: 'object-list' };
            //     case 4:
            //         return { m: 'FinanceBill', fn: 'object-list' };
            //     case 5:
            //         return { m: 'FinanceBill', fn: 'object-list' };
            //     default:
            //         return null;
            // }

            return { m: 'FinanceBill', fn: 'object-list' };
        },
        getData(loading) {
            let api = this.getApi();
            if (api == null) {
                if (loading) loading(false);
            }
            this.$http({
                data: {
                    ...api,
                    ...this.objData,
                },
            })
                .then((res) => {
                    this.listData = res.data;
                    if (loading) loading(false);
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
        getDetail() {
            let objFilter = {};
            objFilter = Object.assign(objFilter, this.objData);
            objFilter.objectId = this.objectId;

            let api = this.getApi();
            this.$http({
                data: {
                    ...api,
                    ...objFilter,
                },
            })
                .then((res) => {
                    this.commitWatch = false;
                    this.selectedData = res.data[0];
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
    },
    created() {
        console.log(this.systemTypeId);
        if (this.objectId > 0) this.getDetail();
    },
    computed: {
        title() {
            switch (this.objectType) {
                case 1:
                    return ' tên học viên, CMND, SĐT ';
                case 2:
                    return ' tên CTV, SĐT ';
                case 3:
                    return ' tên trường học ';
                case 4:
                    return ' tên nghiệp đoàn ';
                case 5:
                    return ' tên công ty ';
                case 7:
                    return ' nhân viên ';
                case 8:
                    return ' chi nhánh ';
                case 9:
                    return ' trường nguồn ';
                default:
                    return '';
            }
        },
    },
};
</script>

<style>
</style>