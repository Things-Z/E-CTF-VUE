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
			name: 'Index',
			component: () => import('@/views/index/index'),
			meta: {
				title: 'index'
			}
		},
		{
			path: 'challenges',
			name: 'Challenges',
			component: () => import('@/views/challenges/index'),
			meta: {
				title: 'challenges'
			}
		},
		{
			path: 'scoreCard',
			name: 'Scorecard',
			component: () => import('@/views/scoreCard/index'),
			meta: {
				title: 'scoreCard'
			}
		},
		{
			path: 'about',
			name: 'about',
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
	]

}]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router
