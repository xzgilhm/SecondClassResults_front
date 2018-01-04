<style  scoped>
  .chart{ 
  }
 
</style>

<template lang="html">
  <div v-if="this.flag === 1" class="chart">
    <router-view></router-view>
    <Row>
      <Col span="24" style="padding-top:10px;"> 
	      <Form  :label-width="80" :model="formItem"  inline>
	        <Form-item label="主机名">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="录入日期">
            <Row>
                <Col span="11">
                    <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"></Date-picker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <Time-picker type="time" placeholder="选择时间" v-model="formItem.time"></Time-picker>
                </Col>
            </Row>
        </Form-item>
	    </Form>
      </Col> 
    </Row>
    <Row>
      <Col span="24"> 
        <!-- <Table  :columns="columns" :data="data3"></Table> -->
        <Table height="600" :columns="columns" :data="data3" stripe size="small"></Table>
      </Col>
       
    </Row>     
  </div> 
  <div v-else style="height:1500px">
    <Load></Load>
  </div>
</template>
  
<script>
  import Load from '../common/load'
  export default {
    data (){
      return {
        formItem: {
          input: ''
        },  
        columns: [
          {
            title: '主机群组名称',
            key: 'name',        
            render: (createElement,params)=>{
              return createElement(
                  'a',
                  {
                    on : { 
                      click: ()=>{
                        this.routeTo(params.row.groupid);
                      }
                    }
                  },
                  [createElement('strong', params.row.name)]
                )
            }
          },
          {
            title: '主机群组信息',
            key: 'zjxx'
          },
          {
            title: '操作',
            key: 'action',
            width: 80,
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                      props: {
                        type: 'ghost',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          this.showGraph(params.row.name)
                        }
                      }
                    }, '图像')
                    ]);
            }
          }
        ],
        data3: [],
        hostInfo: {},
        hostname:{
          name: '',
          zjxx: ''
        },
        flag: 0,
        id: [],
        group2info: {}
      }
    },
    components: {
      Load
    },
    mounted() {
      this.getHost(); 
    },
    methods: {
      getHost: function(){ 
        var req={ 
          "jsonrpc": "2.0",
          "method": "hostgroup.get",
          "params": {
              "output": "extend",
              "selectHosts": "extend",
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
          for(var i=0;i<response.result.length;i++){
            this.hostname["name"] = response.result[i].name;
            var t = this.getHostName(response.result[i].hosts);
            this.hostname["zjxx"] = t;
            this.hostname["groupid"] = response.result[i].groupid;
            this.data3.push(this.hostname);
            this.hostname = {};
            var temp = {};
            temp["id"] = response.result[i].groupid;
            temp["zjxx"] = t;
            this.hostInfo[response.result[i].name] = temp;
          }
          console.log(this.hostInfo);
          sessionStorage.hostInfo = JSON.stringify(this.hostInfo);
          this.flag = 1;
        });
      },
      getHostName: function(hosts){
        let word = '无';
        if(hosts.length > 0){
          word = ''
        }
        for(let i=0;i<hosts.length;i++){
          word += hosts[i].name+ "\t"+" ";
        }
        return word;
      },
      // getHostName: function(id){
      //     var name = "无";
      //     var req = {
      //         "jsonrpc": "2.0",
      //         "method": "host.get",
      //         "params": {
      //           "output": "extend",
      //           "groupids":id
      //         },
      //         "auth": sessionStorage.auth,
      //         "id": 1
      //     };
      //     var xhr = new XMLHttpRequest(); 
      //     var url='http://182.150.7.247/zabbix/api_jsonrpc.php'; 
      //     xhr.onreadystatechange = function() {
      //         if ( xhr.readyState === 4 ) {
      //             if ( ( xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304 ) {
      //                 // 成功：处理 xhr.responseText 
      //                 var response = (JSON.parse(xhr.response)).result;
      //                 // console.log(response);
      //                 if(response.length > 0){
      //                     name = "";
      //                 }
      //                 for(var i=0;i<response.length;i++){
      //                   name +=response[i].name+"  ";
      //                 }
      //             } else {
      //             }
      //         }
      //     };
      //     xhr.open("POST",url,false); 
      //     xhr.setRequestHeader("Content-type","application/json-rpc"); 
      //     xhr.send(JSON.stringify(req));
      //     return name;
      // },
      showGraph(e){
        this.$router.push("/hostgroup?name="+e); 
      },
      routeTo(e){
        console.log(e);
        this.$router.push("/serversList?groupid="+e); 
      }
    }
  }
</script>




