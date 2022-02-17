<template>
    <div class="scale" :style="scaleStyle">
        <div class="gantt-row" v-if="yearScale && years" :style="rowStyle">
            <div class="cell" v-for="year in years" :key="year.name" :style="scaleCellStyle(year.count)" >{{year.name}}</div>           
        </div>        
        <div class="gantt-row" v-if="monthScale && months" :style="rowStyle">
            <div class="cell" v-for="m in months" :key="m.name" :style="scaleCellStyle(m.count)" >{{m.name}}</div>           
        </div>     
        <div class="gantt-row" v-if="dayScale && days" :style="rowStyle">
            <div class="cell" v-for="(d,index) in days" :key="`scaleday_${index}`" :style="scaleCellStyle(1)" >{{d}}</div>           
        </div>    
    </div>
</template>
<style scoped>
.gantt-row {
	box-sizing: border-box;
	display: flex;
	border-bottom: 1px solid var(--wx-border-color);
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
</style>
<script>
export default {
    props: {
        scale:Array, 
        cellWidth:Number,
        scaleHeight:Number,
        totalDay:Number,
        startTime:Date, 
        endTime:Date,
        scrollLeft:Number,        
    },
    data(){
        return{
            years:[],
            months:[], 
            days:[]
        }
    },
    computed:{
        scaleStyle(){
            return { 
                width: (this.totalDay*this.cellWidth)+'px',
                left:-this.scrollLeft+'px'
            }
        },
        yearScale(){ return this.scale.filter(s=>s.unit == 'year').length>0;
        },
        monthScale(){ return this.scale.filter(s=>s.unit == 'month').length>0;
        },
        dayScale(){ return this.scale.filter(s=>s.unit == 'day').length>0;
        },
        yearScaleFormat(){
            if(this.yearScale)
               return this.scale.filter(s=>s.unit == 'year')[0].format||'YYYY';
            return 'YYYY';
        },
        monthScaleFormat(){
            if(this.monthScale)
               return this.scale.filter(s=>s.unit == 'month')[0].format || 'MM/YYYY';
            return 'MM/YYYY';
        },
        dayScaleFormat(){
            if(this.dayScale)
               return this.scale.filter(s=>s.unit == 'day')[0].format || 'DD';
            return 'DD';
        },
        rowStyle(){ 
            return {
                height:this.scaleHeight+'px'
            }
        }
    },   
    
    methods:{
        scaleCellStyle(count){ 
            return{
                width:(count*this.cellWidth)+'px'
            }
        },
        calc(){ //calculate months & years
            let dateStart= this.startTime;



            let dt=this.$moment(dateStart);



            if(!dt)return;
            
            

            for(let i = 0; i < this.totalDay; i++){
                
                let y=dt.format('YYYY');
                
                let d=dt.format('DD');
                
                
                //console.log("ymd",y,m,d);
                
                //year
                if(this.yearScale){
                    let yIndex=this.years.findIndex(a=>a.name==y);          

                    if(yIndex==-1){
                        let yo={name:y, count:1};
                    
                        this.years.push(yo);
                    }                    
                    else this.years[yIndex].count++;
                }

                //month start
                if(this.monthScale){
                    let m=dt.format(this.monthScaleFormat);
                    let mIndex=this.months.findIndex(a=>a.name==m);
                    if(mIndex==-1){
                        let mo={name:m, count:1};                    
                        this.months.push(mo);
                    }                    
                    else this.months[mIndex].count++;                
                }
                //day
                if(this.dayScale)
                    this.days.push(d);

                dt = dt.add(1,'days')
            }
        }
    },
    created(){ 
        this.calc();
        //console.log('months',this.months);
    }
}
</script>