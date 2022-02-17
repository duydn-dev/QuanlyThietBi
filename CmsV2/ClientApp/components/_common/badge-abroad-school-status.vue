<template>
    <span class="kt-badge kt-badge--inline kt-badge--success kt-width"
          v-if="status == 1">Đối tác chiến lược</span>
    <span class="kt-badge kt-badge--inline kt-badge--success kt-width"
          v-else-if="status == 2">Đối tác thân thiết</span>
    <span class="kt-badge kt-badge--inline kt-badge--primary kt-width"
          v-else-if="status == 3">Đối tác bình thường</span>
    <span class="kt-badge kt-badge--inline kt-badge--primary kt-width"
          v-else-if="status == 4">Đối tác hạn chế</span>
    <span class="kt-badge kt-badge--inline kt-badge--danger kt-width"
          v-else-if="status == 5">Ngừng hợp tác</span>
    <span class="kt-badge kt-badge--inline kt-badge--warning kt-width" v-else>---</span>
</template>

<script>
    export default {
        name: 'badge-abroad-school-status',
        data() {
            return {
                listStatus: [{ id: 1, name: 'Đối tác chiến lược' }, { id: 2, name: 'Đối tác thân thiết' }, { id: 3, name: 'Đối tác bình thường' }, { id: 4, name: 'Đối tác hạn chế' }, { id: 5, name: 'Ngừng hợp tác' }]
            }
        },
        props: ['status']
    };
</script>
