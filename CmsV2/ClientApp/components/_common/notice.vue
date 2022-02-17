<template>
    <span>
        <i class="fa fa-info-circle" :id="id"></i>
        <b-tooltip :target="id" triggers="hover">
            <slot></slot>
        </b-tooltip>
    </span>
</template>
<script>
    export default {
        data() {
            return {
                id: 0
            }
        },
        created() {
            this.id = 'tooltip' + new Date().getTime() + Math.floor(Math.random() * 10);
        }
    }
</script>
<style scoped>
    i.fa { color: red; cursor: pointer; font-size: 17px; }
</style>