<template>

    <treeselect v-if="listData && !isView"
                v-model="selectedData"
                name="demo"
                :multiple="multiple"
                :searchable="true"
                :options="listData"
                :clearable="clearable"
                :limit="10"
                :max-height="300"
                :placeholder="placeholder"
                :default-expand-level="1"
                no-results-text="Không có dữ liệu"
                no-options-text="Không có dữ liệu"
                :disable-branch-nodes="disableParent"
                :disabled="disabled"
                @select="selectNode"
                :show-count="showCount"
                @search-change="searchChange">
        <div v-if="node.raw.badge" slot="value-label" slot-scope="{ node }">
            <span :class="`badge badge-${node.raw.badge}`">{{ node.label }}</span>
        </div>
        <div v-else slot="value-label" slot-scope="{ node }">
            {{ node.label }}
        </div>
        <label slot="option-label"
               slot-scope="{ node }"
               class="custom-badge"
               :class="{ 'no-badge': !node.raw.badge }">
            <span class="label">&nbsp;{{ node.label }}</span>
            <b :class="`badge badge-${node.raw.badge}`">&nbsp;</b>
        </label>
    </treeselect>
    <span v-else style="font-weight:bold">{{valueShow}}</span>
</template>

<script>
    import Treeselect from '@riophae/vue-treeselect';
    import '@riophae/vue-treeselect/dist/vue-treeselect.css';
    export default {
        name: 'Fselect',
        components: { Treeselect },
        props: {
            options: {
                type: Array,
                default() {
                    return [];
                }
            },
            label: {
                type: String,
                default: 'name'
            },
            code: {
                type: String,
                default: 'id'
            },
            parentField: {
                type: String,
                default: 'parentId'
            },
            placeholder: {
                type: String,
                default: 'Chọn giá trị'
            },
            multiple: {
                type: Boolean,
                default: false
            },
            isView: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            returnObj: {
                type: Boolean,
                default: false
            },
            disableParent: {
                type: Boolean,
                default: false
            },
            showCount: {
                type: Boolean,
                default: true
            },
            value: null,
            clearable: {
                type: Boolean,
                default: true
            },
            treeselectable: {
                type: Boolean,
                default: false
            },

        },

        data() {
            return {
                selectedData: null,
                valueShow: ''
            };
        },
        computed: {
            listData() {
                if (this.treeselectable) {
                    if (this.options) {
                        return this.createTreeData(this.options);
                    }
                }
                else if (this.options) {
                    var data = []; //[{ id: 0, label: 'Chọn danh mục' }];
                    //var parents = _.filter(this.options, [this.parentField, 0]);
                    //if (parents.length == 0) parents = this.options;
                    for (let item of this.options) {
                        //var children = _.filter(this.options, [this.parentField, item[this.code]]);
                        //if (children && children.length > 0) {
                        //    let childrenList = [];
                        //    for (let ch of children) {
                        //        childrenList.push({
                        //            id: ch[this.code],
                        //            label: ch[this.label],
                        //            badge: ch.badge
                        //        });
                        //    }
                        //    data.push({
                        //        id: item[this.code],
                        //        label: item[this.label],
                        //        badge: item.badge,
                        //        children: childrenList
                        //    });
                        //} else
                        data.push({
                            id: item[this.code],
                            label: item[this.label],
                            badge: item.badge
                        });
                    }
                    return data;
                }
                return [];
            }
        },
        watch: {
            selectedData(val) {
                var obj = _.filter(this.options, (o) => { return o.id == val; });
                if (this.returnObj == true) {
                    this.$emit('input', obj);
                    this.$emit('change', obj);
                }
                else {
                    this.$emit('input', val);
                    this.$emit('change', val);
                }
            },
          
        },
        created() {
            if (this.isView && this.options && this.value) {
                var obj = _.find(this.options, (o) => { return o.id == this.value; });
                if (obj)
                    this.valueShow = obj.name;
            }
            if (this.value == 0)
                this.selectedData = null;
            else
                this.selectedData = this.value;

        },
        methods: {
            createTreeData(data) {
                var map = {},
                    node,
                    roots = [],
                    i;
                for (i = 0; i < data.length; i += 1) {
                    map[data[i].id] = i;
                    data[i].label = data[i].name;
                    data[i].children = [];
                }
                for (i = 0; i < data.length; i += 1) {
                    node = data[i];
                    if (node.parentId != 0) {
                        data[map[node.parentId]].children.push(node);
                    } else {
                        roots.push(node);
                    }
                }
                return this.cleanTreeData(roots);
            },
            cleanTreeData(treeData) {
                this._.forEach(treeData, node => {
                    if (node.children.length == 0) {
                        delete node.children;
                    } else this.cleanTreeData(node.children);
                });
                return treeData;
            },
            selectNode(node) {
                this.$emit('selectNode', node);
            },
            searchChange(node) {
                this.$emit('searchChange', node);
            }
        }
    };
</script>
<style>
    .vue-treeselect b.badge {
        margin: 11.5px 5px 0 5px;
        padding: 1px 5px;
        float: right;
    }

    .vue-treeselect .custom-badge .label {
        float: right;
        margin-top: 9px;
    }

    .vue-treeselect .custom-badge {
        line-height: 20px;
        margin: 0;
    }

    .vue-treeselect .no-badge b.badge {
        display: none !important;
    }

    .vue-treeselect__multi-value-label {
        white-space: normal
    }
</style>
