<template>
	<view>
		<!-- 设置圆角 -->
		<view class="uni-flex uni-row">
			<view class="flex-item uni-bg-red" @click="onclick('SUP')">物资资源</view>
			<view class="flex-item uni-bg-green" @click="onclick('EX')">应急专家</view>
			<view class="flex-item uni-bg-red" @click="onclick('PERSON')">机构人员</view>
			<view class="flex-item uni-bg-green" @click="onclick('OBJ')">保护对象</view>

		</view>
		<view class="uni-flex uni-row">
			<view class="flex-item2 uni-bg-red" @click="onclick('TEAM')">救援队伍</view>
			<view class="flex-item2 uni-bg-green" @click="onclick('REF')">避难场所</view>
			<view class="flex-item2 uni-bg-red" @click="onclick('BO')">应急广播</view>

		</view>
		<mescroll-body v-if="flag == 'SUP' " ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback"
		 @up="upCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">物资名称：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">所属单位：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">存放位置：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">数量：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">是否可用：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">是否脱检：</text>
								<text class="text">{{news.name}}</text>
							</view>
						</view>
					</view>

				</uni-card>
			</view>
		</mescroll-body>
		<mescroll-body v-if="flag == 'EX' " ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downRightCallback"
		 @up="upRightCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">姓名：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">所属单位：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">职务：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">专业领域：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">联系电话：</text>
								<text class="text">{{news.name}}</text>
							</view>
						</view>
					</view>

				</uni-card>
			</view>
		</mescroll-body>

		<view v-if="flag == 'PERSON'">
			<scroll-view class="tabs-wrapper" id="tabsWrapper" :scroll-x="true" :scroll-into-view="`tabItem${selectedIndex}`"
			 :scroll-with-animation="true">
				<view class="tabs-wrap">
					<view class="tabs-item" :class="{ selected: selectedIndex == index }" :id="`tabItem${index}`" v-for="(tab, index) in dataList"
					 :key="index" @tap.stop="onTapTab(tab, index)">
						<text>{{ tab.name }}</text>
					</view>
				</view>
			</scroll-view>
			<mescroll-body  ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downRightCallback"
			 @up="upRightCallback">
				<view class="news-li" v-for="(news,index) in dataList" :key="index">
					<!-- 一般用法 -->
					<uni-card :is-shadow="true">
						<view class="listcontent">
							<view class="textcontent">
								<view>
									<text class="texttitle">所属单位：</text>
									<text class="text">{{news.name}}</text>
								</view>
								<view>
									<text class="texttitle">联系人：</text>
									<text class="text">{{news.name}}</text>
								</view>
								<view>
									<text class="texttitle">联系电话：</text>
									<text class="text">{{news.name}}</text>
								</view>
								<view>
									<text class="texttitle">姓名：</text>
									<text class="text">{{news.name}}</text>
								</view>
								<view>
									<text class="texttitle">专业：</text>
									<text class="text">{{news.name}}</text>
								</view>
								<view>
									<text class="texttitle">职责：</text>
									<text class="text">{{news.name}}</text>
								</view>
								<view>
									<text class="texttitle">联系电话：</text>
									<text class="text">{{news.name}}</text>
								</view>
							</view>
						</view>
			
					</uni-card>
				</view>
			</mescroll-body>
		</view>


		<mescroll-body v-if="flag == 'OBJ' " ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downRightCallback"
		 @up="upRightCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">对象名称：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">所属单位：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">对象类型：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">规模：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">地址：</text>
								<text class="text">{{news.name}}</text>
							</view>
						</view>
					</view>

				</uni-card>
			</view>
		</mescroll-body>
		<mescroll-body v-if="flag == 'TEAM' " ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downRightCallback"
		 @up="upRightCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">队伍名称：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">专业领域：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">所属单位：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">负责区域：</text>
								<text class="text">{{news.name}}</text>
							</view>

						</view>
					</view>

				</uni-card>
			</view>
		</mescroll-body>
		<mescroll-body v-if="flag == 'REF' " ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downRightCallback"
		 @up="upRightCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">场所名称：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">所属单位：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">容纳人员：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">具体地址：</text>
								<text class="text">{{news.name}}</text>
							</view>

						</view>
					</view>

				</uni-card>
			</view>
		</mescroll-body>
		<mescroll-body v-if="flag == 'BO' " ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downRightCallback"
		 @up="upRightCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">广播编号：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">具体位置：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">覆盖区域：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">是否可用：</text>
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
				// 当前选中的下标，默认为0
				selectedIndex: 0,
				dataList: [],
				flag: "SUP"
			}
		},
		onLoad() {
			console.log("页面加载onLoad")
			// this.getdata()
		},
		methods: {
			onclick(res) {
				this.flag = res
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
		width: 25%;
		height: 120rpx;

		text-align: center;
		line-height: 120rpx;
		margin: 10rpx;
		background-color: #007AFF;
		border-radius: 10rpx;
	}

	.flex-item2 {
		width: 25%;
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

	.per_left {
		width: 30%;
	}

	.tabs-wrapper {
		height: 80upx;
		width: 100%;
		flex-shrink: 0;
	}

	.tabs-wrap {
		height: 100%;
		display: flex;
		flex-wrap: nowrap;
	}

	.tabs-item {
		font-size: 26upx;
		color: #050505;
		height: 100%;
		padding: 0 30upx;
		word-wrap: normal;
		white-space: nowrap;
		display: flex;
		align-items: center;

		&.selected {
			color: #ff9900;
		}
	}

	
</style>
