<!--<template>
   <InputTag/>
</template>

<script>
    //import InputTag from 'vue-input-tag'
    export default {
        name: 'input-text',
        components: { InputTag },
        props: {
            value: null,
            limit: {
                type: Number,
                default: 10
            },
            treeselectable: {
                type: Boolean,
                default: false
            },

        },

        data() {
            return {
                selectedData: null
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
            selectedData() {
                var val = this.selectedData;
                this.$emit('input', val);
                this.$emit('change', val);
            }
        },
        created() {
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
            }
        }
    };
</script>
<style>
    .vue-treeselect b.badge { margin: 11.5px 5px 0 5px; padding: 1px 5px; float: right; }
    .vue-treeselect .custom-badge .label { float: right; margin-top: 9px; }
    .vue-treeselect .custom-badge { line-height: 20px; margin: 0; }
    .vue-treeselect .no-badge b.badge { display: none !important; }
    .vue-treeselect__multi-value-label { white-space: normal }
</style>-->
