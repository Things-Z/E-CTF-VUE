import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

import Layout from '@/layout/index'

const routes = [
  {
    path: '/',
		name: 'layout',
    component: Layout,
		redirect: '/index',
		children: [
			{
				path: 'index',
				name:	'Index',
				component: () => import('@/views/index/index'),
				meta: { title: 'index' }
			},
			{
				path: 'challenges',
				name:	'Challenges',
				component: () => import('@/views/challenges/index'),
				meta: { title: 'challenges' }
			},
			{
				path: 'gameInfo',
				name:	'GameInfo',
				component: () => import('@/views/gameInfo/index'),
				meta: { title: 'gameInfo' }
			},
			{
				path: 're-lo',
				name:	'Re-lo',
				component: () => import('@/views/re-lo/index'),
			},
		]
		
  }
]

const router = new VueRouter({
  routes
})

export default router
