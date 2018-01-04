 <style scoped>
.chart2{
    height:250px;
    margin-top: 15px;
  }
  .main2{
    width:100%;
    height :200px;
  }
</style>

<template>
    <div class="chart2">
      <div class="main2">
      </div> 
    </div>

</template>

<script>
 
  import echarts from 'echarts'

  export default {
    props : {
      'myType' :{
        type:Number,
        required: true
       },
      'timer' : {
        default: 0,
        type: [Number]
      }
    },
    data() {
      return {
        auth : sessionStorage.auth,
        model1: '',
        myChart: {},
        key: 'ifInOctets[lo]',
        history: 0,
        datay:[],
        datax1:[],
        datax2:[],
        hostname:{},
        hostid:[],
        historyList: [],
        hostidList:{},
        hostid2itemid: {},
        flag: 0,
        refresh : 0,
        count: 0,
        name2id: {},
        title1: "",
        title2: "",
        legendData: [],
        si: 0
      }
    },

    mounted() {
      this.myChart = echarts.init(this.$el);
      if(this.myType==1){
        this.key = 'ifInOctets[lo]';
        this.history = 3;
        this.getHostId();
      }
      if(this.myType==2){
        this.key = 'tcpConnNumber';
        this.history = 3;
        this.getHostId();
      }
      var _t = this;
      this.myChart.on('click', function (params) {
          console.log(params);
             var req = {
            "jsonrpc": "2.0",
            "method": "host.get",
            "params": {
              "output": "extend",
              "selectGroups": "extend",
              "selectParentTemplates": [
                      "name"
                  ],
              "filter": {
                    "name": [
                        params.name
                      ]
                  }
            },
            "auth": sessionStorage.auth,
            "id": 1
        };
        _t.axios({
        method : "POST",
        url: "",
        data: req
        }).then((response)=>{
          console.log(response);
          if(response.error){
            alert(response.error);
          }
          else if(response.result.length === 0){
            alert("没有这个主机");
          }
          else{
            console.log(response);
            response = response.result[0];
            _t.$router.push("/hostInfo?hostid="+response.hostid); 
          }
        });
          // alert(encodeURIComponent(params.name));
      });

    },

    methods: {
      //获取hostid,回调getitemid
      getHostId : function(){
        if(this.refresh === 0){
            // this.$Loading.start();
        }
        var hostid = [];
        var req = {
          "jsonrpc": "2.0",
          "method": "host.get", 
          "params": {
            "output": "extend"
          },
          "auth": this.auth,
          "id": 1
        };
        this.axios({
        method : "POST",
        url: "",
        data: req
        }).then((response)=>{
          console.log(response);
          for(var i=0;i<response.result.length;i++){
            hostid.push(response.result[i].hostid);
            if(this.flag==0){
              this.hostname[response.result[i].hostid] = response.result[i].host;
              this.name2id[response.result[i].host] = response.result[i].hostid
            }
          }
          this.flag=1;
          console.log("host:");
          console.log(this.hostname);
          this.getItemId(hostid);
        });
      },
      //获取itemid 回调gethistoryList
      getItemId : function(hostid){
        var itemid = [];
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
          "auth": this.auth,
          "id": 1
        };
        this.axios({
        method : "POST",
        url: "",
        data: req
        }).then((response)=>{
          for(var i=0;i<response.result.length;i++){
            itemid.push(response.result[i].itemid);
            this.hostidList[response.result[i].itemid] = response.result[i].hostid;
            this.hostid2itemid[response.result[i].hostid] = response.result[i].itemid;
          }
          console.log("itemid:");
          console.log(itemid);
          this.getHistoryList(itemid);
        });
      },
      //获取id 回调getdata
      getHistoryList: function(itemid){
        var req = {
          "jsonrpc": "2.0",
          "method": "history.get",
          "params": {
            "output": "extend",
            "history": this.history,
            "itemids": itemid,
            "sortfield": "clock",
            "sortorder": "DESC",
            "limit": 10
          },
          "auth": this.auth,
          "id": 1
        };
        this.axios({
        method : "POST",
        url: "",
        data: req
        }).then((response)=>{
          console.log(response);
          this.historyList.push(response.result);
          console.log("historyList:");
          console.log(this.historyList);
          this.getData(this.historyList);
        });
      },
      getData: function(historyList){
        var _historyList = historyList[0];
        //存放最终数据
        var datas = {};
        //这儿的数据是按照时间排序的
        for(var i=_historyList.length-1; i>=0; i--){
            datas[_historyList[i].itemid] = {
              hostid: this.hostidList[_historyList[i].itemid],
              itemid: _historyList[i].itemid,
              value : _historyList[i].value,
              // value:  _historyList[i].value,
              ns : _historyList[i].ns,
              clock : _historyList[i].clock
          }
        }


        //重写sort，让其按照value排序
        if(this.count === 0){
          var temp = Object.values(datas)
          var _t = this;
          function sortvalue(a,b){
            return  (_t.key == 'ssCpuIdle') ? b.value-a.value  : a.value-b.value;
          }
          temp.sort(sortvalue);
          console.log("temp")
          console.log(temp);
          var hostid = [];
          for(var i=0;i<temp.length;i++){
            this.datay.push(this.hostname[temp[i].hostid]);
            hostid.push(temp[i].hostid);
            this.datax1.push(temp[i].value);
          }
          console.log("hostid");
          console.log(hostid);  
          this.datay = this.datay.slice(-5);
          this.datax1 = this.datax1.slice(-5);
          this.historyList = [];
          this.getxdata2(this.key,hostid);

        }
        else{
          console.log(this.name2id);
          console.log(this.hostid2itemid);
          console.log(datas); 
          for(var i=0;i<this.datay.length;i++){  
            // console.log(this.datay[i]);
            var id = this.name2id[this.datay[i]];
            // console.log(id);
            var itemid = this.hostid2itemid[id];
            // console.log(itemid);
            console.log(datas[itemid]);
            if(datas[itemid] === undefined){
              datas[itemid] = {
                hostid: 0,
                itemid: itemid,
                value : 0,
                ns : 0,
                clock :0
              }
              // console.log("xxx"); 
            }
            this.datax2.push(datas[itemid].value); 
          }
          this.datax2 = this.datax2.slice(-5);
          console.log("this.datax2");
          console.log(this.datax2);
          this.count = 0;
          this.historyList = [];
          if(this.myType === 1){
            this.key = "ifInOctets[lo]";
          } 
          else{
            this.key = 'tcpConnNumber'
          }
          
          this.si = setTimeout(this.getHostId,10000);   
          this.draw();  
          this.flag = 0;

        }
      },
      getxdata2: function(key,hostid){
        if(key === 'ifInOctets[lo]'){
            this.title1 = "In"; 
            this.title2 = "Out";
            this.legendData = ["In","Out"];
            this.key = 'ifOutOctets[lo]';
            console.log("hostidxxxxxxxxxxx");
            console.log(hostid);
            this.getItemId(hostid);
            this.count++;
        }
        else{
          this.title1 = "TCP";  
          this.title2 = "UDP"
          this.key = 'udpConnNumber';
          console.log("hostidxxxxxxxxxxx")
          console.log(hostid);
          this.getItemId(hostid);
          this.count++;
        }
      },
      draw: function(){
        var name1 = '流入';
        var name2 = '流出';
        var title = '流量';
        var maxdata = null;
        var legendData = ['流入','流出'];   
        if(this.myType === 2){
          name1 = 'tcp连接数';
          name2 = 'udp连接数';
          title = '连接数';
          legendData = ['tcp连接数','udp连接数'];  
        }
        if(this.myType === 1){
          // alert(this.datax1[0]);
          for(var i=0;i<this.datax1.length;i++){
            this.datax1[i] = (this.datax1[i]/(1024*8)).toFixed(2);
            this.datax2[i] = (this.datax2[i]/(1024*8)).toFixed(2);
          }
          maxdata = 180;            
        } 
        this.opt = {
            color:['#FB767B','#6772B9'],  
            title: {
              text: title,
              subtext: '数据来自zabbix'
            },
            legend: {
              data: legendData
            },
            tooltip: {
              trigger: 'item',
              axisPointer: {
                type: 'cross'
              }
            },
            grid: {
              left: '10',
              bottom: '3%',
              show: true,
              containLabel: true
            },
            xAxis: [
              // {
              //   type: 'value',
              //   name: this.title1,
              //   axisLine: {
              //     lineStyle: {
              //       color: '#FD5200'
              //     }
              //   },
              //   max:maxdata,
              //   position: 'top',
              //   offset: '5'
              // },
              {
                type: 'value',
                // name:this.title2,
                // max:maxdata,  
                axisLine: {
                  lineStyle: {
                    color: '#6772B9'
                  }
                }
              }
            ],
            yAxis: {
              type: 'category',
              data: this.datay
            },      
            series: [
              {
                  name: name1,    
                  type: 'bar',
                  data: this.datax1,
                  barGap: "0%"
              },
              {
                name: name2,
                type: 'bar',
                xAxisIndex: 0,
                data: this.datax2
              }
            ]
        };
        this.myChart.setOption(this.opt,{
          notMerge : true
        });
        this.datay=[],
        this.datax1=[],
        this.datax2=[],
        this.hostid=[],
        this.hostidList = {},
        this.flag = 0;
      }
    },
    beforeDestroy(){
      clearInterval(this.si);  
    },  
    watch: {
      timer: function(val,oldVal){
        alert("val")
        console.log(val);
        console.log(oldVal);
      }
    }
    
  }



</script>




