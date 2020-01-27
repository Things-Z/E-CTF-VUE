<template>
	<div class="ScoreCard">
		<div class="container" v-if="reload">
			<h1 style="text-align: center; color: #409EFF;">计分板</h1>
			<el-divider content-position="right">
				<el-popover placement="top-start" width="150" trigger="hover">
					<div><i class="el-icon-refresh" style="color: #67C23A;"></i><span style="margin-left: 5px;">手动更新数据。</span></div>
					<el-button slot="reference" type="success" size="mini" icon="el-icon-refresh" circle autofocus @click="InitData"></el-button>
				</el-popover>
			</el-divider>
			<el-table v-loading="loading" :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
				style="width: 100%" :default-sort="{prop: 'rank', order: 'ascending'}">
				<el-table-column align='center' prop="rank" label="排名" sortable>
				</el-table-column>
				<el-table-column align='center' prop="name" label="ID">
				</el-table-column>
				<el-table-column align='center' prop="solved" label="解题数" sortable>
				</el-table-column>
				<el-table-column align='center' prop="score" label="分数" sortable>
				</el-table-column>
				<el-table-column align="right">
					<template slot="header" slot-scope="scope">
						<el-input prefix-icon="el-icon-search" v-model="search" size="mini" placeholder="输入ID搜索" v-on:clear="ResoleScope(scope)" />
					</template>
					<template slot-scope="scope">
						<el-button @click.native.prevent="CheckRow(scope.$index, tableData)" type="text" size="small">
							查看
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import {
		GetScoreCardData
	} from '@/api/api.js'

	export default {
		name: "ScoreCard",
		data() {
			return {
				loading: false,
				reload: true,
				tableData: [],
				search: ''
			}
		},
		methods: {
			ResoleScope: function(scope) {
				window.console.log(scope);
			},
			CheckRow: function(idx, data) {
				console.log(idx, data);
			},
			InitData: async function() {
				try {
					this.loading = true;
					let rsp = await GetScoreCardData(this);
					if (rsp.data.code === 200) {
						this.tableData = rsp.data.data;
						this.$message({
							type: 'success',
							message: '获取数据成功!'
						});
						this.ReloadSelf();
					} else {
						this.$message({
							type: 'warnning',
							message: '获取数据故障!'
						});
					}

				} catch (e) {
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
			ReloadSelf: function() {
				this.reload = false;
				this.$nextTick(() => {
					this.reload = true
				})
			}
		},
		created: function() {
			this.InitData()
		},
		watch: {
			$route: function(to, from) {
				if (to.path == '/scoreCard') {
					//重新渲染子组件
					this.InitData();
				}
			}
		}
	}
</script>

<style scoped>
	.container {
		margin: 0 auto;
		max-width: 85%;
	}
</style>
