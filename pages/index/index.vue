<template>
	<view class="content">
		<uni-nav-bar backgroundColor="#007AFF" color="#FFFFFF" :fixed="true" :status-bar="true" shadow="false"
			title="Supos">
			<block slot="right">
				<view id="rightcentent" class="login" @click="login">
					<view>
						<image v-if="title==''" class="title-image" src="../../static/icon_my.png"></image>
						<text v-if="title!=''" class="uni-nav-bar-text">{{title}}</text>
					</view>
				</view>
			</block>
		</uni-nav-bar>

		<map class="map" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
		<text class="title">应急管理</text>
		<!-- 对话框 -->
		<uni-popup id="popupDialog" ref="popupDialog" type="dialog" @change="changePop">
			<uni-popup-dialog type="warn" title="退出登陆" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
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
			<uni-grid :column="2" :showBorder="false" :square="false" :highlight="false" @change="change2">
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
	import Suplink from 'suplink-sdk'
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'

	Suplink.getSystemInfo().then(res => {
		console.log(res)
		debugger
		// let {
		// 	code,
		// 	msg,
		// 	data
		// } = res;
		// do something
	})
	export default {
		data() {
			return {
				title: '',
				value: false,
				data1: [{
					title: '退出'
				}],
				longitude: '120.184937',
				latitude: '30.186683',
				token: '',
				covers: [{
					latitude: 30.186683,
					longitude: 120.184937,
					iconPath: '../../static/map_red.png',
					label: {
						x: 10,
						y: 1,
						content: "测试点位",
						color: "#FF0000",
						bgColor: "#999999"
					}
				}, {
					latitude: 30.186613,
					longitude: 120.182247,
					iconPath: '../../static/map_green.png'
				}],
				list: [{
						url: '/static/icon_accident.png',
						text: '事故管理',

					},
					{
						url: '/static/icon_duty.png',
						text: '值班值守',

					},
					{
						url: '/static/icon_assist.png',
						text: '应急辅助',

					},
					{
						url: '/static/icon_textplan.png',
						text: '文本预案',

					},
					{
						url: '/static/icon_drill.png',
						text: '应急演练'
					},
					{
						url: '/static/icon_resource.png',
						text: '应急资源'
					}
				],
				listTwo: [{
						url: '/static/icon_device.png',
						text: '设备设施状况',

					},
					{
						url: '/static/icon_energy.png',
						text: '能源统计分析',

					}
				]
			}
		},
		onLoad() {

			this.getToken()
		},
		methods: {
			getToken() {
				uni.request({
					url: 'dev/oauth2/client/v1/accessToken', //仅为示例，并非真实接口地址。
					data: {
						grantType: 'client_credential',
						appid: 'App_d3802f8e8fd04eeeab757f2e95963b0f',
						secret: '9bcc6e68b4aa6ea9cffa0fb68386648e'
					},
					method: "GET", //method 有效值默认为get
					header: {
						'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						// debugger
						// this.$root.token = res.data.accessToken
						// console.log(res);
						uni.setStorageSync('token', res.data.accessToken)
					}
				});
			},
			login() {
				Suplink.login().then(res => {
					let {
						code,
						msg,
						data
					} = res;
					// do something
				})
				if (this.title == '') {
					this.title = "hell"
				} else {
					this.title = ""
				}

				this.value = !this.value
				this.$refs.popupDialog.open()
			},
			/**
			 * popup 状态发生变化触发
			 * @param {Object} e
			 */
			changePop(e) {
				console.log('popup ' + e.type + ' 状态', e.show)
			},
			/**
			 * 对话框点击确认按钮
			 */
			dialogConfirm(done) {
				this.$refs.popupDialog.open()
				console.log('点击确认');
				// 需要执行 done 才能关闭对话框
				done()
			},
			/**
			 * 对话框取消按钮
			 */
			dialogClose(done) {


				this.$refs.popupDialog.open()
				// 需要执行 done 才能关闭对话框
				done()
			},
			change(e) {
				let {
					index
				} = e.detail
				if (index == 0) {
					//事故管理
					uni.navigateTo({
						url: './../accidentHandling/accidentHandling'
					});
				} else if (index == 1) {
					//值班值守
					uni.navigateTo({
						url: './../duty/duty'
					});
				} else if (index == 2) {
					//应急辅助
					uni.navigateTo({
						url: './../assist/assist'
					});
				} else if (index == 3) {
					//文本预案
					uni.navigateTo({
						url: './../textplan/textplan'
					});
				} else if (index == 4) {
					//应急演练
					uni.navigateTo({
						url: './../drill/drill'
					});
				} else if (index == 5) {
					//应急资源
					uni.navigateTo({
						url: './../resources/resources'
					});
				}
			},
			change2(e) {
				let {
					index
				} = e.detail
				if (index == 0) {
					//应急资源
					uni.navigateTo({
						url: './../device/device'
					});
				} else if (index == 1) {
					//应急资源
					uni.navigateTo({
						url: './../energy/energy'
					});
				}
			}
		},
		components: {
			uniGrid,
			uniGridItem,
			uniNavBar,
			uniPopupDialog
		}
	}
</script>

<style>
	.login {
		height: 80rpx;
		width: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.uni-nav-bar-text {
		font-size: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.title-image {
		width: 30rpx;
		height: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.contentpop {
		position: relative;
		z-index: 1000;
	}

	.map {
		height: 400rpx;
		width: 100%;
		position: relative;
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
