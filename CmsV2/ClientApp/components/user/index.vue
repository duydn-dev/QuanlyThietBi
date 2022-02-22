<template>
    <div>
        <div class="box-head d-flex align-items-center justify-content-between">
            <strong class="txt-head">Quản lý người dùng</strong>
            <div class="group-right">
                <button
                    type="button"
                    class="btn-evt btn-create js-btnCreate d-flex align-items-center"
                    @click="openEdit(0)"
                >
                    <i class="bi bi-plus"></i>
                    <span>Tạo mới</span>
                </button>
            </div>
        </div>
        <div class="box-ct box-tbl-ct">
            <div class="tbl-wrap">
                <table class="tbl">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên tài khoản</th>
                            <th>Tên đầy đủ</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in listUser" :key="item.id">
                            <td>{{ objData.pageSize * (objData.pageIndex - 1) + i + 1 }}</td>
                            <td>{{ item.userName }}</td>
                            <td>{{ item.fullName }}</td>
                            <td class="btn-wrap">
                                <template v-if="item.isAdministrator">
                                    <button
                                        type="button"
                                        class="btn btn-success"
                                        @click="openPer(item.userId)"
                                        v-if="currentUser.isAdministrator"
                                    >
                                        <i class="bi bi-gear"></i>
                                        <span>Phân quyền</span>
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-warning"
                                        @click="openEdit(item.userId)"
                                        v-if="currentUser.isAdministrator"
                                    >
                                        <i class="bi bi-pencil-square"></i>
                                        <span>Sửa</span>
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-danger"
                                        @click="remove(item.userId)"
                                        v-if="currentUser.isAdministrator"
                                    >
                                        <i class="bi bi-trash"></i>
                                        <span>Xóa</span>
                                    </button>
                                </template>

                                <template v-else>
                                    <button
                                        type="button"
                                        class="btn btn-success"
                                        @click="openPer(item.userId)"
                                        v-if="
                                            currentUser.isAdministrator ||
                                            isAllowPermission(['Role-UpdateUserRole'])
                                        "
                                    >
                                        <i class="bi bi-gear"></i>
                                        <span>Phân quyền</span>
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-warning"
                                        @click="openEdit(item.userId)"
                                        v-if="
                                            currentUser.isAdministrator ||
                                            isAllowPermission(['User-Update']) ||
                                            currentUser.userId == item.createdBy
                                        "
                                    >
                                        <i class="bi bi-pencil-square"></i>
                                        <span>Sửa</span>
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-danger"
                                        @click="remove(item.userId)"
                                        v-if="
                                            currentUser.isAdministrator ||
                                            isAllowPermission(['User-Delete'])
                                        "
                                    >
                                        <i class="bi bi-trash"></i>
                                        <span>Xóa</span>
                                    </button>
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <pagerv2 :total="totalRow" :page-index="objData.pageIndex" @change="pageChange" />
            </div>
        </div>
        <edit v-if="isShowEdit" :userId="editId" @close="close" />
        <permission v-if="isShowPermission" :userId="editId" @close="permissionClose" />
    </div>
</template>

<script>
import edit from './edit.vue';
import axiosService from '../../core/utils/axiosService';
import permission from './permission_new.vue';
export default {
    components: {
        edit,
        permission,
    },
    data() {
        return {
            objData: { pageIndex: 1, pageSize: 20, textSearch: '', status: null },
            listUser: [],
            totalRow: 0,
            isShowEdit: false,
            isShowPermission: false,
            editId: 0,
        };
    },
    methods: {
        async getList() {
            try {
                const response = await axiosService.get(`api/User?request=${this.objData}`);
                const data = response.data.responseData.data;
                if (response.data.success) {
                    this.listUser = data;
                    this.totalRow = response.data.responseData.totalData;
                }
            } catch (ex) {
                this.$message(
                    'Bạn không có quyền hoặc phiên đăng nhập đã hết hạn, vui lòng thử lại !',
                    'error'
                );
                this.$router.push('/');
            }
        },
        async pageChange(pageNum) {
            this.$set(this.objData, 'pageIndex', pageNum);
            await this.getList();
        },
        openEdit(id) {
            this.editId = id;
            this.isShowEdit = true;
        },
        openPer(id) {
            this.editId = id;
            this.isShowPermission = true;
        },
        async remove(id) {
            let conf = await this.$confirm('Bạn có chắc chắn muốn xóa người dùng này ?');
            if (conf == undefined) {
                const { data } = await axiosService.delete(`api/User/delete/${id}`);
                if (data.success) {
                    await this.getList();
                    this.$message('Xóa người dùng thành công !');
                } else {
                    this.$message('Xóa người dùng thất bại !', 'error');
                }
            }
        },
        async close(isReload) {
            this.editId = 0;
            this.isShowEdit = false;
            if (isReload) {
                await this.getList();
            }
        },
        async permissionClose(isReload) {
            if (isReload) await this.getList();
            this.isShowPermission = false;
        },
    },
    async created() {
        await this.getList();
    },
};
</script>

<style scoped>
</style>