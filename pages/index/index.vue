<template>
	<view class="content">
		<map class="map" src="/static/logo.png"></map>
		<text class="title">应急管理</text>

		<view class="example-body">
			<uni-grid :column="3" :showBorder="false" :square="false" :highlight="false" @change="change">
				<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
					<view class="grid-item-box">
						<image :src="item.url" class="image" mode="aspectFill" />
						<text class="text">{{ item.text }}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<text class="title">能源统计</text>
		
		<view class="example-body">
			<uni-grid :column="2" :showBorder="false" :square="false" :highlight="false" @change="change">
				<uni-grid-item v-for="(item, index) in listTwo" :index="index" :key="index">
					<view class="grid-item-box">
						<image :src="item.url" class="image" mode="aspectFill" />
						<text class="text">{{ item.text }}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"

	export default {
		data() {
			return {
				title: 'Hello',
				list: [{
						url: '/static/logo.png',
						text: 'Grid',

					},
					{
						url: '/static/logo.png',
						text: 'Grid 2',

					},
					{
						url: '/static/logo.png',
						text: 'Grid 3',

					},
					{
						url: '/static/logo.png',
						text: 'Grid 4',

					},
					{
						url: '/static/logo.png',
						text: 'Grid 5'
					},
					{
						url: '/static/logo.png',
						text: 'Grid 6'
					}
				],
				listTwo: [{
						url: '/static/logo.png',
						text: 'Grid',
				
					},
					{
						url: '/static/logo.png',
						text: 'Grid 2',
				
					}]
			}
		},
		onLoad() {

		},
		methods: {
			change() {

			}
		},
		comments: {
			components: {
				uniGrid,
				uniGridItem
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.map {
		height: 300rpx;
		width: 100%;
		margin-top: 10rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 10rpx;
	}

	.title {
		width: 100%;
		font-size: 30rpx;
		margin-left: 15rpx;
		color: #333333;
	}

	.example-body {
		width: 95%;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		font-size: 14px;
		background-color: #FFFFFF;
		margin: 10rpx;
		border: 2px solid #f9f9f9;
		box-shadow: 0 0 25rpx #CCCCCC;
	}

	.image {
		width: 50rpx;
		height: 50rpx;
	}

	.text {
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.grid-item-box {
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}
</style>
