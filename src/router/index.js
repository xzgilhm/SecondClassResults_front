import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/about',
      component: resolve => require(['../components/common/index.vue'], resolve),
      children: [{
                   path: '', 
                   component: resolve => require(['../components/page/about.vue'], resolve)
                 },
                 {
                   path: '/equipmentAlarm',
                   component: resolve => require(['../components/page/hw-equipmentAlarm.vue'],resolve)
                 },
                 {
                   path: '/zabbixPage',
                   component: resolve => require(['../components/page/hw-zabbixPage.vue'], resolve)
                 },
                 {
                   path: '/serversList',
                   component: resolve => require(['../components/page/hw-serversList.vue'], resolve)
                 },
                 {
                   path: '/serverGrp',
                   component: resolve => require(['../components/page/hw-serverGrp.vue'], resolve)
                 },
                 {
                   path: '/netGrp',
                   component: resolve => require(['../components/page/hw-netGrp.vue'], resolve)
                 },
                 {
                   path: '/switchList',
                   component: resolve => require(['../components/page/hw-switchList.vue'], resolve)
                 },
                 {
                   path: '/zylyl',
                   component: resolve => require(['../components/page/hw-zylyl.vue'], resolve)
                 },
                 {
                   path: '/hostList',
                   component: resolve => require(['../components/page/hw-hostList.vue'], resolve)
                 },
                 {
                   path: '/monitorView',
                   component: resolve => require(['../components/page/sc-monitorView.vue'], resolve)
                 },
                 {
                   path: '/servicePlat',
                   component: resolve => require(['../components/page/sc-servicePlat.vue'], resolve)
                 },
                 { 
                   path: '/serviceAlarm',
                   component: resolve => require(['../components/page/sc-serviceAlarm.vue'],resolve)
                 }, 
                 {
                   path: '/userConfig',
                   component: resolve => require(['../components/page/um-userConfig.vue'],resolve)
                 },
                 {
                   path: '/userGroupConfig',
                   component: resolve => require(['../components/page/um-userGroupConfig.vue'],resolve)
                 }, 
                 { 
                   path: '/hostGroup',
                   component: resolve => require(['../components/others/hostGroup.vue'],resolve)
                 }, 
                 { 
                   path: '/hostInfo',
                   component: resolve => require(['../components/others/hostInfo.vue'],resolve)
                 },
                 { 
                   path: '/showLog',
                   component: resolve => require(['../components/others/showLog.vue'],resolve)
                 },
                 { 
                   path: '/trans-user2group',
                   component: resolve => require(['../components/others/trans-user2group.vue'],resolve)
                 },
                 { 
                   path: '/trans-group2user',
                   component: resolve => require(['../components/others/trans-user2group.vue'],resolve)
                 },
                 {
                   path: '/test', 
                   component: resolve => require(['../components/page/test.vue'], resolve)
                 }
                ]
    },
    //学生申请奖学金界面
    {
      path: '/application',
      component: resolve => require(['../components/student/application.vue'], resolve),
      children: [{
                   path: '', 
                   // component: resolve => require(['../components/page/about.vue'], resolve)
                 }]
    },
    {  
    	path: '/login',
      component: resolve => require(['../components/common/login.vue'], resolve)
    }
  ]  
})
