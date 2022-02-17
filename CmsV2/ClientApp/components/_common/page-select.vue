<template>
    <div class="page-select-wrapper">
        <modal title="Chọn trang" size="large" @close="closeManager">
            <div slot="body">
                <div id="form-search" class="row">
                    <div class="col-sm-12">
                        <input
                            v-model="objData.keyword"
                            type="text"
                            placeholder="Từ khóa"
                            class="form-control"
                        />
                    </div>
                    <!--<div class="col-sm-6">
                        <zone-select :value="objData.zoneId" typeName="NEWS" v-model="objData.zoneId" />
                    </div>-->
                </div>
                <div>
                    <div v-if="listData" class="row">
                        <div v-for="(page, index) in listData" :key="page.id" class="col-12">
                            <div
                                :class="{ 'page-item': true, selected: page.isSelect }"
                                @click="selectPage(index, page.isSelect)"
                            >
                                <h5>{{ page.pageByLangs[0].title }}</h5>
                                <i class="fa fa-check" />
                            </div>
                        </div>
                    </div>
                    <pager
                        :total="totalRow"
                        :page-index="objData.pageIndex"
                        :page-size="objData.pageSize"
                        @change="pageChange"
                    />
                </div>
            </div>
            <template slot="footer">
                <div class="d-flex flex-fill justify-content-between">
                    <button
                        type="button"
                        class="btn btn-secondary waves-effect"
                        data-dismiss="modal"
                        @click="closeManager"
                    >
                        Đóng
                    </button>
                    <button
                        v-show="selected && selected.length > 0"
                        type="button"
                        class="btn btn-primary waves-effect waves-light"
                        @click="insert"
                    >
                        <span class="icon-span-filestyle fas fa-arrow-circle-down" />Chèn
                        {{ selected.length }} trang đã chọn
                    </button>
                </div>
            </template>
        </modal>
    </div>
</template>
<style scoped>
td {
    padding: 0 10px;
}
.page-meta {
    font-size: 13px;
    margin-top: 10px;
}
h5 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
}
.page-item-by-lang {
    padding: 10px;
    border-bottom: solid 1px #ddd;
    position: relative;
}
td .page-item-by-lang:last-child {
    border: 0;
}
.page-item-by-lang .btn {
    float: right;
    position: absolute;
    top: 10px;
    right: 10px;
}
.language-label {
    margin-right: 10px;
    font-size: 11px;
}
.page-item {
    padding: 10px;
    border: 1px solid #fff;
    position: relative;
    background: #e8e5e5;
    margin-bottom: 10px;
    cursor: pointer;
}
.page-item i {
    color: #4caf50;
    position: absolute;
    top: 13px;
    right: 10px;
    display: none;
}
.page-item p {
    margin: 0;
    line-height: 22px;
}
.page-select-wrapper .selected {
    border: 1px solid #4caf50;
}
.page-select-wrapper .selected i {
    display: block;
}
</style>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'PageList',
    props: {
        languageCode: {
            type: String,
            default: 'vi-VN'
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            objData: {
                keyword: '',
                languageCode: 'vi-VN',
                pageIndex: 1,
                pageSize: 20,
                zoneId: 0
            },
            totalRow: 0,
            listData: [],
            selected: []
        };
    },
    computed: {
        ...mapGetters(['pageList', 'pageCount'])
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
        'objData.languageCode'(val) {
            this.$set(this.objData, 'languageCode', val);
            this.getListData();
        }
    },
    created() {
        this.objData.languageCode = this.languageCode;
        this.getListData();
    },
    methods: {
        closeManager() {
            this.$emit('close');
        },
        insert() {
            this.selected = this._.filter(this.listData, item => {
                return item.isSelect == true;
            });
            if (this.selected && this.selected.length > 0) {
                this.$emit('insert', this.selected);
                this.closeManager();
            }
        },
        selectPage(index, isSelect) {
            if (!this.multiple)
                for (var i in this.listData) {
                    this.listData[i].isSelect = false;
                }
            this.listData[index].isSelect = !isSelect;
            this.selected = this._.filter(this.listData, item => {
                return item.isSelect == true;
            });
        },
        getListData() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'page',
                    fn: 'list',
                    ...this.objData
                }
            })
                .then(response => {
                    loading.hide();
                    var data = response.data;
                    this.listData = [];
                    var me = this;
                    data.forEach(function(item) {
                        //let exists = me.relatedList.find(k => k.id == item.id);
                        var addItem = Object.assign(
                            {
                                id: 0,
                                title: '',
                                avatar: 0,
                                isSelect: false
                            },
                            item
                        );
                        me.listData.push(addItem);
                    });
                    this.totalRow = response.totalRow;
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        pageChange(pageNum) {
            this.$set(this.objData, 'pageIndex', pageNum);
            this.selected = [];
            this.getListData();
        }
    }
};
</script>
