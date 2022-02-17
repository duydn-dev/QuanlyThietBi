<template>
    <span>
        {{text}}
    </span>
</template>

<script>
    export default {
        name: 'badge-order-quantity-member',
        props: ['man', 'women', 'all'],
        data() {
            return {
                text: ''
            }
        },
        methods: {
            quantityMember() {
                if (this.all > 0) {
                    this.text = `${this.all}`;
                } else if (this.man > 0 || this.women > 0) {
                    this.text = `${this.man + this.women}`;
                } else {
                    this.text = '---';
                }
            }
        },
        created() {
            this.quantityMember();
        }
    };
</script>
