<template>
    <!-- <fselect
        v-model="selectedData"
        :options="listData"
        label="fullName"
        :placeholder="'Vui lòng chọn chi nhánh để tìm kiếm'"
         placeholder="Nhập tên học viên"
    />-->
    <!--   @search:focus="getUser" -->
    <v-select
        v-model="selectedData"
        :options="listData"
        label="fullName"
        :placeholder="isNeedBranch ? 'Vui lòng chọn chi nhánh để tìm kiếm' : 'Nhập tên hoặc username'"
    >
        <span slot="no-options" style="color:#a8a6a6">Không có dữ liệu</span>
    </v-select>
</template>

<script>
export default {
    props: {
        branchId: {
            type: Number,
            default: 0
        },
        isNeedBranch: {
            default: true
        },
        isWithUserName: {
            default: false
        },
        permissionCode: {
            default: ''
        }
    },
    data() {
        return {
            objData: {
                keyword: '',
                status: 1,
                roleId: -1,
                pageIndex: 1,
                pageSize: 2000000,
                departmentId: 0,
                branchId: this.branchId,
                permissionCode: this.permissionCode
            },
            listData: [],
            selectedData: null,
            isLoader: false
        };
    },
    watch: {
        selectedData() {
            var val = this.selectedData;
            if (val) {
                this.$emit('input', val.id);
            } else this.$emit('input', null);
        },
        branchId() {
            this.objData.branchId = this.branchId;
            this.getUser();
        }
    },
    methods: {
        getUser() {
            if (!this.branchId && this.isNeedBranch) {
                return (this.listData = []);
            }
            this.$http({
                data: {
                    m: 'user',
                    fn: 'get_list',
                    ...this.objData
                }
            })
                .then(res => {
                    if (this.isWithUserName) {
                        let temps = res.data;
                        _.forEach(temps, o => {
                            o.fullName = o.userName + ' - ' + o.fullName;
                        });
                        this.listData = temps;
                    } else this.listData = res.data;
                    this.selectedData = null;
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        }
    },
    created() {
        // if (this.branchId) {

        // }
        this.getUser();
    }
};
</script>

<style>
</style>