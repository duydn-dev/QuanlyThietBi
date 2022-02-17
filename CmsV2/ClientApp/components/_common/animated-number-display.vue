<template>
    <animated-number :value="value"
                     :formatValue="formatNumber"
                     :duration="1000" />
</template>
<style scoped>
    .disabled {
        opacity: 0.5;
        pointer-events: none;
    }
</style>
<script>
    import AnimatedNumber from "animated-number-vue";
    export default {
        components: {
            AnimatedNumber
        },
        props: ['value'],
        data() {
            return {
            };
        },
        methods: {
            formatNumber(value) {
                return  this.getNumberFormat(value, this.decimalDigits);//`${value.toFixed(0)}`;
            }
        }
    };
</script>
