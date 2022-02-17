<template>
    <span class="kt-badge kt-badge--inline kt-badge--success kt-width" v-if="status == 1">Thi đỗ</span>
    <span
        class="kt-badge kt-badge--inline kt-badge--danger kt-width"
        v-else-if="status == 2"
    >Thi trượt</span>
    <span class="kt-badge kt-badge--warning kt-badge--inline kt-width" v-else>Chờ thi</span>
</template>

<script>
export default {
    name: 'BadgeStep',
    props: ['status']
};
</script>
