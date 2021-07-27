<template>
	<view>
		<!-- 设置圆角 -->
		<view class="uni-flex uni-row">
			<view class="flex-item uni-bg-red" @click="onclick('PLAN')">演练计划</view>
			<view class="flex-item uni-bg-green" @click="onclick('Program')">演练方案</view>
			<view class="flex-item uni-bg-green" @click="onclick('summary')">演练总结</view>
		</view>

		<mescroll-body v-if="flag == 'PLAN' " ref="mescrollRef" @init="mescrollInit" :down="downOption"
			@down="downCallback" @up="upCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index" @click="planClick(index)">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">演练名称：</text>
								<text class="text">{{news.drillName}}</text>
							</view>
							<view>
								<text class="texttitle">计划时间：</text>
								<text class="text">{{news.scheduledDate}}</text>
							</view>

						</view>
					</view>

				</uni-card>
			</view>
		</mescroll-body>
		<mescroll-body v-if="flag == 'Program' " ref="mescrollRef" @init="mescrollInit" :down="downOption"
			@down="downRightCallback" @up="upRightCallback">
			<view class="news-li" v-for="(news,index) in dataList2" :key="index" @click="drillClick(index)">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">方案名称：</text>
								<text class="text">{{news.schemeName}}</text>
							</view>
							<view>
								<text class="texttitle">创建单位：</text>
								<text class="text">{{news.creationUnit}}</text>
							</view>
							<view>
								<text class="texttitle">创建时间：</text>
								<text class="text">{{news.creationTime}}</text>
							</view>
							<view>
								<text class="texttitle">方案状态：</text>
								<text class="text">{{news.schemeStatus}}</text>
							</view>
						</view>
					</view>

				</uni-card>
			</view>
		</mescroll-body>
		<mescroll-body v-if="flag == 'summary' " ref="mescrollRef" @init="mescrollInit" :down="downOption"
			@down="downRightCallback" @up="upRightCallback">
			<view class="news-li" v-for="(news,index) in dataList3" :key="index" @click="drillClick(index)">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">演练主题：</text>
								<text class="text">{{news.drillThemeName}}</text>
							</view>
							<view>
								<text class="texttitle">演练名称：</text>
								<text class="text">{{news.drillName}}</text>
							</view>
							<view>
								<text class="texttitle">演练方案：</text>
								<text class="text">{{news.schemeName}}</text>
							</view>
							<view>
								<text class="texttitle">开始时间：</text>
								<text class="text">{{news.drillRecordStartTime}}</text>
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
				dataList: [],
				dataList2: [],
				dataList3: [],
				flag: "PLAN"
			}
		},
		onLoad() {
			this.getEmergencyDrill();
			this.getEvaluateInfo();
			this.getDrillScheme();
			console.log("页面加载onLoad")
			// this.getdata()
		},
		methods: {
			onclick(res) {
				this.flag = res
			},
			drillClick(res) {
				if (this.flag == 'PLAN') {
					//演练计划
					uni.navigateTo({
						url: './../drillPlan/drillPlan'
					});
				} else if (this.flag == 'Program') {
					//演练方案
					uni.navigateTo({
						url: './../drillProgram/drillProgram'
					});
				} else if (this.flag == 'summary') {
					//演练总结
					uni.navigateTo({
						url: './../drillsummary/drillsummary'
					});
				}

			},
			/*下拉刷新的回调 */
			getEmergencyDrill() {
				//联网加载数据
				uni.request({
					url: 'dev/openapi/objects/v1/properties/emergencyDrill/services/getInfo', //仅为示例，并非真实接口地址。
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
			getDrillScheme(page) {
				uni.request({
					url: 'dev/openapi/objects/v1/properties/drillScheme/services/getTableData', //仅为示例，并非真实接口地址。
					data: {},
					method: "POST", //method 有效值默认为get
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						this.dataList2 = res.data.result.list
					}
				});
			},
			/*右边下拉刷新的回调 */
			downRightCallback() {
				//联网加载数据
				getRightInfo({
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
			getEvaluateInfo(page) {
				uni.request({
					url: 'dev/openapi/objects/v1/properties/emergencyDrill/services/getEvaluateInfo', //仅为示例，并非真实接口地址。
					data: {},
					method: "POST", //method 有效值默认为get
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						this.dataList3 = res.data.result.list
					}
				});
			},
		}
	}
</script>

<style>
	.flex-item {
		width: 33.3%;
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

	.texttitle {
		font-size: 26rpx;
		font-weight: bold;
		color: #000000;
	}

	.text {
		font-size: 24rpx;
		color: #000000;
	}
</style>
