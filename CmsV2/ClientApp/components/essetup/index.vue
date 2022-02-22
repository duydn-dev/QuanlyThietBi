<template>
    <div
        v-if="currentUser.isSystem"
        class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
    >
        <div id="kt_subheader" class="kt-subheader   kt-grid__item">
            <div class="kt-subheader__main">
                <h3 class="kt-subheader__title">
                    Elastic Search
                </h3>

                <span class="kt-subheader__separator kt-subheader__separator--v" />

                <div id="kt_subheader_search" class="kt-subheader__group">
                    <form id="kt_subheader_search_form" class="kt-margin-l-20">
                        <div class="kt-input-icon kt-input-icon--right kt-subheader__search">
                            <input
                                id="generalSearch"
                                type="text"
                                class="form-control"
                                placeholder="Search..."
                            />
                            <span class="kt-input-icon__icon kt-input-icon__icon--right">
                                <span>
                                    <i class="fa fa-search" />
                                </span>
                            </span>
                        </div>
                    </form>
                </div>
            </div>

            <div class="kt-subheader__toolbar">
                <a class="btn btn-label-brand btn-bold" @click="popupOpen = 2">
                    Tạo index
                </a>
            </div>
        </div>
        <div id="kt_content" class="kt-content  kt-grid__item kt-grid__item--fluid">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__body kt-portlet__body--fit">
                    <!--begin: Datatable -->
                    <div
                        id="kt_apps_user_list_datatable"
                        class="kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--loaded"
                    >
                        <table class="kt-datatable__table">
                            <thead class="kt-datatable__head">
                                <tr>
                                    <th class="width-50">
                                        #
                                    </th>
                                    <th>Index</th>
                                    <th>Item count</th>
                                    <th>Deleted</th>
                                    <th>Size</th>
                                    <th>Status</th>
                                    <th class="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="kt-datatable__body">
                                <tr v-for="(item, index) in listData" :key="item.index">
                                    <th scope="row">
                                        {{ index + 1 }}
                                    </th>
                                    <td>{{ item.index }}</td>
                                    <td>{{ item['docs.count'] }}</td>
                                    <td>{{ item['docs.deleted'] }}</td>
                                    <td>{{ item['store.size'] }}</td>
                                    <td>
                                        <span
                                            v-if="item.status == 'open'"
                                            class="badge badge-success"
                                            >{{ item.status }}</span
                                        >
                                        <span v-if="item.else" class="badge badge-danger">{{
                                            item.status
                                        }}</span>
                                    </td>
                                    <td class="btn-action width-180">
                                        <span
                                            title="Setting"
                                            class="btn btn-warning"
                                            @click="openPopup(item.index, 3)"
                                            ><i class="fa fa-cog"
                                        /></span>
                                        <span
                                            title="Mapping"
                                            class="btn btn-primary"
                                            @click="openPopup(item.index, 4)"
                                            ><i class="fa fa-share-alt"
                                        /></span>
                                        <span
                                            title="Init lại data"
                                            class="btn btn-dark"
                                            @click="initDataV2(item.index)"
                                            ><i class="fas fa-sync-alt"
                                        /></span>
                                        <span
                                            title="Xóa index"
                                            class="btn btn-danger"
                                            @click="remove(item.index)"
                                            ><i class="fas fa-times"
                                        /></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="pr-4 pl-4">
                            <pager
                                :total="totalRow"
                                :page-index="objData.pageIndex"
                                @change="pageChange"
                            />
                        </div>
                    </div>

                    <!--end: Datatable -->
                </div>
            </div>
        </div>
        <modal
            v-if="popupOpen == 1"
            id="modal-resetpass"
            :footer="false"
            :width="400"
            :title="`Init data index -> <b>${this.index}</b>`"
            @close="popupOpen = 0"
        >
            <div slot="body">
                <div class="form-group">
                    <div class="kt-checkbox-list">
                        <label class="kt-checkbox">
                            <input v-model="selectAll" type="checkbox" ::checked="selectAll" />
                            Tất cả hệ thống
                            <span />
                        </label>
                        <label
                            v-for="u in appSettings.companies"
                            :key="'u_' + u.id"
                            class="kt-checkbox"
                        >
                            <input v-model="selectedCompany" type="checkbox" :value="u.id" />
                            {{ u.name }}
                            <span />
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Số lượng bản ghi</label>
                    <input v-model="topItem" type="text" placeholder="" class="form-control" />
                </div>
                <button class="btn btn-primary" secondary @click="initData()">
                    Xác nhận
                </button>
            </div>
        </modal>
        <modal
            v-if="popupOpen == 2"
            id="modal-resetpass"
            :footer="false"
            :width="400"
            title="Tạo index"
            @close="popupOpen = 0"
        >
            <div slot="body">
                <div class="form-group">
                    <label>Đối tượng áp dụng</label>
                    <select v-model="objectTypeId" class="form-control">
                        <option :value="0">
                            Chọn đối tượng
                        </option>
                        <option value="dictionary">
                            Dictionary (Danh mục)
                        </option>
                        <option value="dictionary_school">
                            School (Trường học)
                        </option>
                        <option value="dictionary_address">
                            Address (Địa chỉ)
                        </option>
                        <option value="malformation">
                            Malformation (Dị hình)
                        </option>
                    </select>
                </div>
                <button class="btn btn-primary" secondary @click="createdIndex()">
                    Xác nhận
                </button>
            </div>
        </modal>
        <modal
            v-if="popupOpen == 3"
            id="modal-resetpass"
            :footer="false"
            :width="800"
            title="Setting"
            @close="popupOpen = 0"
        >
            <div slot="body">
                <div class="form-group">
                    <textarea v-model="settings" class="form-control" style="height:200px" />
                </div>
                <button class="btn btn-cyan" secondary @click="saveSettings()">
                    Lưu lại
                </button>
            </div>
        </modal>
        <modal
            v-if="popupOpen == 4"
            id="modal-resetpass"
            :footer="false"
            :width="800"
            title="Mapping"
            @close="popupOpen = 0"
        >
            <div slot="body">
                <div class="form-group">
                    <textarea v-model="mappings" class="form-control" style="height:600px" />
                </div>
                <button class="btn btn-cyan" secondary @click="saveMappings()">
                    Lưu lại
                </button>
            </div>
        </modal>
    </div>
</template>
<script>
export default {
    name: 'Companydepartment',
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
            popupOpen: 0,
            index: '',
            selectedCompany: [],
            selectAll: false,
            objectTypeId: 0,
            topItem: 1000,
            settings: '',
            mappings: ''
        };
    },
    computed: {
        rowNum() {
            return (this.objData.pageIndex - 1) * this.objData.pageSize;
        }
    },
    watch: {
        selectAll() {
            if (this.selectAll) {
                this.selectedCompany = _.map(this.appSettings.companies, 'id');
            } else this.selectedCompany = [];
        },
        popupOpen() {
            if (this.popupOpen == 3) {
                this.$http({
                    data: {
                        m: 'es',
                        fn: 'get-setting',
                        index: this.index
                    }
                })
                    .then(response => {
                        this.settings = response.data;
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });
            } else if (this.popupOpen == 4) {
                this.$http({
                    data: {
                        m: 'es',
                        fn: 'get-mapping',
                        index: this.index
                    }
                })
                    .then(response => {
                        this.mappings = response.data;
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });
            }
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
                    m: 'es',
                    fn: 'list'
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
        pageChange(pageNum) {
            this.$set(this.objData, 'pageIndex', pageNum);
            this.getListData();
        },
        openPopup(index, popIndex) {
            this.index = index;
            this.popupOpen = popIndex;
        },
        initData() {
            if (this.selectedCompany.length == 0)
                return this.$message('Vui lòng chọn hệ thống!', 'error');
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'es',
                    fn: 'init-data',
                    index: this.index,
                    top: this.topItem,
                    companyIds: JSON.stringify(this.selectedCompany)
                }
            })
                .then(() => {
                    setTimeout(() => {
                        loading.hide();
                        this.getListData();
                        this.index = '';
                        this.popupOpen = 0;
                    }, 1000);
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        createdIndex() {
            if (!this.objectTypeId) return this.$message('Vui lòng chọn đối tượng!', 'error');
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'es',
                    fn: 'index',
                    index: this.objectTypeId
                }
            })
                .then(() => {
                    setTimeout(() => {
                        loading.hide();
                        this.getListData();
                        this.index = '';
                        this.popupOpen = 0;
                    }, 1000);
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        remove(id) {
            this.$confirm('Bạn có chắc muốn xóa index này?').then(() => {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'es',
                        fn: 'remove-index',
                        index: id
                    }
                })
                    .then(() => {
                        setTimeout(() => {
                            loading.hide();
                            this.getListData();
                        }, 1000);
                    })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            });
        },
        initDataV2(id) {
            this.$confirm('Bạn có chắc muốn init lại data của index: "'+id+'"?').then(() => {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'es',
                        fn: 'index',
                        index: id
                    }
                })
                    .then(() => {
                        setTimeout(() => {
                            loading.hide();
                            this.getListData();
                        }, 1000);
                    })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            });
        },
        saveSettings() {
            this.$http({
                data: {
                    m: 'es',
                    fn: 'setting',
                    index: this.index,
                    jsonData: this.settings
                }
            })
                .then(() => {
                    return this.$success('Cập nhật thành công!');
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        },
        saveMappings() {
            this.$http({
                data: {
                    m: 'es',
                    fn: 'mapping',
                    index: this.index,
                    jsonData: this.mappings
                }
            })
                .then(() => {
                    return this.$success('Cập nhật thành công!');
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        }
    }
};
</script>
<style scoped>
.stt {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    vertical-align: middle;
    background-color: rgb(255, 64, 129);
    font: 13px/42px Helvetica, Arial, sans-serif;
    color: rgb(255, 154, 219);
    float: left;
    margin-right: 10px;
    margin-top: 5px;
}

.NewsItemTitle1 {
    clear: right;
    color: #444;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    line-height: 51px; /*//25*/
    padding-right: 20px;
    font-weight: bold;
    margin: 0;
    padding-bottom: 5px;
}
.action-btnn {
    width: 55px;
    position: absolute;
    right: 0;
    top: 25px;
    display: none;
    background: #f1f1f1;
}
</style>
