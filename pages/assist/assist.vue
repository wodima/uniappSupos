<template>
	<view>
		<!-- 设置圆角 -->
		<view class="uni-flex uni-row">
			<view class="flex-item uni-bg-red" @click="onclick('ASS')">辅助信息库</view>
			<view class="flex-item uni-bg-green" @click="onclick('HUA')">危化品数据库</view>
		</view>
		
		<mescroll-body v-if="flag == 'ASS' " ref="mescrollRef" @init="mescrollInit">
			<view class="news-li" v-for="(news,index) in dataList" :key="index" @click="assClick(index)">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">事故编号：</text>
								<text class="text">{{news.accidentNumber}}</text>
							</view>
							<view>
								<text class="texttitle">事故名称：</text>
								<text class="text">{{news.accidentName}}</text>
							</view>
							<view>
								<text class="texttitle">事故类别：</text>
								<text class="text">{{news.accidentType}}</text>
							</view>
							<view>
								<text class="texttitle">事故等级：</text>
								<text class="text">{{news.accidentGrade}}</text>
							</view>
							<view>
								<text class="texttitle">发生地点：</text>
								<text class="text">{{news.locationOccur}}</text>
							</view>
						</view>
					</view>

				</uni-card>
			</view>
		</mescroll-body>
		<view v-if="flag == 'HUA' " class="web-view-type">
			<view>暂无数据</view>
			<!-- <web-view src="http://www.ichemistry.cn/chemistry/cas.htm"></web-view> -->
		</view>
		<!-- <web-view src="http://www.ichemistry.cn/chemistry/cas.htm"></web-view> -->
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	//导入网络请>>>>>>>需要加大括号
	// <mescroll-body v-if="flag == 'HUA' " ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downRightCallback" @up="upRightCallback">
	// 	<view class="news-li" v-for="(news,index) in dataList" :key="index" @click="huaClick">
	// 		<!-- 一般用法 -->
	// 		<uni-card :is-shadow="true">
	// 			<view class="listcontent">
	// 				<view class="textcontent">
	// 					<view>
	// 						<text class="texttitle">中文名称：</text>
	// 						<text class="text">{{news.name}}</text>
	// 					</view>
	// 					<view>
	// 						<text class="texttitle">英文名称：</text>
	// 						<text class="text">{{news.name}}</text>
	// 					</view>
	// 					<view>
	// 						<text class="texttitle">CAS：</text>
	// 						<text class="text">{{news.name}}</text>
	// 					</view>
	// 					<view>
	// 						<text class="texttitle">分子量：</text>
	// 						<text class="text">{{news.name}}</text>
	// 					</view>
	// 					<view>
	// 						<text class="texttitle">危险货物编号：</text>
	// 						<text class="text">{{news.name}}</text>
	// 					</view>
	// 				</view>
	// 			</view>
	
	// 		</uni-card>
	// 	</view>
	// </mescroll-body>
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
				dataList: [],
				flag:"ASS"
			}
		},
		onLoad() {
			this.getAssicents()
			console.log("页面加载onLoad")
			// this.getdata()
		},
		methods: {
			onclick(res){
				this.flag = res
			},
			//跳转辅助信息库
			assClick(res){
				//辅助信息库
				uni.navigateTo({
					url: './../assistdetail/assistdetail'
				});
			},
			//跳转危化品
			huaClick(res){
				//辅助信息库
				this.dataList = []
			},
			//搜索
			search(res) {
				console.log("输入的值" + res.value)
			},
			/*下拉刷新的回调 */
			getAssicent() {
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
			getAssicents(page) {
				uni.request({
					url: 'dev/openapi/objects/v1/properties/Assist/services/assistInfo', //仅为示例，并非真实接口地址。
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
			/*右边下拉刷新的回调 */
			downRightCallback() {
				//联网加载数据
				uni.request({
					url: 'dev/openapi/objects/v1/properties/Assist/services/assistInfo', //仅为示例，并非真实接口地址。
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
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upRightCallback(page) {
				uni.request({
					url: 'dev/openapi/objects/v1/properties/Assist/services/assistInfo', //仅为示例，并非真实接口地址。
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
		}
	}
</script>

<style>
	.flex-item {
		width: 180rpx;
		height: 120rpx;
		
		text-align: center;
		line-height: 120rpx;
		margin: 10rpx;
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
	.texttitle{
		font-size: 26rpx;
		font-weight: bold;
		color: #000000;
	}
	.text{
		font-size: 24rpx;
		color: #000000;
	}
	.web-view-type{
		margin-top: 320rpx;
		text-align: center;
	}
</style>
