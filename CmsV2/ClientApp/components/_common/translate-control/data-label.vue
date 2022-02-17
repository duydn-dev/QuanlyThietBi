<template>
    <span :key="lang">{{content}}</span>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'data-label',
        props: {
            lang: {
                type: null,
                default: 'vi'
            },
            type: {
                type: null,
                default: ''
            },
            value: {
                type: null
            },
            suffix: {
                type: String,
                default: ''
            },
            prefix: {
                type: String,
                default: ''
            },
            revFix: {
                type: Boolean,
                default: true
            },
            separate: {
                type: null,
                default: ' '
            },
            default: {
                type: String,
                default: null
            }
        },

        data() {
            return {
                content: '',
                isAdd: true
            }
        },
        computed: {
            ...mapGetters(['dictListByIds'])
        },
        watch: {
            'value'() {
                this.showValue();
            },
            'prefix'() {
                this.showValue();
            },
            'suffix'() {
                this.showValue();
            },
            dictListByIds() {
                if (typeof (this.value) == "string") {
                    return;
                }
                if (this.value) {
                    if (typeof (this.value) == "object" && Array.isArray(this.value)) {
                        var dt = this.dictionaries[this.type];
                        var res = [];
                        _.forEach(this.value, (o) => {
                            let obj = _.find(dt, ['id', parseInt(o)]);
                            if (obj) {
                                if (obj[this.lang])
                                    res.push(obj[this.lang]);
                                else
                                    res.push(obj.vi);
                            }
                        })
                        this.content = res.join(', ');
                    } else if (typeof (this.value) !== "string" && parseInt(this.value) > 0) {
                        var obj;
                        obj = _.find(this.dictListByIds, ['id', parseInt(this.value)]);
                        if (obj) {
                            this.content = obj[this.lang];
                        } else
                            this.isAdd = false;
                    } else
                        this.content = this.value;

                }
                else {
                    if (this.default)
                        this.content = this.default;
                    else
                        this.content = '';
                }
                if (this.isAdd) {
                    if (this.prefix) {
                        if (this.lang == 'jp' && this.revFix) {
                            if (this.separate == '.')
                                this.separate = ' ';
                            this.content = `${this.content}${this.separate}${this.prefix}`;
                        } else {
                            this.content = `${this.prefix}${this.separate}${this.content}`;
                        }
                    }
                    if (this.suffix) {
                        if (this.lang == 'jp' && this.revFix) {
                            if (this.separate == '.')
                                this.separate = ' ';
                            this.content = `${this.suffix}${this.separate}${this.content}`;
                        } else {
                            this.content = `${this.content}${this.separate}${this.suffix}`;
                        }
                    }
                }
            }
        },
        created() {
            this.showValue();
        },
        methods: {
            ...mapActions(['getDictByIds']),
            showValue() {
                if (this.value) {
                    if (typeof (this.value) == "object" && Array.isArray(this.value)) {
                        if (typeof (this.value[0]) == "string") {
                            this.content = this.value[0];
                        } else {
                            var dt = this.dictionaries[this.type];
                            var res = [];
                            _.forEach(this.value, (o) => {
                                let obj = _.find(dt, ['id', parseInt(o)]);
                                if (obj) {
                                    if (obj[this.lang])
                                        res.push(obj[this.lang]);
                                    else
                                        res.push(obj.vi);
                                }
                            })
                            this.content = res.join(', ');
                        }
                    }
                    else if (typeof (this.value) !== "string" && parseInt(this.value) > 0) {

                        if (!this.dictListByIds || !_.find(this.dictListByIds, ['id', parseInt(this.value)]))
                            this.getDictByIds(this.value);
                        else {
                            var obj = _.find(this.dictListByIds, ['id', parseInt(this.value)]);
                            if (obj) {
                                this.content = obj[this.lang];
                            }
                        }
                    }
                    else
                        this.content = this.value;
                }
                else {
                    if (this.default)
                        this.content = this.default;
                    else
                        this.content = '';
                }
                if (this.prefix) {
                    if (this.lang == 'jp' && this.revFix) {
                        if (this.separate == '.')
                            this.separate = ' ';
                        this.content = `${this.content}${this.separate}${this.prefix}`;
                    } else {
                        this.content = `${this.prefix}${this.separate}${this.content}`;
                    }
                }
                if (this.suffix) {
                    if (this.lang == 'jp' && this.revFix) {
                        if (this.separate == '.')
                            this.separate = ' ';
                        this.content = `${this.suffix}${this.separate}${this.content}`;
                    } else {
                        if (`${this.content}${this.separate}`.includes('___'))
                            this.content = `${this.content}${this.separate}`.replace('___', `${this.suffix}`);
                        else
                            this.content = `${this.content}${this.separate}${this.suffix}`;
                    }
                } else
                    if (this.content.includes('___')) this.content = this.content.replace('___', '');
            }
        }
    };
</script>
