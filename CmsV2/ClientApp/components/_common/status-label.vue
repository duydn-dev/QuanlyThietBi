<template>
    <span v-if="status == 1" class="badge badge-success status-label">
        Đang sử dụng
    </span>
    <span v-else class="badge badge-danger status-label">
        Ngừng sử dụng
    </span>
</template>
<style scoped>
.status-label {
    margin: 0 5px;
}
</style>
<script>
export default {
    name: 'StatusLabel',
    props: {
        status: {
            default: '',
            required: true
        }
    }
};
</script>
