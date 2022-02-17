<template>

    <span class="kt-badge kt-badge--inline kt-badge--success kt-width"
          v-if="status == 2">Phỏng vấn online</span>
    <span class="kt-badge kt-badge--inline kt-badge--success kt-width"
          v-else-if="status == 1">Phỏng vấn trực tiếp</span>
    <span class="kt-badge kt-badge--inline kt-badge--success kt-width"
          v-else-if="status == 3">Xét hồ sơ</span>
    <span class="kt-badge kt-badge--inline kt-badge--success kt-width"
          v-else-if="status == 4">Gọi điện thoại</span>
    <span class="kt-badge kt-badge--inline kt-badge--success kt-width"
          v-else>Những lưu ý khác</span>
</template>

<script>
export default {
    name: 'badge-abroad-school-status',
    props: ['status']
};
</script>
