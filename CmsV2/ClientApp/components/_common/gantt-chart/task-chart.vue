<template>
    <div
        :id="targetId"
        :class="`status-${status ? status.badge : 'Draft'}`"
        slot="reference"
        class="plan time-item"
        :style="{
            'margin-top': 0.1 * cellHeight + 'px',
        }"
        @click="onClick"
    >
        <!-- :class="`status-${status.badge}`" -->
        <div class="middle">{{ item.title }}</div>
        <b-popover
            triggers="hover"
            :ref="`tooltip_${item.id}`"
            :target="targetId"
            placement="right"
        >
            <div class="gantt-tooltip text-left">
                <h6 class="font-weight-bold text-center">{{ item.title }}</h6>
                <div class="col-sm-12">
                    <label>
                        <i aria-hidden="true" class="fa fa-calendar mr-1"></i>
                        Từ ngày :
                    </label>
                    <span>{{ item.fromDate | moment('DD/MM/YYYY') }}</span>
                </div>
                <div class="col-sm-12">
                    <label>
                        <i aria-hidden="true" class="fa fa-calendar mr-1"></i>
                        Đến ngày :
                    </label>
                    <span>{{ item.toDate | moment('DD/MM/YYYY') }}</span>
                </div>
                <div class="col-sm-12">
                    <label> Dự án : </label>
                    <span>{{ item.project }}</span>
                </div>
                <div class="col-sm-12">
                    <label> <i class="fas fa-user-alt"></i> Thực hiện bởi : </label>
                    <span>{{ item.createdByName }}</span>
                </div>
            </div>
        </b-popover>
    </div>
</template>

<script>
import dayjs from 'dayjs';
const NOW_PLAN = '#D5F8EA';
const FUTHER_PLAN = '#BFF2FE';
const PAST_PLAN = '#F2F2F2';
export default {
    name: 'task-chart',
    props: {
        data: Object,
        item: Object,
        currentTime: dayjs,
        updateTimeLines: Function,
        cellHeight: Number,
        startTimeOfRenderArea: Number,
    },
    data() {
        return {
            dayjs: dayjs,
        };
    },

    computed: {
        statusColor() {
            let { item, currentTime } = this;
            let start = dayjs(item.start);
            let end = dayjs(item.end);
            if (start.isBefore(currentTime) && end.isAfter(currentTime)) {
                return NOW_PLAN; // NOW
            } else if (end.isBefore(currentTime)) {
                return PAST_PLAN; // PAST
            } else {
                return FUTHER_PLAN; // Future
            }
        },
        targetId() {
            return `gantt_item_${this.item.id}`;
        },
        taskStatus(){
            return this.appSettings.categories["projectStatus"];
        },
        status() {
            let temp = this._.find(this.taskStatus, ['id', this.data.status]);
           
            if (this.taskStatus) return temp;
            return {};
        },
    },
    methods: {
        onClick() {
            this.$emit('click', this.data.id);
        },
    },
    created() {
    },
};
</script>

<style scoped>
.middle {
    flex: 1;
    text-align: center;
    padding-left: 5px;
}
.runTime {
    display: flex;
    flex-direction: column;
}
.plan {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 80%;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    /* color: #333; */
    padding-left: 5px;
    font-size: 0.8rem;
    cursor: pointer;
}
.detail .header {
    text-align: center;
    font-size: 1rem;
}
.detail ul {
    list-style: none;
    padding: 0px;
}
.detail ul li span {
    display: inline-block;
    width: 80px;
    color: #777;
    font-size: 0.8rem;
}
.detail ul li span:first-child {
    text-align: right;
}
.gantt-tooltip {
    color: #4f5255;
}

.time-item {
        overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>