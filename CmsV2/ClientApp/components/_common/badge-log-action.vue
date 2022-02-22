<template>
    <span class="badge badge-success" v-if="type == 'Modified'">Sửa</span>
    <span class="badge badge-danger" v-else-if="type == 'Deleted'">Xóa</span>
    <span class="badge badge-info" v-else>Thêm mới</span>
</template>

<script>
export default {
    props: ['type'],
};
</script>

<style>
</style>