<style  scoped>
  .chart{ 
  }
  .row{
    margin-top : 25px;
  }
  .col{
    margin-top : 15px;
  }
  .test{
    margin-top: -60px;
  }
.ivu-tabs .ivu-select-dropdown{top:auto;} 
.ivu-tabs .ivu-tabs-tabpane{position:relative;}
.ivu-dropdown-menu {
position: absolute !important;
}

</style>

<template lang="html">
  <div class="chart">
   <Row type="flex" justify="start" class="code-row-bg">
      <Col>
        <Button type="primary" @click="addUser" style="margin-top:15px;margin-bottom:15px">添加</Button>
      </Col>
    </Row> 
    
    <Row>
      <Col span="24"> 
        <Table  :columns="columns" :data="data3" stripe no-data-text="Loading" size="small"></Table>
      </Col>
      <user-config :msg.sync="rowdata" :toshow="modal1" @chang-data="xxx" @showmodal="showmodal"> </user-config>
    </Row>
    <!-- <a @click="test"> test </a> -->
    
  </div> 
</template> 

<script>
  import userConfig from '../others/trans-user2group'
  export default {
    data () {
      return {
        rowdata: {},
        columns: [
          {
            title: '别名',
            // width:350,
            key: 'alias',
            render: (createElement,params)=>{
              return createElement(
                  'a',
                  {
                    on : { 
                      click: ()=>{
                        this.routeto(params.row.userid);
                      }
                    }
                  },
                  [createElement('strong', params.row.alias)]
                )
            }
          },
          {
            title: '名称',
            key: 'name',
            width:120
          },
          {
            title: 'surname',
            key: 'surname',
            width:120
          },
          {
            title: '类型',
            key: 'type',
            width:120,
            render: (createElement,params)=>{
              var msg = ""
              if(params.row.type === "3"){
                msg = '超级管理员';
              }
              else if(params.row.type === "2"){
                msg = "管理员";
              }
              else{
                msg = '用户'; 
              }
              return createElement(
                  'h5',
                  {
                  },
                  msg
                )
            }
          },
          {
            title: '所属群组',
            key: 'group',
            width:300
          },
          {
            title: '状态',
            key: 'status',
            width:100
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          this.edit(params)
                        }
                      }
                    }, '编辑'),
                    h('Button', {
                      props: {
                        type: 'error',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.removeUser(params.row.userid)
                        }
                      }
                      }, '删除')
                    ]);
            }
          }
        ],
        data3: [],
        i: 0,
        modal1: 0
      }
    },   
    components: {
      userConfig
    },
    mounted() {
      this.getUserName();
    },
    methods: {
      //获取主机名
      getUserName : function(){
        var req = {
          "jsonrpc": "2.0",
          "method": "user.get",
          "params": {
              "output": "extend",
              "selectUsrgrps": "extend"
          },
          "auth": sessionStorage.auth,
          "id": 1
        };
        this.axios({
        method : "POST",
        url: "",
        data: req
        }).then((response)=>{
          var group2id = {};
          response = response.result;
          console.log(response);
          for(var i=0;i<response.length;i++){
            var temp = {};
            temp['alias'] = response[i].alias;
            temp['name'] = response[i].name;
            temp['surname'] = response[i].surname;
            temp['type'] = response[i].type;
            temp['status'] = '已启用';
            temp['group'] = this.getUserGroup(response[i].usrgrps);
            temp['userid'] = response[i].userid;  
            temp['lang'] = response[i].lang;
            temp['refresh'] = response[i].refresh;
            temp['rows_per_page'] = response[i].rows_per_page;
            temp['theme'] = response[i].theme;
            group2id[temp['group']] = (group2id[temp['group']] === undefined) ? response[i].alias :  group2id[temp['group']] + "," +response[i].alias;
            this.data3.push(temp);
          }
          sessionStorage.group2id = JSON.stringify(group2id);
        });
      },
      //找到对应主机的群组
      getUserGroup: function(group){
        var userGroup = " ";
        for(let i=0;i<group.length;i++){
          userGroup += group[i].name + " ";
        }
        return userGroup;
      },
      //删除用户
      removeUser(userid){
        console.log(userid);
        var data = [];
        data.push(userid);
        var req = {
          "jsonrpc": "2.0",
          "method": "user.delete",
          "params": data,
          "auth": sessionStorage.auth,
          "id": 1
        }
        this.axios({
          method : "POST",
          url: "",
          data: req
        }).then((response)=>{
          console.log(response);
          if(response.error){
            alert(response.error.message);
          }
          else{
            alert("删除成功");
            window.location.reload(); 
            console.log(response);
          }
        });
      },
      //编辑--打开modal框
      edit: function(e){
        // this.$refs.usermodal.modalshow = true;
        this.i = 1;
        this.modal1 = this.i;
        this.rowdata = e.row;
      },
      //添加用户
      addUser(){
        this.i = 2; 
        this.modal1 = this.i;
      },
      showmodal(data){
        this.modal1 = data;
      },
      xxx(data){
        this.data3[data.index].type = data.type;
      },
      routeto(e){
        this.$router.push("/trans-user2group?name="+e); 
      }
    }
  }
</script>


