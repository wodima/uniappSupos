<template>
	<view>
		<!-- 设置圆角 -->
		<view class="uni-flex">
			<text class="flex-item" @click="onclick('YM')">园区月度\n蒸汽消耗</text>
			<text class="flex-item" @click="onclick('YD')">园区每日\n蒸汽消耗</text>
			<text class="flex-item" @click="onclick('CM')">企业月度\n蒸汽消耗占比</text>
			<text class="flex-item" @click="onclick('CD')">企业月度\n蒸汽消耗</text>
		</view>
		<view v-if="flag == 'CM'">

			<view class="viewtitle">
				<image class="image" @click="left" src="../../static/arrow-left.png"></image>
				<view>{{year}}年{{month}}月</view>
				<image class="image" @click="right" src="../../static/arrow-right.png"></image>
			</view>
			<!-- 饼状图 -->
			<view class="qiun-columns">
				<!--#ifdef MP-ALIPAY -->
				<canvas canvas-id="canvasPie" id="canvasPie" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
				 :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchPie"></canvas>
				<!--#endif-->
				<!--#ifndef MP-ALIPAY -->
				<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
				<!--#endif-->
			</view>
		</view>

		<view class="qiun-charts" v-if="flag == 'YM'|flag == 'YD'">
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
			 :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchColumn"></canvas>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
			<!--#endif-->
		</view>
	</view>
</template>

<script>
	import {
		getInfo
	} from "../../api/assist.js"
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaPie = null;
	var canvaColumn = null;
	export default {
		data() {
			return {
				dataList: [],
				flag: "YM",
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,

				year: 0,
				month: 0,

				chartData: {
					"series": [{
						"name": "一班",
						"data": 50
					}, {
						"name": "二班",
						"data": 30
					}, {
						"name": "三班",
						"data": 20
					}, {
						"name": "四班",
						"data": 18
					}, {
						"name": "五班",
						"data": 8
					}]
				},
				columnData:{
					"categories": ["2013", "2014", "2015", "2016", "2017", "2018"],
					"series": [{
						"name": "",
						"data": [35, 36, 31, 33, 13, 34]
					}]
				},
				columnData2:{
					"categories": ["1月", "2月", "3月", "4月", "5月", "6月"],
					"series": [{
						"name": "",
						"data": [35, 36, 31, 33, 13, 34]
					}]
				}
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);

			let nowData = new Date();
			this.year = nowData.getFullYear()
			this.month = nowData.getMonth() + 1
			_self.showColumn('canvasColumn', _self.columnData)
		},
		methods: {
			onclick(res) {
				this.flag = res
				if (this.flag == 'CM') {
					_self.showPie('canvasPie', _self.chartData)
				} else if (this.flag == 'YM') {
					_self.showColumn('canvasColumn', _self.columnData)
				}else if(this.flag == 'YD'){
					_self.showColumn('canvasColumn', _self.columnData2)
				}
			},
			left() {
				this.month--
				if (this.month < 1) {
					this.year--
					this.month = 12
				}
			},
			//搜索
			right() {
				this.month++
				if (this.month > 12) {
					this.year++
					this.month = 1
				}
			},
			//圆饼图
			showPie(canvasId, chartData) {
				canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					legend: {
						show: true
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							lableWidth: 15
						}
					},
				});
			},
			touchPie(e) {
				canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
			//柱	形图
			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					padding: [15, 5, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 0,
					},
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						data: [{
							position: 'left',
							axisLine: false,
							format: (val) => {
								return val.toFixed(0) + '吨'
							},
						}]
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
						}
					}
				});

			},
			touchColumn(e) {
				canvaColumn.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value
						} else {
							return category + ' ' + item.name + ':' + item.data
						}
					}
				});
				canvaColumn.touchLegend(e, {
					animation: true
				});
			},
		}
	}
</script>

<style>
	.uni-flex {
		display: flex;
	}

	.flex-item {
		width: 25%;
		height: 150rpx;
		display: flex;
		text-align: center;
		justify-content: center;
		margin: 10rpx;
		align-items: center;
		font-size: 24rpx;
		color: #FFFFFF;
		background-color: #007AFF;
		border-radius: 10rpx;
	}

	.listcontent {
		width: 100%;
		display: flex;

	}

	.textcontent {
		text-align: left;
	}

	.texttitle {
		font-size: 26rpx;
		font-weight: bold;
		color: #000000;
	}

	.text {
		font-size: 24rpx;
		color: #000000;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.viewtitle {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;

	}

	.image {
		width: 40rpx;
		height: 70rpx;
		padding-left: 30rpx;
		padding-right: 10rpx;
	}
</style>
