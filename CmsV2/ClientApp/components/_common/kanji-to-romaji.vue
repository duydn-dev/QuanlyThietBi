<template>
    <input class="form-control" :v-model="value" :placeholder="placeholder" @input="$emit('input', $event.target.value)"/>
</template>
<script>
    export default {
        props: {
            q: {
                type: String
            },
            start: {
                type: null,
                default: 0
            },
            placeholder: {
                type: String,
                default: ''
            },
            lang: {
                type: String,
                default: 'vi'
            }
        },
        data() {
            return {
                value: ''
            }
        },
        watch: {
            //value(val) {
            //    this.$emit('input', val);
            //},
            start() {
                this.getData();
            }
        },
        methods: {
            getData() {
                if (!this.q || this.lang != 'jp') return;
                this.$http({
                    data: {
                        m: 'ConvertName',
                        fn: 'kanji-to-romaji',
                        q: this.q
                    }
                })
                    .then(response => {
                        if (response.data && response.data != 'ja') {
                            this.value = response.data;
                            
                        } else if (!this.value) {
                            this.value = this.q;
                        }
                        this.$emit('input', this.value);
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            },
        },
        created() {
            this.getData();
        }
    };
</script>