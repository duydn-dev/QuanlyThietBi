<template>
   
    <span class="kt-badge kt-badge--inline kt-badge--success kt-width"
          v-if="status == 2">Thi xong</span>
    <span class="kt-badge kt-badge--inline kt-badge--warning kt-width"
          v-else-if="status == 1">Chưa thi</span>
    <span class="kt-badge kt-badge--inline kt-badge--danger kt-width" v-else>---</span>
</template>

<script>
export default {
    name: 'badge-order-exam-status',
    props: ['status']
};
</script>
