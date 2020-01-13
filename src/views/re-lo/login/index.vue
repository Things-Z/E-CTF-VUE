<template>
	<div id="login-from">
			<el-form status-icon>
				<el-form-item>
					<el-input type="e-mail" placeholder="E-mail" v-model="email">
						<i slot="prefix" class="el-input__icon el-icon-message"></i>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input type="password" placeholder="Password" v-model="pass">
						<i slot="prefix" class="el-input__icon el-icon-lock"></i>
					</el-input>
				</el-form-item>
				<el-form-item label-width="50" style="margin-bottom: 0px;">
					<el-row :gutter="10">
						<el-col :span="16">
							<el-input type="text" maxlength="4" placeholder="验证码" v-model="code">
								<i slot="prefix" class="el-input__icon el-icon-thumb"></i>
							</el-input>
						</el-col>
						<el-col :span="4">
							<img class="code" :src="url" />
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')" class="button">登录</el-button>
				</el-form-item>
			</el-form>
	</div>
</template>

<script>
	export default {
		name: "LoginFrom",
		data: () => {
			return {
				url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
				email: '',
				pass: '',
				code: ''
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	

	.code {
		min-width: 100px;
		max-height: 40px;
	}

	.button {
		min-width: 100%;
	}
	.forget-pass{
		float: right;
	}
</style>
