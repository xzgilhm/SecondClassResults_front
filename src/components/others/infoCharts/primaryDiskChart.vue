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
</div> 
</template>
<script>
import echarts from 'echarts'
export default{
	props: {
		'hostid': String
	},
	data(){
		return{
			key: ['PrimaryDiskWritesSucc','PrimaryDiskReadsSucc','TotalPrimaryDiskIOPS'],
			myChart: {},
			finalData: {},
			count: 0,
			datax: [],
			datay:[],
			timer: 0,
			startinfo: 94,
			end: 100,
			timeMap: []
		}
	},
	mounted(){
		this.myChart = echarts.init(this.$el);
		this.start();
	}, 
	beforeDestroy(){
      	clearInterval(this.timer);
    },
	methods:{
		start(){
			for(let i=24;i>=0;i--){
		        let t = Math.round((new Date().getTime()-(i*3600*1000))/1000);
		        this.timeMap.push(t); 
      		}
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
	          	for(var i=0;i<response.result.length;i++){
	          	    var str = response.result[i].key_;
	          	    str = str.substr(str.length-3,2);
	          	    if(str === 'da'){
	          	    	// console.log(response.result[i]);
	          	    	itemid.push(response.result[i].itemid);
	          	    }
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
	              "time_from": this.timeMap[0],
		          "time_till": this.timeMap[24],
	              "sortfield": "clock",
	              "sortorder": "DESC",
	              // "limit": 10
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
	        	for(var i=response.length-1;i>=0;i=i-3){
	        		datay.push(response[i].value);
	        	}
	        	this.finalData[key] = datay;
	        	this.count++;
	        	if(this.count === this.key.length){
	        		for(var i=response.length-1;i>=0;i=i-3){
	        			var clock = new Date(parseInt(response[i].clock) * 1000);
		        		var h = clock.getHours()+":";
		        		var m = clock.getMinutes()+":";
		        		var s = clock.getSeconds();
		        		clock = h+m+s;
		        		this.datax.push(clock);	
	        		}
	        		this.draw();
	        		this.count = 0;
	        		this.timer = setTimeout(this.start,30000);
	        		console.log(this.finalData);
	        	}
	        })
    	},
    	draw(){
    		this.opt = {
    			title: {
        			text: '磁盘IO信息'
		    },
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'cross',
		            label: {
		                backgroundColor: '#6a7985'
		            }
		        }
		    },
		    legend: {
		        data:['Read','Write',"IOps"]
		    },
		    toolbox: {
		        feature: {
		            saveAsImage: {}
		        },
		        right: 80
		    },
		    grid: {
		       left: '10',
              // right: '4%',
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
		    dataZoom: [
	         	{
		            type: 'slider',
		            show: true,
		            start: this.startinfo,
		            end: this.end,
		            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
		            handleStyle: {
		                color: '#fff',
		                shadowBlur: 1,
		                shadowColor: 'rgba(0, 0, 0, 0.6)',
		                shadowOffsetX: 2,
		                shadowOffsetY: 2
		            },
		            showDetail: false,
		            showDataShadow: 'none',
		            handleSize: '80%'
	          	}
        	],
		    series : [
		        {
		            name:'Write',
		            type:'line',
		            stack: '总量',
		            areaStyle: {normal: {}},
		            data:this.finalData[this.key[0]]
		        },
		        {
		            name:'Read', 
		            type:'line',
		            stack: '总量',
		            areaStyle: {normal: {}},
		            data:this.finalData[this.key[1]]
		        },
		        {
		            name:'IOps',
		            type:'line',
		            stack: '总量',
		            areaStyle: {normal: {}},
		            data:this.finalData[this.key[2]]
		        }

    		]
    		}
    		this.myChart.setOption(this.opt,{
          		notMerge : true
      		});
    	}
	} 
}
</script>