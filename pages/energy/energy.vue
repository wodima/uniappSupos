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
				<canvas canvas-id="canvasPie" id="canvasPie" class="charts" :width="cWidth*pixelRatio"
					:height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}"
					@touchstart="touchPie"></canvas>
				<!--#endif-->
				<!--#ifndef MP-ALIPAY -->
				<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
				<!--#endif-->
			</view>
		</view>

		<view class="qiun-charts" v-if="flag == 'YM'|flag == 'YD'">
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :width="cWidth*pixelRatio"
				:height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}"
				@touchstart="touchColumn"></canvas>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
			<!--#endif-->
		</view>

		<view v-if="flag == 'CD'" >
			<view class="viewtitle">
				<image class="image" @click="left" src="../../static/arrow-left.png"></image>
				<view>{{year}}年{{month}}月</view>
				<image class="image" @click="right" src="../../static/arrow-right.png"></image>
			</view>

			<view class="qiun-charts">
				<!--#ifdef MP-ALIPAY -->
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :width="cWidth*pixelRatio"
					:height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}"
					@touchstart="touchColumn"></canvas>
				<!--#endif-->
				<!--#ifndef MP-ALIPAY -->
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
				<!--#endif-->
			</view>
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
				num: 0,
				num2: 0,
				year: 0,
				month: 0,
				year_cd: 0,
				month_cd: 0,

			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);

			let nowData = new Date();
			this.year = nowData.getFullYear()
			this.month = nowData.getMonth() + 1
			this.getSelMonthSteamQuantity();
		},
		methods: {
			fillData(data, type1) {
				let LineA = {
					categories: [],
					series: [{
						name: "数量",
						data: [],
						color: '#409eff'
					}]
				};
				let LineB = {
					categories: [],
					series: [{
						name: "数量",
						data: [],
						color: '#409eff'
					}]
				};
				let LineC = {
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
				if (type1 === 'YM') {
					for (let i = 0; i < data.result.length; i++) {
						LineA.categories.push(data.result[i].time)
						LineA.series[0].data.push(data.result[i].num)
					}
				} else if (type1 === 'YD') {
					if (data.result.length === 0) {
						for (let i = 0; i <= 10; i++) {
							var day = this.getDateTime2(i - 10).split("-", 3)[2]
							LineB.categories.push(day)
							LineB.series[0].data.push(0)
						}
					} else {
						for (let i = 0; i < data.result.length; i++) {
							LineB.categories.push(data.result[i].times.split("-", 3)[2])
							LineB.series[0].data.push(data.result[i].num)
						}
					}
				} else if (type1 === 'CM') {
					for (let i = 0; i < data.result.length; i++) {
						Pie.series.push({
							name: data.result[i].companyName,
							data: data.result[i].num
						})
					}
				} else {
					for (let i = 0; i < data.result.length; i++) {
						LineC.categories.push(data.result[i].companyName)
						LineC.series[0].data.push(data.result[i].num)
					}
				}
				if (type1 === 'YM') {
					this.showColumn("canvasColumn", LineA);
				} else if (type1 === 'YD') {
					this.showColumn("canvasColumn", LineB);
				} else if (type1 === 'CM' && Pie.series.length !== 0) {
					this.showPie('canvasPie', Pie)
				} else if (type1 === 'CD' && LineC.series[0].data.length !== 0) {
					this.showColumn("canvasColumn", LineC);
				}
			},
			onclick(res) {
				this.flag = res
				// this.num = 0
				// let nowData = new Date();
				// this.year = nowData.getFullYear()
				// this.month = nowData.getMonth() + 1
				this.getSelMonthSteamQuantity()
			},
			left() {
				this.month--
				if (this.month < 1) {
					this.year--
					this.month = 12
				}
				this.num--
				this.getMonth()
			},
			//搜索
			right() {
				this.month++
				if (this.month > 12) {
					this.year++
					this.month = 1
				}
				this.num++
				this.getMonth()
			},
			getMonth() {
				uni.showLoading({
					title: "加载中",
					mask: true,
				});
				uni.request({
					url: 'dev/openapi/objects/v1/properties/EnergyStatistics/services/selMonthCompany', //仅为示例，并非真实接口地址。
					data: {
						"val1": this.getDate2(this.num),
						"val2": this.getDate2(this.num)
					},
					method: "POST", //method 有效值默认为get
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token_energy')
					},
					success: (res) => {
						uni.hideLoading();
						if (res.statusCode !== 200) {
							if (res.statusCode === 401) {
								this.getToken();
								this.getEnergy();
							} else {
								uni.showToast({
									title: '获取数据失败',
									icon: "none",
									mask: true,
								})
							}
						} else {
							this.fillData(res.data, this.flag)
						}
					},
					fail: (error) => {
						uni.hideLoading();
						uni.showToast({
							title: '请求接口失败',
							icon: "none",
							mask: true,
						})
					}
				});
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
			getToken() {
				uni.request({
					url: 'dev/oauth2/client/v1/accessToken', //仅为示例，并非真实接口地址。
					data: {
						grantType: 'client_credential',
						appid: 'App_1ff1b1c7a05f42b08ad44e1bf0233505',
						secret: '5c0d1af1c3ee5ad7e437e3cd70945beb'
					},
					method: "GET", //method 有效值默认为get
					header: {
						'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						uni.setStorageSync('token_energy', res.data.accessToken)
					}
				});
			},
			//获取月度蒸汽消耗
			getSelMonthSteamQuantity() {
				var vales = {};
				var url = '';
				uni.showLoading({
					title: "加载中",
					mask: true,
				});
				switch (this.flag) {
					case "YM": {
						url =
							'dev/openapi/objects/v1/properties/EnergyStatistics/services/selMonthSteamQuantity';
						vales = {
							"val1": this.getDateTime(0),
							"val2": this.getDateTime(-11)
						}
						break;
					}
					case "YD": {
						url =
							'dev/openapi/objects/v1/properties/EnergyStatistics/services/selDaySteamQuantity';
						vales = {
							"val1": this.getDateTime2(0),
							"val2": this.getDateTime2(-10)
						}
						break;
					}
					case "CM": {
						url =
							'dev/openapi/objects/v1/properties/EnergyStatistics/services/selMonthCompany';
						vales = {
							"val1": this.getDate2(this.num),
							"val2": this.getDate2(this.num)
						}
						break;
					}
					case "CD": {
						url =
							'dev/openapi/objects/v1/properties/EnergyStatistics/services/selMonthCompany';
						vales = {
							"val1": this.getDate2(this.num),
							"val2": this.getDate2(this.num)
						}
						console.log(vales)
						break;
					}
				}
				uni.request({
					url: url, //仅为示例，并非真实接口地址。
					data: vales,
					dataType:"JSON",
					method: "POST", //method 有效值默认为get
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token_energy')
					},
					success: (res) => {
						uni.hideLoading();
						if (res.statusCode !== 200) {
							if (res.statusCode === 401) {
								this.getToken();
								this.getEnergy();
							} else {
								uni.showToast({
									title: '获取数据失败',
									icon: "none",
									mask: true,
								})
							}
						} else {
							this.fillData(res.data, this.flag)
						}
					},
					fail: (error) => {
						uni.hideLoading();
						uni.showToast({
							title: '请求接口失败',
							icon: "none",
							mask: true,
						})
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
			getDateTime2(number = 0) {
				var nowdate = new Date();
				nowdate.setTime(nowdate.getTime() + (24 * 3600 * 1000) * number);
				var y = nowdate.getFullYear();
				var m = nowdate.getMonth() + 1;
				if (m < 10) {
					m = '0' + m
				}
				var d = nowdate.getDate();
				if (d < 10) {
					d = '0' + d
				}
				var retrundate = y + '-' + m + '-' + d;
				return retrundate;
			},
			getDate(number = 0) {
				var nowdate = new Date();
				nowdate.setTime(nowdate.getTime() + (24 * 3600 * 1000) * number);
				var d = nowdate.getDate();
				if (d < 10) {
					d = '0' + d
				}
				var retrundate = d;
				return retrundate;
			},
			getDate2(number = 0) {
				var nowdate = new Date();
				nowdate.setMonth(nowdate.getMonth() + number);
				var y = nowdate.getFullYear();
				var m = nowdate.getMonth() + 1;
				if (m < 10) {
					m = '0' + m
				}
				var retrundate = y + '-' + m;
				return retrundate;
			}
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
