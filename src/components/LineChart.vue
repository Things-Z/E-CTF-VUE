<template>
	<div class="chart" :style="{height:height,width:width}" />
</template>

<script>
	import echarts from 'echarts'
	import { formatDate } from '@/utils/tools.js'
	
	require('echarts/theme/macarons') // echarts theme

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
				default: '350px'
			},
			autoResize: {
				type: Boolean,
				default: true
			},
			chartData: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				chart: null
			}
		},
		watch: {
			chartData: {
				deep: true,
				handler(val) {
					this.setOptions(val)
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initChart()
			})
		},
		beforeDestroy() {
			if (!this.chart) {
				return
			}
			this.chart.dispose()
			this.chart = null
		},
		methods: {
			CreateSerie: function(name, data) {
				return {
					name: name,
					smooth: true,
					type: 'line',
					itemStyle: {
						normal: {
							lineStyle: {
								width: 2
							},
						}
					},
					data: data,
					animationDuration: 3000,
					animationEasing: 'cubicInOut'
				};
			},

			initChart() {
				this.chart = echarts.init(this.$el, 'macarons')
				this.setOptions(this.chartData);
			},
			setOptions(data) {
				let legendData = Object.keys(data);
				
				let series = [];
				//时间戳转换
				for (let idx in legendData) {
					series.push(this.CreateSerie(legendData[idx], data[legendData[idx]]));
				}

				this.chart.setOption({
					xAxis: {
						type:'time',
						boundaryGap: false,
						axisTick: {
							show: false
						}
					},
					dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
						type: 'inside', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
						start: 0, 
						end: 100 //全部展示
					}],
					grid: {
						left: 10,
						right: 10,
						bottom: 20,
						top: 30,
						containLabel: true
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						},
						padding: [5, 10]
					},
					yAxis: {
						axisTick: {
							show: false
						}
					},
					legend: {
						data: legendData
					},
					series: series
				})
			}
		}
	}
</script>

<style>
	.chart{
		min-width: 100%;
	}
	
</style>