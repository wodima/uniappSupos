<template>
	<view>
		<mescroll-body v-if="flag == 'ASS' " ref="mescrollRef" @init="mescrollInit":down="downOption" @down="downCallback" @up="upCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true" @click = "itemClick">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">生产安全事故应急救援方案</text>
							</view>
							<view>
								<text class="texttitle">处置类别：</text>
								<text class="text">{{news.disposalType}}</text>
							</view>
							<view>
								<text class="texttitle">预案类别：</text>
								<text class="text">{{news.preplanType}}</text>
							</view>
							<view>
								<text class="texttitle">所属单位：</text>
								<text class="text">{{news.blogUnit}}</text>
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
			itemClick(){
				console.log("测试点击按钮")
				uni.navigateTo({
					url:'./../textplandetail/textplandetail'
				});
			},
			/*下拉刷新的回调 */
			downCallback() {
				//联网加载数据
				uni.request({
					url: 'http://220.180.192.175:8081/openapi/objects/v1/properties/textPreplan/services/getTableData', //仅为示例，并非真实接口地址。
					data: {},
					dataType:"JSON",
					method: "POST", //method 有效值默认为get
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token'),
					},
					success: (res) => {
						this.dataList = res.data.result.list
					}
				});
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				uni.request({
					url: 'dev/openapi/objects/v1/properties/textPreplan/services/getTableData', //仅为示例，并非真实接口地址。
					data: {},
					dataType:"JSON",
					method: "POST", //method 有效值默认为get
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token'),
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
</style>
