<template>
    <div v-if="lang == 'vi'">
        <template v-if="disabled">
            <input class="form-control" v-model="valueShow" />
        </template>
        <template v-else>
            <treeselect :key="lang" v-if="listData"
                        v-model="selectedData"
                        name="SelectOption"
                        :multiple="multiple"
                        :searchable="true"
                        :options="listData"
                        :limit="10"
                        :max-height="300"
                        :placeholder="placeholder"
                        :default-expand-level="1"
                        no-results-text="Không có dữ liệu"
                        no-options-text="Không có dữ liệu" :openDirection="openDirection" />
        </template>
       
    </div>
    <div v-else>
        <input class="form-control" v-model="valueShow" />
    </div>
</template>

<script>
    import Treeselect from '@riophae/vue-treeselect';
    import '@riophae/vue-treeselect/dist/vue-treeselect.css';
    export default {
        name: 'SelectOption',
        components: { Treeselect },
        props: {
            options: {
                type: Array
            },
            label: {
                type: String,
                default: 'name'
            },
            openDirection: {
                type: String,
                default: 'auto'
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
                default: false
            },
            value: null,
            lang: {
                type: null,
                default: 'vi'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                selectedData: null,
                valueShow: '',
                listData: []
            };
        },
        computed: {
            language() {
                return this.$getLang();
            }
        },
        watch: {
            selectedData() {
                this.$emit('input', this.selectedData);
                this.$emit('change', this.selectedData);
            },
            'lang'() {
                this.getListDataSelect();
                if (this.value) this.selectedData = this.value;
            },
            valueShow(val) {
                //if (this.lang != 'vi')
                //    this.$emit('input', val);
                this.$emit('input', val);

            }
        },
        created() {
            for (let item of this.options) {
                if (typeof (item) != 'object')
                    this.listData.push({
                        id: item,
                        label: item
                    });
                else
                    this.listData.push({
                        id: item[this.code],
                        label: item[this.label]
                    });
            }
            if (this.value) {
                if (this.multiple && typeof (this.value) != 'object') {
                    let a = [];
                    a.push(this.value);
                    this.selectedData = a;
                }
                else
                    this.selectedData = this.value;
            }
            if (this.selectedData < 0)
                this.selectedData = null;
            if (this.lang != 'vi') {
                //var obj;
                //if (typeof (this.value) == "object")
                //    obj = _.filter(this.options, (o) => {
                //        return this.value && this.value.indexOf(o.id) !== -1
                //    });
                //else {
                //    if (typeof (this.value) === 'string') {
                //        this.valueShow = this.value
                //    } else {
                //        obj = _.filter(this.options, ['id', this.value]);
                //    }
                //}

                //if (obj) {
                //    this.valueShow = _.map(obj, this.lang).join(', ');
                //} else
                let textValue = this.$dict(this.value, this.lang);
                if (!textValue.includes('[') && !textValue.includes(']'))
                    this.valueShow = this.$dict(this.value, this.lang);
                else this.valueShow = this.value;
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
