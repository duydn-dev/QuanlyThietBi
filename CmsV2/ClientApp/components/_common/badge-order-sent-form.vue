<template>
   
    <span class="kt-badge kt-badge--inline kt-badge--success kt-width"
          v-if="status == 2">Đã gửi</span>
    <span class="kt-badge kt-badge--inline kt-badge--warning kt-width"
          v-else-if="status == 1">Đơn nháp</span>
    <span class="kt-badge kt-badge--inline kt-badge--danger kt-width" v-else>---</span>
</template>

<script>
export default {
    name: 'badge-order-sent-form',
    props: ['status']
};
</script>
