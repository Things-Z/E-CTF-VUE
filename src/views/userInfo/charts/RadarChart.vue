<template>
	<div :class="className" :style="{height:height,width:width}" />
</template>

<script>
	import echarts from 'echarts'
	require('echarts/theme/macarons') // echarts theme

	const animationDuration = 6000;

	const defaultData = {
		indicator: [{
				name: 'Android',
				max: 9,
			},
			{
				name: 'Crypto',
				max: 3,
			},
			{
				name: 'Misc',
				max: 6,
			},
			{
				name: 'Pwn',
				max: 12,
			},
			{
				name: 'Reverse',
				max: 8,
			},
			{
				name: 'Web',
				max: 7,
			},
		],
		value: [5, 1, 2, 8, 4, 5]
	}

	export default {
		// mixins: [resize],
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
			RadarData: {
				type: Object,
				default: function() {
					return defaultData
				}
			}
		},
		data: function() {
			return {
				chart: null
			}
		},
		mounted: function() {
			this.$nextTick(() => {
				this.initChart()
			})
		},
		beforeDestroy: function() {
			if (!this.chart) {
				return
			}
			this.chart.dispose()
			this.chart = null
		},
		computed: {
			data: function() {
				return this.RadarData;
			},
		},
		watch: {
			data: function() {
				this.setOptions(this.data);
			}
		},

		methods: {
			initChart: function() {
				this.chart = echarts.init(this.$el, 'macarons')
				// this.setOptions(this.data)
			},
			setOptions: function(data) {
				this.chart.setOption({
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					radar: {
						radius: '66%',
						center: ['50%', '42%'],
						splitNumber: 8,
						splitArea: {
							areaStyle: {
								color: 'rgba(127,95,132,.3)',
								opacity: 1,
								shadowBlur: 45,
								shadowColor: 'rgba(0,0,0,.5)',
								shadowOffsetX: 0,
								shadowOffsetY: 15
							}
						},
						indicator: data.indicator
					},
					legend: {
						left: 'center',
						bottom: '10',
						data: ['能力分布雷达']
					},
					series: [{
						type: 'radar',
						symbolSize: 0,
						areaStyle: {
							normal: {
								shadowBlur: 13,
								shadowColor: 'rgba(0,0,0,.2)',
								shadowOffsetX: 0,
								shadowOffsetY: 10,
								opacity: 1
							}
						},
						color:"#409EFF",
						data: [{
							value: data.value,
							name: '能力分布雷达'
						}],
						animationDuration: animationDuration
					}]
				})
			}

		}
	}
</script>
