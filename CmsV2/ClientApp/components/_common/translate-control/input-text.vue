<template>
    <div contenteditable="true" v-html="label" class="form-control" @input="handleInput">
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
            }
        },
        data() {
            return {
                label: ''
            };
        },
        watch: {
            'value'() {
                //this.label = this.value;
            }
        },
        methods: {
            handleInput: function (e) {
                this.$emit('input', e.target.innerHTML);
            }
        },
        created() {
            this.label = this.value;
        }
    };
</script>
