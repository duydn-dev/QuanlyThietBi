<template>
    <span></span>
</template>
<script>
    export default {
        name: 'ConfirmF5',
        created() {
            window.addEventListener('beforeunload', this.handler)
        },
        methods: {
            handler(event) {
                event.returnValue = 'Bạn đã lưu dữ liệu chưa?';
            }
        },
        beforeDestroy() {
            window.removeEventListener('beforeunload', this.handler);
        }
    };
</script>
