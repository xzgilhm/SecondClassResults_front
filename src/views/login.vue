/*<style scoped>*/
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 150px;
    padding-bottom: 200px;
  }
  .wrapper > h1{
    text-align: center;
    vertical-align: middle;
    margin-bottom: 20px;
    color: #000;
  }
  .login {
    margin: 0 auto;
    padding: 200px auto;
    width: 255px;
    height: 100%;
  }

  .login span{
    color: #ae1010;
  }
</style>

<template>
  <div class="wrapper">
    <h1>登录</h1>
    <div class="login">
        <i-form>
          <Form-item v-if="error">
              <span> {{ errorMsg }}</span>
          </Form-item>
          <Form-item prop="username">
              <Input v-model="username" placeholder="账号">
                 <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
          </Form-item>
          <Form-item prop="password">
              <Input v-model="password" type="password" placeholder="密码"  @keyup.enter.native="login">
                 <Icon type="ios-locked-outline" slot="prepend"></Icon>
              </Input>
          </Form-item>
          <Form-item>
              <i-button type="success" @click="login"  long>登录</i-button>
          </Form-item>
        </i-form>
    </div>
  </div>
</template>

<script>
import * as util from '@/assets/util.js';
export default {
  name: 'login',
  data () {
    return {
      username: "liu5",
      password: "123",
      error: false,
      errorMsg: ''
    }
  },
  methods: {
    login: function(){
      var req = {
        "name": this.username ,
        "password": this.password
      };
      //登陆
      this.axios({
        method : "POST",
        url: "/login",
        data: req
      }).then((response)=>{
        if(response.code === 200){
          util.session('token',response.data);
          console.log(response.data);
          // console.log(this.$router.currentRoute.query.from);
          this.$emit('login',this.$router.currentRoute.query.from);
        }
        else{
          this.error = true;
          this.errorMsg = response.message;
        }
      })
    }
   
  },
  created() {
    sessionStorage.clear();
  }
}


</script>

