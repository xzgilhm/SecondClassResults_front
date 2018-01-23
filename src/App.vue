<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #F0F0F0;
  }

  
  .ivu-table .table-data2-serious{
    background-color: #FD5200;
  }
  .ivu-table td.table-data2-general-serious{
    background-color: #FFCD14;
  }
  .ivu-table  td.table-data2-warn{
    background-color: #EFE42A;
  }
  .ivu-table td.table-data2-info{
    background-color: #7499FF;
  }
  .ivu-table  .table-general-serious{
    background-color: #FFCD14;
  }
  .ivu-table  .table-serious{  
    background-color: #FD5200 ;
  }
  .ivu-table td.table-problem{
    background-color: #FFCD14;
  } 


</style>

<template>
  <!-- <router-view id="app" @login="loginDirect" @logout="logoutDirect"></router-view> -->
  <router-view id="app"  @login="loginDirect" ></router-view>

</template>

<script>
import Vue from 'vue';
import * as util from './assets/util.js';
import userPath from './router/fullpath.js';
import axios from './axios.js';

export default {
  name: 'app',
  data() {
    return {
      menuData: null,
      userData: null
    }
  },
  created: function(newPath){
    this.signin(); 
  },
  methods: {
    signin: function(callback){
      let vm = this;
      //检查登录状态
      let localUser = util.session('token');
      //没有登陆
      if(localUser === null) {
        console.log("没有localUser===>");
        console.log( vm.$router.currentRoute.path);
        return vm.$router.push({ path: '/login', query: { from: vm.$router.currentRoute.path } });
      }
      // console.log(axios.default.headers);
      // axios.default.headers.common['Authorization'] = 'Bearer' + localUser.token;
      // this.axios.get('/getInfo',{
      //   params: {
      //     Authorization: localUser.token
      //   }
      // })
      this.axios.get('/getInfo').then((res) => {
        //取得资源权限对象
        // let resourcePermission = vm.getPermission(userInfo);
        let userInfo = {
          id : "A",
          menus: [
            {
              id: "A01",
              name: "第二课堂",
              route: "secondClass",
              summary: ""
            },
            {
              id: "B01",
              name: "提交",
              parent_id: "A01",
              route: "application",
              summary: ""
            },
            {
              id: "B02",
              name: "修改",
              parent_id: "A01",
              route: "editApplication",
              summary: ""
            }
          ],
          name: "学生",
          resources: []
        };
        let allowedRouter = this.getRoutes(userInfo);
        console.log("获得实际路由之后" );
        console.log(allowedRouter);
        //若无可用路由限制访问
        if (!allowedRouter || !allowedRouter.length) {
          console.log("没有allowedRouter");
          util.session('token','');
          return document.body.innerHTML = ('<h1>无可用路由限制访问，请联系系统管理员！</h1>');
        }
        console.log("动态注入路由之前" );
        console.log(allowedRouter);
        //动态注入路由
        this.extendRoutes(allowedRouter);
        //保存数据用作他处，非必需
        this.menuData = allowedRouter;
        console.log("动态注入路由之后");
        console.log(allowedRouter);
        this.userData = userInfo;
         //权限检验方法
        Vue.prototype.$_has = function(rArray) {
          let resources = [];
          let permission = true;
          //提取权限数组
          if (Array.isArray(rArray)) {
            rArray.forEach(function(e) {
              resources = resources.concat(e.p);
            });
          } else {
            resources = resources.concat(rArray.p);
          }
          //校验权限
          resources.forEach(function(p) {
            if (!resourcePermission[p]) {
              return permission = false;
            }
          });
          return permission;
        }
        //执行回调
        typeof callback === 'function' && callback();
      });
      // typeof callback === 'function' && callback();
    },
    loginDirect: function(newPath){
      console.log("loginDirect===>" + newPath);
      this.signin(() => {
        this.$router.replace({path: newPath || '/'});
      });
    },
    getRoutes: function(userInfo) {
      console.log(userInfo);
      if(userInfo.menus.length === 0){
        return console.warn(userInfo);
      }
      let vm = this;
      let allowedRouter = [];
      //将菜单数据转成多维数组格式
      let arrayMenus = util.buildMenu(userInfo.menus);
      //将多维数组转成对象格式
      let hashMenus = {};
      let setMenu2Hash = function(array, base) {
        array.map(key => {
          if (key.route) {
            let hashKey = ((base ? base + '/' : '') + key.route).replace(/^\//, '');
            hashMenus['/' + hashKey] = true;
            if (Array.isArray(key.children)) {
              setMenu2Hash(key.children, key.route);
            }
          }
        });
      };
      setMenu2Hash(arrayMenus);
      //全局挂载hashMenus，用于实现路由守卫
      this.$root.hashMenus = hashMenus;
      //筛选本地路由方法
      let findLocalRoute = function(array, base) {
        let replyResult = [];
        array.forEach(function(route) {
          let pathKey = (base ? base + '/' : '') + route.path;
          if (hashMenus[pathKey]) {
            route.path = pathKey;
            if (Array.isArray(route.children)) {
              route.children = findLocalRoute(route.children, route.path);
            }
            replyResult.push(route);
          }
        });
        if (base) {
          return replyResult;
        } 
        else {
          allowedRouter = allowedRouter.concat(replyResult);
          
        }
      }
      let originPath = util.deepcopy(userPath[0].children);
      console.log("初始参数");
      console.log(originPath);
      findLocalRoute(originPath);
      // console.log(originPath);
      return allowedRouter;
    },
    extendRoutes: function(allowedRouter) {
      let actualRouter = util.deepcopy(allowedRouter);
      let vm = this;
      actualRouter.map(e => {
        //复制子菜单信息到meta用于实现导航相关效果，非必需
        if (e.children) {
          if (!e.meta) e.meta = {};
          e.meta.children = e.children;
        }
        //为动态路由添加独享守卫
        // console.log("vm.$root");
        // console.log(this.$root);
        return e.beforeEnter = function(to, from, next){
          console.log("xxx");
          console.log(vm.$root);
          console.log(to);
          if(vm.$root.hashMenus[to.path]){
            console.log(vm.$root.hashMenus);
            next()
          }else{
            next('/401')
          }
          // next()
        }
      });
      let originPath = util.deepcopy(userPath);
      originPath[0].children = actualRouter;
      //注入路由
      this.$router.addRoutes(originPath);
      console.log(originPath);
      // this.$router.addRoutes(originPath.concat([{
      //   path: '*',
      //   redirect: '/404'
      // }]));
     
    }
  }
}
</script>

