import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    //学生界面
    {
      path: '/application',
      component: resolve => require(['../components/student/index.vue'], resolve),
      children: [
        {
          path: '',
          component: resolve => require(['../components/student/application.vue'], resolve),
        },
        {
          path: '/editApplication', 
          component: resolve => require(['../components/student/editApplication.vue'], resolve)
        }
      ]
    },
    //申请者路由
    // {
    //   path: '/applicant',
    //   component: resolve => require(['../components/applicant/index.vue'], resolve),
    //   children: [
    //     {
    //       path: '',
    //       component: resolve => require(['../components/applicant/application.vue'], resolve),
    //     },
    //     {
    //       path: '/editApplication', 
    //       component: resolve => require(['../components/applicant/editApplication.vue'], resolve)
    //     }
    //   ]
    // },
    {  
    	path: '/login',
      component: resolve => require(['../components/common/login.vue'], resolve)
    }
  ]  
})
