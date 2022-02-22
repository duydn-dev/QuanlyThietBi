<template>
    <span> {{getText}}</span>
</template>

<script>
    export default {
        name: 'text-more',
        props: {
            text: {
                type: String,
                required: true
            },
            countW: {
                type: Number,
                default: 8
            }
        },
        computed: {
            getText() {
                if (!this.text || this.text == '') return "---";
                var arr = this.text.split(' ');
                if (arr.length <= this.countW)
                    return this.text;
                return (_.slice(arr, 0, this.countW).join(" ") + '...');
            }
        }
    }
</script>
