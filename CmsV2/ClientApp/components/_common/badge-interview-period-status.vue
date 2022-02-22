<template>
    <span class="kt-badge kt-badge--brand kt-badge--inline kt-width" v-if="status == 1">Đang tuyển</span>
    <span class="kt-badge kt-badge--warning kt-badge--inline kt-width"
          v-else-if="status == 2">Đã tuyển</span>
    <span class="kt-badge kt-badge--inline kt-badge--success kt-width"
          v-else-if="status == 3">Quá hạn</span>
    <span class="kt-badge kt-badge--inline kt-badge--danger kt-width" v-else>Lưu tạm</span>
</template>

<script>
export default {
    name: 'BadgeStep',
    props: ['status'],
    created(){
    }
};
</script>
