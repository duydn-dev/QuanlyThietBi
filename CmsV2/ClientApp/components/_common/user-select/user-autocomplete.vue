<template>
    <v-select
        @search="fetchOptions"
        v-model="selectedData"
        :options="listData"
        :filterable="false"
        placeholder="Nhập tên người dùng để tìm kiếm"
        @search:focus="getUser"
        v-b-tooltip.focus="'Nhập vào ô tìm kiếm để hiển thị thêm danh sách kết quả'"
        label="name"
    >
        <span slot="no-options" style="color:#a8a6a6">Không có dữ liệu</span>
    </v-select>
</template>

<script>
export default {
    props: ['systemType', 'userId'],
    data() {
        return {
            objData: { pageIndex: 1, pageSize: 20, keyword: '', systemType: this.systemType },
            listData: [],
            selectedData: null,
            isLoader: false
        };
    },
    watch: {
        selectedData() {
            var val = this.selectedData;
            if (val) {
                this.$emit('input', val);
            } else this.$emit('input', null);
        }
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
                    m: 'abroadMemberBill',
                    fn: 'get_user_autocomplete-otherbill',
                    ...this.objData
                }
            })
                .then(res => {
                    _.forEach(res.data, o => {
                        o.name = o.fullName;
                        if (o.department) o.name += ` (${o.department})`;
                        if (o.branch) o.name += ` - ${o.branch}`;
                    });
                    this.listData = res.data;
                    if (loading) loading(false);
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        },
        getDetail() {
            this.$http({
                data: {
                    m: 'user',
                    fn: 'detail',
                    id: this.userId
                }
            })
                .then(res => {
                    let o = res.data;
                    o.name = o.fullName;
                    if (o.department) o.name += ` (${o.department})`;
                    if (o.branch) o.name += ` - ${o.branch}`;
                    this.selectedData = { id: res.data.id, name: o.name };
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        }
    },
    created() {
        if (this.userId) this.getDetail();
        else this.isLoader = true;
    }
};
</script>

<style>
</style>