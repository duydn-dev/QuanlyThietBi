<template>
    <span :key="lang">{{content}}</span>
</template>

<script>
    export default {
        name: 'data-label',
        props: {
            lang: {
                type: null,
                default: 'vi'
            },
            value1: {
                type: null
            },
            value2: {
                type: null
            },
            revFix: {
                type: Boolean,
                default: true
            },
            separate: {
                type: null,
                default: ' '
            }
        },

        data() {
            return {
                content: '',
                isAdd: true
            }
        },
        watch: {
            'value1'() {
                this.showValue();
            },
            'value2'() {
                this.showValue();
            }
        },
        created() {
            this.showValue();
        },
        methods: {
            showValue() {
                this.content = `${this.value1}`;
                if (!this.content)
                    this.separate = '';
                if (this.value2) {
                    if (this.lang == 'jp' && this.revFix) {
                        if (this.separate == '.')
                            this.separate = ' ';
                        this.content = `${this.value2}${this.separate}${this.content}`;
                    } else {
                        this.content = `${this.content}${this.separate}${this.value2}`;
                    }
                }
            }
        }
    };
</script>
