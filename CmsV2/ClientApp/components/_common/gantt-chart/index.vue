<template>
    <div>
        <v-gantt-chart
            :datas="dataView"
            :cellHeight="30"
            :cellWidth="cellWidth"
            :scale="60"
            :startTime="startTime"
            :endTime="endTime"
            v-if="data"
            :scrollToPostion="{ x: positionX }"
        >
            <!-- :startTime="startTime" -->
            <template v-slot:block="{ data, item }">
                <chart :data="data" @click="itemClick" :item="item"></chart>
            </template>
            <template v-slot:left="{ data }">
                <left @click="itemClick" :data="data"></left>
            </template>
            <template v-slot:title> Công việc </template>
        </v-gantt-chart>
    </div>
</template>

<script>
import moment from 'moment';
import chart from './chart.vue';
import left from './left.vue';
import syncScroll from './syncScroll';
export default {
    props: ['data'],
    components: { chart, left },
    data() {
        return {
            scrollToTime: null,
            cellWidth: 20,
        };
    },
    computed: {
        dataView() {
            let temps = [];

            if (this.data) {
                _.forEach(this.data, (o) => {
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
        startTime() {
            let temp = _.minBy(this.data, (o) => {
                return o.fromDate;
            });
            if (temp) {
                return temp.fromDate;
            }

            return null;
        },
        endTime() {
            let temp = _.maxBy(this.data, (o) => {
                return o.toDate;
            });
            if (temp) {
                let date = new Date();
                date.setHours(0, 0, 0, 0);
                date.setDate(date.getDate() + 2);
                // console.log('vao', moment(date), moment(temp.toDate));
                if (moment(temp.toDate) < moment(date)) {
                    return date;
                } else return temp.toDate;
            }

            return null;
        },
        positionX() {
            let temp = _.maxBy(this.data, (o) => {
                return o.fromDate;
            });
            if (this.endTime && temp) {
                var duration = moment.duration(moment(temp.fromDate).diff(moment(this.startTime)));
                var hours = duration.asHours();
                return hours * this.cellWidth;
            }
            return 0;
        },
    },
    methods: {
        itemClick(id) {
            this.$emit('itemClick', id);
        },
    },
    created() {
        // this.timeDelay = setTimeout(() => {
        //     this.scrollToTime = '2019-02-20 10:00:00';
        // }, 500);
        setTimeout(() => {
            if ($(window).width() < 800) {
                $('.gantt-header-timeline').addClass('syncScrollElm');
                $('.gantt-blocks-wrapper').addClass('syncScrollElm');
                $('.syncScrollElm').css({
                    overflow: 'scroll',
                });
                syncScroll($('.syncScrollElm'), () => {
                    //offsetLeft
                    //console.log(offsetLeft);
                });
                $('.gantt-scroll-x').hide();
            }
        }, 1000);
    },
    updated: function () {
        this.$nextTick(function () {
            var currentDay = moment(new Date()).format('MM/DD');
            // console.log(currentDay);
            var allInputs = document.getElementsByClassName('gantt-timeline-day ');
            _.forEach(allInputs, (el) => {
                if (el.innerHTML.trim() == currentDay) {
                    //console.log(el.parentElement.classList);
                    if (el.parentElement) el.parentElement.classList.add('active');
                }
            });
            // var results = [];
            // for (var x = 0; x < allInputs.length; x++)
            //     if (allInputs[x].value == value) results.push(allInputs[x]);
            // return results;
            // Code that will run only after the
            // entire view has been re-rendered
        });
    },
};
</script>

<style>
</style>