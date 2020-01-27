<template>
	<div id="about">
		<div class="container">
			<h1 style="text-align: center; color: #409EFF;">关于</h1>
			<el-divider content-position="right">
				<p style="color: #8F8F8F;">E-CTF简介</p>
			</el-divider>
			<div class="about">
				<p>E-CTF,简约风格的CTF靶场面板。</p>
				<p>前端面板使用VUE+element-UI打造，操作简单，界面友好，互动性强。</p>
				<p>目前还在更新。。。</p>
				<p>QQ: 3303476267@qq.com</p>
				<p>github:<a href="https://github.com/RGDZ-GZU/E-CTF-VUE.git">https://github.com/RGDZ-GZU/E-CTF-VUE.git</a></p>
				<p style="float: right;">RGDZ 编辑于: 2020/1/27 17:10</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'about'
	}
</script>

<style>
	.container {
		margin: 0 auto;
		max-width: 45%;
	}
	.about{
		text-indent:35px
	}
</style>
