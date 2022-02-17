<template>
    <div class="bar task" :style="barStyle">
        <div class="bar-text">{{barInfo[taskText]}}</div>
    </div>
</template>
<style scoped>
.bar {
	box-sizing: border-box;
	position: absolute;
	border-radius: var(--wx-gantt-bar-border-radius);
	font: var(--wx-gantt-bar-font);
	white-space: nowrap;
	line-height: inherit;
	text-align: center;
	cursor: pointer;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.task{
    border: 1px solid var(--wx-gantt-project-border-color);
    border-color: var(--wx-gantt-project-border-color);
    color: var(--wx-gantt-project-font-color);
    background-color: var(--wx-gantt-project-color);
}
.bar-text {
	position: relative;
	z-index: 2;
	display: inline;
}
</style>
<script>
export default {
    name: 'bar',
    props: {        
        cell:Object,
        startTime:Date,
        rowNum:Number,
        barInfo:Object,
        barSpace:Number,
        timeStartName:String, //
        timeEndName:String,
        taskText:String
    },
    data() {
        return {
            //barWidth:0,
            //barSpace:2,
            top:0, 
            left:0,
            
        }
    },
    computed: {
        ganttBarConfig(){
            //check trạng thái trả về màu tương ứng
            let now = new Date();
            if(this.startTime>now) //chưa bắt đầu
                return {
                    color:'white',
                    backgroundColor:'#AFB9C8'
                }

            //hoàn thành
            return {
                color:'white',
                backgroundColor:'#10A103'
            }
            //đang xử lý
            // return {
            //     color:'white',
            //     backgroundColor:'#0982DA'
            // }
            //quá hạn
            // return {
            //     color:'white',
            //     backgroundColor:'#FF6939'
            // }
            //hoàn thành quá hạn
            // return {
            //     color:'white',
            //     backgroundColor:'#1FAE98'
            // }
        },
        barTop(){
            return this.rowNum*this.cell.height + this.barSpace;
        },
        barHeight(){
            return this.cell.height-this.barSpace*2;
        },
        barWidth(){ 
            return this.cell.width*this.totalCell;
        },
        barLeft(){
            return this.getDaysCount(this.startTime,this.timeStart)*this.cell.width;
        },
        barStyle(){

            return {
                width:this.barWidth+'px',
                height:this.barHeight+'px',
                //backgroundColor:this.barInfo.ganttBarConfig.backgroundColor,
                left:this.barLeft+'px',
                top:this.barTop+'px',
                //...this.ganttBarConfig
                ...this.barInfo.ganttBarConfig
            }
        },
        totalCell(){
            return this.getDaysCount(this.timeStart ,this.timeEnd);
        }, 
        timeStart(){return this.$moment(this.barInfo[this.timeStartName]).toDate();},
        timeEnd(){return this.$moment(this.barInfo[this.timeEndName]).toDate();}
    },
    methods:{
        // calculate(){
        //     //this.barWidth=this.cell.width*this.totalCell;
        //     //this.left = this.getDaysCount(this.startTime,this.timeStart)*this.cell.width;
        // },
        getDaysCount(date1,date2){
            
            let Difference_In_Time = date2.getTime() - date1.getTime();
  
            // To calculate the no. of days between two dates
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            return Math.ceil(Difference_In_Days) ;
        }
    },
    created() {
// console.log("rowNum================================>",this.rowNum);
// console.log("totalCell================================>",this.totalCell);
// console.log("startTime================================>",this.startTime);
// console.log("this.barInfo================================>",this.barInfo);

        //this.calculate();

        //console.log("getDaysCount",this.startTime,this.timeStart);
    }
}
</script>