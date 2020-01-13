import Vue from 'vue'
import '@/plugins/axios'
import App from '@/App.vue'
import router from '@/router'
import '@/plugins/element.js'

Vue.config.productionTip = false

import '@/sytles/index.css' // 全局样式表
import store from './store'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
