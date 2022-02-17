<template>
    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
        <div id="kt_subheader" class="kt-subheader kt-grid__item">
            <div class="kt-subheader__main">
                <h3 class="kt-subheader__title">Quản lý vị trí</h3>
                <span class="kt-subheader__separator kt-subheader__separator--v" />
                <div id="kt_subheader_search" class="kt-subheader__group">
                    <div id="kt_subheader_search_form" class="kt-margin-l-20">
                        <div class="kt-input-icon kt-input-icon--right kt-subheader__search">
                            <input
                                id="generalSearch"
                                type="text"
                                class="form-control"
                                placeholder="Từ khóa..."
                                v-model="objData.keyword"
                            />
                            <span class="kt-input-icon__icon kt-input-icon__icon--right">
                                <span>
                                    <i class="fa fa-search" />
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="kt-subheader__toolbar">
                <button @click="openPopup()" class="btn btn-brand">
                    <i class="fa fa-plus-square"></i> Tạo mới
                </button>
            </div>
        </div>
        <div id="kt_content" class="kt-grid__item kt-grid__item--fluid kt-content">
            <div class="kt-portlet p-4">
                <alert v-if="totalRow == 0" />
                <table
                    class="kt-datatable__table table-striped table-hover table-bordered"
                    width="100%"
                    v-else
                >
                    <thead class="kt-datatable__head">
                        <tr>
                            <th class="text-center width-80">{{ $t('Label.Stt') }}</th>
                            <th>Tên</th>
                            <th>Mô tả</th>

                            <th class="text-center width-150">{{ $t('Label.Action') }}</th>
                        </tr>
                    </thead>
                    <tbody class="kt-datatable__body">
                        <tr v-for="(item, index) in listData" :key="item.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.description }}</td>
                            <td class="text-center">
                                <button
                                    class="btn btn-warning"
                                    :title="$t('Label.Edit')"
                                    @click="openPopup(item.id)"
                                >
                                    Sửa
                                </button>
                                <button
                                    class="btn btn-danger"
                                    :title="$t('Label.Remove')"
                                    @click="remove(item.id)"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <pager :total="totalRow" :page-index="objData.pageIndex" @change="pageChange" />
            </div>
            <update v-if="isShowUpdate" :id="editId" :type="2" @close="closeEdit" />
        </div>
    </div>
</template>
<script>
import update from './update';
export default {
    components: { update },
    name: 'role-index',
    data() {
        return {
            objData: { keyword: '', pageIndex: 1, pageSize: 20 },
            isShowUpdate: false,
            editId: 0,
            totalRow: 0,
        };
    },
    watch: {
        'objData.keyword'(val) {
            clearTimeout(this.timeDelay);
            this.timeDelay = setTimeout(() => {
                this.$set(this.objData, 'keyword', val);
                this.pageChange(1);
            }, 500);
        },
    },
    methods: {
        getList() {
            let loading = this.$loading.show();

            this.$http({
                data: {
                    m: 'location',
                    fn: 'get-list',
                    ...this.objData,
                },
            })
                .then((response) => {
                    loading.hide();
                    this.listData = response.data;
                    this.totalRow = response.totalRow;
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },

        remove(id) {
            this.$confirm('Bạn có chắc chắn muốn xóa vị trí').then(() => {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'location',
                        fn: 'delete',
                        id: id,
                    },
                })
                    .then((response) => {
                        if (response.success) {
                            loading.hide();
                            this.getList();
                        }
                        loading.hide();
                    })
                    .catch((err) => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            });
        },
        openPopup(id) {
            this.isShowUpdate = true;
            this.editId = id;
        },
        closeEdit(isReload) {
            this.isShowUpdate = false;
            if (isReload) this.getList();
        },
        pageChange(pageNum) {
            this.$set(this.objData, 'pageIndex', pageNum);
            this.getList();
        },
    },
    created() {
        this.getList();
    },
};
</script>