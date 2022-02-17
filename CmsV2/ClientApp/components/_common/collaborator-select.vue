<template>
    <v-select
        @search="fetchOptions"
        v-model="selectedData"
        :options="listData"
        :filterable="false"
        placeholder="Nhập vào cộng tác viên để tìm kiếm"
        @search:focus="getCollaborator"
        v-b-tooltip.focus="'Nhập vào ô tìm kiếm để hiển thị thêm danh sách kết quả'"
        label="fullName"
    >
        <span slot="no-options" style="color:#a8a6a6">Không có dữ liệu</span>
    </v-select>
</template>

<script>
export default {
    data() {
        return {
            objData: { pageIndex: 1, pageSize: 20, keyword: '' },
            listData: [],
            selectedData: null
        };
    },
    watch: {
        selectedData() {
            var val = this.selectedData;
            if (val) {
                this.$emit('input', val.id);
            } else this.$emit('input', null);
        }
    },
    methods: {
        fetchOptions(keyword, loading) {
            loading(true);
            this.objData.keyword = keyword;
            this.getCollaborator(loading);
        },
        getCollaborator(loading) {
            this.$http({
                data: {
                    m: 'Collaborator',
                    fn: 'list',
                    ...this.objData
                }
            })
                .then(res => {
                    this.listData = res.data;
                    if(loading)
                        loading(false);
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        }
    }
};
</script>

<style>
</style>