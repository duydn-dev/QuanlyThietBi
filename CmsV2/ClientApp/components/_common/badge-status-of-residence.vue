<template>
    <span class="kt-badge kt-badge--inline kt-badge--success kt-width" v-if="status == 1">Đã có</span>
    <span v-b-tooltip.hover v-b-tooltip="{ placement: 'right', variant: 'danger', delay: 200, html: true }"
          :title="'Lý do: ' + reasonForRefusal" 
          :class="{'kt-badge': true, 'kt-badge--inline': true, 'kt-badge--danger': true, 'kt-width': true,'cursor-pointer': reasonForRefusal }"
          v-else-if="status == 2">Từ chối</span>
    <span v-else>--</span>
</template>

<script>
    export default {
        name: 'BadgeStep',
        props: ['status', 'reasonForRefusal'],
        created() {
            //console.log('reasonForRefusal', this.reasonForRefusal);
        }
    };
</script>
