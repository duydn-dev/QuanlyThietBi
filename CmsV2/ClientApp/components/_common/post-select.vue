<template>
    <div class="post-select-wrapper">
        <modal title="Chọn bài viết" :width="600" @close="closeManager">
            <div slot="body">
                <div id="form-search" class="row">
                    <div class="col-sm-6">
                        <input
                            v-model="objData.keyword"
                            type="text"
                            placeholder="Từ khóa"
                            class="form-control"
                        />
                    </div>
                    <div class="col-sm-6">
                        <zone-select
                            v-model="objData.zoneId"
                            :value="objData.zoneId"
                            type-name="NEWS"
                        />
                    </div>
                </div>
                <div>
                    <div v-if="listData" class="row">
                        <div v-for="(post, index) in listData" :key="post.id" class="col-12">
                            <div
                                :class="{ 'post-item': true, selected: post.isSelect }"
                                @click="selectPost(index, post.isSelect)"
                            >
                                <h5>{{ post.title }}</h5>
                                <p class="post-meta">
                                    Ngày xuất bản:
                                    <b>{{ post.distributionDate | moment('DD/MM/YYYY HH:mm') }}</b>
                                </p>
                                <i class="fa fa-check" />
                            </div>
                        </div>
                    </div>
                    <pager :total="totalRow" :page-index="objData.pageIndex" @change="pageChange" />
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
                        {{ selected.length }} bài viết đã chọn
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
.post-meta {
    font-size: 13px;
    margin-top: 10px;
}
h5 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
}
.post-item-by-lang {
    padding: 10px;
    border-bottom: solid 1px #ddd;
    position: relative;
}
td .post-item-by-lang:last-child {
    border: 0;
}
.post-item-by-lang .btn {
    float: right;
    position: absolute;
    top: 10px;
    right: 10px;
}
.language-label {
    margin-right: 10px;
    font-size: 11px;
}
.post-item {
    padding: 10px;
    border: 1px solid #fff;
    position: relative;
    background: #e8e5e5;
    margin-bottom: 10px;
    cursor: pointer;
}
.post-item i {
    color: #4caf50;
    position: absolute;
    top: 20px;
    right: 10px;
    display: none;
}
.post-item p {
    margin: 0;
    line-height: 22px;
}
.post-select-wrapper .selected {
    border: 1px solid #4caf50;
}
.post-select-wrapper .selected i {
    display: block;
}
</style>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'PostList',
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
        ...mapGetters(['postList', 'postCount'])
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
        //Search theo status
        'objData.languageCode'(val) {
            this.$set(this.objData, 'languageCode', val);
            this.getListData();
        },
        'objData.zoneId'() {
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
        selectPost(index, isSelect) {
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
                    m: 'post',
                    fn: 'list-select',
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
            this.getListData();
        }
    }
};
</script>
