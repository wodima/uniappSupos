<template>
	<view>
		<uni-search-bar radius="10" bgColor="#FFFFFF" @confirm="search"></uni-search-bar>
		<view class="uni-flex uni-row item-1" style="-webkit-justify-content: space-between;justify-content: space-between;">
			<view class="uni-flex uni-column">
				<text>2021-01-02 12:22</text>
				<text>小型氯气泄露</text>
			</view>
			<view>
				<button type="primary" class="botton-style">派单</button>
			</view>
		</view>
		<text class="item-2">已选救援队伍</text>
		<mescroll-body class="mecscroll-style" ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback"
		 @up="upCallback">
			<view class="news-li mecscroll-style uni-flex uni-row" v-for="(news,index) in dataList" :key="index">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;">
						<view class="textcontent">
							<view>
								<text class="text">{{news.time}}</text>
							</view>
							<view>
								<text class="texttitle">负责人：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">联系电话：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">服务区域：</text>
								<text class="text">{{news.name}}</text>
							</view>
						</view>
					<view>
						<button type="primary" class="botton">移除</button>
					</view>
					</view>
					
				</uni-card>
			</view>
		</mescroll-body>
		<text class="item-2">已通知的救援队伍</text>
		<mescroll-body class="mecscroll-style" ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="noticeTeamCallback"
		 @up="upnoticeTeamCallback">
			<view class="news-li mecscroll-style" v-for="(news,index) in dataList" :key="index">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true" class="uni-flex uni-row">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="text">{{news.time}}</text>
							</view>
							<view>
								<text class="texttitle">负责人：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">联系电话：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">服务区域：</text>
								<text class="text">{{news.name}}</text>
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
	} from "../../api/accidentHandlingDetail.js"
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				downOption: {
					auto: false
				}, //是否在初始化后,自动执行downCallback; 默认true
				dataList: []
			}
		},
		methods: {
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
			noticeTeamCallback() {
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
			upnoticeTeamCallback(page) {
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
			}
		}
	}
</script>

<style>
	.botton {
		width: 120rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 30rpx;
		font-size: 26rpx;
		margin-top: 45rpx;
		align-items: center;
		background-color: #FF3333;
	}
	.botton-style {
		width: 120rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 30rpx;
		font-size: 26rpx;
		margin-top: 10rpx;
		align-items: center;
	}

	.item-1 {
		margin-left: 10rpx;
		margin-right: 10rpx;
	}

	.item-2 {
		margin-left: 10rpx;
		margin-right: 10rpx;
		margin-top: 20rpx;
		font-size: 35rpx;
	}

	.mecscroll-style {
		height: 50%;
	}
</style>
