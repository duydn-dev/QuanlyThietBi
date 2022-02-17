<template>
    <multiselect v-if="options" v-model="selectedData"
                 :options="options"
                 :label="label"
                 :track-by="trackBy"
                 class="dll-multiselect"
                 :placeholder="placeholder"
                 deselectLabel="Bỏ chọn"
                 selectLabel="Chọn"
                 selectedLabel="Đang chọn"
                 :allow-empty="true"
                 :multiple="multiple">
    </multiselect>
</template>

<script>
    export default {
        name: 'multi-select',
        props: {
            options: {
                type: Array,
                default: null
            },
            label: {
                type: String,
                default: 'name'
            },
            trackBy: {
                type: String,
                default: 'id'
            },
            placeholder: {
                type: String,
                default: 'Chọn giá trị'
            },
            multiple: {
                type: Boolean,
                default: false
            },
            value: {
                type: Array,
                default: null
            },
        },

        data() {
            return {
                selectedData: null
            }
        },
        methods: {

        },
        watch: {
            'value'() {
                this.selectedData = this.value;
            },
             'selectedData'() {
                 this.$emit('input', this.selectedData)
            }
        },
        created() {
            this.selectedData = this.value;
        }
    }
</script>
