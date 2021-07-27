<template>
	<view class="content">
		<view>
			<text class="title">事故名称：</text>
			<text class="item">{{detailData.name}}</text>
		</view>
		<view>
			<text class="title">事故单位：</text>
			<text class="item">{{detailData.time}}</text>
		</view>
		<view v-if="false">
			<text class="title">事故类型：</text>
			<text class="item">{{detailData.type}}</text>
		</view v-if="false">
		<view v-if="false">
			<text class="title">事故等级：</text>
			<text class="item">{{detailData.level}}</text>
		</view>
		<view>
			<text class="title">事故单位：</text>
			<text class="item">{{detailData.unit}}</text>
		</view>

		<view>
			<text class="title">事故地点：</text>
			<text class="item">{{detailData.address}}</text>
		</view>
		<view class="uni-flex uni-row" v-if="false">
			<view class="text-style">
				<text class="title">死亡人数：</text>
			    <text class="item">{{detailData.deathToll}}</text>
			</view>
			<view class="text-style">
				<text class="title">失踪人数：</text>
			    <text class="item">{{detailData.missing}}</text>
			</view class="text-style">
			<view>
				<text class="title">重伤人数：</text>
			    <text class="item">{{detailData.seriouslyInjured}}</text>
			</view>
		</view>
		<view v-if="false">
			<text class="title">经济损失：</text>
			<text class="item">{{detailData.eonomicLosses}}</text>
		</view>
		<view>
			<text class="title">事故原因：</text>
			<text class="item">{{detailData.reason}}</text>
		</view>
		<view v-if="false">
			<text class="title">事故结果：</text>
			<text class="item">{{detailData.consequence}}</text>
		</view>
		<view>
			<text class="title">改进单位：</text>
			<text class="item">{{detailData.improvementUnit}}</text>
		</view>
		<view v-if="false">
			<text class="title">改进内容：</text>
			<text class="item">{{detailData.improveContent}}</text>
		</view>
		<view>
			<text class="title">改进跟进：</text>
			<text class="item">{{detailData.improvementFollowUp}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData: {
					name: "",
					time: "2020-07-05 11:11:11 至 2020-09-05 11:11:11",
					type: "常规演练",
					level:"IV级",
					unit:"浙江化学品公司",
					address:"氯气生产一号车间",
					deathToll:"0",
					missing:"0",
					seriouslyInjured:"2",
					eonomicLosses:"280万",
					reason:"违规投料导致化学爆炸",
					consequence:"救援队扑灭",
					improvementUnit:"浙江化学品公司",
					improveContent:"投料审批验证",
					improvementFollowUp:"改进完成"
				}
			}
		},
		onLoad() {
			this.detailData.name = this.$route.query.dtl.accidentName;
			this.detailData.time = this.$route.query.dtl.occurrenceTime;
			this.detailData.unit = this.$route.query.dtl.accidentUnit;
			this.detailData.address = this.$route.query.dtl.accidentPoint;
			this.detailData.reason = this.$route.query.dtl.accidentReason;
			this.detailData.improvementUnit = this.$route.query.dtl.improvementUnit;
			this.detailData.improvementFollowUp = this.$route.query.dtl.improvementStatus;			
		},
		methods: {
		}
	}
</script>

<style>
	
	.text-style{
		width: 33.3%;
	}
	
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
