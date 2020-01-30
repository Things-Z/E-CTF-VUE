import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

import Layout from '@/layout/index'

const routes = [{
	path: '/',
	name: 'layout',
	component: Layout,
	redirect: '/index',
	children: [{
			path: 'index',
			component: () => import('@/views/index/index'),
			meta: {
				title: 'index'
			}
		},
		{
			path: 'challenges',
			component: () => import('@/views/challenges/index'),
			meta: {
				title: 'challenges'
			}
		},
		{
			path: 'scoreCard',
			component: () => import('@/views/scoreCard/index'),
			meta: {
				title: 'scoreCard'
			}
		},
		{
			path: 'about',
			component: () => import('@/views/about/index'),
			meta: {
				title: 'about'
			}
		},
		{
			path: 're-lo',
			name: 'Re-lo',
			component: () => import('@/views/re-lo/index'),
		},
		{
			path: 'userInfo',
			component: () => import('@/views/userInfo/index'),
			// props: (route) => ({ query: route.query.uid }),
			meta: {
				title: 'userInfo'
			}
			
		}
	]

}]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router
