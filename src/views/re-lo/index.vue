<template>
	<div id="re-lo">
		<el-container>
			<el-main>
				<img src="../../assets/CTF-bg.jpg" class="ctf-bg" />
			</el-main>
			<el-aside width="500px">
				<el-card class="box-card card">
					<el-button type="text" class="forget-pass" :disabled="choice" @click="ChangeChoice">登录</el-button>
					<el-divider direction="vertical"></el-divider>
					<el-button type="text" class="forget-pass" :disabled="!choice" @click="ChangeChoice">注册</el-button>
					<el-divider></el-divider>
					<transition name="el-fade-in-linear">
						<login-from v-if="choice"></login-from>
						<register-from v-if="!choice"></register-from>
					</transition>
				</el-card>
			</el-aside>
		</el-container>
	</div>
</template>

<script>
	import LoginFrom from './login/index';
	import RegisterFrom from './register/index'

	export default {
		components: {
			LoginFrom: LoginFrom,
			RegisterFrom: RegisterFrom
		},
		name: 'relo',
		data: () => {
			return {
				choice: true
			}
		},
		methods: {
			ChangeChoice: function() {
				this.$data.choice = !this.$data.choice;
			}
		},
	}
</script>

<style scoped>
	.el-aside {
		/* background-color: #D3DCE6; */
		color: #333;
		text-align: center;
		min-height: 500px;
	}

	.el-main {
		/* background-color: #E9EEF3; */
		color: #333;
		text-align: center;
	}

	.ctf-bg {
		max-width: 650px;
	}

	.card {
		margin-top: 20px;
		float: left;
		min-width: 350px;
	}
</style>
