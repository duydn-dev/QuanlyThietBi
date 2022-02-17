<template>
    <span v-html="valueShow"/>
</template>

<script>
    export default {
        props: {
            value: null,
            dataTypeName: {
                type: String,
                default: ''
            },
            lang: {
                type: null,
                default: 'vi'
            },
            default: {
                type: null,
                default: ''
            }
        },
        data() {
            return {
                valueShow: '',
                key: 1
            };
        },
        watch: {
            value() {
                this.getValueShow(this.value);
            }
        },
        created() {
            this.getValueShow(this.value);
        },
        methods: {
            getValueShow(value) {
                var obj;
                if (typeof (value) == "object" && Array.isArray(value))
                    obj = _.filter(this.dictionaries[this.dataTypeName], (o) => {
                        return value && value.indexOf(o.id) !== -1
                    });
                else {
                    if (typeof (this.value) === 'string') {
                        this.valueShow = value
                    } else {
                        obj = _.filter(this.dictionaries[this.dataTypeName], ['id', value]);
                    }
                }
                if (obj && obj.length > 0) {
                    this.valueShow = _.map(obj, this.lang).join(', ');
                } else
                    this.valueShow = this.default || value;
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
