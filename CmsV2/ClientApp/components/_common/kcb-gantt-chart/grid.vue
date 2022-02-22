<template>
    <div class="grid" :style="gridStyle">
        <div class="table-header">
            <div class="gantt-row" :style="rowHeaderStyle">
                <!-- <div class="cell" style="flex: 1 1 0%; text-align: left;">Công việc</div>
                <div class="cell" style="width: 120px; text-align: center;">Bắt đầu</div>
                <div class="cell" style="width: 70px; text-align: center;">Thời hạn</div> -->
                <!-- <div class="cell">%</div> -->
                <div class="cell-header" v-for="(column,index) in configs.columns" 
                :style="cellStyle(index)"
                :key="column.name">
                    {{column.label}}
                    </div>
            </div>
        </div>
        <div class="table" :style="taskTableStyle">
            <div v-for="row in task" :key="row.id" class="gantt-row" :style="rowStyle">
                 <div class="cell" v-for="(column,index) in configs.columns" 
                :style="cellStyle(index)"
                :key="column.name">
                    <div class="content" v-if="column.width=='100%'||column.width=='*'">
                    {{column.timeStart||column.timeEnd? dateFormat(row[column.name]): row[column.name]}}
                    </div>
                    <template v-else>
                        {{column.timeStart||column.timeEnd? dateFormat(row[column.name]): row[column.name]}}
                    </template>
                </div>
                <!-- <div class="cell" :style="cellStyle(0)">
                    <div class="content">
                        {{row.label}}
                    </div>      
                </div>
                <div class="cell" :style="cellStyle(1)">{{dateFormat(row.timeStart)}}</div>
                <div class="cell" :style="cellStyle(2)">{{dateFormat(row.timeEnd)}}</div> -->
            </div>
           
        </div>
    </div>
</template>
<style scoped>
.grid {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	border-right: 1px solid var(--wx-border-color);
	overflow: hidden;
}
.table-header{
	position: relative;
	width: 100%;
	box-shadow: var(--wx-grid-header-shadow);
	background-color: #fff;
	z-index: 1;
    margin:0
}
.table{
    
	position: relative;
	width: 100%;
	font: var(--wx-grid-body-font);
	color: var(--wx-grid-body-font-color);

}
.gantt-row {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	border-bottom: var(--wx-grid-body-row-border);
}
.cell {
	box-sizing: border-box;
	flex: 0 0 auto;
	padding: 0 10px;
	overflow: hidden;
    width: auto
}
.cell >>> .content {
	width: 100%;
	white-space: nowrap;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.cell-header{
    
	box-sizing: border-box;
	flex: 0 0 auto;
	font: var(--wx-grid-header-font);
	text-transform: var(--wx-grid-header-text-transform);
	color: var(--wx-grid-header-font-color);
padding:0 10px;
}
</style>
<script>

export default {
    name:'grid',
    props: {
        configs:Object,
        scrollTop:Number,
        task:Array
    },
    computed:{
        rowStyle(){
            return {
                height:this.configs.cellHeight+'px'
            }
            
        },
        rowHeaderStyle(){ 
            return{
                height:(this.configs.scaleHeight*this.configs.scale.length)+'px'
            }
        },
        gridStyle(){
            return{
                flex:'0 0 '+ this.configs.gridWidth+'px'
            }
        },       
        taskTableStyle(){ 
            return{
                position:'relative',
                top:-this.scrollTop+'px'
            }
        }
    },
    methods:{
        dateFormat(dateString){ 
            return this.$moment(dateString).format(this.configs.dateGrid);
        },
        cellHeaderStyle(style){ 
            let s = {};
            if(style.width){
                if(style.width=="100%"||style.width=='*')
                    s.flex = "1 1 0%";
                else s.width=style.width;
            }
            if(style.align)s.textAlign = style.align;
            return s;
        },
        cellStyle(index) {
            let style=this.configs.columns[index];
            let s = {};
            if(style.width){
                if(style.width=="100%"||style.width=='*')
                    s.flex = "1 1 0%";
                else s.width=style.width;
            }
            if(style.align)s.textAlign = style.align;
            return s;
        }
    },
    created(){

    }
}
</script>
