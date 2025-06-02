<template>
	<view class="welcome-container">
		<br><br>
		<view>
			<image src="/static/1f44b.svg" class="emoji"></image>
		</view>
		<view class="text-container">
			<text class=" hm title">Hi there</text><br><br>
			<text class=" hm subtitle">欢迎使用RailGo ~</text><br><br>
			<text class="hm subtitle">在使用之前，让我们先进行一些设置吧</text>
		</view>
		<navigator url="/pages/oobe/protocol">
		<button class="primary-button">
			<text class="icon">&#xe5c8;</text>
		</button>
		</navigator>
	</view>
</template>

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