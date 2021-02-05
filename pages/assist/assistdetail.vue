<template>
	<view class="content">
			<view>
				<text class="title">事故名称：</text>
				<text class="item">{{detailData.name}}</text>
			</view>
			<view>
				<text class="title">事故时间：</text>
				<text class="item">{{detailData.time}}</text>
			</view>
			<view >
				<text class="title">事故类型：</text>
				<text class="item">{{detailData.type}}</text>
			</view>
			<view >
				<text class="title">事故等级：</text>
				<text class="item">{{detailData.grade}}</text>
			</view>
			<view >
				<text class="title">事故地点：</text>
				<text class="item">{{detailData.adress}}</text>
			</view>
			<view >
				<text class="title">事故案例：</text>
				<text class="item">{{detailData.case}}</text>
			</view>
			<view >
				<text class="title">事故类型：</text>
				<text class="item">{{detailData.casetype}}</text>
			</view>
			<view >
				<text class="title">事故起因：</text>
				<text class="item">{{detailData.cause}}</text>
			</view>
			<view>
				<text class="title">预防措施：</text>
				<text class="item">{{detailData.precaution}}</text>
			</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData: {
					name: "小型氧气泄漏事故",
					time: "2020-07-05 11:11:11",
					type: "有毒气体泄漏",
					grade:"4级",
					unit:"某某化学品公司",
					adress:"某某化学品公司一号厂房",
					case:"斯蒂芬氧气泄漏",
					casetype:"第三方杀毒",
					cause:"试试杀毒效果",
					precaution :"某某化学品公司"
				}
			}
		},
		methods: {

		}
	}
</script>

<style>
	.content{
		width: 100%;
		margin-left: 15rpx;
		
	}
	.title{
		font-size: 24rpx;
		font-weight: bold;
	}
	.item{
		font-size: 24rpx;
	}
</style>
