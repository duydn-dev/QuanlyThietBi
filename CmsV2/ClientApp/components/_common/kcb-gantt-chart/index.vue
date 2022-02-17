<template>
    <div class="wx-default" style="height:100%" v-if="task.length>0">
        <div class="area">
            <div class="layout">
                <!-- <div class="grid" style="flex: 0 0 450px;">
                    <div class="table">
                        <div class="row">
                            <div class="cell" style="flex: 1 1 0%; text-align: left;">Công việc</div>
                            <div class="cell" style="width: 120px; text-align: center;">Bắt đầu</div>
                            <div class="cell" style="width: 70px; text-align: center;">Thời hạn</div>
                            <div class="cell">%</div>
                        </div>
                    </div>
                    <div class="table">
                        <div class="row" style="height: 38px;"></div>                        
                    </div>
                </div> -->
                <Grid :configs="configs" :task="task" :scrollTop="scrollTop"/>
                <div class="content">
                    <Scale :scrollLeft="scrollLeft" :scale="configs.scale" :totalDay="totalDays" :startTime="startTime" :endTime="endTime" :cellWidth="configs.cellWidth" :scaleHeight="configs.scaleHeight"/>
                    <!-- <div class="chart">
                        <div class="area">
                            <div style="width: 100%; height: 100%; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAmCAYAAAAycj4zAAAAeklEQVRoge3RsQ3AMADDsPz/qo9I1n5QDSTg3YDOIWPb/fsDH4LECBIjSIwgMYLECBIjSIwgMYLECBIjSIwgMYLECBIjSIwgMYLECBIjSIwgMYLECBIjSIwgMYLECBIjSIwgMYLECBIjSIwgMYLECBIjSMy2e7Zd6+wBrV8B3+hD8hoAAAAASUVORK5CYII=');" ></div>
                            <div class="bars">
                                <div class="bar project"></div>
                            </div>
                        </div>
                    </div> -->
                    <Chart :taskText="taskText" :timeStartName="timeStartName" :timeEndName="timeEndName" @bar-click="barClick" @bar-hover="barHover" @onscroll="chartScroll" :task="task" :cellHeight="configs.cellHeight" :startTime="startTime" :cellWidth="configs.cellWidth" :totalDay="totalDays"/>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.wx-default{   
	--wx-font: 400 14px Arial;
	--wx-font-color: #5f5f5f;
	--wx-border-color: #ebebeb;
	--wx-button-font: 500 14px Roboto;
	--wx-button-primary-font-color: #fff;
	--wx-button-danger-font-color: #ff5252;
	--wx-button-primary-color: #0db5cb;
	--wx-button-primary-color-hover: #2898b0;
	--wx-button-danger-color: transparent;
	--wx-button-danger-color-hover: rgba(255, 82, 82, 0.2);
	--wx-button-radius: 2px;
	--wx-gantt-bar-font: 400 12px Arial;
	--wx-gantt-bar-border-radius: 2px;
	--wx-gantt-task-color: #00bed7;
	--wx-gantt-task-font-color: #fff;
	--wx-gantt-task-fill-color: #2898b0;
	--wx-gantt-task-border-color: #2898b0;
	--wx-gantt-project-color: #2acc69;
	--wx-gantt-project-font-color: #fff;
	--wx-gantt-project-fill-color: #3c9445;
	--wx-gantt-project-border-color: #3c9445;
	--wx-gantt-milestone-color: #d33daf;
	--wx-gantt-select-color: #fff797;
	--wx-gantt-link-color: #ffa011;
	--wx-top-shadow: none;
	--wx-grid-header-font: 400 12px Arial;
	--wx-grid-header-font-color: #a6a6a6;
	--wx-grid-header-text-transform: capitalize;
	--wx-grid-header-shadow: var(--wx-top-shadow);
	--wx-grid-body-font: 400 13px Arial;
	--wx-grid-body-font-color: #5f5f5f;
	--wx-grid-body-row-border: 1px solid var(--wx-border-color);
	--wx-timescale-font: 400 12px Arial;
	--wx-timescale-font-color: #a6a6a6;
	--wx-timescale-text-transform: capitalize;
	--wx-timescale-shadow: var(--wx-top-shadow);
	--wx-timescale-border: 1px solid var(--wx-border-color);
	--wx-label-font: 700 13px Arial;
	--wx-label-font-color: #5f5f5f;
	--wx-input-font: 400 12px Arial;
	--wx-input-font-color: #4f4f4f;
	--wx-input-padding: 8px 11px;
	--wx-input-border: 1px solid #dfdfdf;
	--wx-input-border-radius: 2px;
	--wx-input-focus-color: #2898b0;
	--wx-calendar-border: 1px solid #dfdfdf;
	--wx-calendar-month-font: 400 12px Arial;
	--wx-calendar-month-font-color: #5f5f5f;
	--wx-calendar-days-font: 400 10px Arial;
	--wx-calendar-days-font-color: rgba(0, 0, 0, 0.5);
	--wx-calendar-dates-font: 400 12px Arial;
	--wx-calendar-dates-font-color: #4f4f4f;
	--wx-gantt-marker-font: 400 12px Arial;
	--wx-gantt-marker-font-color: #fff;
	--wx-gantt-marker-color: rgba(43, 111, 173, 0.77);
	--wx-tooltip-font: 400 12px Arial;
	--wx-tooltip-font-color: #5f5f5f;
	--wx-add-btn-icon: url("data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.6 4.59998V6.99998H6.59995V11H4.19995V6.99998H0.199951V4.59998H4.19995V0.599976H6.59995V4.59998H10.6Z' fill='%233DB9D3'/%3E%3C/svg%3E ");
	--wx-close-btn-icon: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Crect width='14' height='14' fill='url(%23pattern0)'/%3E%3Cdefs%3E%3Cpattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'%3E%3Cuse xlink:href='%23image0' transform='scale(0.0555556)'/%3E%3C/pattern%3E%3Cimage id='image0' width='18' height='18' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAkUlEQVQ4T2NkoBJgpJI5DEPAoFOnTv0/c+YMQR+bmJgwmJmZwX2E4bVp06b9j4yMZODg4MBp2I8fPxiWL1/OkJWVNeIN4uTkxAin79+/M5AcRtgCHGQIyQbhijaiDQoKDmZgZ2PDGf0/f/1iWLd2LeHod3d3Z2BkYsJp0P9//xh27tyJ3yCqpWyCeQOHgsGX+wEZpW4T5LCxKwAAAABJRU5ErkJggg=='/%3E%3C/defs%3E%3C/svg%3E%0A");
	--wx-open-btn-icon: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Crect width='14' height='14' fill='url(%23pattern0)'/%3E%3Cdefs%3E%3Cpattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'%3E%3Cuse xlink:href='%23image0' transform='scale(0.0555556)'/%3E%3C/pattern%3E%3Cimage id='image0' width='18' height='18' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAArklEQVQ4T2NkoBJgpJI5DEPAoFOnTv0/c+YMQR+bmJgwmJmZwX2E4bVp06b9j4yMZODg4MBp2I8fPxiWL1/OkJWVNUAGcXJyMnz//h3uQrJdRLFBIAPQAchlJLsIFuCMjIwM////B5sJMoRkg2CuIdtrQcHBDOxsbHBfCQgIMHz48AHO//nrF8O6tWsJR7+7uzsDIxMTznT0/98/hp07d+I3iGopm2DewKFg8OV+AJWkfRMrTobLAAAAAElFTkSuQmCC'/%3E%3C/defs%3E%3C/svg%3E ");
	--wx-close-sb-icon: url("data:image/svg+xml,%3Csvg width='15' height='14' viewBox='0 0 15 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.0344 1.42188L12.6281 0.015625L7.04999 5.59375L1.47186 0.015625L0.0656128 1.42188L5.64374 7L0.0656128 12.5781L1.47186 13.9844L7.04999 8.40625L12.6281 13.9844L14.0344 12.5781L8.45624 7L14.0344 1.42188Z' fill='black' fill-opacity='0.54'/%3E%3C/svg%3E%0A");
	--wx-show-more-icon: url("data:image/svg+xml,%3Csvg width='10' height='5' viewBox='0 0 10 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.820312 0.820312L5 5L9.17969 0.820312H0.820312Z' fill='black' fill-opacity='0.5'/%3E%3C/svg%3E ");
	--wx-calendar-icon: url("data:image/svg+xml,%3Csvg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.8203 15.3203H2.17969V6.17969H13.8203V15.3203ZM11.3203 0.320312V2H4.67969V0.320312H3V2H2.17969C1.6849 2 1.28125 2.15625 0.96875 2.46875C0.65625 2.78125 0.5 3.1849 0.5 3.67969V15.3203C0.5 15.7891 0.65625 16.1927 0.96875 16.5312C1.30729 16.8438 1.71094 17 2.17969 17H13.8203C14.2891 17 14.6797 16.8438 14.9922 16.5312C15.3307 16.1927 15.5 15.7891 15.5 15.3203V3.67969C15.5 3.1849 15.3307 2.78125 14.9922 2.46875C14.6797 2.15625 14.2891 2 13.8203 2H13V0.320312H11.3203ZM12.1797 9.5H8V13.6797H12.1797V9.5Z' fill='black' fill-opacity='0.5'/%3E%3C/svg%3E ");
	--wx-remove-link-icon: url("data:image/svg+xml,%3Csvg width='12' height='15' viewBox='0 0 12 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 13.3203C1 13.7891 1.15625 14.1927 1.46875 14.5312C1.80729 14.8438 2.21094 15 2.67969 15H9.32031C9.78906 15 10.1797 14.8438 10.4922 14.5312C10.8307 14.1927 11 13.7891 11 13.3203V3.32031H1V13.3203ZM3.03125 7.38281L4.24219 6.21094L6 8.00781L7.75781 6.21094L8.92969 7.38281L7.17188 9.17969L8.92969 10.9375L7.75781 12.1094L6 10.3516L4.24219 12.1094L3.07031 10.9375L4.82812 9.17969L3.03125 7.38281ZM8.92969 0.820312L8.07031 0H3.92969L3.07031 0.820312H0.179688V2.5H11.8203V0.820312H8.92969Z' fill='black' fill-opacity='0.5'/%3E%3C/svg%3E ");

}
</style>
<style scoped type="text/css">

.area{
	position: relative;
	height: 100%;
	width: 100%;
}
.layout {
	position: absolute;
	display: flex;
	height: 100%;
	width: 100%;
	background-color: #fff;
}

.gantt-row {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	border-bottom: var(--wx-grid-body-row-border);
}
.cell {
	display: flex;
	justify-content: center;
	align-items: center;
	border-right: var(--wx-timescale-border);
	font: var(--wx-timescale-font);
	text-transform: var(--wx-timescale-text-transform);
	color: var(--wx-timescale-font-color);
}
.chart{
    flex: 1 1 auto;
overflow: auto;
}
.content {
	/* width: 100%;
	white-space: nowrap;
	display: flex;
	justify-content: flex-start;
	align-items: center;
    position: relative; */
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.wx-default >>> .scale {
	position: relative;
	box-shadow: var(--wx-top-shadow);
}

.task-wrap .box-ct .chart{margin:0;padding:0;border:none;}
</style>
<script>
import Grid from "./grid";
import Scale from "./scale";
import Chart from "./chart";
export default {
    props: {        
        options:{
            type:Object,
            default(){
                return {
                    gridWidth:400,
                    dateGrid:'DD/MM/YYYY',
                    scaleHeight:30,
                    cellHeight:38,
                    cellWidth:100,
                    columns:[
                        { name: "label", label: "Công việc", width: "100%" },
                        { name: "timeStart", label: "Bắt đầu", width: "80px", align: "center" },
                        { name: "timeEnd", label: "Thời hạn", width: "80px", align: "center" },
                    ],
                    scale:[
                        { unit: "month", step: 1, format: "[Tháng] MM/YYYY" },
                        { unit: "day", step: 1, format: "DD" },
                    ]               
                    
                }
            }
        },
        task:Array
    },
    components: { Grid,Scale,Chart},
    data() {
        return {           
            startTime:null, 
            endTime:null,           
            totalDays:0,
            scrollLeft:0, 
            scrollTop:0,
            configs:{
                gridWidth:400,
                dateGrid:'DD/MM/YYYY',
                scaleHeight:30,
                cellHeight:38,
                cellWidth:100,
                columns:[
                    { name: "label",text:true, label: "Công việc", width: "100%" },
                    { name: "timeStart", timeStart:true, label: "Bắt đầu", width: "80px", align: "center" },
                    { name: "timeEnd", timeEnd:true,label: "Thời hạn", width: "80px", align: "center" },
                ],
                scale:[
                    { unit: "month", step: 1, format: "[Tháng] MM/YYYY" },
                    { unit: "day", step: 1, format: "DD" },
                ]                     
            },        
        };
    },
    computed: {
       timeStartName(){
           return this.configs.columns.filter(c=>c.timeStart)[0].name;
       },
       timeEndName(){
           return this.configs.columns.filter(c=>c.timeEnd)[0].name;
       },
       taskText(){
           return this.configs.columns.filter(c=>c.text)[0].name;
       }
    },
    methods: {
        processDate(){
            
            //let minDate =null;let maxDate=null;
            // for(let i = 0; i <this.rowList.length;i++){ 
            //     let row = this.rowList[i];

            //     let rowStartDate =this.$moment(row.timeStart);
            //     let rowEndDate =this.$moment(row.timeEnd);

            //     if(!minDate){
            //         minDate =rowStartDate;
            //     }else{
            //         minDate = minDate>rowStartDate?rowStartDate:minDate;
            //         }
            //     if(!maxDate){
            //         maxDate =rowEndDate;
            //     }else{
            //         maxDate = maxDate<rowEndDate?rowEndDate:maxDate;
            //     }
            // }

            // let timeStartName=this.configs.columns.filter(c=>c.timeStart)[0].name;
            // let timeEndName=this.configs.columns.filter(c=>c.timeEnd)[0].name;

            // if(!timeEndName)
            //     timeEndName=timeStartName;

            // console.log("timeStartName",timeStartName);
            // console.log("timeEndName",timeEndName);

            let vm=this;
            let minItem = this.task.reduce(function (a, b) { return vm.$moment(a[vm.timeStartName]).toDate() < vm.$moment(b[vm.timeStartName]).toDate() ? a : b; }); 
            let maxItem = this.task.reduce(function (a, b) { return vm.$moment(a[vm.timeEndName]).toDate() > vm.$moment(b[vm.timeEndName]).toDate() ? a : b; }); 

            let momentStart=this.$moment(minItem[vm.timeStartName]);
            momentStart=momentStart.add(-3,'days'); //nới thêm 3 ngày nhìn cho rõ

            this.startTime = momentStart.toDate();
            this.endTime = this.$moment(maxItem[vm.timeEndName]).toDate();
            this.totalDays=Math.ceil(this.getDaysCount(this.startTime,this.endTime)) ;
            
            if(this.totalDays<20){
                this.totalDays=20;
                this.endTime = momentStart.add(20,'days').toDate();
            }
            //console.log("totalDays",this.totalDays);
            
        },
        getDaysCount(date1,date2){
            let Difference_In_Time = date2.getTime() - date1.getTime();  
            // To calculate the no. of days between two dates
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            return Difference_In_Days;
        },
        chartScroll(scLeft,scTop){
            //console.log('chartScroll',scLeft,scHeight);
            this.scrollLeft=scLeft;
            this.scrollTop=scTop;
        },
        barClick(info){ 
            console.log('barClick===>',info);
            this.$emit('barclick',info);
        },
        barHover(info){ 
            console.log('barHover===>',info);
            this.$emit('barhover',info);
        }
    },
    created() {
        //console.log("this.task",this.task);
        Object.assign(this.configs, this.options);
        //this.$set(this.configs,'task',this.task||[]);// this.configs.task=this.task||[];


        // let a = this.$moment('2020-03-03 23:00');
        // console.log(a);
        if(this.task.length>0)
            this.processDate();
        //console.log(this.startTime);

        // setTimeout(() => {
        //     console.log("this.task",this.task);
        // }, 2000);
    },
    watch:{
        task(){
            this.processDate();
        }
    }
};
</script>

<style>
</style>