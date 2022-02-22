<template>
    <treeselect
        v-if="listData && !isView"
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
        no-results-text="Không có dữ liệu"
        no-options-text="Không có dữ liệu"
        :disabled="disabled"
    />
    <span v-else class="font-weight-bold">{{valueShow}}</span>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import { mapActions } from 'vuex';
export default {
    name: 'DataItemSelectbox',
    components: { Treeselect },
    props: {
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
            default: 'Chọn định khoản'
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
        selectParent: {
            type: Boolean,
            default: false
        },
        prop: {
            type: String,
            default: 'all'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selectedData: null,
            listData: null,
            valueShow: '',
            data: []
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
        dataTypeName() {
            this.getListDataSelect();
        }
    },
    created() {
        //this.getAllIllustrativeEntry().then(response => {
        this.data = this.appSettings.illustrativeEntry; //response.data;
        this.getListDataSelect();
        if (this.isView && this.listData && this.value && this.dataTypeName) {
            var obj = _.find(this.data, o => {
                return o.id == this.value;
            });
            if (obj) this.valueShow = obj.name;
        }
        //});
        if (this.value) {
            this.selectedData = this.value;
        }
    },
    methods: {
        ...mapActions(['getAllIllustrativeEntry']),
        getListDataSelect() {
            this.listData = this.createTreeData(this.data);
        },
        createTreeData(data) {
            var map = {},
                node,
                roots = [],
                i;
            for (i = 0; i < data.length; i += 1) {
                map[data[i].id] = i;
                data[i].label = data[i].code + ' - ' + data[i][this.label];
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
            this._.forEach(treeData, node => {
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
