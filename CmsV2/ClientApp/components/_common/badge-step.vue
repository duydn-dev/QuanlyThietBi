<template>
    <span
        v-if="val > 0 && step"
        class="space-normal badge width-100 text-white"
        :class="`badge-${step.badge}`"
        >{{ step.value }}</span
    >
    <span v-else class="badge-space-normal badge width-100 badge-warning">Không xác định</span>
</template>

<script>
export default {
    name: 'BadgeStep',
    props: {
        width: {
            type: Number,
            default: 40
        },
        background: {
            type: String
        },
        cClass: {
            type: String
        },
        val: null
    },

    data() {
        return {};
    },
    computed: {
        step() {
            if (this.appSettings.categoryItem)
                return this._.find(this.appSettings.categoryItem, ['id', this.val]);
            return null;
        }
    }
};
</script>
