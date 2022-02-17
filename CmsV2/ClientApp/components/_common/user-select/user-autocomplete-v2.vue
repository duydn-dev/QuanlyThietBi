<template>
    <v-select
        @search="fetchOptions"
        v-model="selectedData"
        :options="listData"
        :filterable="false"
        placeholder="Nhập tên người dùng để tìm kiếm"
        @search:focus="getUser"
        v-b-tooltip.focus="'Nhập vào ô tìm kiếm để hiển thị thêm danh sách kết quả'"
        label="fullName"
    >
        <span slot="no-options" style="color:#a8a6a6">Không có dữ liệu</span>
    </v-select>
</template>

<script>
export default {
    props: ['systemType', 'isWithUserName', 'permissionCode', 'branchId'],
    data() {
        return {
            objData: {
                keyword: '',
                status: 1,
                roleId: 0,
                pageIndex: 1,
                pageSize: 2000000,
                departmentId: 0,
                branchId: this.branchId,
                permissionCode: this.permissionCode,
            },
            listData: [],
            selectedData: null,
            isLoader: false,
        };
    },
    watch: {
        selectedData() {
            var val = this.selectedData;
            if (val) {
                this.$emit('input', val.id);
            } else this.$emit('input', null);
        },
    },
    methods: {
        fetchOptions(keyword, loading) {
            loading(true);
            this.objData.keyword = keyword;
            this.getUser(loading);
        },
        getUser(loading) {
            this.$http({
                data: {
                    m: 'user',
                    fn: 'get_list',
                    ...this.objData,
                },
            })
                .then((res) => {
                    if (this.isWithUserName) {
                        let temps = res.data;
                        _.forEach(temps, (o) => {
                            o.fullName = o.userName + ' - ' + o.fullName;
                        });
                        this.listData = temps;
                    } else this.listData = res.data;

                    this.selectedData = null;

                    if (loading) loading(false);
                })
                .catch((err) => {
                    if (loading) loading(false);
                    return this.$message(err.message, 'error');
                });
        },
        // getDetail() {
        //     this.$http({
        //         data: {
        //             m: 'user',
        //             fn: 'detail',
        //             id: this.userId,
        //         },
        //     })
        //         .then((res) => {
        //             let o = res.data;
        //             o.name = o.fullName;
        //             if (o.department) o.name += ` (${o.department})`;
        //             if (o.branch) o.name += ` - ${o.branch}`;
        //             this.selectedData = { id: res.data.id, name: o.name };
        //         })
        //         .catch((err) => {
        //             return this.$message(err.message, 'error');
        //         });
        // },
    },
    created() {
        this.isLoader = true;
    },
};
</script>

<style>
</style>