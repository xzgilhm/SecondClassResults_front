<style scoped>

 .chart{
    height:420px;
  }
  .main{
    width:100%;
    height :300px;
    margin-top: 15px;
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

export default {
  props: {
    'myType' : [Number]
  },
  data () {
    return {
      hostInfo : {},
      hostid : [],
      dataTemp: [0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0],
      count: 1,
      xdata: [],
      ydata: [],
      myChart: {},
      parmList:[
          {
            value: '1',
            label: 'laLoadLoad-1'
          },
          {
            value: '2',
            label: "ssCpuIdle"
          },
          {
            value: '3',
            label: "memUsedRealRatio"
          }
      ],
      key: 'laLoad[Load-1]',
      history: 0,
      clock: [],
      si: 0
    }
  },
  mounted(){
    this.myChart = echarts.init(this.$el);
    this.hostInfo = JSON.parse(sessionStorage.hostInfo);
    this.getHosts();
    if(this.myType==1){
        this.key = 'laLoad[Load-1]';
        this.history = 0;
      }
      if(this.myType==2){
        this.key = 'ssCpuIdle';
        this.history = 3
      }
      if(this.myType==3){
        this.key = 'memUsedRealRatio';
        this.history = 3
      }
    // this.draw(this.xdata,this.ydata); 
  },
  methods: {
    getHosts(){
      var id = 0;
      this.flag = 0;
      this.count = 1;
      console.log("this.hostInfo");
      console.log(this.hostInfo);
      id = (this.hostInfo[this.$route.query.name]).id;
      console.log("id");
      console.log(id);
      if(id){
      var req = {
        "jsonrpc": "2.0",
        "method": "host.get",
        "params": {
          "output": "extend",
          "groupids":id
        },
        "auth": sessionStorage.auth,
        "id": 1
      }
      this.axios({
          method : "POST",
          url: "",
          data: req
        }).then((response)=>{
          for(var i=0;i<response.result.length;i++){
            this.hostid.push(response.result[i].hostid)
          }
          //分别查询host的数据
          for(var i=0;i<this.hostid.length;i++){
             this.getItemId(this.hostid[i]);
          }    
        }); 
      }
      else{
       this.draw();
      }
    },
    getItemId(hostid){
        // console.log("hostid");
        var req = {
          "jsonrpc": "2.0",
          "method": "item.get",
          "params": {
            "output": "extend",
            "hostids": hostid,
            "sortfield": "name",
            "search": {
                "key_" : this.key
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
        }).then((response)=>{
          for(var i=0;i<response.result.length;i++){
            itemid.push(response.result[i].itemid);
          }
          this.getHistoryList(itemid);
        });
    },
    //获得每一个host的数据并相加到datatemp数组里面
    getHistoryList(itemid){
        var req = {
          "jsonrpc": "2.0",
          "method": "history.get",
          "params": {
            "output": "extend",
            "history": this.history,
            "itemids": itemid,
            "sortfield": "clock",
            "sortorder": "DESC",
            "limit": 20
          },
          "auth": sessionStorage.auth,
          "id": 1
        };
        this.axios({
        method : "POST",
        url: "",
        data: req
        }).then((response)=>{
          {
            console.log(response);
            var temp = [];
            for(var i=0;i<response.result.length;i++){
              temp.push((parseFloat(response.result[i].value)));
              this.clock.push(response.result[i].clock);
              this.dataTemp[i] += temp[i];
            }
            // console.log("host" + this.count);
            // console.log(temp);
            //处理js float数据精度问题以及转换clock  
            if(this.count === this.hostid.length){
              for (var i = 0; i <this.dataTemp.length; i++) {   
                this.clock[i]=new Date(parseInt(this.clock[i]) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ") 
                this.dataTemp[i] = (this.dataTemp[i]).toFixed(2);
              }
              // console.log(this.clock);
              // console.log(this.dataTemp);
              this.xdata = this.clock.reverse();
              this.ydata = this.dataTemp.reverse();
              this.draw(this.xdata,this.ydata);
              this.dataTemp = [0,0,0,0,0,0,0,0,0,0,
                              0,0,0,0,0,0,0,0,0,0];
              this.hostid = [];    
              this.clock = [];          
            }
            this.clock = [];
            temp = [];
            this.count++;
          }
        });
    },
    draw: function(xdata,ydata){
      
      this.opt = {
        title: {
          text: this.$route.query.name + '群组'+ this.key+'负载'
        },
        tooltip : {
          trigger: 'axis',
        },
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        },
        grid: {
          left: '10%',
          right: '0%',
          bottom: '10%'
        },
        xAxis : [
          {
              type : 'category',
              axisTick: {
                interval: 0
              },
              axisLabel: {
                interval: 3
              },
              boundaryGap : false,
              data : xdata
          }
        ],
        yAxis : [
          {
              type : 'value'
          }
        ],
        series : [
            {
                name: this.key + '负载',
                type:'line',
                data: ydata,
                animation: true,
                animationDelay: 1000
            }
        ],
        animation: true,
        animationDelay: 1000
      };
      this.myChart.setOption(this.opt,{
          notMerge : true
      });
    }
  },  
  beforeDestroy(){
      // alert("xxx");
      clearInterval(this.si);
  },
  watch: {
    hostid: function (val, oldVal) {
      if(val.length === 0){
        this.si = setTimeout(this.getHosts,10000);
      }
    }
  }
}

</script>
