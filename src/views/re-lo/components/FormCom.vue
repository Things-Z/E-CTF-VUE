<template>
	<div id="form-com">
		<el-form status-icon>
			<el-form-item prop="email" v-show="!type">
				<el-input type="text" placeholder="username" v-model="name">
					<i slot="prefix" class="el-input__icon el-icon-user"></i>
				</el-input>
			</el-form-item>
			<el-form-item prop="email">
				<el-input type="e-mail" placeholder="E-mail" v-model="email">
					<i slot="prefix" class="el-input__icon el-icon-message"></i>
				</el-input>
			</el-form-item>
			<el-form-item prop="pass">
				<el-input type="password" placeholder="Password" v-model="pass1" show-password>
					<i slot="prefix" class="el-input__icon el-icon-lock"></i>
				</el-input>
			</el-form-item>
			<el-form-item prop="pass" v-show="!type">
				<el-input type="password" placeholder="Repeat the Password" v-model="pass2" show-password>
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
		GetUserInfo
	} from '@/api/api.js'
	export default {
		props: ['type'],
		name: "FormCom",
		data: function() {
			return {
				url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
				name: '',
				email: '',
				pass1: '',
				pass2: '',
				code: ''
			}
		},
		computed: {

		},
		methods: {
			Login: async function(){
				let rsp = await Login(this, {
					'email': this.email,
					'pass': this.pass1
				})
				if(rsp.data.token){
					this.$store.state.token = rsp.data.token;
					rsp = await GetUserInfo(this, this.$store.state.token);
					if(rsp.data.code == 200){
						this.$store.state.user = rsp.data.user;
						this.$router.push({path:'/challenges'})
					}
					
				}
			},
			Register: async function(){
				let rsp = await Register(this, {
					'username': this.name,
					'email': this.email,
					'pass': this.pass1
				})
				if(rsp.data.token){
					this.$store.state.token = rsp.data.token;
					rsp = await GetUserInfo(this, this.$store.state.token);
					if(rsp.data.code == 200){
						this.$store.state.user = rsp.data.user;
						this.$router.push({path:'/challenges'})
					}
				}
			},
			SubmitForm: function() {
				if(this.type){
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
