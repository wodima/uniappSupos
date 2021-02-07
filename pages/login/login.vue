<template>
	<view class="content">
		<view class="account ">
			 <input class="uni-input" focus placeholder="请输入用户名" />
		</view>
		<view class="account ">
			 <input class="uni-input" focus placeholder="请输入密码" />
		</view>
		<button class="button" type="primary">登陆</button>
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
.content{
	background-color: #FFFFFF;
	margin-top: 300rpx;
	text-align: center;
}
.account{
	width: 100%;
	height: 120rpx;
	line-height: 120rpx;
	margin-left: 80rpx;
	margin-right: 80rpx;
	align-items: center;
	
}

.button{
	margin-left: 100rpx;
	margin-right: 100rpx;
	margin-top: 30rpx;
}

	.uni-input {
		width: 80%;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		overflow: hidden;
		
		flex: 1;
		justify-content: center;
		flex-direction: row;
		align-items: center;
		height: 90rpx;
		
		padding: 5px 8px 5px 0px;
		border-width: 0.2px;
		border-color: #E6E6E6;
		border-style: solid;
	}

</style>
