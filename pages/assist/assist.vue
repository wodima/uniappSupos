<template>
	<view>
		<!-- 设置圆角 -->
		<view class="uni-flex uni-row">
			<view class="flex-item uni-bg-red" @click="onclick('ASS')">辅助信息库</view>
			<view class="flex-item uni-bg-green" @click="onclick('HUA')">危化品数据库</view>
		</view>
		
		<mescroll-body v-if="flag == 'ASS' " ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index" @click="assClick(index)">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">值班人员：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">值班时间：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">所属单位：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">手机号码：</text>
								<text class="text">{{news.name}}</text>
							</view>
						</view>
					</view>

				</uni-card>
			</view>
		</mescroll-body>
		<mescroll-body v-if="flag == 'HUA' " ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downRightCallback" @up="upRightCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index" @click="huaClick">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">中文名称：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">英文名称：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">CAS：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">分子量：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">危险货物编号：</text>
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
				
			},
			//搜索
			search(res) {
				console.log("输入的值" + res.value)
			},
			/*下拉刷新的回调 */
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
			upRightCallback(page) {
				getRightInfo({
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
</style>
