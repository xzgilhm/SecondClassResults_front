<style  scoped>
.chart{
    min-height:400px;
  }

</style>
<template lang="html">
  <div class="chart">

    <Row>
      <Col span="24" style="padding-top:10px;"> 
	      <Form  :label-width="80" :model="formItem"  inline>
	        <Form-item label="主机名">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="群组">
            <Select v-model="formItem.select" placeholder="请选择" style="min-width:120px;">
                <Option value="beijing">A服务器组</Option>
                <Option value="shanghai">B服务器组</Option>
                <Option value="shenzhen">C服务器组</Option>
            </Select>
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
        <Form-item >
         <Row>
            <Col>
              <Button type="primary" @click="addConfigHost" style="margin-top:15px">配置主机</Button>
            </Col>
        </Row>
        </Form-item>
	    </Form>
      </Col> 
    </Row>



    <div>
      
    </div>
    <Row>
      <Col span="24"> 
   
        <Table :columns="columns" :data="data3" no-data-text="Loading" stripe size="small"></Table>
 
      </Col>
       
    </Row>
    
    <hostConfig ref="childmodal"  style="clean:both"> </hostConfig>
  </div> 
 
   
</template>
  
<script>
  import hostConfig from '../page/host-config.vue'
  export default {
    data (){
      return {
        formItem: {
          input: '',
          select: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          groupid: '22',
          textarea: ''
        },  
        columns: [
          {
            title: '主机名称',
            key: 'name',
            width: 200,
            render: (createElement,params)=>{
              return createElement(
                  'a',
                  {
                    on : { 
                      click: ()=>{
                        this.routeto(params.row.hostid);
                      }
                    }
                  },
                  [createElement('strong', params.row.name)]
                )
            }
          },
          {
            title: '归属群组',
            width: 480,
            key: 'group'
          },
          {
            title: '监控项',
            key: 'jkx'
          } ,
          {
            title: '触发器',
            key: 'cfq'
          } ,
          {
            title: '应用模版',
            width: 200,
            key: 'yymb'
          } ,
          {
            title: '状态',
            key: 'status'
          } ,
          {
            title: '监控方式',
            key: 'jkfs'
          },
          {
            title: '主机信息',
            key: 'zjxx'
          }
        ],
        data3: [],
        modal1:0
      }
    },
    components: {
      hostConfig
    }, 
    mounted() {
      if(this.$route.query.groupid!=undefined){
        console.log(this.$route.query.groupid);
        this.groupid = this.$route.query.groupid;
      }
      
      this.getHostName('16');
    },
    methods: {
      //获得服务器组的基本信息（id:22代表服务器组）
      getHostName: function(id){
        var req = {};
          if(id!=null){
            req = {
              "jsonrpc": "2.0",
              "method": "host.get",
              "params": {
                "output": "extend",
                "selectGroups": "extend",
                "selectParentTemplates": [
                    "name"
                ],
                "groupids":id
              },
              "auth": sessionStorage.auth,
              "id": 1
            }
          }
          else{
            req = {
              "jsonrpc": "2.0",
              "method": "host.get",
              "params": {
                "output": "extend",
                "selectGroups": "extend",
                "selectParentTemplates": [
                    "name"
                ]
              },
              "auth": sessionStorage.auth,
              "id": 1
             };
          }
          this.axios({
            method: "POST",
            url: "",
            data: req
          }).then((response)=>{
            // console.log(response);
            response = response.result;
            for(var i=0;i<response.length;i++){
              var temp = {};
              temp["name"] = response[i].host;
              temp["group"] = this.getHostGroup(response[i].groups);
              temp["yymb"] = this.getTemplate(response[i].parentTemplates);
              temp["hostid"] = response[i].hostid;
              this.data3.push(temp);
            }
            this.groupid = '';
          })
      },
      getHostGroup: function(group){
        let word = '无';
        if(group.length > 0){
          word = '';
        }
        for(let i=0;i<group.length;i++){
          word += ("<h5>"+group[i].name + "</h5>");
        }
        return word;
      },
      getTemplate: function(template){
        let word = '无';
        if(template.length > 0){
          word = '';
        }
        for(let i=0;i<template.length;i++){
          word += ("<h5>"+template[i].name + "</h5>");
        }
        return word;
      },
      addConfigHost:function(){
        this.$refs.childmodal.modalshow= true;
      },
      routeto(e){
        this.$router.push("/hostInfo?hostid="+e); 
      }
    }
  }
</script>




