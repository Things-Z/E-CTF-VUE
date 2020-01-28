<template>
	<div id="app-main">
		<!-- <el-button @click="Click"></el-button> -->
		<transition name="el-fade-in-linear" mode="out-in">
			<keep-alive>
				<router-view :key="key" />
			</keep-alive>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'AppMain',
		computed: {
			key() {
				return this.$route.path
			}
		},
		methods:{
			Click: function(){
				console.log(this.$route);
			}
		}
		
	}
</script>

<style scoped>

</style>
