<template>
	<view class="content">
		<view>
			<text class="title">方案名称：</text>
			<text class="item">{{detailData.name}}</text>
		</view>
		<view>
			<text class="title">创建时间：</text>
			<text class="item">{{detailData.time}}</text>
		</view>
		<view>
			<text class="title">创建单位：</text>
			<text class="item">{{detailData.type}}</text>
		</view>
		<view>
			<text class="title">主责单位：</text>
			<text class="item">{{detailData.grade}}</text>
		</view>
		<view>
			<text class="title">相关专家：</text>
			<text class="item">{{detailData.content}}</text>
		</view>

		<view>
			<text class="title">协助部门：</text>
			<text class="item">{{detailData.type}}</text>
		</view>
		<view>
			<text class="title">方案摘要：</text>
			<text class="item">{{detailData.grade}}</text>
		</view>
		<view>
			<text class="title">模拟事件：</text>
			<text class="item">{{detailData.content}}</text>
		</view>
		<view>
			<text class="title">危险源：</text>
			<text class="item">{{detailData.type}}</text>
		</view>
		<view>
			<text class="title">演练任务：</text>
			<text class="item">{{detailData.grade}}</text>
		</view>
		<view>
			<text class="title">应急资源：</text>
			<text class="item">{{detailData.content}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pdfUrl1: "",
				pdfUrl2: "",
				detailData: {
					name: "危险工艺火灾事故应急演练计划",
					time: "2020-07-05 11:11:11 至 2020-09-05 11:11:11",
					type: "常规演练",
					grade: "火灾救援处置方案",
					content: "火灾救援处置方案"
				}
			}
		},
		methods: {
			pdfOnclick() {
				console.log('下载文档');
				uni.downloadFile({
					url: 'https://th.bing.com/th/id/Rb57dc08e4e1edffa3b57bbb37a51f8af?rik=SiAvecKsV%2fXXyw&riu=http%3a%2f%2fpic31.nipic.com%2f20130709%2f12886717_151125416192_2.png&ehk=gNgQ4bfpebmgHCjg7MAzJ0uZSdZ4kZVFrpPaHUZXjh8%3d&risl=&pid=ImgRaw',
					success: function(res) {
						console.log(res);
						var filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							success: function(res) {
								console.log('打开文档成功');
							}
						});
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		margin-left: 15rpx;

	}

	.title {
		font-size: 24rpx;
		font-weight: bold;
	}

	.item {
		font-size: 24rpx;
	}

	.item-pdf {
		font-size: 24rpx;
		color: #007AFF;
		text-decoration: underline;
	}
</style>
