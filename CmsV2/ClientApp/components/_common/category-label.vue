<template>
    <span>{{labelValue}}</span>
</template>

<script>
    export default {
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            value: null,
            type: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                labelValue: ''
            };
        },
        watch: {
            "value"() {
                this.findData();
            }
        },
        created() {
            this.findData();
        },
        methods: {
            findData() {
                if (this.value) {
                    var dt = this.appSettings.categories[this.type];
                    var o = _.find(dt, ['id', this.value]);
                    if (o)
                        this.labelValue = o.name;
                }
            }
        }
    };
</script>