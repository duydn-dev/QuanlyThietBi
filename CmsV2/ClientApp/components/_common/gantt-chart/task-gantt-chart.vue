<template>
    <v-gantt-chart
        :datas="listTaskView"
        :cellHeight="30"
        :scale="60"
        :cellWidth="20"
        :startTime="startTime"
        :endTime="endTime"
        :scrollToPostion="{ x: positionX }"
    >
        <!-- :startTime="startTime" -->
        <template v-slot:block="{ data, item }">
            <task-chart :data="data" @click="itemClick" :item="item"></task-chart>
        </template>
        <template v-slot:left="{ data }">
            <task-left @click="itemClick" :data="data"></task-left>
        </template>
        <template v-slot:title> Công việc </template>
    </v-gantt-chart>
</template>

<script>
import taskChart from './task-chart.vue';
import taskLeft from './task-left.vue';
export default {
    name: 'task-gantt-chart',
    props: ['listTask', 'startTime', 'endTime'],
    components: {
        taskChart,
        taskLeft,
    },
    computed: {
        positionX() {
            let temp = _.maxBy(this.listTask, (o) => {
                return o.fromDate;
            });
            if (this.endTime && temp) {
                var duration = this.$moment.duration(
                    this.$moment(temp.fromDate).diff(this.$moment(this.startTime))
                );
                var hours = duration.asHours();
                return hours * this.cellWidth;
            }
            return 0;
        },
        listTaskView() {
            let temps = [];

            if (this.listTask) {
                _.forEach(this.listTask, (o) => {
                    let temp = {};
                    temp.id = o.id;
                    temp.title = o.title;
                    temp.status = o.status;
                    temp.gtArray = [{ start: o.fromDate, end: o.toDate, ...o }];
                    (temp.colorPair = {
                        dark: 'rgb(116, 202, 90,0.8)',
                        light: 'rgb(116, 202, 90,0.1)',
                    }),
                        temps.push(temp);
                });
            }

            return temps;
        },
    },
    methods: {
        itemClick() {},
    },
};
</script>

<style scoped>
</style>