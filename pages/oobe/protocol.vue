<template>
	<view class="welcome-container">
		<br>
		<view>
			<image src="/static/1f4c4.svg" class="emoji"></image>
		</view>
		<view class="text-container">
			<text class=" hm title">用户协议</text><br><br>
			<text class=" hm subtitle">在使用我们的软件之前，请阅读我们的<text class="ux-color-blue2" @click="Toyhxy">用户协议</text>的有关内容。</text><br><br>
			<text class="hm subtitle"></text>
			<checkbox-group @change="check">
			<label class="hm" style="font-size: 27rpx;">
				<checkbox value="c" class="ux-color-blue2" style="transform:scale(0.8)" />我已认真阅读并同意用户协议的有关内容
			</label>
			</checkbox-group>
		</view>
		<navigator id="navigator1" :url=url >
		<button id="next" class="primary-button">
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
	background-color: gray; 
	color: #fff;
	margin-top: 80rpx; 
/* 	box-shadow: 0 4px 10px rgba(0, 122, 255, 0.3); */ 
}

.icon {
	font-size: 40rpx; 
}
</style>


<script>
	export default {
		data() {
			return {
				"checked": false,
				"url": "/pages/oobe/protocol"
			}
		},
		methods: {
			Toyhxy() {
				uni.navigateTo({
					url: '/pages/oobe/yhxy'
				})
			},
			check: function(e) {
			    const button = document.getElementById('next');
			    const navigatorControl = document.getElementById('navigator1'); // 假设navigator控件是这个元素
			    if (e.detail.value.length == 0) {
			        button.style.backgroundColor = 'gray'; // 设置背景色为灰色
			        this.url = ''; // 禁用navigator控件
			    } else {
			        button.style.backgroundColor = '#007aff'; // 设置背景色为007aff
			        this.url = "/pages/oobe/auth"; // 启用navigator控件
			    }
			}
		}
	}
</script>