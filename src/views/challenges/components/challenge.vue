<template>
	<div id="challenge">
		<el-row :gutter="20" class="challenge-row" justify="space-around" v-for="(challenges, _) in challengeData" :key="_">
			<el-col :span="6" v-for="(challenge, _) in challenges" :key="_">
				<el-card class="box-card challenge-card" shadow="hover" @click.native="CardClick(challenge)">
					<div class="card-text">
						<p>{{challenge.title}}</p>
						<p>Score: {{challenge.score}}</p>
						<div v-show="challenge.solved" class="solve challenge-solved">Sovled: <span style="color: #00dd30;">✔</span></div>
						<div v-show="!challenge.solved" class="solve challenge-nosolved">No Sovled</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'challenge',
		methods: {
			CardClick: function(challenge) {
				console.log(challenge);
				this.$prompt(challenge.des, challenge.title, {
					confirmButtonText: '提交',
					cancelButtonText: '取消',
					center: true,
					dangerouslyUseHTMLString: true
				}).then(({
					value
				}) => {
					this.$notify({
						title: '成功',
						message: '提交flag正确',
						type: 'success'
					});
				}).catch(() => {
					this.$notify({
						type: 'info',
						title: '消息',
						message: '取消输入',
					});
				})
			}
		},
		data: () => {
			return {
				activeIndex: '1',
				challengeData: [
					[{
							"title": 'babyrop1',
							"des": "This is pwn pwn pwn.",
							"score": 500,
							"solved": true
						},
						{
							"title": 'babyrop2',
							"des": `nc nc.eonew.cn 10002<br/>
												http://file.eonew.cn/pwn_challenge/bin/no_leak<br/>
												http://file.eonew.cn/pwn_challenge/libc/libc-2.27.so<br/>`,
							"score": 500,
							"solved": false
						},
						{
							"title": 'babyrop3',
							"des": "This is pwn pwn pwn.",
							"score": 500,
							"solved": true
						},
						{
							"title": 'babyrop1',
							"des": "This is pwn pwn pwn.",
							"score": 500,
							"solved": true
						}
					],
					[{
						"title": 'babyrop2',
						"des": "This is pwn pwn pwn.",
						"score": 500,
						"solved": false
					}]
				]
			}
		}
	}
</script>

<style scoped>
	.challenge-card {
		min-height: 200px;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.challenge-card:hover {
		cursor: pointer;
	}

	.card-text {
		margin-top: 35%;
	}

	.challenge-nosolved,
	.challenge-solved,
	.solve {
		margin-top: 30px;
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
