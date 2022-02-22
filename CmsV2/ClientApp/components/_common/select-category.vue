<template>
    <treeselect
        v-if="listData"
        v-model="selectedData"
        name="demo"
        :multiple="multiple"
        :searchable="true"
        :options="listData"
        :limit="10"
        :max-height="300"
        :placeholder="placeholder"
        :disable-branch-nodes="selectParent ? false : true"
        :default-expand-level="1"
        :disabled="disabled"
        no-results-text="Không có dữ liệu"
        no-options-text="Không có dữ liệu"
    />
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
export default {
    name: 'select-category',
    components: { Treeselect },
    props: {
        options: {
            type: Array,
        },
        label: {
            type: String,
            default: 'name',
        },
        code: {
            type: String,
            default: 'id',
        },
        placeholder: {
            type: String,
            default: 'Chọn giá trị',
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        returnObj: {
            type: Boolean,
            default: false,
        },
        value: null,
        type: {
            type: String,
            default: '',
        },
        selectParent: {
            type: Boolean,
            default: false,
        },
        prop: {
            type: String,
            default: 'all',
        },
        itemsAdd: {
            type: Array,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            selectedData: null,
            listData: null,
        };
    },
    computed: {},
    watch: {
        selectedData() {
            var val = this.selectedData;
            this.$emit('input', val);
            this.$emit('change', val);
        },
        lang() {
            this.getListDataSelect();
        },
        type() {
            this.getListDataSelect();
        },
    },
    created() {
        this.getListDataSelect();
        if (this.value) this.selectedData = this.value;
        if (this.itemsAdd && this.itemsAdd.length > 0) {
            for (const item of this.itemsAdd) {
                this.listData.push(item);
            }
        }
    },
    methods: {
        getListDataSelect() {
            this.listData = [];
            var dt = this.appSettings.categories[this.type];

            if (dt) {
                for (let item of dt) {
                    this.listData.push({
                        id: item[this.code],
                        label: item[this.label],
                    });
                }
            }

            //this.createTreeData(this.appSettings.categories[this.type]);
        },
        cleanTreeData(treeData) {
            this._.forEach(treeData, (node) => {
                if (node.children.length == 0) {
                    delete node.children;
                } else this.cleanTreeData(node.children);
            });
            return treeData;
        },
    },
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
