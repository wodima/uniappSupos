<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-flex uni-row">
				<view class="flex-item uni-bg-red" @click="click2('chuzhi')">事故处置</view>
				<view class="flex-item uni-bg-green" @click="click3('shigu')">事故统计</view>
				<view class="flex-item uni-bg-blue" @click="click4('zongjie')">事故总结</view>
			</view>
			<mescroll-body v-if="flag2" ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback"
				@up="upCallback">
				<view class="news-li" v-for="(news,index) in dataList" :key="index">
					<!-- 一般用法 -->
					<uni-card :is-shadow="true">
						<view class="listcontent uni-flex uni-row view-style"
							style="-webkit-justify-content: space-between;justify-content: space-between;">
							<view class="textcontent">
								<view>
									<text class="text">{{news.accidentTime}}</text>
								</view>
								<view>
									<text class="text">{{news.accidentName}}</text>
								</view>
								<view>
									<text class="texttitle">事故等级：</text>
									<text class="text">{{news.accidentDegree}}</text>
								</view>
								<view>
									<text class="texttitle">事故类型：</text>
									<text class="text">{{news.accidentType}}</text>
								</view>
								<view>
									<text class="texttitle">事故地点：</text>
									<text class="text">{{news.accidentUnit}}</text>
								</view>
							</view>
							<view class="buttom-style2">
								<router-link :to="{path:'./../accidentHandling/accidentHandlingDetail',query:{id:1}}">
									<button type="primary" class="botton">处置</button>
								</router-link>
							</view>
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
					<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback"
						@up="upCallback">
						<view class="news-li" v-for="(news,index) in dataListType" :key="index">
							<!-- 一般用法 -->
							<uni-card :is-shadow="true">
								<view class="listcontent uni-flex uni-row view-style"
									style="-webkit-justify-content: space-between;justify-content: space-between;">
									<view class="textcontent">
										<view>
											<text class="texttitle">序号：</text>
											<text class="text">{{news.id}}</text>
										</view>
										<view>
											<text class="texttitle">事件类别：</text>
											<text class="text">{{news.accidentType}}</text>
										</view>
										<view>
											<text class="texttitle">数量：</text>
											<text class="text">{{news.number}}</text>
										</view>
									</view>
									<view class="buttom-style" v-if="false">
										<router-link
											:to="{path:'./../accidentHandling/accidentSummaryDetails',query:{id:1}}">
											<image class="img-style" src="../../static/arrow-right.png" href=""></image>
										</router-link>

									</view>
								</view>

							</uni-card>
						</view>
					</mescroll-body>
				</view>
				<view v-if="flag6">
					<!-- 列表 -->
					<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback"
						@up="upCallback">
						<view class="news-li" v-for="(news,index) in dataListType" :key="index">
							<!-- 一般用法 -->
							<uni-card :is-shadow="true">
								<view class="listcontent uni-flex uni-row view-style"
									style="-webkit-justify-content: space-between;justify-content: space-between;">
									<view class="textcontent">
										<view>
											<text class="texttitle">序号：</text>
											<text class="text">{{news.id}}</text>
										</view>
										<view>
											<text class="texttitle">事件类别：</text>
											<text class="text">{{news.accidentUnit}}</text>
										</view>
										<view>
											<text class="texttitle">数量：</text>
											<text class="text">{{news.number}}</text>
										</view>
									</view>
									<view class="buttom-style">
										<router-link
											:to="{path:'./../accidentHandling/accidentSummaryDetails',query:{id:1}}">
											<image class="img-style" src="../../static/arrow-right.png"></image>
										</router-link>
									</view>
								</view>

							</uni-card>
						</view>
					</mescroll-body>
				</view>
				<view class="qiun-charts" v-if="flag7">
					<!--#ifdef MP-ALIPAY -->
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :width="cWidth*pixelRatio"
						:height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}"
						@touchstart="touchPie($event,'canvasLineA')"></canvas>
					<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
					<!--#endif-->
					<!--#ifndef MP-ALIPAY -->
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts"
						@touchstart="touchPie($event,'canvasLineA')"></canvas>
					<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
					<!--#endif-->
				</view>
				<view class="qiun-charts" v-if="flag8">
					<!--#ifdef MP-ALIPAY -->
					<canvas canvas-id="canvasPie" id="canvasPie" class="charts" :width="cWidth*pixelRatio"
						:height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}"
						@touchstart="touchPie($event,'canvasPie')"></canvas>
					<!--#endif-->
					<!--#ifndef MP-ALIPAY -->
					<canvas canvas-id="canvasPie" id="canvasPie" class="charts"
						@touchstart="touchPie($event,'canvasPie')"></canvas>
					<!--#endif-->
				</view>
			</view>
			<view v-if="flag4">
				<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback"
					@up="upCallback">
					<view class="news-li" v-for="(news,index) in dataList" :key="index">
						<!-- 一般用法 -->
						<uni-card :is-shadow="true">
							<view class="listcontent uni-flex uni-row view-style"
								style="-webkit-justify-content: space-between;justify-content: space-between;">
								<view class="textcontent">
									<view>
										<text class="text">{{news.occurrenceTime}}</text>
									</view>
									<view>
										<text class="text">{{news.accidentName}}</text>
									</view>
									<view>
										<text class="texttitle">事故单位：</text>
										<text class="text">{{news.accidentUnit}}</text>
									</view>
								</view>
								<view class="buttom-style">
									<router-link :to="{path:'./../accidentHandling/accidentSummaryDetails',query:{dtl: news}}">
										<image class="img-style" src="../../static/arrow-right.png"></image>
									</router-link>
								</view>
							</view>

						</uni-card>
					</view>
				</mescroll-body>
			</view>
		</view>
	</view>
</template>
<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	//导入网络请>>>>>>>需要加大括号
	// import {
	// 	getInfo
	// } from "../../api/accidentHandling.js"
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
				flag2: 'chuzhi',
				flag3: '',
				flag4: '',
				flag5: '',
				flag6: '',
				flag7: '',
				flag8: '',
				downOption: {
					auto: false
				}, //是否在初始化后,自动执行downCallback; 默认true
				dataList: [],
				dataListType: [], //事故类别

				token: ''
			}
		},
		onLoad() {
			this.getManage() //获取事故处置信息
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
		methods: {
			getServerData(type1) {
				uni.showLoading({
					title: "正在加载数据..."
				})
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/hello-uniapp-ucharts-data.json',
					data: {},
					success: function(res) {
						_self.fillData(res.data, type1);
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
			fillData(data, type1) {
				// this.serverData = data;
				// this.tips = data.tips;
				// this.sliderMax = data.Candle.categories.length;
				let LineA = {
					categories: [],
					series: [{
						name: "数量",
						data: [],
						color: '#409eff'
					}]
				};
				let Pie = {
					series: []
				};
				if (type1 == 1) {
					for (let i = 0; i < data.result.length; i++) {
						LineA.categories.push(data.result[i].time)
						LineA.series[0].data.push(data.result[i].num)
					}
				} else {
					for (let i = 0; i < data.result.list.length; i++) {
						Pie.series.push({
							name: data.result.list[i].improvementStatus,
							data: data.result.list[i].number
						})
					}
					console.log(Pie.series)
				}

				// LineA.categories = data.LineA.categories;
				// LineA.series = data.LineA.series;
				// Pie.series = data.Pie.series;
				console.log(LineA)
				if (type1 == 1) {
					this.showLineA("canvasLineA", LineA);
				} else {
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
						scrollBackgroundColor: '#F7F7FF', //可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						scrollColor: '#DEE7F7', //可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
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
				switch (e) {
					case 'leibie':
						this.flag5 = true
						this.flag6 = false
						this.flag7 = false
						this.flag8 = false
						this.getType()
						break
					case 'shifa':
						this.flag5 = false
						this.flag6 = true
						this.flag7 = false
						this.flag8 = false
						this.getUnit()
						break
					case 'yuefa':
						this.flag5 = false
						this.flag6 = false
						this.flag7 = true
						this.flag8 = false
						this.getPerMonth();
						break
					case 'tongji':
						this.flag5 = false
						this.flag6 = false
						this.flag7 = false
						this.flag8 = true
						this.getStatistics();
						break
				}
			},
			click2: function(e) {
				this.flag2 = true
				this.flag3 = false
				this.flag4 = false
				// console.log(e)
				this.getManage()
			},
			click3: function(e) {
				this.flag3 = true
				this.flag5 = true
				this.flag4 = false
				this.flag2 = false
				this.getType()
				// console.log(e)
			},
			click4: function(e) {
				this.flag4 = true
				this.flag2 = false
				this.flag3 = false
				this.getSummary()
				console.log(e)
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			getManage() {
				// console.log(uni.getStorageSync('token'))
				uni.request({
					url: 'dev/openapi/objects/v1/properties/accidentReport/services/getTableData', //仅为示例，并非真实接口地址。
					data: {},
					method: "POST", //method 有效值默认为get
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						this.dataList = res.data.result.list
					}
				});
			},
			//事故类别获取
			getType() {
				uni.request({
					url: 'dev/openapi/objects/v1/properties/accidentReport/services/selectAccidentTypeNum', //仅为示例，并非真实接口地址。
					data: {},
					method: "POST", //method 有效值默认为get
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						this.dataListType = res.data.result.list
					}
				});
			},
			//事发单位信息获取
			getUnit() {
				uni.request({
					url: 'dev/openapi/objects/v1/properties/accidentReport/services/selectAccidentUnitNum', //仅为示例，并非真实接口地址。
					data: {},
					method: "POST", //method 有效值默认为get
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						this.dataListType = res.data.result.list
					}
				});
			},
			//获取月份
			getDateTime(number = 0) {
				var nowdate = new Date();
				nowdate.setMonth(nowdate.getMonth() + number);
				var y = nowdate.getFullYear();
				var m = nowdate.getMonth() + 1;
				if (m < 10) {
					m = '0' + m
				}
				var d = nowdate.getDate();
				if (d < 10) {
					m = '0' + d
				}
				var retrundate = y + '-' + m + '-' + d;
				return retrundate;
			},
			//获取月发数量
			getPerMonth() {
				uni.request({
					url: 'dev/openapi/objects/v1/properties/accidentReport/services/selAccidentNum', //仅为示例，并非真实接口地址。
					data: {
						"val1": this.getDateTime(0),
						"val2": this.getDateTime(-11)
					},
					method: "POST", //method 有效值默认为get
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						console.log(res);
						// this.dataListType = res.data.result.list
						_self.fillData(res.data, 1);
					}
				});
			},
			//获取统计数量
			getStatistics() {
				uni.request({
					url: 'dev/openapi/objects/v1/properties/workImprovement/services/selectStatusNum', //仅为示例，并非真实接口地址。
					data: {
						"val1": this.getDateTime(0),
						"val2": this.getDateTime(-11)
					},
					method: "POST", //method 有效值默认为get
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						console.log(res);
						// this.dataListType = res.data.result.list
						_self.fillData(res.data, 2);
					}
				});
			},
		    //事故总结
			getSummary(){
				uni.request({
					url: 'dev/openapi/objects/v1/properties/workImprovement/services/selectData', //仅为示例，并非真实接口地址。
					data: {},
					method: "POST", //method 有效值默认为get
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						console.log(res);
						this.dataList = res.data.result.list
						console.log(res)
						// _self.fillData(res.data, 2);
					}
				});
			}
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
		margin: 15rpx auto;
		padding: 0 10rpx;
		background-color: #ebebeb;
		height: 70rpx;
		/* 		line-height: 70rpx; */
		text-align: center;
		color: #777;
		font-size: 26rpx;
	}

	.botton {
		width: 120rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 30rpx;
		font-size: 26rpx;
	}

	.buttom-style {
		width: 10%;
		margin-top: 55rpx;
		align-items: center;
		justify-content: center;
		/* flex: 1;
		justify-content: center;
		align-items: center; */
		/* height: 15%; */
	}

	.buttom-style2 {
		width: 15%;
		margin-top: 70rpx;
		align-items: center;
		justify-content: center;
	}

	.img-style {
		width: 40rpx;
		height: 50rpx;
	}

	.listcontent {
		width: 100%;
		display: flex;
	}

	.textcontent {
		text-align: left;
	}

	.desc {
		/* text-indent: 40rpx; */

	}
</style>
