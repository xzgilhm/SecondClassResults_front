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

  <div class = "layout">
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1" @on-select="routeTo">
          <div class="layout-logo"></div>
          <div class="layout-nav">
              <MenuItem name="1">
                <Icon type="home"></Icon>
                首页
              </MenuItem>
              <MenuItem name="2">
                <Icon type="android-exit"></Icon>
                退出
              </MenuItem>
              
          </div>
      </Menu>
    </Header>
  </div>
</template>
<script>
import * as util from '@/assets/util.js';
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
      routeTo: function(e){
        if(e === '1'){
            this.$router.push("/");
        }
        else if(e === '2'){
        console.log(e);

            this.$Modal.confirm({
                title: '',
                content: '<p>是否退出?</p>',
                onOk: () => {
                    this.$Message.info('成功退出!');
                    util.session('token','');
                    this.$router.push("/login");
                },
                onCancel: () => {
                    this.$Message.info('取消点击');
                }
            });
        }
      }
    }

  }
</script>
