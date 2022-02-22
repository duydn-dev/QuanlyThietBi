<template>
     <div class="chart" @scroll="onScroll">
        <div class="area" :style="areaStyle">
            <div :style="backgroundStyle" ></div>
            <div class="bars" :style="barsStyle">
                <!-- <div class="bar project"></div> -->
                <Bar v-for="(t,index) in task" :key="`bar_${index}`" 
                :cell="cell" 
                :rowNum="index"
                :barInfo="t"
                :startTime="startTime"
                :timeStartName="timeStartName" 
                :timeEndName="timeEndName"
                :taskText="taskText"
                :barSpace="barSpace"
                @click.native="barClick(t)"
                @mouseover.native="barHover(t)"
                />
            </div>
        </div>
    </div>
</template>
<style scoped>
.area {
	position: relative;
}
.bars {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
<script>
import Bar from "./bar"
export default {
    props:{
        task:Array,
        cellHeight:Number,
        cellWidth:Number,
        totalDay:Number,
        startTime:Date,
        timeStartName:String, //
        timeEndName:String,
        taskText:String
    },
    components:{Bar},
    data(){
        return{
            barSpace:2
        }
    },
    computed:{
        backgroundStyle(){
            return{
                width: '100%', 
                height: '100%', 
                backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAmCAYAAAAycj4zAAAAeklEQVRoge3RsQ3AMADDsPz/qo9I1n5QDSTg3YDOIWPb/fsDH4LECBIjSIwgMYLECBIjSIwgMYLECBIjSIwgMYLECBIjSIwgMYLECBIjSIwgMYLECBIjSIwgMYLECBIjSIwgMYLECBIjSIwgMYLECBIjSMy2e7Zd6+wBrV8B3+hD8hoAAAAASUVORK5CYII=')", 
                backgroundSize:this.cellWidth+'px '+this.cellHeight+'px'
            }
        },
        barsStyle(){
            return {
                lineHeight:(this.cellHeight-this.barSpace*2)+'px'
            }
        },
        areaStyle(){
            return{
                width: (this.totalDay*this.cellWidth)+'px',
                height: (this.task.length* this.cellHeight)+'px',
            }
        },
        cell(){ 
            return{
                width:this.cellWidth,
                height:this.cellHeight
            }
        }
    },
    methods: {
        onScroll(e){
            //console.log('onscroll',e.target);
            this.$emit('onscroll',e.target.scrollLeft,e.target.scrollTop);
        },
        barClick(task){             
            this.$emit('bar-click',task);
        },
        barHover(task){             
            this.$emit('bar-hover',task);
        }
    },
    created() {
        //console.log('this.task==============================>',this.task);
    }
}
</script>