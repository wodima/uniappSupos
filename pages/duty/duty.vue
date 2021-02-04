<template>
	<view>
		<!-- 设置圆角 -->
		<uni-search-bar :radius="10" bgColor="#FFFFFF" :@confirm="search"></uni-search-bar>
		
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
			<view class="notice">本Demo的下拉刷新: 添加新数据到列表顶部</view>
			<view class="news-li" v-for="news in dataList" :key="news.id">
				<view>{{news.title}}</view>
				<view class="new-content">{{news.content}}</view>
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

</style>
