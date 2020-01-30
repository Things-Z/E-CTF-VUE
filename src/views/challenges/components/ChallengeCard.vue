<template>
	<div id="challenge-card">
		<el-card :body-style="{ padding: '0px' }" class="box-card challenge-card" shadow="always">
			<el-row>
				<div style="float: right;">
					<el-popover v-if="role" placement="top-start" width="150" trigger="hover">
						<div><i class="el-icon-info" style="color: red;"></i><span style="margin-left: 5px;">删除题目,高危操作!</span></div>
						<el-button slot="reference" style="float: right; padding: 3px 0" type="text" @click="Close">
							<i class="el-icon-close" style="color: #F56C6C;"></i></el-button>
					</el-popover>
				</div>
			</el-row>
			<div class="card-text" @click="CardClick">
				<h4 style="color: #8F8F8F">{{challenge.title}}</h4>
				<p style="color: coral;">Score: {{challenge.score}}</p>
				<div style="font-size: 18px; font-weight: bold; color: #00e18b;">Solvers: {{challenge.solvers}}</div>
				<div v-if="challenge.solved" class="solve challenge-solved">You Sovled: <span style="color: #00dd30;">✔</span></div>
				<div v-if="!challenge.solved" class="solve challenge-nosolved">You Not Sovled</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {
		SubmitFlag
	} from '@/api/api.js'

	export default {
		props: ['data'],
		computed: {
			challenge: function() {
				let data = this.data;
				data.des = data.des.replace(/[\n\r]/g, '<br/>');
				return data;
			},
			role: function() {
				return this.$store.state.user.role
			}
		},
		name: 'ChallengeCard',
		methods: {
			Close: function() {
				this.$emit('delete', this.challenge);
			},
			CardClick: function() {
				this.$prompt(this.challenge.des, this.challenge.title, {
					confirmButtonText: '提交',
					cancelButtonText: '取消',
					center: true,
					dangerouslyUseHTMLString: true,
					inputPattern: /(^E-CTF{)(\w*)}/,
					inputErrorMessage: 'Flag格式不正确'
				}).then(async ({
					value
				}) => {
					//检查是否登录
					if (this.$store.state.user) {
						//提交flag
						let rsp = await SubmitFlag(this, {
							'cid': this.challenge.cid, 
							'flag': value, 
							'user': this.$store.state.user
						});
						switch (rsp.data.code) {
							// glag正确
							case 200:
								this.challenge.solved = true;
								this.challenge.solvers ++;
								this.$notify({
									title: '成功',
									message: '提交flag正确',
									type: 'success'
								});
								break;
								// flag错误
							case 600:
								this.$notify({
									title: '错误',
									message: 'flag错误',
									type: 'error'
								});
								break;
								// 重复提交
							case 700:
								this.$notify({
									title: '警告',
									message: '请勿重复提交!',
									type: 'warning'
								});
								break;
								// 未登录
							case 400:
								this.$confirm('请先登录', '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									type: 'warning'
								})
								break;
							case 500:
								this.$message({
									type: 'error',
									message: 'token已失效,请重新登录!'
								});
								this.$store.state.user = {};
								break;
							default:
								this.$message({
									type: 'error',
									message: '未知错误，请联系管理员'
								});
								break;
						}
					}
				}).catch(() => {
					this.$notify({
						type: 'info',
						title: '消息',
						message: '取消输入',
					});
				})
			}
		}
	}
</script>

<style scoped>
	.challenge-card {
		min-height: 200px;
		max-width: 180px;
		margin-top: 10px;
		margin-bottom: 10px;

	}

	.challenge-card:hover {
		cursor: pointer;
	}

	.card-text {
		margin-top: 10%;
	}

	.challenge-nosolved,
	.challenge-solved,
	.solve {
		margin-top: 15px;
		font-size: 18px;
		font-weight: bold;
	}

	.challenge-solved {
		color: #66b1ff;
	}

	.challenge-nosolved {
		color: #ff2222
	}
</style>
