<style scoped>
  .layout-header{
    height: 1px;
    background: #F0F0F0;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    margin-bottom: 20px;
  }
  .layout-ceiling{
    background: #FFFFFF;
    padding: 20px 0;
    overflow: hidden;
  }
  .layout-ceiling-main{
    float: right;
    margin-right: 15px;
  }
  .layout-logo-left{
    text-align: right;
  } 
  .layout-ceiling-main a{
    color: #9ba7b5;
    margin-right: 14px;
    font-size: 12px;
  }
  a i{
    margin-right: 3px;
  }

</style>
<template>
  <!-- 居中对齐 -->
  <Row type="flex" justify="center" >
    <i-col span="24">
      <div class="header">
        <div class="layout-ceiling">
          <span class="layout-ceiling-main"> 
            <Dropdown trigger="click">
              <i-button type="primary">
                {{username}}
                <Icon type="arrow-down-b"></Icon>
              </i-button>
              <Dropdown-menu slot="list">
                <Dropdown-item>
                  <i-button type="text" @click="editInfo">
                    修改信息
                  </i-button>
                </Dropdown-item>
                <Dropdown-item ><i-button type="text" @click="loginOut">注销</i-button></Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </span>
        </div>
        <div class="layout-header"></div>
      </div>
    </i-col>
  </Row>
</template>
<script>
  export default {
    data(){
      return {
        username: " ",
        auth: JSON.parse(sessionStorage.getItem('auth'))
      }
    },
    beforeMount(){
      // var auth = JSON.parse(sessionStorage.getItem('auth'));
      console.log(this.auth);
      this.username = this.auth.name;
    },
    methods: {
      editInfo: function(){
        //学生角色
        if(this.auth.roleId === 5){
          this.$router.push("/editApplication");
        }
      },
      //注销
      loginOut : function(){
        this.$router.push("/");
        sessionStorage.auth = null;
      }
    }

  }
</script>
