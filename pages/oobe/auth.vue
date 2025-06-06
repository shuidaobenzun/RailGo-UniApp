<template>
	<view class="welcome-container">
		<uni-popup ref="message" type="message">
			<uni-popup-message :duration="3000" :type="msgType" :message="messageText"></uni-popup-message>
		</uni-popup>
		<br>
		<view>
			<image src="/static/1f511.svg" class="emoji"></image>
		</view>
		<view class="text-container">
			<text class=" hm title">公测版鉴权</text><br><br>
			<text class=" hm subtitle">本版本为测试版本，不代表最终品质。为避免出现不可预料的后果，需要进行鉴权。</text><br><br>
			<text class="hm subtitle"></text>
			<view class="ux-flex hm" style="align-items: center; margin-bottom: 10px;">
			  <text style="width: 80px; text-align: right;" class="hm">公测码：</text>
			  <uni-easyinput placeholder="请输入公测码" @input="inputCode" style="min-width: 200px; flex-grow: 1;"></uni-easyinput>
			</view>
			<view class="ux-flex hm" style="align-items: center;">
			  <text style="width: 80px; text-align: right;" class="hm">QQ号：</text>
			  <uni-easyinput placeholder="请输入QQ号" @input="inputQQ" style="min-width: 200px; flex-grow: 1;"></uni-easyinput>
			</view>
		</view>
		<button id="next" class="primary-button" @click="check" :loading="load">
			<text class="icon">&#xe5c8;</text>
		</button>
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


<script>
	import axios from "axios";
	export default {
		data() {
			return {
				"code": "",
				"qq": "",
				"load": false,
				"ver": uni.getStorageSync("version"),
				"valid": false,
				"msgType": "success",
				"messageText": ""
			}
		},
		methods: {
			inputCode(e){
				this.code = e
			},
			inputQQ(e){
				this.qq = e
			},
				
			async check(){
				if (this.code == "" || this.qq == ""){
					this.msgType = "error"
					this.messageText = "值不能为空"
					this.$refs.message.open()
					return
				}
				this.load=true;
				try {
					const Response = await axios.get("https://auth.railgo.zenglingkun.cn/api/check/" + this.ver + "?userid=" + this.qq + "&key=" + this.code);
					this.valid = Response.data.valid;
					const button = document.getElementById('next');
					const navigatorControl = document.getElementById('navigator1'); 
					if (this.valid) {
						uni.setStorageSync("qq", this.qq)
						uni.setStorageSync("key", this.code)
						uni.setStorageSync("AuthTime", new Date().getTime())
						this.msgType = "success"
						this.messageText = "验证成功！1秒后自动跳转下一页"
						this.$refs.message.open()
						setTimeout("uni.navigateTo({url: '/pages/oobe/mode'})", 1000 )
						
					} else {
						this.msgType = "error"
						this.messageText = "请检查公测码与QQ号是否正确"
						this.$refs.message.open()
					}
					this.load=false;
				} catch (error) {
					console.error('Error fetching data:', error);
					this.load=false;
					this.msgType = "error"
					this.messageText = "请求错误"
					this.$refs.message.open()
				}
			}
		}
	}
</script>