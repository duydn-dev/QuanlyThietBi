<template>
    <div>
        <div class="box-head d-flex align-items-center justify-content-between">
            <strong class="txt-head">Quản lý nhóm quyền</strong>
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
                    <colgroup>
                        <col width="5%">
                        <col width="65%">
                        <col width="30%">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th class="text-start">Nhóm quyền</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in listPosition" :key="item.id">
                            <td>{{ objData.pageSize * (objData.pageIndex - 1) + i + 1 }}</td>
                            <td class="text-start">{{ item.userPositionName }}</td>
                            <td class="btn-wrap">
                                <template v-if="item.isAdministrator">
                                    <button
                                        type="button"
                                        class="btn btn-success"
                                        @click="openPer(item.userPositionId)"
                                        v-if="currentUser.isAdministrator"
                                    >
                                        <i class="bi bi-gear"></i>
                                        <span>Phân quyền</span>
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-warning"
                                        @click="openEdit(item.userPositionId)"
                                        v-if="currentUser.isAdministrator"
                                    >
                                        <i class="bi bi-pencil-square"></i>
                                        <span>Sửa</span>
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-danger"
                                        @click="remove(item.userPositionId)"
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
                                        @click="openPer(item.userPositionId)"
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
                                        @click="openEdit(item.userPositionId)"
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
                                        @click="remove(item.userPositionId)"
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
        <update v-if="isShowEdit" :userPositionId="editId" @close="close"/>
        <permission v-if="isShowPer" :userPositionId="editId" @close="closePer" />
    </div>
</template>
<script>
    import update from './update.vue';
    import permission from './permission';
    import axiosService from '../../core/utils/axiosService';
    export default {
        name: 'RoleIndex',
        components: {
            permission,
            update
        },
        data() {
            return {
                objData: { pageIndex: 1, pageSize: 20, textSearch: '' },
                listPosition: [],
                totalRow: 0,
                isShowEdit: false,
                isShowPer: false,
                editId: 0,
            };
        },
        
        methods: {
            async getList() {
                const response = await axiosService.get(`api/Position?filter=${this.objData}`);
                const data = response.data.responseData.data;
                if (response.data.success) {
                    console.log('data', data)
                    this.listPosition = data;
                    this.totalRow = response.data.responseData.totalData;
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
            openPer(id){
                this.editId = id;
                this.isShowPer = true;
            },
            closePer(){
                this.isShowPer = false;
            },
            async remove(id) {
                let conf = await this.$confirm('Bạn có chắc chắn muốn xóa tài khoản này ?');
                if (conf == undefined) {
                    const { data } = await axiosService.delete(`api/Role/delete/${id}`);
                    if (data.success) {
                        await this.getList();
                        this.$message('Xóa tài khoản thành công !');
                    } else {
                        this.$message('Xóa tài khoản thất bại !', 'error');
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
        },
        async created() {
            await this.getList();
        },
    };
</script>
