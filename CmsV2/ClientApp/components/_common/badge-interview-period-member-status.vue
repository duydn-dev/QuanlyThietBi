<template>
    <span class="kt-badge kt-badge--brand kt-badge--inline kt-width" v-if="status == 1">Chưa phỏng vấn</span>
    <span class="kt-badge kt-badge--warning kt-badge--inline kt-width"
          v-else-if="status == 2">Đã phỏng vấn</span>
    <span class="kt-badge kt-badge--inline kt-badge--success kt-width"
          v-else-if="status == 3">Đỗ phỏng vấn</span>
    <span class="kt-badge kt-badge--inline kt-badge--danger kt-width" v-else>Trượt phỏng vấn</span>
</template>

<script>
    export default {
        name: 'badge-interview-period-member-status',
        props: ['status']
    };
</script>
