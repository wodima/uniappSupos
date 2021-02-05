<template>
	<view>
		<!-- 设置圆角 -->
		<uni-search-bar radius="10" bgColor="#FFFFFF" @confirm="search"></uni-search-bar>
<button @click="getdata">查询</button>
		<!-- <mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
			<view class="notice">本Demo的下拉刷新: 添加新数据到列表顶部</view>
			<view class="news-li" v-for="news in preferData" :key="news.id">
				<view>{{news.title}}</view>
				<view class="new-content">{{news.content}}</view>
			</view>
		</mescroll-body> -->
	</view>
</template>

<script>
	//导入网络请>>>>>>>需要加大括号
	import {
		getInfo
	} from "../../api/duty.js"
	export default {
		data() {
			return {
				preferData: []
			}
		},
		onLoad() {
			console.log("页面加载onLoad")
			// this.getdata()
		},
		methods: {
			//搜索
			search(res){
				console.log("输入的值"+res.value)
			},
			//网络请求
			getdata() {
				getInfo(
					{ PRONO: "PRONO" }
					
				)
					.then(res => {
						console.log('更新用户信息 post success----期望custom 含有custom: 66');
						console.log(res);
					})
					.catch(err => {
						console.log('更新用户信息 post fail----');
						console.log(err);
					});
				
			}
		}
	}
</script>

<style>

</style>
