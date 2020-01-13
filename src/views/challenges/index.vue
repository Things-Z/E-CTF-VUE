<template>
	<div id="challenges">
		<el-container>
			<el-main style="height: auto;">
				<el-tabs tab-position="left" style="margin-left: 10%; margin-right 10%; height: 100%;"
					@tab-click="handleClick">
					<el-tab-pane in="android">
						<span slot="label"><i class="el-icon-mobile-phone" style="margin-right: 2px;"/>Android</span>
					</el-tab-pane>
					<el-tab-pane id="crypto">
						<span slot="label"><i class="el-icon-key" style="margin-right: 2px;"/>Crypto</span>
					</el-tab-pane>
					<el-tab-pane id="misc">
						<span slot="label"><i class="el-icon-connection" style="margin-right: 2px;"/>Misc</span>
					</el-tab-pane>
					<el-tab-pane id="pwn">
						<span slot="label"><i class="el-icon-cpu" style="margin-right: 2px;"/>Pwn</span>
					</el-tab-pane>
					<el-tab-pane id="reverse">
						<span slot="label"><i class="el-icon-refresh" style="margin-right: 2px;"/>Reverse</span>
					</el-tab-pane>
					<el-tab-pane id="web">
						<span slot="label"><i class="el-icon-position" style="margin-right: 2px;"/>Web</span>
					</el-tab-pane>
					<div>{{info}}</div>
					<el-divider></el-divider>
					<challenge></challenge>
				</el-tabs>
			</el-main>
			<el-aside width="25%">
				<user-info></user-info>
			</el-aside>
		</el-container>
	</div>
</template>

<script>
	import UserInfo from './components/userInfo'
	import Challenge from './components/challenge'
	
	const challenges = ['Android', 'Crypto', 'Misc', 'Pwn', 'Reverse', 'Web'];
	
	export default {
		components:{
			UserInfo: UserInfo,
			Challenge: Challenge
		},
		name: "challenges",
		data: () => {
			return {
				challenges:challenges,
				info:challenges[0]
			}
		},
		methods:{
			handleClick: function(tab, event){
				this.$data.info = challenges[tab.index];
			}
		}
	}
</script>

<style scoped>
	.el-aside {
/* 		background-color: #D3DCE6;
		color: #333; */
		text-align: center;
/* 		line-height: 200px; */
	}

	.el-main {
/* 		background-color: #E9EEF3;
		color: #333; */
		text-align: center;
/* 		line-height: 160px; */
	}
</style>
