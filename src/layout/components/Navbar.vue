<template>
	<div id="lay-navbar">
		<el-menu :default-active="activeIndex" 
			class="el-menu-demo" 
			mode="horizontal" 
			router>
			<el-menu-item index="/index">
				<img class="logo" src="../../assets/logo.png"/>
			</el-menu-item>
			<el-menu-item index="/challenges">
				<i class="el-icon-s-flag"></i>训练场
				</el-menu-item>
			<el-menu-item index="/gameInfo">
				<i class="el-icon-date"></i> 赛事</el-menu-item>
			<el-menu-item index="/about">关于</el-menu-item>
			<el-menu-item index="/re-lo" style="float: right;">
				登录
				<el-divider direction="vertical"></el-divider>
				注册
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	// const {
	// 	indexPath,
	// 	challengesPath,
	// 	aboutPath,
	// 	registerPath,
	// 	loginPath
	// } = this.$store.state.routerPathSettings
	
	export default {
		name: 'LayNavbar',
		data:() => {
			return {
				activeIndex: '/',
				
			}
		},
		created:function(){
			this.$data.activeIndex = this.$route.path;
		}
	}
</script>

<style scoped>
	.logo{
		max-height: 25px;
	}
</style>
