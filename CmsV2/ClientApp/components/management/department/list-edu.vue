<template>
    <div class="kt-portlet p-3">
        <div id="kt_apps_user_list_datatable"
             class="kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--loaded">
            <table class="kt-datatable__table">
                <thead class="kt-datatable__head">
                    <tr>
                        <th class="width-50">#</th>
                        <th>Tên nhóm/phòng</th>
                        <th>Trưởng phòng</th>
                        <th>Trưởng nhóm</th>
                        <th>Cán bộ xử lý</th>
                        <th>Cán bộ chi nhánh</th>
                        <th class="text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody class="kt-datatable__body">
                    <tr v-for="(item, index) in listData" :key="'user' + item.id">
                        <th scope="row">{{ index + rowNum + 1 }}</th>
                        <td>{{ item.name }}</td>
                        <td>{{ item.manager || '---' }}</td>
                        <td>{{ item.leader || '---' }}</td>
                        <td>
                            <p v-for="b in item.staffUsers" :key="'s'+b.id">{{ b.name }}</p>
                        </td>
                        <td>
                            <p v-for="b in item.branchUsers" :key="'b'+b.id">{{ b.name }}</p>
                        </td>
                        <td class="btn-action width-80 text-center">
                            <span title="Sửa" class="btn btn-primary" @click="openPopup(item.id)">
                                <i class="fa fa-edit" />
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="pr-4 pl-4">
                <pager :total="totalRow" :page-index="objData.pageIndex" @change="pageChange" />
            </div>
        </div>
        <pager :total="totalRow" :page-index="objData.pageIndex" @change="pageChange" />
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
                pageSize: 50,
                isTree: true
            },
            id: 0,
            listData: [],
            totalRow: 0,
            popupAdd: false
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
        'objData.status'() {
            this.getListData();
        }
    },
    methods: {
        getListData() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'companydepartment',
                    fn: 'list-edu',
                    ...this.objData
                }
            })
                .then((res) => {
                    loading.hide();
                    this.listData = res.data;
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
        openPopup(id) {
            this.$emit("edit", id)
        },

        closePopup() {
            this.popupAdd = false;
            this.getListData();
        },
        remove(id) {
            this.$confirm('Bạn có chắc muốn xóa phòng ban này?').then(() => {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'companydepartment',
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
        }
    },
    created() {
        this.getListData();
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
