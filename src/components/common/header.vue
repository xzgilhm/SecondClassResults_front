<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 200px;
    margin: 0 auto;
    margin-right: 20px;
}

</style>
<template>
  <!-- 居中对齐 -->
  <!-- <Row type="flex" justify="center" >
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
  </Row> -->
  <div class = "layout">
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
              <MenuItem name="1">
                  <Icon type="ios-navigate"></Icon>
                  首页
              </MenuItem>
              <MenuItem name="2">
                  <Icon type="ios-keypad"></Icon>
                  退出
              </MenuItem>
              
          </div>
      </Menu>
    </Header>
  </div>
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
        sessionStorage.clear();
      }
    }

  }
</script>
