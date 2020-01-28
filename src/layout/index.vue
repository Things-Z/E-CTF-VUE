<template>
	<div class="layout">
		<el-container>
			<el-header class="global-layout">
				<lay-navbar></lay-navbar>
			</el-header>
			<el-main class="global-layout main-container">
				<app-main></app-main>
			</el-main>
		</el-container>
		<div class="footer footer-line">
			<lay-footer></lay-footer>
		</div>
	</div>
</template>

<script>
	import {LayNavbar, AppMain, LayFooter} from './components/index.js'
	export default {
		name:'layout',
		components:{
			LayNavbar,
			AppMain,
			LayFooter
		},
		data:() => {
			return {
				
			}
		}
	}
</script>

<style scoped>
	.global-layout{
		margin: 0 50px 0 50px;
	}
	.main-container{
		min-height: 650px;
	}
	.footer-line{
		border-top: 0.1px solid #8f8f8f;
		border-bottom-width: 0px;
		border-left-width: 0px;
		border-right-width: 0px;
		margin-bottom: 10px;
	}
	.footer{
		margin-top: 50px;
		width: 100%;
		bottom: 2px;
		
	}
	
</style>
