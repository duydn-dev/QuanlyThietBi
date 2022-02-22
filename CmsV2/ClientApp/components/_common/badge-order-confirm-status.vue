<template>
    <span class="kt-badge kt-badge--inline kt-badge--warning kt-width"
          v-if="status == 1">Chờ duyệt</span>
    <span class="kt-badge kt-badge--inline kt-badge--success kt-width"
          v-else-if="status == 2">Đã duyệt</span>
    <span class="kt-badge kt-badge--inline kt-badge--danger kt-width"
          v-else-if="status == 3">Hủy đơn</span>
    <!--<span class="kt-badge kt-badge--inline kt-badge--primary kt-width" v-else>Đơn nháp</span>-->
</template>

<script>
    export default {
        name: 'badge-order-confirm-status',
        props: ['status']
    };
</script>
