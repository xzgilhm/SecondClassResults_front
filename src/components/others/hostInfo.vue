<style  scoped>
.chart{
  height:864px;
}
h5{
  float: left;
}
.ivu-form-item{
  margin-bottom: 10px
}

</style>

<template lang="html">
  <div>
    <Tabs value="name2">
        
        <Tab-pane label="基本信息" name="name2">
          <Row style="margin-top:25px">
            <Col :span="11">
              <Card style="margin-top:25px;width:90%">
                <Row>
                  <Col :span="24">
                  <Form :model="formItem" :label-width="80" inline>
                    <Row type="flex" justify="start" class="code-row-bg">
                      <Col :span="6" >
                        <Form-item label="主机名" style="float: left">
                            <h5>{{formItem.host}}</h5>
                        </Form-item>
                      </Col>
                      <Col :span="18" >
                        <Form-item label="所属群组" style="float: left">
                            <h5>{{formItem.group}}</h5>
                        </Form-item>
                      </Col>
                    </Row>
                    <Row type="flex" justify="start" class="code-row-bg">
                      <Col :span="6">
                        <Form-item label="主机ID" style="float: left">
                            <h5>{{formItem.hostid}}</h5>
                        </Form-item> 
                      </Col>
                      <Col :span="18">
                        <Form-item label="使用模版" style="float: left">
                            <h5>{{formItem.template}}</h5>
                        </Form-item>
                      </Col>
                    </Row>
                  </Form>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col :span="11" :offset="2">
              <usage-disk-chart :hostid="$route.query.hostid"></usage-disk-chart>
            </Col>
          </Row>
          <Row> 
            <Col :span="11">
              <cpu-used-chart :hostid="$route.query.hostid"></cpu-used-chart>
            </Col>
            <Col :span="11" :offset="2">
              <mem-used-chart :hostid="$route.query.hostid"></mem-used-chart>
            </Col>
          </Row> 
          <Row>
            <Col :span="11">
              <primary-disk-chart :hostid="$route.query.hostid"></primary-disk-chart>
            </Col>
            <Col :span="11" :offset="2">
              <conn-number-chart :hostid="$route.query.hostid"></conn-number-chart>
            </Col>
          </Row>
          <Row>
            <Col :span="11">
              <traffic-chart :hostid="$route.query.hostid"></traffic-chart>
            </Col>
            <Col :span="11" :offset="2">
              <!-- <usage-disk-chart :hostid="$route.query.hostid"></usage-disk-chart> -->
            </Col> 
          </Row>
        </Tab-pane>
        <!-- <Tab-pane label="应用监控" name="name3">
          <Row>
            <sql-chart :hostid="$route.query.hostid"></sql-chart>
          </Row>
        </Tab-pane>
 -->    
 </Tabs>
  
    
  </div>
</template> 

<script>
import dataZoom from '../others/infoCharts/dataZoom'
import memUsedChart from '../others/infoCharts/memUsedChart' 
import cpuUsedChart from '../others/infoCharts/cpuUsedChart'
import primaryDiskChart from '../others/infoCharts/primaryDiskChart'
import connNumberChart from '../others/infoCharts/connNumberChart'
import trafficChart from '../others/infoCharts/trafficChart'
import usageDiskChart from '../others/infoCharts/usageDiskChart'
import sqlChart from '../others/infoCharts/sqlChart'
  export default {
    data () {
      return {
        formItem: {
          host: '',
          hostid: '',
          group: '',
          template: ''
        },
        hostname: ''
      }
    },
    components: {
     memUsedChart,
     cpuUsedChart,
     primaryDiskChart,
     connNumberChart,
     trafficChart,
     usageDiskChart,
     sqlChart,
     dataZoom
    },
    mounted (){
      console.log(this.formItem.hostid);
      this.getHostInfo();
    },
    methods: {
      back(){
        this.$router.push("/serversList");
      },
      getHostInfo : function(){
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
                  "hostid": [
                      this.$route.query.hostid,
                    ]
                }
          },
          "auth": sessionStorage.auth,
          "id": 1
        };
        this.axios({
        method : "POST",
        url: "",
        data: req
        }).then((response)=>{
          if(response.error){
            alert(response.error);
          }
          else{
            // console.log(response);
            response = response.result[0];
            this.formItem.host = response.host;
            this.formItem.hostid =response.hostid;
            for(var i=0;i<response.groups.length;i++){
              this.formItem.group += response.groups[i].name + " / ";  
            }
            for(var i=0;i<response.parentTemplates.length;i++){
              this.formItem.template += response.parentTemplates[i].name + "/";
            } 
            
          }
        });
      },
    },
    watch: {

    }
}
</script>



