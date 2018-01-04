<style  scoped>
  .chart{ 
  }
  .row{
    margin-top : 25px;
  }
  .col{
    margin-top : 15px;
  }
</style>

<template lang="html">
  <div class="chart">
    
    <Row>
      <Col span="24"> 
        <Table  :columns="columns" :data="data3" no-data-text="Loading" stripe size="small"></Table>
      </Col>
    </Row>
  </div> 
</template> 

<script>
  export default {
    data () {
      return {
        columns: [
          {
            title: '名称',
            key: 'name',
            render: (createElement,params)=>{
              return createElement(
                  'h5',
                  {
                  },
                  [createElement('strong', params.row.name)]
                )
            }
          },
          {
            title: '调试模式',
            width:100,
            key: 'debug',
            render: (createElement,params)=>{
              var color = "";
              var msg = ""
              if(params.row.debug === "1"){
                msg = '启用';
                // color = "#429e47";
                color = "green";
              }
              else{
                msg = '停用'; 
                color = "red"  
              }
              return createElement(
                  'h5',
                  {
                    style: {
                      color: color,
                      fontSize: '14px'
                    }
                  },
                  [createElement('strong', msg)]
                )
            }
          },
          {
            title: '前端访问',
            width:100,
            key: 'gui',
            render: (createElement,params)=>{
              var color = "red";
              var msg = "";
              if(params.row.gui === "0"){
                msg = '系统默认';
                color = "green";
              }
              else if(params.row.gui === "2"){
                msg = '停用的';
              }
              else{
                msg = '用户类型'; 
              }
              return createElement(
                  'h5',
                  {
                    style: {
                      color: color
                    }
                  },
                  [createElement('strong', msg)]
                )
            }
          } ,
          
          {
            title: '成员',
            width:310,
            key: 'user'
          },
          {
            title: '状态',
            key: 'status'
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
                          this.remove(params.index)
                        }
                      }
                      }, '删除')
                    ]);
            }
          } 
        ],
        data3: [] 
      }
    },
    mounted() {
      this.getUserGroupName();
    },
    methods: {
      getUserGroupName : function(){
        var req = {
          "jsonrpc": "2.0",
          "method": "usergroup.get",
          "params": {
              "output": "extend",
              "selectUsers": "extend",
              "status": 0
          },
          "auth": sessionStorage.auth,
          "id": 1
        };
        this.axios({
        method : "POST",
        url: "",
        data: req
        }).then((response)=>{
          response = response.result;
          console.log(response);
          for(var i=0;i<response.length;i++){
            var temp = {};
            temp['name'] = response[i].name;
            temp['gui'] = response[i].gui_access;     
            temp['debug'] = response[i].debug_mode;
            temp['status'] = "已启用";
            temp['usergrpid'] = response[i].usrgrpid;
            temp['user'] = this.getUserName(response[i].users);
            this.data3.push(temp);
          }
        });
      },
      //获取用户名
      getUserName : function(users){
        let word = '';
        for(let i=0;i<users.length;i++){
          word += users[i].alias + " ";
        }
        return word;
      }
      
    }
  }
</script>


