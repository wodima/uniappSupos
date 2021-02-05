<template>
	<view>
		<page-head title="view"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-flex uni-row">
				<view class="flex-item uni-bg-red">事故处置</view>
				<view class="flex-item uni-bg-green">事故统计</view>
				<view class="flex-item uni-bg-blue">事故总结</view>
			</view>
			<view class="uni-list" v-if="false">
				<block v-for="(value, index) in listData" :key="index">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="goDetail(value)">
						<view class="uni-media-list">
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top">{{ value.title }}</view>
								<view class="uni-media-list-text-bottom">
									<text>{{ value.author_name }}</text>
									<text>{{ value.published_at }}</text>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>

			<view>
				<view class="uni-flex uni-row">
					<view class="flex-item2 uni-bg-red" @click="click1('shigu')">事故类别</view>
					<view class="flex-item2 uni-bg-green" @click="click1('shifa')">事发单位</view>
					<view class="flex-item2 uni-bg-blue" @click="click1('yuefa')">月发数量</view>
					<view class="flex-item2 uni-bg-blue" @click="click1('tongji')">改进统计</view>
				</view>
				<view v-if="flag == 'shigu'">
					<!-- 列表 -->
				</view>
				<view v-if="flag == 'shifa'">
					<!-- 列表 -->
				</view>
				<view class="qiun-charts" v-if="flag == 'yuefa'">
					<!--#ifdef MP-ALIPAY -->
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
					 :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA"
					 @touchend="touchEndLineA"></canvas>
					<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
					<!--#endif-->
					<!--#ifndef MP-ALIPAY -->
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA"
					 @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
					<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
					<!--#endif-->
				</view>{{flag == 'tongji'}}
				<view class="qiun-charts" v-if = "flag == 'tongji'">
					<!--#ifdef MP-ALIPAY -->
					<canvas canvas-id="canvasPie" id="canvasPie" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
					 :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchPie($event,'canvasPie')"></canvas>
					<!--#endif-->
					<!--#ifndef MP-ALIPAY -->
					<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie($event,'canvasPie')"></canvas>
					<!--#endif-->
				</view>
			</view>

		</view>
	</view>
</template>
<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvasObj = {};
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				flag: '',
			}
		},
		onLoad() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.cWidth2 = uni.upx2px(700);
			this.cHeight2 = uni.upx2px(1100);
			this.cWidth3 = uni.upx2px(250);
			this.cHeight3 = uni.upx2px(250);
			this.arcbarWidth = uni.upx2px(24);
			this.gaugeWidth = uni.upx2px(30);

			//this.fillData(Data);
		},
		onReady() {
			this.getServerData();
		},
		methods: {
			getServerData() {
				uni.showLoading({
					title: "正在加载数据..."
				})
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/hello-uniapp-ucharts-data.json',
					data: {},
					success: function(res) {
						_self.fillData(res.data);
					},
					fail: () => {
						_self.tips = "网络错误，小程序端请检查合法域名";
					},
					complete() {
						uni.hideLoading();
					}
				});
			},
			//数据解析
			fillData(data) {
				// this.serverData = data;
				// this.tips = data.tips;
				// this.sliderMax = data.Candle.categories.length;
				let LineA = {
					categories: [],
					series: []
				};
				let Pie = {
					series: []
				};
				LineA.categories = data.LineA.categories;
				LineA.series = data.LineA.series;
				Pie.series = data.Pie.series;
				this.showLineA("canvasLineA", LineA);
				this.showPie("canvasPie", Pie);
			},
			//折线图
			showLineA(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 5,
					},
					dataLabel: false,
					dataPointShape: false,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					enableScroll: false, //开启图表拖拽功能
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 4,
						scrollShow: true,
						scrollAlign: 'left',
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true
						gridType: 'dash',
						splitNumber: 8,
						min: 10,
						max: 180,
						format: (val) => {
							return val.toFixed(0)
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						lineStyle: 'straight'
					},
				});

			},
			// 饼状图
			showPie(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					padding: [15, 15, 2, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 2,
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: false,
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
			touchPie(e, id) {
				canvasObj[id].showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
			click1: function(e) {
				// debugger
				this.flag = e
				
			},

		},
	}
</script>

<style>
	@import "@/common/uni.css";

	.charts {
		width: 750rpx;
		height: 500rpx;
		background-color: #FFFFFF;
	}

	.flex-item {
		width: 33.3%;
		height: 140rpx;
		text-align: center;
		line-height: 140rpx;
		margin: 10rpx;
		background-color: #2a75d0;
		border-radius: 10rpx;
	}

	.flex-item2 {
		width: 33.3%;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		margin: 15rpx;
		background-color: #2a75d0;
		border-radius: 10rpx;
	}

	.flex-item-V {
		width: 100%;
		height: 150rpx;
		text-align: center;
		line-height: 150rpx;
	}

	.text {
		margin: 15rpx 10rpx;
		padding: 0 20rpx;
		background-color: #ebebeb;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #777;
		font-size: 26rpx;
	}

	.desc {
		/* text-indent: 40rpx; */
	}
</style>
