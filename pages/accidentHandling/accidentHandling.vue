<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-flex uni-row">
				<view class="flex-item uni-bg-red" @click="click2('chuzhi')">事故处置</view>
				<view class="flex-item uni-bg-green" @click="click3('shigu')">事故统计</view>
				<view class="flex-item uni-bg-blue" @click="click4('zongjie')">事故总结</view>
			</view>
			<mescroll-body v-if="flag2" ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
				<view class="news-li" v-for="(news,index) in dataList" :key="index">
					<!-- 一般用法 -->
					<uni-card :is-shadow="true" class="uni-flex uni-row">
						<view class="listcontent">
							<view class="textcontent">
								<view>
									<text class="text">{{news.time}}</text>
								</view>
								<view>
									<text class="text">{{news.name}}</text>
								</view>
								<view>
									<text class="texttitle">事故等级：</text>
									<text class="text">{{news.name}}</text>
								</view>
								<view>
									<text class="texttitle">事故类型：</text>
									<text class="text">{{news.name}}</text>
								</view>
								<view>
									<text class="texttitle">事故地点：</text>
									<text class="text">{{news.name}}</text>
								</view>
							</view>
						</view>
                       <view >
                       	 <button type="primary" class="botton">处置</button>
                       </view>
					</uni-card>
				</view>
			</mescroll-body>
			<view v-if="flag3">
				<view class="uni-flex uni-row">
					<view class="flex-item2 uni-bg-red" @click="click1('leibie')">事故类别</view>
					<view class="flex-item2 uni-bg-green" @click="click1('shifa')">事发单位</view>
					<view class="flex-item2 uni-bg-blue" @click="click1('yuefa')">月发数量</view>
					<view class="flex-item2 uni-bg-blue" @click="click1('tongji')">改进统计</view>
				</view>
				<view v-if="flag5">
					<!-- 列表 -->
					<text>事故类别</text>
				</view>
				<view v-if="flag6">
					<!-- 列表 -->
					<text>事发单位</text>
				</view>
				<view class="qiun-charts" v-if="flag7">
					<!--#ifdef MP-ALIPAY -->
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
					 :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchPie($event,'canvasLineA')"></canvas>
					<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
					<!--#endif-->
					<!--#ifndef MP-ALIPAY -->
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchPie($event,'canvasLineA')"></canvas>
					<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
					<!--#endif-->
				</view>
				<view class="qiun-charts" v-if="flag8">
					<!--#ifdef MP-ALIPAY -->
					<canvas canvas-id="canvasPie" id="canvasPie" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
					 :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchPie($event,'canvasPie')"></canvas>
					<!--#endif-->
					<!--#ifndef MP-ALIPAY -->
					<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie($event,'canvasPie')"></canvas>
					<!--#endif-->
				</view>
			</view>
		    <view v-if="flag4">
				<text>事故总结</text>
			</view>
		</view>
	</view>
</template>
<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	//导入网络请>>>>>>>需要加大括号
	import {
		getInfo
	} from "../../api/accidentHandling.js"
	var _self;
	var canvasObj = {};
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				flag: '',
				flag2: '',
				flag3: '',
				flag4: '',
				flag5: '',
				flag6: '',
				flag7: '',
				flag8: '',
				downOption: {
					auto: false
				}, //是否在初始化后,自动执行downCallback; 默认true
				dataList: []
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
		// onReady() {
			
		// 	debugger
		// },
		methods: {
			getServerData(type1) {
				uni.showLoading({
					title: "正在加载数据..."
				})
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/hello-uniapp-ucharts-data.json',
					data: {},
					success: function(res) {
						_self.fillData(res.data,type1);
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
			fillData(data,type1) {
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
				// debugger
				if(type1 == 1){
					this.showLineA("canvasLineA", LineA);
				}else{
					this.showPie("canvasPie", Pie);
				}
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
				switch(e){
					case 'leibie':
					this.flag5 = true
					this.flag6 = false
					this.flag7 = false
					this.flag8 = false
					break
					case 'shifa':
					this.flag5 = false
					this.flag6 = true
					this.flag7 = false
					this.flag8 = false
					break
					case 'yuefa':
					this.flag5 = false
					this.flag6 = false
					this.flag7 = true
					this.flag8 = false
					this.getServerData(1);
					break
					case 'tongji':
					this.flag5 = false
					this.flag6 = false
					this.flag7 = false
					this.flag8 = true
					this.getServerData(2);
					break
					}
			},
			click2: function(e) {
				this.flag2 = true
				this.flag3 = false
				this.flag4 = false
				console.log(e)
			},
			click3: function(e) {
				this.flag3 = true
				this.flag4 = false
				this.flag2 = false
				console.log(e)
			},
			click4: function(e) {
				this.flag4 = true
				this.flag2 = false
				this.flag3 = false
				console.log(e)
			},
			downCallback() {
				//联网加载数据
				getInfo({
						ID: Date.now()
					}, {})
					.then(res => {
						this.mescroll.endSuccess();
						//设置列表数据
						this.dataList.unshift(res.data.data);
					})
					.catch(err => {
						//联网失败的回调,隐藏下拉刷新的状态
						this.mescroll.endErr();
					});
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				getInfo({
						ID: Date.now()
					}, {
						pages: page.num,
						size: page.size
					})
					.then(curPageData => {
						console.log(curPageData.data.data);
						//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
						//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;

						//方法一(推荐): 后台接口有返回列表的总页数 totalPage
						//this.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

						//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
						//this.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

						//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
						//this.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

						//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据.
						this.mescroll.endSuccess(curPageData.length);

						//设置列表数据
						this.dataList = this.dataList.concat(curPageData.data.data);
					})
					.catch(err => {
						//联网失败, 结束加载
						this.mescroll.endErr();
					})
			},
		},
	};
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

    .botton{
		width: 120rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 30rpx;
		font-size: 26rpx
	}
	.desc {
		/* text-indent: 40rpx; */
	}
</style>
