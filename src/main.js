// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from './axios'
import VueAxios from 'vue-axios'
import App from './App'
import iView from 'iview' 
import router from './router'
import util from './utils/utils'
import 'iview/dist/styles/iview.css'


Vue.use(VueAxios, axios) 
Vue.use(iView)
Vue.use(util)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

var bus = new Vue() 