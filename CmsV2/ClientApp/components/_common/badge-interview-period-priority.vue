<template>
    <span class="kt-badge kt-badge--inline kt-badge--success kt-width"
          v-if="priority == 1">Bình thường</span>
    <span class="kt-badge kt-badge--inline kt-badge--warning kt-width"
          v-else-if="priority == 2">Quan Trọng</span>
    <span class="kt-badge kt-badge--inline kt-badge--danger kt-width" v-else>Cần gấp</span>
</template>

<script>
export default {
    name: 'badge-order-exam-status',
    props: ['priority']
};
</script>
