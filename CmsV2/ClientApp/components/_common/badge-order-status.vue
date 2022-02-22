<template>
    <span class="kt-badge kt-badge--brand kt-badge--inline kt-width" v-if="status == 1">Lưu tạm</span>
    <span
        class="kt-badge kt-badge--warning kt-badge--inline kt-width"
        v-else-if="status == 2"
    >Đang tuyển</span>
    <span
        class="kt-badge kt-badge--inline kt-badge--success kt-width"
        v-else-if="status == 3"
    >Đã tuyển</span>
    <span class="kt-badge kt-badge--inline kt-badge--danger kt-width" v-else>Hủy</span>
</template>

<script>
export default {
    name: 'BadgeStep',
    props: ['status']
};
</script>
