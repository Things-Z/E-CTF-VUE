<template>
	<div id="usr-info">
		<el-card class="box-card user-card" :body-style="{ padding: '0px' }" shadow="hover">
			<div class="padding"><el-avatar :size="100" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar></div>
			<div class="padding"><span>Admin</span></div>
			<span>总积分: {{score}}分</span>
			<div class="padding">
				<el-divider content-position="left">各项能力值</el-divider>
				</div>
			<div class="padding">
				<span slot="label"><i class="el-icon-mobile-phone" style="margin-right: 2px;"/>Android</span>
				<el-progress :percentage="37.5" color="#67c23a"></el-progress>
			</div>
			<div class="padding">
				<span slot="label"><i class="el-icon-key" style="margin-right: 2px;"/>Crypto</span>
				<el-progress :percentage="50" color="#409eff"></el-progress>
			</div>
			<div class="padding">
				<span slot="label"><i class="el-icon-connection" style="margin-right: 2px;"/>Misc</span>
				<el-progress :percentage="15" color="#f56c6c"></el-progress>
			</div>
			<div class="padding">
				<span slot="label"><i class="el-icon-cpu" style="margin-right: 2px;"/>Pwn</span>
				<el-progress :percentage="80" color="#6f7ad3"></el-progress>
			</div>
			<div class="padding">
				<span slot="label"><i class="el-icon-refresh" style="margin-right: 2px;"/>Reverse</span>
				<el-progress :percentage="66" color="#e6a23c"></el-progress>
			</div>
			<div class="padding">
				<span slot="label"><i class="el-icon-position" style="margin-right: 2px;"/>Web</span>
				<el-progress :percentage="40" color="#5cb87a"></el-progress>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: 'UserInfo',
		data:() => {
			return {
				score: 1700
			}
		}
	}
</script>

<style scoped>
	.user-card{
		margin: 10px;
	}
	
	.padding{
		padding: 10px;
	}
</style>
