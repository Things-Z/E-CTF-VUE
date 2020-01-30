<template>
	<div :class="className" :style="{height:height,width:width}" />
</template>

<script>
	import echarts from 'echarts'
	require('echarts/theme/macarons') // echarts theme

	const animationDuration = 6000

	const defaultData = {
		Android: 900,
		Crypto: 300,
		Misc: 600,
		Pwn: 1200,
		Reverse: 800,
		Web: 700,
	}

	export default {
		props: {
			className: {
				type: String,
				default: 'chart'
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '300px'
			},
			BarData: {
				type: Object,
				default: function() {
					return defaultData
				}
			}
		},
		
		data: function() {
			return {
				
			}
		},
		mounted: function() {
			this.$nextTick(() => {
				this.initChart()
			})
		},
		beforeDestroy: function() {
			this.chart.dispose();
			this.chart = null;
		},
		
		computed:{
			data: function(){
				return this.BarData;
			}
		},
		watch: {
			data: function() {
				this.setOptions(this.data);
			}
		},

		methods: {
			initChart: function() {
				this.chart = echarts.init(this.$el, 'macarons');
				if (this.data === {}) {
					this.data = defaultData;
				}
				this.setOptions(this.data);
			},
			setOptions: function(data) {
				this.chart.setOption({
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						left: 'center',
						data: ['分数统计']
					},
					grid: {
						top: 25,
						left: '2',
						right: '2',
						bottom: 3,
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: Object.keys(data),
						axisTick: {
							alignWithLabel: true
						}
					}],
					yAxis: [{
						type: 'value',
						axisTick: {
							show: false
						}
					}],
					series: [{
						"name": '分数统计',
						type: 'bar',
						stack: 'vistors',
						barWidth: '60%',
						data: Object.values(data),
						color: "#b39fdb",
						animationDuration
					}, ]
				})
			}
		}
	}
</script>
