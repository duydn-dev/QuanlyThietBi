<template>
    <treeselect        
        v-model="zoneId"
        :options="listZoneWithDefault"
        :value="value"
        :placeholder="placeholder||'Chọn danh mục'"
        :normalizer="normalizer"
        :default-expand-level="10"
        :load-options="loadOptions"
    />
</template>
<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
export default {
    name: 'TreeSelect',
    components: { Treeselect },
    props: {
        options: null,
        value: null,
        placeholder: null
    },
    data() {
        return {
            zoneId: this.value,
            normalizer(node) {
                var ch = node.children;
                if (ch && ch.length == 0)
                    ch = undefined;
                return {
                    id: node.id,
                    label: node.label,
                    children: ch
                };
            }
        };
    },
    computed: {
        listZoneWithDefault() {
            if (this.options) {
                return this.options;
            } else {
                return [];
            }
        }
    },
    watch: {
        value() {
            this.zoneId = this.value;
        },
        zoneId() {
            this.$emit('input', this.zoneId);
        }
    },
    methods: {
        loadOptions({ action, parentNode, callback }) {
            if (action == 'LOAD_CHILDREN_OPTIONS') {
                if (!parentNode.children) parentNode.children = undefined;
                callback();
            }
        }
    }
};
</script>
