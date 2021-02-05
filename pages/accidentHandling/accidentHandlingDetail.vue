<template>
	<view >
		<uni-search-bar radius="10" bgColor="#FFFFFF" @confirm="search"></uni-search-bar>
		<view class="uni-flex uni-row item-1" style="-webkit-justify-content: space-between;justify-content: space-between;">
			<view class="uni-flex uni-column" >
				<text>2021-01-02 12:22</text>
				<text>小型氯气泄露</text>
			</view>
			<view>
				<button type="primary" class="botton">派单</button>
			</view>
		</view>
	    <text class="item-2">已选救援队伍</text>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

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
		margin-top: 10rpx;
		align-items: center;
	}
	.item-1{
		margin-left: 10rpx;
		margin-right: 10rpx;
	}
	.item-2{
		margin-left: 10rpx;
		margin-right: 10rpx;
		margin-top: 20rpx;
		font-size: 35rpx;
	}
</style>
