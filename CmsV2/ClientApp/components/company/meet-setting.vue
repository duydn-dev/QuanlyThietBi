<template>

    <div class="container-fluid">
        <div v-if="listData" class="row">
            <div class="col-12">
                <table class="kt-datatable__table table-striped table-hover table-bordered"
                       width="100%">
                    <thead class="kt-datatable__head">
                        <tr>
                            <th>Id</th>
                            <th>Logo</th>
                            <th>Tên công ty/ tổ chức</th>
                            <th>Trạng thái</th>
                            <th>Số phòng tối đa</th>
                            <th>Số tài khoản tối đa</th>
                            <th>Tác vụ</th>
                        </tr>
                    </thead>
                    <tbody class="kt-datatable__body">
                        <tr v-for="(item, index) in listData"
                            :key="index">
                            <td class="pt-3 pb-3">{{item.info.id}}</td>
                            <td class="pt-3 pb-3">
                                <avatar :src="item.logo"
                                        :username="item.name"
                                        css-class="kt-widget__img"
                                        :size="50" />
                            </td>
                            <td class="pt-3 pb-3">
                                {{ item.info.name }}
                            </td>
                            <td>
                                <div v-if="editId!=item.info.id">
                                    <i class="fa fa-check"
                                       v-if="item.config.enabled"></i>
                                    <span v-else>Không kích hoạt</span>
                                </div>
                                <div v-else>
                                    <label class="kt-checkbox">
                                        <input type="checkbox" v-model="item.config.enabled">
                                        Kích hoạt
                                        <span></span>
                                    </label>
                                </div>
                            </td>
                            <td>
                                <span v-if="editId!=item.info.id">{{item.config.maxRoom}}</span>
                                <input class="form-control" type="text" v-model="item.config.maxRoom" v-else />
                            </td>
                            <td>
                                <span v-if="editId!=item.info.id">{{item.config.maxUser}}</span>
                                <input class="form-control" type="text" v-model="item.config.maxUser" v-else />
                            </td>
                            <td>
                                <button type="button"
                                        class="btn btn-primary"
                                        @click="editId=item.info.id" v-if="editId!=item.info.id">
                                    <i class="fa fa-edit"></i>Sửa
                                </button>
                                <div v-else>
                                    <button type="button" class="btn btn-success" @click="saveItem(item)"><i class="fa fa-save"></i>Lưu</button>
                                    <button type="button" class="btn btn-secondary" @click="editId=0">Hủy</button>
                                </div>                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'CompanyMeetSetting',
        data() {
            return {
                objData: {
                    keyword: '',
                    pageIndex: 1,
                    pageSize: 20
                },
                listData: [],
                totalRow: 0,
                popupAdd: false,
                popupPermission: false,
                id: 0,
                mode: 'show',
                editId: 0
            };
        },
        computed: {
            rowNum() {
                return (this.objData.pageIndex - 1) * this.objData.pageSize;
            }
        },
        watch: {
            //Search theo keyword
            'objData.keyword'(val) {
                clearTimeout(this.timeDelay);
                this.timeDelay = setTimeout(() => {
                    this.$set(this.objData, 'keyword', val);
                    this.getListData();
                }, 500);
            },
            'objData.typeName'() {
                this.getListData();
            }
        },
        created() {
            this.getListData();
        },
        methods: {
            getListData() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'meet',
                        fn: 'company-list-with-setting',
                        ...this.objData
                    }
                }).then(response => {
                    loading.hide();
                    this.listData = response.data;
                    this.totalRow = response.totalRow;
                }).catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
            },
            pageChange(pageNum) {
                this.$set(this.objData, 'pageIndex', pageNum);
                this.getListData();
            },
            saveItem(item) {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'meet',
                        fn: 'company-config-update',
                        maxUser: item.config.maxUser,
                        maxRoom: item.config.maxRoom,
                        enabled: item.config.enabled
                    }
                }).then(() => {
                    loading.hide();
                    this.editId = 0;
                }).catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
            }
        }
    };
</script>
