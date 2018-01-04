<style scoped> 
    .chart{
    min-height:639px;
  } 
    iframe{
    width : 100%;
    height: 820px;
  }
  .row{
    margin-top : 15px;
  }
  .col{
    margin-top : 15px;
  }
</style>
 
<template>
  <div class="chart">
    <div v-show="this.flag!=0">
      <Button type="text" @click="back">
              后退
              <Icon type="chevron-left"></Icon>
      </Button>
    </div>
    <div v-if="this.flag===0"> 
      <!-- <Row class="row">
        <Table border :columns="columns1" :data="data1"   no-data-text="Loading" size="small"> 
          <h2 slot="header">设备群组状态</h2>
        </Table>
      </Row> -->
      <Row class="row"> 
          <Table border :columns="columns2" :data="data2"  no-data-text="暂无数据" size="small">
            <h2 slot="header">最新告警信息</h2>
          </Table>
      </Row> 
    </div>
  </div> 
</template> 

<script>

  export default {
    data(){
      return {
        columns2: [
          {
            title: '主机',
            key: 'name',
            render: (h,params) => {
              return h(
                'a',
                  {
                    on : { 
                      click: ()=>{
                        console.log(params);
                        this.routeTo(params.row.hostid);
                      }
                    }
                  },
                  [h('strong', params.row.name)]
                )
            }
          },
          {
            title: '问题',
            key: 'problem',
            width: 550
          },
          {
            title: '告警时间',
            key: 'warntime',
            width: 170
          },
          {
            title: '持续时间',
            key: 'duration'
          },  
          {
            title: '信息',
            key: 'msg'
          }
        ],
        data2: [],
        flag: 0
      }
    },
    mounted(){
      this.getLastTriggerInfo();
      // this.getSystemStatus();
    },
    methods:{
      back: function(){
        this.flag = 0;
      },
      rowClick: function(parm){
        console.log(parm);
        if(parm.name==='Discovered hosts'){
          this.flag = 1;
        }
        else if(parm.name==='Discovered servers'){
          this.flag = 2;
        }
        else if(parm.name==='Linux servers'){
          this.flag = 3;
        }
        else if(parm.name==='Windows servers'){
          this.flag = 4;
        }
        else{
          this.flag = 0;
        }
      },
      getSystemStatus: function(){
        var req={ 
          "jsonrpc": "2.0",
          "method": "trigger.get",
          "params": {
              "output": "extend",
              "selectGroups": [
                "name"
              ],
              "filter": {
                "value": 1
              },
              "sortfield": "priority",
              "sortorder": "DESC",
          },
          "auth": sessionStorage.auth,
          "id": 1
        };
        this.axios({
          method : "POST",
          url: "",
          data: req
        }).then((response) => {
          console.log(response);
        });
      },
      getLastTriggerInfo: function(){ 
        var req={ 
          "jsonrpc": "2.0",
          "method": "trigger.get",
          "params": {
              "output": "extend",
              "filter": {
                "value": 1
              },
              "selectHosts": "extend",
              "sortfield": "lastchange",
              "sortorder": "DESC"
          },
          "auth": sessionStorage.auth,
          "id": 1
        };
        this.axios({
          method : "POST",
          url: "",
          data: req
        }).then((response)=>{
          console.log(response);
          var t = Math.round(new Date().getTime()/1000);
          response = response.result;
          for(let i=0;i<response.length;i++){
            let temp = {};
            temp['hostid'] = response[i].hosts[0].hostid;
            temp['name'] = response[i].hosts[0].name;
            temp['problem'] = response[i].description;
            //$formatSeconds 写在utils里
            temp['duration'] = this.$formatSeconds(t - response[i].lastchange);
            temp['warntime'] = new Date(parseInt(response[i].lastchange) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
            if(response[i].priority === '4'){
              temp['cellClassName'] = {
                'problem': 'table-data2-serious'
              }
            }
            else if(response[i].priority === '3'){
              temp['cellClassName'] = {
                'problem': 'table-data2-general-serious'
              }
            }
            else if(response[i].priority === '2'){
              temp['cellClassName'] = {
                'problem': 'table-data2-warn'
              }
            }
            else{
              temp['cellClassName'] = {
                'problem': 'table-data2-info'
              }
            }
            this.data2.push(temp);
          }
        });
      },
      routeTo(e){
        this.$router.push("/hostInfo?hostid="+e); 
      }
    }
  }
</script>
 

