<template>
    <span>
        {{ japanName }}
    </span>
</template>

<script>
    export default {
        name: 'full-name',
        props: {
            value: null,
            lang: {
                type: null,
                default: 'vi'
            },
        },

        data() {
            return {
                japanName: ''
            }
        },
        watch: {
            'lang'() {
                this.getName();
            }
        },
        methods: {
            getName() {
                if (!this.lang || this.lang == 'vi')
                    this.japanName = this.value;
                else {
                    this.$http({
                        data: {
                            m: 'convertname',
                            fn: 'convert-full-name',
                            fullName: this.value
                        }
                    }).then(response => {
                        if (response.data)
                            this.japanName = response.data.jpName || this.value;
                    }).catch(() => {
                        this.japanName = this.value;
                    });
                }
            }
        },
        created() {
            this.getName();
        }
    }
</script>
