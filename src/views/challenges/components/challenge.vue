<template>
	<div id="challenge" v-loading="loading">
		<el-row :gutter="20" class="challenge-row" justify="space-around" v-for="(challenges, _) in challengeData" :key="_">
			<el-col :span="6" v-for="(challenge, i) in challenges" :key="i" class="challenge-col">
				<challenge-card :data="challenge" :key="i" v-on:delete="DelCard"></challenge-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {
		GetChallenges,
		DelChallenge
	} from '@/api/api.js'

	import ChallengeCard from './ChallengeCard'

	export default {
		components: {
			ChallengeCard: ChallengeCard
		},

		name: 'challenge',
		props: [
			'type'
		],
		methods: {
			InitData: async function() {
				// Init challenge
				try {
					this.loading = true;
					this.challengeData = [];
					let rsp = await GetChallenges(this, this.type, this.$store.state.token);
					let data = rsp.data.challenges;
					let idx = 0;
					while (idx < data.length) {
						this.challengeData.push(data.slice(idx, idx += 4));
					}
				} catch (e) {
					//TODO handle the exception
					this.$message({
						type: 'error',
						message: '获取数据失败,请检查网络!'
					});
				} finally {
					setTimeout(() => {
						this.loading = false;
					}, 500)
				}
			},
			DelCard: function(challenge) {
				// Del challenge
				this.$confirm('此操作不可逆，确定要删除:' + challenge.title, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let rsp = await DelChallenge(this, challenge.cid);
					if (rsp.data.code == 200) {
						this.$message({
							type: 'warning',
							message: '已删除:' + challenge.title
						});
						this.InitData(this.challengeData);
					} else {
						this.$message({
							type: 'error',
							message: '删除失败'
						});
					}
				})
			}
		},
		created: function() {
			this.InitData();
		},
		computed: {
			token: function() {
				return this.$store.state.token;
			}
		},
		watch: {
			type: function(val) {
				// 实时切换web
				this.InitData()
			},
			token: function() {
				this.InitData();
			}
		},
		data: () => {
			return {
				loading: true,
				activeIndex: '1',
				challengeData: []
			}
		}
	}
</script>

<style scoped>
</style>
