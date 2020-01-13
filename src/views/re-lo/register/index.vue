<template>
	<div id="register-from">
			<el-form status-icon>
				<el-form-item prop="pass">
					<el-input type="e-mail" placeholder="E-mail" v-model="email">
						<i slot="prefix" class="el-input__icon el-icon-message"></i>
					</el-input>
				</el-form-item>
				<el-form-item prop="pass">
					<el-input type="password" placeholder="Password" v-model="pass1">
						<i slot="prefix" class="el-input__icon el-icon-lock"></i>
					</el-input>
				</el-form-item>
				<el-form-item prop="pass">
					<el-input type="password" placeholder="Repeat the Password" v-model="pass2">
						<i slot="prefix" class="el-input__icon el-icon-lock"></i>
					</el-input>
				</el-form-item>
				<el-form-item prop="code" label-width="50">
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
					<el-button type="primary" @click="submitForm('ruleForm')" class="button">注册</el-button>
				</el-form-item>
			</el-form>
	</div>
</template>

<script>
	export default {
		name: 'RegisterFrom',
		data: () => {
			return {
				url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
				email:'',
				pass1: '',
				pass2: '',
				code: ''
			}
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
</style>
