<template>
<div class="box-ct box-tbl-ct">
             
    <div class="tbl-wrap">
        <table class="tbl">
            <colgroup>
                <col width="4%">
                <col width="24%">
                <col width="23%">
                <col width="23%">
                <col width="26%">
            </colgroup>
            <thead>
                <tr>
                    <th>STT</th>
                    <th class="txt-tit text-start">Tên phòng</th>
                    <th>Trưởng đơn vị</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in listData" :key="item.id">
                    <td>{{i+1}}</td>
                    <td class="txt-tit text-start">{{ item.name }}</td>
                    <td>{{ item.manager }}</td>
                    <td><status-label :status="item.status" /></td>
                    <td class="btn-wrap">
                        <button type="button" class="btn btn-warning" @click="openPopup(item.id)">Sửa</button>
                        <button type="button" class="btn btn-danger" @click="remove(item.id)">Xóa</button>
                    </td>
                </tr>
                <!-- <div
                    v-for="(ch, index) in item.children"
                    :key="ch.id"
                    class="kt-widget4__item col-12 pl-5"
                >
                    <div class="kt-widget4__pic kt-widget4__pic--pic pr-0">
                        <stt :val="`${i+1}.${index+1}`" />
                    </div>
                    <div class="kt-widget4__info">
                        <a class="kt-widget4__username">{{ ch.name }}</a>
                        <p class="kt-widget4__text">
                            <span>
                                Trưởng đơn vị:
                                <b>{{ ch.manager }}</b>
                            </span>
                        </p>
                    </div>
                    <status-label :status="ch.status" />
                    <button class="btn btn-primary btn-icon btn-sm mr-2" @click="openPopup(ch.id)">
                        <i class="fa fa-edit" />
                    </button>
                    <button class="btn btn-danger btn-icon btn-sm" @click="remove(ch.id)">
                        <i class="fa fa-trash-alt" />
                    </button>
                </div> -->
            </tbody>
        </table>
        <pagerv2 :total="totalRow" :page-index="objData.pageIndex" @change="pageChange" />
    </div>
</div>

</template>
<script>
import { mapActions } from 'vuex';
export default {
    props: ['companyId','keyword'],
    name: 'Companydepartment',
    data() {
        return {
            objData: {
                //keyword: '',
                status: 1,
                pageIndex: 1,
                pageSize: 50,
                isTree: true,
                company: this.companyId
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
        'keyword'(val) {
            clearTimeout(this.timeDelay);
            this.timeDelay = setTimeout(() => {
                this.$set(this.objData, 'keyword', val);
                this.getListData();
            }, 500);
        },
        'objData.status'() {
            this.getListData();
        },
        companyId() {
            this.objData.companyId = this.companyId;
        }
    },
    methods: {
        ...mapActions(['getDepartmentList']),
        getListData() {
            let loading = this.$loading.show();
            this.getDepartmentList(this.objData)
                .then(response => {
                    loading.hide();
                    this.listData = response.data;
                    this.totalRow = response.totalRow;
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
            this.$emit('edit', id);
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
