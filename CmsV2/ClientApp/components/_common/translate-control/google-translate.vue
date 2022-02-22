<template>
    <div>
        <input :placeholder="placeholder" v-model="label" class="form-control" />
    </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: null
            },
            lang: {
                type: String,
                default: 'vi'
            },
            placeholder: {
                type: String,
                default: ""
            },
            googleTranslate: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                label: ''
            };
        },
        watch: {
            'label'(val) {
                this.$emit('input', val);
            }
        },
        methods: {
            GGtranslate(keyword) {
                let fn = this.googleTranslate ? 'gg-translate' : 'translate';
                this.$http({
                    data: {
                        m: 'autotranslate',
                        fn: fn,
                        keyword: keyword,
                        lang: this.lang
                    }
                }).then(res => {
                    this.label = this.$dictAccentsVI(res.data);
                }).catch(err => {
                    console.log('gg-translate-component', err);
                    this.label = keyword;
                });
            },
        },
        created() {
            if (this.lang == 'vi')
                this.label = this.value;
            else if (this.lang == 'jp')
                this.label = this.$dictAccentsVI(this.value);
            else
                this.GGtranslate(this.value);
        }
    };
</script>
