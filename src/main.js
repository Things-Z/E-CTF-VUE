import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'


import '@/plugins/axios'
import '@/plugins/element'




Vue.config.productionTip = false

import '@/sytles/index.css' // 全局样式表
import store from './store'

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
