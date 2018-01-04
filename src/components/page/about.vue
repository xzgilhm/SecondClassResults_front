<style scoped>
 .chart{
    height:100%;
  }
 .main{
    width:100%;
    /*margin-top: 15px;*/
  }
 .rowclass{
   margin-top: 23px;
 }
 .info{
    float: left; 
 }
 h1{
  margin-top: 10%;
  font-size: 40px;
  writing-mode : tb-rl;
  margin:auto;
 }
 h3{
   margin-top: -25px;
 }  
 .card{
  height: 95%;
 }

</style>

<template>

<div class="chart">
  <div class="main">
    <Row class="row">
   <!--      <Row>
          <Col span="3" style="text-align:center;"><h1 style=" ">资产信息</h1></Col>
          <Col span="3" class="col">
            <pie-doughnut :wrong="5" :right="47" :warn="oneqiewarn"></pie-doughnut>
            <e-num ename="服务器"></e-num>
          </Col>
          <Col span="3" class="col">
            <pie-doughnut :wrong="2" :right="8" :warn="twoqiewarn"></pie-doughnut>
            <e-num ename="交换机"></e-num>
 
          </Col>
          <Col span="3" class="col">
            <pie-doughnut  :right="2" :warn="threeqiewarn"></pie-doughnut>
            <h3>负载均衡(2)</h3>
          </Col>
          <Col span="3" class="col">
            <pie-doughnut :wrong="3" :right="2" :warn="fourqiewarn"></pie-doughnut>
            <e-num ename="路由器"></e-num>
          </Col>
          <Col span="3" class="col">
            <pie-doughnut :wrong="0" :right="3" :warn="fiveqiewarn"></pie-doughnut>
            <e-num ename="防火墙"></e-num>
          </Col>
          <Col span="3" class="col">
            <pie-doughnut :wrong="1" :right="11" :color="qiecolor" :color2="outqiecolor" :warn="sixqiewarn"></pie-doughnut>
            <h3>业务平台(12)</h3>
          </Col> 
        </Row> -->
      <Col span="24" style="padding-top:10px;"> 
        <Form  :label-width="80" :model="formItem"  inline>
          <Form-item label="主机名">
            <Input v-model="formItem.input" :placeholder="msg" style="width: 300px"></Input>
          </Form-item>
          <Form-item>
            <Button  type="primary" @click="searchTo">搜索</Button>
          </Form-item>
        </Form>
      </Col>  
    </Row>
     <Row class="row">
     </Row>
    <Row class="row rowclass">
      <Col span="11" class="col">
        <div v-if="this.flag === 0">
          <Load></Load>
        </div>
        <div>
        <showData :myType="4" @child-load="isLoad"></showData>
        </div>
      </Col>
      <Col span="11" class="col" offset="2">
        <div v-if="this.flag === 0">
          <Load></Load>
        </div> 
        <showData :myType="3" @child-load="isLoad"></showData>
      </Col> 
    </Row> 
     <Row class="row">
      <Col span="11" class="col">
        <div v-if="this.flag === 0">
          <Load></Load>
        </div>
        <bar-double :myType="1" :timer="time"></bar-double>
      </Col>
      <Col span="11" class="col" offset="2">
        <div v-if="this.flag === 0">
          <Load></Load>
        </div>
        <bar-double :myType="2"></bar-double>
      </Col>  
    </Row>
  </div>    
</div>

</template>

<script>
  import pieDoughnut from '../basecomponent/pie-doughnut'
  import eNum from '../basecomponent/equipmentNum'
  import showData from '../basecomponent/showData'
  import Load from '../common/load'
  import barDouble from '../basecomponent/bar-double'
  export default {
    data(){
      return {
        formItem: {
          input: ''
        },  
        oneqiewarn: [1,1,3,47],
        twoqiewarn: [0,1,1,8], 
        threeqiewarn: [0,0,0,2],
        fourqiewarn: [1,1,1,2],
        fiveqiewarn: [0,0,0,3],
        sixqiewarn: [1,0,0,11],
        outqiecolor: ['#FF715E','#FFAF51','#FFEE51','#08CD5A'],
        qiecolor: ['#FB767B','#08CD5A'],
        flag: 0,
        time:0,
        msg: '请输入主机ip'
      }
    },
    components:{
      pieDoughnut,
      eNum,
      showData,  
      Load,
      barDouble
    },
    methods: {
      isLoad: function(msg){
        // alert(msg);
        this.flag = msg
      },
      searchTo(){
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
                      this.formItem.input
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
            this.$router.push("/hostInfo?hostid="+response.hostid); 
          }
        });
      }
    }
    // beforeRouteLeave(to,from,next){
    //   alert("xxx");
    //   next();
    // },
}

</script>
 