<template>
	<div id="index">
		<div class="block">
			<div class="container">
				<el-timeline>
					<el-timeline-item timestamp="2018/4/12" placement="top" :color="nodeColor">
						<el-card>
							<div slot="header" class="clearfix">
								<span>公告</span>
							</div>
							<h4>更新 题目</h4>
							<p>admin 2018/4/12 20:46</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item timestamp="2018/4/12" placement="top" :color="nodeColor">
						<el-card>
							<div slot="header" class="clearfix">
								<span>公告</span>
							</div>
							<h4>更新 题目</h4>
							<p>admin 2018/4/11 20:46</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item timestamp="2018/4/12" placement="top" :color="nodeColor">
						<el-card>
							<div slot="header" class="clearfix">
								<span>公告</span>
							</div>
							<h4>更新 题目</h4>
							<p>admin 2018/4/13 20:46</p>
						</el-card>
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'index',
		data:() => {
			return {
				nodeColor: "#409EFF"
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.container{
		margin:0 auto;
		max-width: 45%;
	}
</style>
