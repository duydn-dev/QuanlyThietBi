<template>
    <span class="kt-badge kt-badge--warning kt-badge--inline kt-width" v-if="status == 1">Chưa duyệt</span>
    <span class="kt-badge kt-badge--success kt-badge--inline kt-width" v-else-if="status == 2">Đã duyệt</span>
    <span class="kt-badge kt-badge--inline kt-badge--danger kt-width" v-else>Từ chối</span>
</template>

<script>
    export default {
        name: 'BadgeStep',
        props: ['status']
    };
</script>
