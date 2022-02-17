<template>
    <tree-select :options="zoneData" :value="value" v-model="zoneId" v-if="listZone" :multiple="multiple" />
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
    import treeSelect from './tree-select';

    export default {
        name: 'zone-select',
        components: { treeSelect },
        props: {
            value: {
                type: null,
                default: null
            },
            typeName: {
                type: String,
                default: ''
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapGetters(['listZone']),
            zoneData() {
                return this.listZone;
            }
        },
        data() {
            return {
                zoneId: this.value
            }
        },
        methods: {
            ...mapActions(['getZoneTree'])
        },
        watch: {
            'value'() {
                this.zoneId = this.value;
            },
            'zoneId'() {
                this.$emit('input', this.zoneId);
                this.$emit('change', this.zoneId);
            }
        },
        created() {
            this.getZoneTree({type: this.typeName});
        }
    }
</script>