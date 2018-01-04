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
			key: ['hrStorageSizeInBytes','hrStorageUsedInBytes','UsageRation'],
			myChart: {},
			finalData: {},
			count: 0,
			datax: [],
			datay:[],
			timer: 0
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
	        	// console.log(
	        	this.finalData[key] = 0;
	          	this.count++;
	          	for(var i=0;i<response.result.length;i++){
	          	  	this.getHistoryList(response.result[i].itemid,key,response.result.length);
	          	}
	          	if(this.count === this.key.length){
	          		this.finalData[this.key[0]] = (this.finalData[this.key[0]]/(1024*1024*1024)).toFixed(2);
	          		this.finalData[this.key[1]] = (this.finalData[this.key[1]]/(1024*1024*1024)).toFixed(2);
	          		this.draw();
	          	}
       		 });
    	},
    	getHistoryList: function(itemid,key,length){
    		var _t = this;
        	var history = "3";
    		if(key === 'UsageRation'){
    			history = "0";
    		}
	        var req = {
	            "jsonrpc": "2.0",
	            "method": "history.get",
	            "params": {
	              "output": "extend",
	              "history": history,
	              "itemids": itemid,
	              "sortfield": "clock",
	              "sortorder": "DESC",
	              "limit": 1
	            },
	            "auth": sessionStorage.auth,
	            "id": 1
	        };
	        var xhr = new XMLHttpRequest(); 
	        var url='http://182.150.7.247/zabbix/api_jsonrpc.php'; 
	        xhr.onreadystatechange = function() {
	            if ( xhr.readyState === 4 ) {
	              if ( ( xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304 ) {
	              	var response = parseInt((JSON.parse(xhr.response)).result[0].value);
	                _t.finalData[key] += response;
	              } else {
	              }
	            }
        	};
	        xhr.open("POST",url,false); 
	        xhr.setRequestHeader("Content-type","application/json-rpc"); 
	        xhr.send(JSON.stringify(req));
      	},
    	
    	draw(){
    		this.opt = {
    			title : {
    			       text: '磁盘',
    			       x:'center'
    			   	},
    			   	tooltip : {
    			       trigger: 'item',
    			       formatter: "{a} <br/>{b} : {c} ({d}%)"
    			   	},
    			   	legend: {
    			       orient: 'vertical',
    			       left: 'left',
    			       data: ['空闲','磁盘占用']
    			   	},
    			   	series : [
    			       	{
    			           name: '内存数值',
    			           type: 'pie',
    			           radius : '70%',
    			           center: ['50%', '60%'],
    			           data:[
    			               {value:(this.finalData['hrStorageSizeInBytes']-this.finalData['hrStorageUsedInBytes']).toFixed(2), name:'空闲'},
    			               {value:this.finalData['hrStorageUsedInBytes'], name:'磁盘占用'}
    			           ],
    			           itemStyle: {
    			               emphasis: {
    			                   shadowBlur: 10,
    			                   shadowOffsetX: 0,
    			                   shadowColor: 'rgba(0, 0, 0, 0.5)'
    			               }
    			           }
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