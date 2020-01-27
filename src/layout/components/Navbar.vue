<template>
	<div id="lay-navbar">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
			<el-menu-item index="/index">
				<img class="logo" src="../../assets/logo.png" />
			</el-menu-item>
			<el-menu-item index="/challenges">
				<i class="el-icon-s-flag"></i>训练场
			</el-menu-item>
			<el-menu-item index="/scoreCard">
				<i class="el-icon-data-line"></i>计分板</el-menu-item>
			<el-menu-item index="/about">关于</el-menu-item>
			<el-menu-item v-if="!userName" index="/re-lo" style="float: right;">
				登录
				<el-divider direction="vertical"></el-divider>
				注册
			</el-menu-item>
			<el-submenu index="/" v-if="userName" style="float: right;">
				<template slot="title">{{userName}}</template>
				<el-menu-item index="/userInfo">个人中心</el-menu-item>
				<el-menu-item @click="Logout">注销</el-menu-item>
			</el-submenu>
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
		data: () => {
			return {
				activeIndex: '/',
			}
		},
		methods: {
			Logout: function() {
				this.$store.state.token = '';
				this.$store.state.user = {};
			}
		},
		created: function() {
			this.$data.activeIndex = this.$route.path;
		},
		computed: {
			userName: function() {
				return this.$store.state.user.userName;
			}
		},
		watch: {
			$route(to, from) {
				this.$data.activeIndex = to.path;
			}
		},
	}
</script>

<style scoped>
	.logo {
		max-height: 25px;
	}
</style>
