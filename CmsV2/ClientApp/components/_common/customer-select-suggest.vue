<template>
    <div>
        <v-select @search="fetchOptions"
                  v-model="selectedData"
                  :options="listData"
                  :filterable="false"
                  placeholder="Nhập tên học viên để tìm kiếm"
                  v-b-tooltip.focus="'Nhập vào ô tìm kiếm để hiển thị thêm danh sách kết quả'"
                  label="name"
                  @search:focus="getData"
                  v-if="!disabled">
            <span slot="no-options" style="color:#a8a6a6">Không có dữ liệu</span>
        </v-select>
        <input class="form-control"
               disabled="true"
               v-bind:value="selectedData != null ? selectedData.name: ''"
               v-else />

        <!-- @search:focus="getData" -->
    </div>
</template>

<script>
    export default {
        props: [
            'value',
            'disabled',
            'systemTypeId',
            'memberId'
        ],
        data() {
            return {
                objData: {
                    pageIndex: 1,
                    pageSize: 20,
                    keyword: ''
                },
                listData: [],
                selectedData: null,
                commitWatch: true
            };
        },
        watch: {
            selectedData() {
                var val = {};
                val = Object.assign(val, this.selectedData);
                if (val) {
                    this.$emit('input', val.id);
                } else this.$emit('input', null);
            }
        },
        methods: {
            fetchOptions(keyword, loading) {
                loading(true);
                this.objData.keyword = keyword;
                this.getData(loading);
            },
            getData(loading) {
                let m = this.systemTypeId == 1 ? 'abroadMember' : 'laborMember';
                let fn = this.systemTypeId == 1 ? 'get-detail' : 'list-select2';
                this.$http({
                    data: {
                        m: m,
                        fn: fn,
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
            getDetail() {
                let m = this.systemTypeId == 1 ? 'abroadMember' : 'laborMember';
                this.$http({
                    data: {
                        m: m,
                        fn: 'get-detail',
                        id: this.value,
                        departmentType: 'ts'
                    }
                })
                    .then(res => {
                        this.commitWatch = false;
                        this.selectedData = res.data;
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });
            }
        },
        created() {
            this.getDetail();
        },
        computed: {

        }
    };
</script>

<style>
</style>