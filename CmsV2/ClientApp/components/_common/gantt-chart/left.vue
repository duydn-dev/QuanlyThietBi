<template>
    <div class="name">
        <!-- <div
            class="colorBar"
            :class="`status-${status.badge}`"
            v-b-tooltip.hover
            :title="status.name"
        />-->
        <a
            href="javascript:;"
            @click="titleClick(data.id)"
            class="carId"
            v-b-tooltip.hover
            :title="data.title"
        >
            {{ data.title }}
        </a>
        <!-- <badgeTask :val="data.memberStatus" :width="60" /> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'TestLeft',
    props: {
        data: Object,
    },
    computed: {
        ...mapGetters(['allTasMemberStatus']),
        status() {
            if (this.allTasMemberStatus)
                return this._.find(this.allTasMemberStatus, ['id', this.data.memberStatus]);
            return {};
        },
    },
    methods: {
        titleClick(id) {
            this.$emit('click', id);
        },
    },
};
</script>

<style scoped>
.name {
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    height: 100%;
    width: 100%;
    padding: 0 5px 0 0;
    border-radius: 8px 0 0 8px;
    align-items: center;
    border-bottom: 1px solid #efefef;
}
.colorBar {
    width: 10px;
    height: 100%;
}
.carId {
    flex: 1;
    padding-left: 5px;
    cursor: pointer;
}
.type {
    padding: 0 5px 0 0;
    font-size: 1.2rem;
}
</style>