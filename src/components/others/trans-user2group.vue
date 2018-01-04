<style  scoped>
 h5{
  margin-top: 7px;
 }
 .ivu-row{
  margin-top: 20px;
 }
 .chart{
  height: 600px;
 }

.ivu-tabs .ivu-select-dropdown{top:auto;} 
.ivu-tabs .ivu-tabs-tabpane{position:relative;}
.ivu-dropdown-menu {
position: absolute !important;
}
</style>

<template lang="html">
  <div class="chart" value="name1">
    <!-- <h1>{{this.$route.query.name}}</h1> -->
    <Modal v-model="modalshow" width="900" :scrollable="true" @on-ok="ok">
      <Tabs type="card" name="name1">
        <Tab-pane label="用户">
            <m-user :msg="userdata" ref="tabuser"></m-user>
        </Tab-pane>
        <Tab-pane label="报警媒介">
            <m-media :userid="userdata.userid"></m-media>
        </Tab-pane>
        <Tab-pane label="权限">
            <m-auth :msg="userdata.type" ref="tabauth"></m-auth>
        </Tab-pane>
      </Tabs>
    </Modal>
  </div>   
</template> 

<script>
  import mUser from '../basecomponent/userConfig/modal-user' 
  import mMedia from '../basecomponent/userConfig/modal-media' 
  import mAuth from '../basecomponent/userConfig/modal-authority' 
  export default {
    data () {
      return {
        issave: false,
        modalshow: false,
        userid: '',
        userdata: {},
        updateData: {},
        //1代表更新 2代表增加
        addOrUpdate: 1
      }
    },
    props: {
      msg: {
        type: Object,
        default: function () {
          return { }
        }
      },
      toshow: Number
    },  
    components: {
      mUser,
      mMedia,
      mAuth
    }, 
    mounted (){
      
    }, 
    methods: {
      ok(){
        this.updateData = this.$refs.tabuser.userdata;
        this.updateData['type'] = this.$refs.tabauth.type[0];
        console.log(this.updateData);
        if(this.addOrUpdate === 1){
          this.updateUser(this.updateData);
        }
        else{
          this.addUser(this.updateData);
        }        
      }, 
      //添加用户
      addUser(updateData){
        // alert(this.addOrUpdate);
        var req = {
          "jsonrpc": "2.0",
          "method": "user.create",
          "params": {
              "name": updateData.name,
              "surname": updateData.surname,
              "passwd": updateData.password,
              "alias": updateData.alias,
              "lang": updateData.lang,
              "theme": updateData.theme, 
              "refresh": updateData.refresh,
              "rows_per_page": updateData.rows_per_page,
              "type": updateData.type,
              "usrgrps": [
                  {
                      "usrgrpid": "7"
                  }
              ],
              "user_medias": [
                  {
                      "mediatypeid": "1",
                      "sendto": "support@company.com",
                      "active": 0,
                      "severity": 63,
                      "period": "1-7,00:00-24:00"
                  }
              ]
          },
          "auth": sessionStorage.auth,
          "id": 1
        }
        this.axios({
          method : "POST",
          url: "",
          data: req
        }).then((response)=>{
          if(response.error){
            alert(response.error.message);
          }
          else{
            alert("添加成功");
            window.location.reload(); 
            console.log(response);
          }
        });
      },

      //更新用户数据
      updateUser: function(updateData) {
        var req = {
          "jsonrpc": "2.0",
          "method": "user.update",
          "params": {
              "userid": updateData.userid,
              "name": updateData.name,
              "surname": updateData.surname,
              "alias": updateData.alias,
              "lang": updateData.lang,
              "theme": updateData.theme, 
              "refresh": updateData.refresh,
              "rows_per_page": updateData.rows_per_page,
              "type": updateData.type
          },
          "auth": sessionStorage.auth,
          "id": 1
        }
        this.axios({
          method : "POST",
          url: "",
          data: req
        }).then((response)=>{
          if(response.error){
            alert(response.error.message);
          }
          else{
            alert("更新成功");
            console.log(response);
          }
        });

        //更新群组信息
        function updateGroup(){

        };
      }
    },
    watch: {
      msg: function(val,oldVal){
        this.userdata = val;
      },
      //开启对话框 val为1时是编辑 val为2是更新
      toshow: function(val){
        if(val === 1){
          this.addOrUpdate = 1;
          this.modalshow = true;
          this.$emit('showmodal',0);
        }
        if(val === 2){
          this.addOrUpdate = 2;
          this.modalshow = true;
          this.$emit('showmodal',0);
        }
      }
    }
  }
</script>

  

