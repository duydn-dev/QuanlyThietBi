<template>
    <treeselect v-if="listData && !isView"
                v-model="selectedData"
                name="demo"
                :multiple="multiple"
                :searchable="true"
                :options="listData"
                :limit="10"
                :disabled="disabled"
                :max-height="300"
                :placeholder="placeholder"
                :disable-branch-nodes="selectParent ? false : true"
                :default-expand-level="1"
                no-results-text="Không có dữ liệu"
                no-options-text="Không có dữ liệu" />
    <span v-else class="font-weight-bold">{{valueShow}}</span>
</template>

<script>
    import Treeselect from '@riophae/vue-treeselect';
    import '@riophae/vue-treeselect/dist/vue-treeselect.css';
    import { mapGetters } from 'vuex';
    export default {
        name: 'DataItemSelectbox',
        components: { Treeselect },
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            isView: {
                type: Boolean,
                default: false
            },
            options: {
                type: Array
            },
            label: {
                type: String,
                default: 'vi'
            },
            code: {
                type: String,
                default: 'id'
            },
            placeholder: {
                type: String,
                default: 'Chọn giá trị'
            },
            multiple: {
                type: Boolean,
                default: true
            },
            returnObj: {
                type: Boolean,
                default: false
            },
            value: null,
            dataTypeName: {
                type: String,
                default: ''
            },
            selectParent: {
                type: Boolean,
                default: false
            },
            prop: {
                type: String,
                default: 'all'
            }
        },
        data() {
            return {
                selectedData: null,
                listData: null,
                valueShow: ''
            };
        },
        computed: {
            ...mapGetters(['dictionaries'])
        },
        watch: {
            selectedData() {
                var val = this.selectedData;
                this.$emit('input', val);
                this.$emit('change', val);
            },
            "lang"() {
                this.getListDataSelect();
            },
            'dataTypeName'() {
                this.getListDataSelect();
            }
        },
        created() {
            this.getListDataSelect();
            if (this.isView && this.listData && this.value && this.dataTypeName) {
                var listData1 = this.dictionaries[this.dataTypeName];
                var obj = _.find(listData1, (o) => { return o.id == this.value; });
                if (obj)
                    this.valueShow = obj.vi;
            }
            if (this.value) {
                this.selectedData = this.value;

            }
        },
        methods: {
            getListDataSelect() {
                this.listData = this.createTreeData(this.dictionaries[this.dataTypeName]);
            },
            createTreeData(data) {
                if (!data)
                    return [];
                var map = {},
                    node,
                    roots = [],
                    i;
                for (i = 0; i < data.length; i += 1) {
                    map[data[i].id] = i;
                    data[i].label = data[i][this.label];
                    data[i].children = [];
                }
                for (i = 0; i < data.length; i += 1) {
                    node = { ...data[i] };
                    node.id = data[i][this.code];
                    if (node.parentId != 0 && this.prop == 'all') {
                        if (map[node.parentId] != undefined && data[map[node.parentId]] != undefined)
                            data[map[node.parentId]].children.push(node);
                    } else {
                        roots.push(node);
                    }
                }
                return this.cleanTreeData(roots);
            },
            cleanTreeData(treeData) {
                this._.forEach(treeData, (node) => {
                    if (node.children.length == 0) {
                        delete node.children;
                    } else this.cleanTreeData(node.children);
                });
                return treeData;
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
</style>
