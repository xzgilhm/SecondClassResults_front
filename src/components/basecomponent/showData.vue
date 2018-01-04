 <style scoped>
/*  .chart{
    height:420px;
  }
  .main{
    width:100%;
    height :370px;
    margin-top: 15px; 
  }
*/
.chartt{
    height:250px;
    margin-top: 15px;
  }
  .maint{
    width:100%;
    height :200px;
  }
</style>

<template>
    <div class="chartt">
      <div class="maint">
      </div> 
    </div>

</template>

<script>
 
  import echarts from 'echarts'
  // import Load from '../common/load'

  export default {
    props : {
      'myType' : [Number]
    },
    // components: {
    //   Load
    // },
    data() {
      return {
        auth : sessionStorage.auth,
        model1: '',
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
          },
          {
            value: '4',
            label: "lastid"
          }
        ],
        myChart: {},
        key: 'laLoad[Load-1]',
        history: 0,
        datay:[],
        datax:[],
        hostname:{},
        hostid:[],
        hostidList:{},
        itemid:[],
        historyList:[],
        flag: 0,
        refresh : 0,
        si: 0
        }
    },

    mounted() {
      this.myChart = echarts.init(this.$el);
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
      if(this.myType===4){
        this.key = 'lastid';
        this.history = 0;
      }
      // if(this.myType ===5){
      //   this.key = 'PrimaryDiskReadsSucc';
      //   this.history = 0
      // }
      // if(this.myType ===6){
      //   this.key = 'PrimaryDiskWritesSucc';
      //   this.history = 0
      // }
      this.getHostId();
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
    beforeDestroy(){
      clearInterval(this.si);
    },
    methods: {
      draw: function(){
        if(this.refresh === 0){
            // this.$
            // .finish();
            this.refresh = 1;
            console.log("draw");
            this.$emit("child-load",1);
        }
        var temptitle = (this.myType === 4) ? 'CPU使用率' : '内存占用数据';
        this.opt = {
            color: ['#FB767B'],
            title: {
              // text: this.key+'数据',
              text: temptitle,
              subtext: '数据来自zabbix'
            },
            tooltip: {
              trigger: 'item',
              axisPointer: {
                type: 'cross'
              }
            },
            grid: {
              left: '10',
              // right: '4%',
              bottom: '3%',
              show: true,
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
            },
            yAxis: {
              type: 'category',
              data: this.datay
            },
            series: [
              {
                  name: '最新服务器数据',
                  type: 'bar',
                  data: this.datax,
                  tooltip: {
                      formatter: 'hostname: {b0}</br> value: {c0}'
                  }
              }
            ]
        };
        this.myChart.setOption(this.opt,{
          notMerge : true
        });
        this.datay=[],
        this.datax=[],
        this.hostid=[],
        this.hostidList = {},
        this.itemid = [],
        this.historyList = [],
        this.flag = 0;
      },
      //获取hostid,回调getitemid
      getHostId : function(){
        if(this.refresh === 0){
            // this.$Loading.start();
        }
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
            this.hostid.push(response.result[i].hostid);
            if(this.flag==0){
              this.hostname[response.result[i].hostid] = response.result[i].host
            }
          }
          this.flag=1;
          console.log("host:");
          console.log(this.hostname);
          this.getItemId();
        });
      },
      //获取itemid 回调gethistoryList
      getItemId : function(){
        var req = {
          "jsonrpc": "2.0",
          "method": "item.get",
          "params": {
            "output": "extend",
            "hostids": this.hostid,
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
            this.itemid.push(response.result[i].itemid);
            this.hostidList[response.result[i].itemid] = response.result[i].hostid;
          }
          console.log("itemid:");
          console.log(this.itemid);
          this.getHistoryList();
        });
      },
      //获取id 回调getdata
      getHistoryList: function(){
        var req = {
          "jsonrpc": "2.0",
          "method": "history.get",
          "params": {
            "output": "extend",
            "history": this.history,
            "itemids": this.itemid,
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
          this.historyList.push(response.result);
          console.log("historyList:");
          console.log(this.historyList);
          this.getData();
        });
      },
      getData: function(){
        var _historyList = this.historyList[0];
        //存放最终数据
        var datas = {};
        //这儿的数据是按照时间排序的
        for(var i=_historyList.length-1; i>=0; i--){
            datas[_historyList[i].itemid] = {
              hostid: this.hostidList[_historyList[i].itemid],
              itemid: _historyList[i].itemid,
              value : (this.key === 'lastid') ? (100-(_historyList[i].value)).toFixed(2) : _historyList[i].value,
              // value:  _historyList[i].value,
              ns : _historyList[i].ns,
              clock : _historyList[i].clock
          }
        }
        //重写sort，让其按照value排序
        var temp = Object.values(datas)
        var _t = this;
        function sortvalue(a,b){
          return  (_t.key == 'ssCpuIdle') ? b.value-a.value  : a.value-b.value;
        }
        temp.sort(sortvalue);
        console.log("temp")
        console.log(temp);
        for(var i=0;i<temp.length;i++){
          this.datay.push(this.hostname[temp[i].hostid]);
          this.datax.push(temp[i].value);
        }
        this.datay = this.datay.slice(-5);
        this.datax = this.datax.slice(-5);
        this.draw();
        this.flag = 0;
        this.si = setTimeout(this.getHostId,10000);
      }
    }
    
  }



</script>




