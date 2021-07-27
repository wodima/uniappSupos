<template>
	<view>
		<!-- 设置圆角 -->
		<uni-search-bar radius="10" bgColor="#FFFFFF" @confirm="search"></uni-search-bar>

		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index" @click="clicks(index)">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true" >
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">值班人员：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">值班时间：</text>
								<text class="text">{{news.dutyAll}}</text>
							</view>
							<view>
								<text class="texttitle">所属单位：</text>
								<text class="text">{{news.unitName}}</text>
							</view>
							<view>
								<text class="texttitle">手机号码：</text>
								<text class="text">{{news.phoneNumber}}</text>
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
	} from "../../api/duty.js"
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
		onLoad() {
			console.log("页面加载onLoad")
			// this.getdata()
		},
		methods: {
			//搜索
			search(res) {
				console.log("输入的值" + res.value)
				this.downCallback()
			},
			clicks(index){
				console.log("输入==的值"+index)
			
			},
			/*下拉刷新的回调 */
			downCallback() {
				//联网加载数据
				uni.request({
					url: 'dev/openapi/objects/v1/properties/onDutyManagement/services/selectData', //仅为示例，并非真实接口地址。
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
			upCallback(page) {
				uni.request({
					url: 'dev/openapi/objects/v1/properties/onDutyManagement/services/selectData', //仅为示例，并非真实接口地址。
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
		}
	}
</script>

<style>
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
