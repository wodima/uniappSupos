<template>
	<view>
		<!-- 设置圆角 -->
		<!-- 		<view class="viewtitle">
			<image class="image" @click="left" src="../../static/arrow-left.png"></image>	
			<view>{{year}}年{{month}}月</view>
			<image class="image" @click="right" src="../../static/arrow-right.png"></image>
		</view> -->

		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">企业名称：</text>
								<text class="text">{{news.companyName}}</text>
							</view>
							<view>
								<text class="texttitle">设备完好率：</text>
								<text class="text">{{news.equipmentIntactRate}}</text>
							</view>
							<view>
								<text class="texttitle">设备故障率：</text>
								<text class="text">{{news.equipmentFailureRate}}</text>
							</view>
							<view>
								<text class="texttitle">设备平均故障间隔：</text>
								<text class="text">{{news.mtbf}}</text>
							</view>
						</view>
					</view>

				</uni-card>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	//导入网络请>>>>>>>需要加大括号
	import {
		getInfo
	} from "../../api/assist.js"
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				downOption: {
					auto: false
				}, //是否在初始化后,自动执行downCallback; 默认true
				year: 0,
				month: 0,
				dataList: [],

			}
		},
		onLoad() {
			console.log("页面加载onLoad")
			let nowData = new Date();
			this.year = nowData.getFullYear()
			this.month = nowData.getMonth() + 1
			this.getEnergy()
		},
		methods: {
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
						// debugger
						// this.$root.token = res.data.accessToken
						console.log(res);
						uni.setStorageSync('token_energy', res.data.accessToken)
					}
				});
			},
			// left(){
			// 	this.month--
			// 	if(this.month<1){
			// 		this.year--
			// 		this.month=12
			// 	}
			// 	this.downCallback();
			// },
			// //搜索
			// right() {
			// 	this.month++
			// 	if(this.month>12){
			// 		this.year++
			// 		this.month=1
			// 	}
			// 	this.downCallback();
			// },
			/*下拉刷新的回调 */
			downCallback() {
				//联网加载数据
				this.getEnergy()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
				//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;

				//方法一(推荐): 后台接口有返回列表的总页数 totalPage
				//this.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

				//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
				//this.mescroll.endBySize(0, 0); //必传参数(当前页的数据个数, 总数据量)

				//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
				this.mescroll.endSuccess(this.dataList.length, false); //必传参数(当前页的数据个数, 是否有下一页true/false)

				//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据.
			},

			//获取设备信息
			getEnergy() {
				uni.showLoading({
					title: "加载中",
					mask: true,
				});
				uni.request({
					url: 'dev/openapi/objects/v1/properties/equipmentFacilities/services/selectInfo', //仅为示例，并非真实接口地址。
					data: {},
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
							this.dataList = res.data.result.list
							this.mescroll.endSuccess();
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
		}
	}
</script>

<style>
	.viewtitle {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;

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

	.image {
		width: 40rpx;
		height: 70rpx;
		padding-left: 30rpx;
		padding-right: 10rpx;
	}
</style>
