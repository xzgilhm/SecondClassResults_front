// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from './axios'
import VueAxios from 'vue-axios'
import App from './App'
import iView from 'iview' 
import router from './router'
import 'iview/dist/styles/iview.css'
import './components/common/js/global.js'

Vue.use(VueAxios, axios) 
Vue.use(iView)


Vue.config.productionTip = false

//权限指令
Vue.directive('has', {
  bind: function(el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

var bus = new Vue() 