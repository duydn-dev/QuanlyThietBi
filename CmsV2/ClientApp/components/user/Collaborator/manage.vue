<template>
    <div>
        <modal title="Danh sách cộng tác viên" @close="closePopup">
            <div slot="body">
                <div id="show-list-data">
                    <div class="kt-subheader__toolbar" align="right">
                        <button @click="edit()" class="btn btn-brand">
                            <i class="fa fa-plus-square"></i> Tạo mới
                        </button>
                    </div>
                    <alert v-if="listData.length == 0" />
                    <div class="row" v-if="listData.length>0">
                        <table class="kt-datatable__table" width="100%">
                            <thead class="kt-datatable__head">
                                <tr>
                                    <th class="width-50 text-center">
                                        STT
                                    </th>
                                    <th>Họ và tên</th>
                                    <th>Số điện thoại</th>
                                    <th class="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="kt-datatable__body">
                                <tr v-for="(item, index) in listData" :key="item.id">
                                    <th class="text-center" scope="row">
                                        {{ index + rowNum + 1 }}
                                    </th>
                                    <td class="pt-3 pb-3">
                                        {{ item.fullName }}
                                    </td>
                                    <td class="pt-3 pb-3">
                                        {{item.phone}}
                                    </td>
                                    <td class="btn-action width-160 text-center">
                                        <span title="Sửa"
                                              class="btn btn-primary"
                                              @click="edit(item.id)">
                                            <i class="fa fa-edit" />
                                        </span>
                                        <span title="Xóa" class="btn btn-danger" @click="remove(item.id)">
                                            <i class="fas fa-trash" />
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div slot="footer" class="row">
                <div class="col-sm-12">
                    <button class="btn btn-back" @click="closePopup">
                        <i class="fa fa-arrow-circle-left" /> Quay lại
                    </button>
                </div>
            </div>
        </modal>
        <edit v-if="popupAdd" :id="id" :userOwnedId="userOwnedId" @closePopup="closepopupEdit()"></edit>
    </div>
</template>
<script>
    import edit from './edit';
    import { mapGetters } from 'vuex';
    export default {
        name: 'manage-collaborator',
        props: {
            userOwnedId: {
                type: Number,
                default: 0
            }
        },
        components: { edit },
        data() {
            return {
                objData: {
                    keyword: '',
                    status: 1,
                    pageIndex: 1,
                    pageSize: 20
                },
                id: 0,
                listData: [],
                totalRow: 0,
                popupAdd: false
            };
        },
        computed: {
            ...mapGetters(['categoryList']),
            rowNum() {
                return (this.objData.pageIndex - 1) * this.objData.pageSize;
            },
        },
        created() {
            this.getListData();
        },
        methods: {
            pageChange(pageNum) {
                this.$set(this.objData, 'pageIndex', pageNum);
                this.getListData();
            },
            openPopup(id) {
                this.id = id || 0;
                this.popupAdd = true;
            },
            closePopup() {
                this.$emit('close');
            },
            closepopupEdit() {
                this.popupAdd = false;
                this.getListData();
            },
            getListData() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'collaborator',
                        fn: 'list_by_userOwnedId',
                        userOwnedId: this.userOwnedId,
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
            },
            edit(id) {
                if (id) {
                    this.id = id;
                } else this.id = 0;
                this.popupAdd = true;
            },
            remove(id) {
                this.$confirm('Bạn có chắc muốn xóa dữ liệu này!').then(() => {
                    let loading = this.$loading.show();
                    this.$http({
                        data: {
                            m: 'collaborator',
                            fn: 'remove',
                            id: id
                        }
                    })
                        .then(() => {
                            loading.hide();
                            this.getListData();
                        })
                        .catch(err => {
                            loading.hide();
                            return this.$message(err.message, 'error');
                        });
                });
            },
            closepopup() {
                this.popupAdd = false;
                this.getListData();
            }
        }
    };
</script>

