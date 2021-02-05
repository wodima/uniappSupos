<template>
	<view class="content">
		<view>
			<text class="title">预案名称：</text>
			<text class="item">{{detailData.name}}</text>
		</view>
		<view>
			<text class="title">处置类别：</text>
			<text class="item">{{detailData.time}}</text>
		</view>
		<view>
			<text class="title">预案类别：</text>
			<text class="item">{{detailData.type}}</text>
		</view>
		<view>
			<text class="title">所属单位：</text>
			<text class="item">{{detailData.grade}}</text>
		</view>
		<view>
			<text class="title">版本号：</text>
			<text class="item">{{detailData.adress}}</text>
		</view>
		<view>
			<text class="title">应急预案：</text>
			<text class="item-pdf">{{detailData.case}}</text>
		</view>
		<view>
			<text class="title">审批附件：</text>
			<text class="item-pdf" @click="pdfOnclick">{{detailData.casetype}}</text>
		</view>
		<view>
			<text class="title">审核意见：</text>
			<text class="item">{{detailData.cause}}</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				pdfUrl1:"",
				pdfUrl2:"",
				detailData: {
					name: "小型氧气泄漏事故",
					time: "2020-07-05 11:11:11",
					type: "有毒气体泄漏",
					grade: "4级",
					unit: "某某化学品公司",
					adress: "某某化学品公司一号厂房",
					case: "生产安全事故应急救援方案.pdf",
					casetype: "生产安全事故应急救援方案.pdf",
					cause: "斯蒂芬",
					precaution: "某某化学品公司"
				}
			}
		},
		methods: {
			pdfOnclick() {
				console.log('下载文档');
				uni.downloadFile({
				  url: 'https://th.bing.com/th/id/Rb57dc08e4e1edffa3b57bbb37a51f8af?rik=SiAvecKsV%2fXXyw&riu=http%3a%2f%2fpic31.nipic.com%2f20130709%2f12886717_151125416192_2.png&ehk=gNgQ4bfpebmgHCjg7MAzJ0uZSdZ4kZVFrpPaHUZXjh8%3d&risl=&pid=ImgRaw',
				  success: function (res) {
					  console.log(res);
				    var filePath = res.tempFilePath;
				    uni.openDocument({
				      filePath: filePath,
				      success: function (res) {
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
