<template>
	<view class="welcome-container">
		<br><br>
		<view>
			<image src="/static/1f5a5-fe0f.svg" class="emoji"></image>
		</view>
		<view class="text-container">
			<text class=" hm title">使用模式</text><br><br>
			<text class=" hm subtitle">请选择您的使用模式</text><br><br>
			<text class="hm subtitle">无需担心，该设置可以在设置中随时修改</text><br><br>
			<uni-data-checkbox style="margin-left: 60rpx;" class="hm" mode="button" v-model="checked" :localdata="ld"></uni-data-checkbox>
		</view>
		<button class="primary-button" @click="finish">
			<text class="icon">&#xe5c8;</text>
		</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				"ld": [
					{
						text: "优先在线",
						value: "network"
					},
					{
						text: "优先离线",
						value: "local"
					}
				],
				"checked": "network",
			}
		},
		methods: {
			finish: function() {
				uni.setStorageSync("mode", this.checked)
				uni.setStorageSync("oobe", true)
				uni.navigateTo({
					url: '/'
				})
			}
		}
	}
</script>

<style>
.welcome-container {
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #f8f8f8; 
	padding-top: 100rpx; 
}


.emoji {
	height: 180rpx; 
	width: 180rpx;
	display: block;
}

.text-container {
	text-align: center;
	margin-top: 60rpx;
	padding: 0 40rpx; 
}

.title {
	font-size: 48rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 10rpx;
}

.subtitle {
	font-size: 28rpx; 
	color: #666;
	line-height: 1.6; 
}

.primary-button {
	width: 100rpx; 
	height: 100rpx;
	border-radius: 50%;
	text-align: center;
	line-height: 100rpx;
	background-color: #007aff; 
	color: #fff;
	margin-top: 80rpx; 
	box-shadow: 0 4px 10px rgba(0, 122, 255, 0.3); 
}

.icon {
	font-size: 40rpx; 
}
</style>
