<template>
	<div id="form-com">
		<el-form status-icon :rules="rules" :model="formData" ref="formData">
			<el-form-item prop="name" v-show="!type">
				<el-input type="text" placeholder="username" v-model="formData.name">
					<i slot="prefix" class="el-input__icon el-icon-user"></i>
				</el-input>
			</el-form-item>
			<el-form-item prop="email">
				<el-input type="e-mail" placeholder="E-mail" v-model="formData.email">
					<i slot="prefix" class="el-input__icon el-icon-message"></i>
				</el-input>
			</el-form-item>
			<el-form-item prop="pass">
				<el-input type="password" placeholder="Password" v-model="formData.pass" show-password>
					<i slot="prefix" class="el-input__icon el-icon-lock"></i>
				</el-input>
			</el-form-item>
			<el-form-item prop="checkPass" v-show="!type">
				<el-input type="password" placeholder="Repeat the Password" v-model="formData.checkPass" show-password>
					<i slot="prefix" class="el-input__icon el-icon-lock"></i>
				</el-input>
			</el-form-item>

			<!-- 			<el-form-item prop="code" label-width="50">
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
			</el-form-item> -->

			<el-form-item>
				<el-button type="primary" @click="SubmitForm" class="button">{{type?'登录':'注册'}}</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {
		Login,
		Register,
		IsExists
	} from '@/api/api.js'
	export default {
		props: ['type'],
		name: "FormCom",
		data: function() {
			let isExists = async (rule, value, callback) => {
				let code = await this.CheckIsExists(value);
				if (!this.type) {
					switch (code) {
						case 1001:
							callback(new Error('已被注册'));
							break;
						case 100:
							callback(new Error('网络故障'));
							break;
						default:
							callback();
							break;
					}
				} else {
					switch (code) {
						case 1000:
							callback(new Error('该用户不存在'));
							break;
						case 100:
							callback(new Error('网络故障'))
							break;
						default:
							callback()
							break;
					}
				}
			};

			let validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.formData.pass !== '' && !this.type) {
						this.$refs.formData.validateField('checkPass');
					}
					callback();
				}
			};
			let validatePass2 = (rule, value, callback) => {
				if (!this.type) {
					if (value === '') {
						callback(new Error('请再次输入密码'));
					} else if (value !== this.formData.pass) {
						callback(new Error('两次输入密码不一致!'));
					} else {
						callback();
					}
				}
			};
			return {
				// url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
				formData: {
					name: '',
					email: '',
					pass: '',
					checkPass: ''
				},
				// code: '',
				rules: {
					name: [{
							required: true,
							message: '请输入ID',
							trigger: ['blur', 'change'],
						},
						{
							min: 3,
							max: 10,
							message: '长度在 3 到 10 个字符',
							trigger: ['blur', 'change'],
						},
						{
							validator: isExists,
							tirgger: ['blur']
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱地址',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '请输入正确的邮箱地址',
							trigger: ['blur', 'change'],
						},
						{
							validator: isExists,
							tirgger: ['blur']
						}
					],
					pass: [{
							min: 6,
							message: '密码至少需要6位数',
							trigger: ['blur', 'change'],
						},
						{
							validator: validatePass,
							trigger: ['blur'],
						}
					],
					checkPass: [{
						validator: validatePass2,
						trigger: ['blur'],
					}],
				},
			}
		},
		methods: {
			CheckIsExists: async function(value) {
				try {
					let rsp = await IsExists(this, value);
					let code = rsp.data.code;
					return code
				} catch (e) {
					//TODO handle the exception
					this.$message({
						type: 'error',
						message: '获取数据失败,请检查网络!'
					});
					return 100;
				}
			},
			Login: async function() {
				let rsp = await Login(this, {
					'email': this.formData.email,
					'pass': this.formData.pass
				})
				if (rsp.data.user) {
					this.$store.state.user = rsp.data.user;
					this.$router.push({
						path: '/challenges'
					})
					this.$refs.formData.resetFields();
				}
			},
			Register: async function() {
				let rsp = await Register(this, {
					'username': this.formData.name,
					'email': this.formData.email,
					'pass': this.formData.pass
				})
				if (rsp.data.user) {
					this.$store.state.user = rsp.data.user;
					this.$router.push({
						path: '/challenges'
					})
					this.$refs.formData.resetFields();
				}
			},
			SubmitForm: function() {
				if (this.type) {
					this.Login();
					return
				}
				this.Register();
			}
		}
	}
</script>

<style scoped>
	.code {
		min-width: 90px;
		max-height: 40px;
	}

	.button {
		min-width: 100%;
	}
</style>
