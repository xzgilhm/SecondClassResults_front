<style scoped>
 	.chart{
	    height:250px;
	    margin-top: 15px;
  	}
  	.main{
	    width:100%;
	    height :200px;
  	}
</style>

<template> 

<div class="chart">
  <div class="main">
  </div> 
  <dial></dial>
</div> 
</template>
<script>
import echarts from 'echarts'
import dial from '../../page/test'
export default{  
	props: {
		'hostid': String
	},
	data(){
		return{
			key: ['mysql.status[Com_begin]','mysql.status[Com_commit]','mysql.status[Com_delete]',
			'mysql.status[Com_insert]','mysql.status[Com_rollback]','mysql.status[Com_select]',
			'mysql.status[Com_update]'],
			myChart: {},
			finalData: {},
			count: 0,
			datax: [],
			datay:[],
			timer: 0 
		}
	},
	mounted(){
		console.log(this);
		this.myChart = echarts.init(this.$el.children[0]);
		this.start();
	}, 
	beforeDestroy(){
      	clearInterval(this.timer);
    },
	methods:{
		start(){
			for(var i=0;i<this.key.length;i++){
				this.getItemId(this.hostid,this.key[i]);
			}
		},
		getItemId(hostid,key){
        	var req = {
	          "jsonrpc": "2.0",
	          "method": "item.get",
	          "params": {
	            "output": "extend",
	            "hostids": hostid,
	            "sortfield": "name",
	            "search": {
	                "key_" : key
	            }
	          },
	          "auth": sessionStorage.auth,
	          "id": 1
        	};
        	var itemid = [];
	        this.axios({
	        method : "POST",
	        url: "",
	        data: req
	        }).then((response) => {
	        	// console.log(response);
	          	for(var i=0;i<response.result.length;i++){
	          	  itemid.push(response.result[i].itemid);
	          	}
	          this.getHistoryList(itemid,key);
       		 });
    	},
    	getHistoryList(itemid,key){
	        var req = {
	            "jsonrpc": "2.0",
	            "method": "history.get",
	            "params": {
	              "output": "extend",
	              "history": "0",
	              "itemids": itemid,
	              "sortfield": "clock",
	              "sortorder": "DESC",
	              "limit": 10
	            },
	            "auth": sessionStorage.auth,
	            "id": 1
	        };
	        this.axios({
	        	method : "POST",
		        url: "",
		        data: req
	        }).then((response) => {
	        	// console.log(response);
	        	this.datax = [];
	        	var datay = [];
	        	var temp = {};
	        	response = response.result;
	        	for(var i=response.length-1;i>=0;i--){
	        		datay.push(response[i].value);
	        	}
	        	this.finalData[key] = datay;
	        	this.count++;
	        	// console.log(this.count);
	        	if(this.count === this.key.length){
	        		for(var i=response.length-1;i>=0;i--){
	        			var clock = new Date(parseInt(response[i].clock) * 1000);
		        		var h = clock.getHours()+":";
		        		var m = clock.getMinutes()+":";
		        		var s = clock.getSeconds();
		        		clock = h+m+s;
		        		this.datax.push(clock);	
	        		}
	        		this.draw();
	        		var temp = this.finalData[this.key[0]];
	        		for(var i=0;i<temp.length;i++){
	        			temp[i] = 100 - temp[i];
	        		}
	        		this.count = 0;
	        		this.timer = setTimeout(this.start,30000);
	        		// console.log(this.finalData);
	        	}
	        })
    	},
    	draw(){
    		var legendData = ['提交','删除','插入','回滚','查询','更新'];
    		this.opt = {
    		title: {
        		text: 'Mysql操作监控'
		    },
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'cross',
		            label: {
		                backgroundColor: '#6a7985'
		            }
		        }
		        // formatter: '时间:{b0}<br/>{a0}:{c0}%<br/>{a1}:{c1}%<br/>{a2}:{c2}%<br/>{a3}:{c3}%'
		    },
		    legend: {  
		        data: legendData
		    },
		    toolbox: {
		        feature: {
		            saveAsImage: {}
		        },
		        right: 80
		    },
		    grid: {
		      	// left: '0',
              	bottom: '3%',	
              	show: true,
              	containLabel: true
		    }, 
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data :this.datax
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:legendData[0],
		            type:'line',
		            stack: '总量',
		            // areaStyle: {normal: {}},
		            data:this.finalData[this.key[0]]
		        },
		        {
		            name:legendData[1],
		            type:'line',
		            stack: '总量',
		            // areaStyle: {normal: {}},
		            data:this.finalData[this.key[1]]
		        },
		        {
		            name:legendData[2],
		            type:'line',
		            stack: '总量',
		            // areaStyle: {normal: {}},
		            data:this.finalData[this.key[2]]
		        },
		        {
		            name:legendData[3],
		            type:'line',
		            stack: '总量',
		            // areaStyle: {normal: {}},
		            data:this.finalData[this.key[3]]
		        },
		        {
		            name:legendData[4],
		            type:'line',
		            stack: '总量',
		            // areaStyle: {normal: {}},
		            data:this.finalData[this.key[4]]
		        },
		        {
		            name:legendData[5],
		            type:'line',
		            stack: '总量',
		            // areaStyle: {normal: {}},
		            data:this.finalData[this.key[5]]
		        }
    		]
    		}
    		this.myChart.setOption(this.opt,{
          		notMerge : true
      		});
    	}
	},
	components: {
		dial
	} 
}
</script>