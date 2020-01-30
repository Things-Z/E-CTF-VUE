<template>
	<div id="UserInfo">
		<div class="container">
			<h1 style="text-align: center; color: #409EFF;">用户详情</h1>
			<el-divider content-position="right">
				<el-popover placement="top-start" width="150" trigger="hover">
					<div><i class="el-icon-refresh" style="color: #67C23A;"></i><span style="margin-left: 5px;">手动更新数据。</span></div>
					<el-button slot="reference" type="success" size="mini" icon="el-icon-refresh" circle autofocus @click="InitData"></el-button>
				</el-popover>
			</el-divider>
			<div class="id-card" v-if="reload">
				ID:<span style="margin-left: 32px;">{{userInfo.name}}</span>
			</div>
			<el-row type="flex" justify="center" class="count-panel-text" :gutter="32" v-if="reload">
				<el-col style="text-align: right">Score:</el-col>
				<el-col>
					<count-to separator="" :start-val="0" :end-val="userInfo.score" :duration="3000" />
				</el-col>
			</el-row>
		</div>

		<el-row :gutter="32" type="flex" justify="center" v-if="reload">
			<el-col :xs="24" :sm="24" :lg="8">
				<div class="chart-wrapper">
					<radar-chart :radar-data='radarData'></radar-chart>
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="8">
				<div class="chart-wrapper">
					<bar-chart :bar-data="barData"></bar-chart>
				</div>
			</el-col>
		</el-row>
		
		<el-row style="padding:16px 16px 0;margin:32px auto; max-width: 80%;">
			<line-chart :chart-data="lineData"></line-chart>
		</el-row>
		
	</div>
</template>

<script>
	import {
		GetUserInfo
	} from '@/api/api.js'

	import CountTo from 'vue-count-to'

	import LineChart from '../../components/LineChart'
	import RadarChart from './charts/RadarChart'
	import BarChart from './charts/BarChart'

	export default {
		components: {
			CountTo: CountTo,
			LineChart: LineChart,
			RadarChart: RadarChart,
			BarChart: BarChart
		},

		name: 'UserInfo',
		data: function() {
			return {
				uid: '',
				userInfo: {},
				radarData: {},
				barData: {},
				lineData: {},
				reload:true,
			}
		},
		methods: {
			InitData: async function() {
				let rsp = await GetUserInfo(this, this.uid);
				this.userInfo = rsp.data.userInfo;
				this.barData = this.userInfo.scoreData;
				let value = [];
				let indicator = [];
				for (let idx in this.userInfo.solvedStatic) {
					value.push(this.userInfo.solvedStatic[idx].solveds);
					indicator.push({
						name: idx,
						max: this.userInfo.solvedStatic[idx].total
					})
				}
				this.radarData = {
					value: value,
					indicator: indicator
				};
				this.lineData = this.userInfo.scoreDFS;
				this.ReloadSelf;
			},
		},
		
		ReloadSelf: function() {
			this.reload = false;
			this.$nextTick(() => {
				this.reload = true
			})
		},
		
		created: function() {
			if (!this.uid) {
				this.uid = this.$route.query.uid;
			}
		},
		watch: {
			$route: function(to, from) {
				if (to.path == '/userInfo') {
					//重新渲染子组件
					this.uid = to.query.uid;
					this.InitData();
				}
			},
			uid: function() {
				this.InitData();
			}
		},
	}
</script>

<style scoped>
	.container {
		margin: 0 auto;
		max-width: 65%;
	}

	.id-card,
	.count-panel-text {
		color: coral;
		font-size: 32px;
		font-family: 'Pacifico'
	}

	.id-card {
		text-align: center;
		color: #66B1FF;
	}

	.chart-wrapper {
		background: #fff;
		padding: 16px 16px 0;
		margin-bottom: 32px;
	}
</style>
