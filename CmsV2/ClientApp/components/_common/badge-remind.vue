<template>
    <span v-if="status > 0" class="space-normal badge  text-white badge-success">{{ title }}</span>
    <span v-else class="badge-space-normal badge  badge-warning">{{title}}</span>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'BadgeStep',
    props: {
        width: {
            type: Number,
            default: 40
        },
        status: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {};
    },
    computed: {
        ...mapGetters(['lstAbroadMemberRemindStatus']),
        title() {
            let temp = _.find(this.lstAbroadMemberRemindStatus, ['id', this.status]);
            if (temp != null) return temp.name;

            return '';
        }
    }
};
</script>
