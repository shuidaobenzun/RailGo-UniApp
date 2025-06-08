<template>
	<view class="ux-bg-grey6" style="min-height:100vh;">
		<view class="ux-bg-primary">&nbsp;</view>
		<view class="ux-padding-large">
			<view class="ux-mt-large">
				<text class="ux-h1">马上开始...</text><br><br>
				<text class="ux-h6">正在下载离线数据库。</text><br><br>
				<progress :percent="downloadProgress" show-info stroke-width="3" activeColor="#114598" />
			</view>
		</view>
	</view>
</template>
<script>
	import axios from "axios";
	export default {
		data() {
			return {
				downloadProgress: 0
			}
		},
		onReady() {
			// #ifdef APP-PLUS
			try {
				const response = await axios.get("https://api.railgo.dev/app/v0/latestDatabase");
				const downloadTask = uni.downloadFile({
					url: response.data.url,
					success: res => {
						uni.saveFile({
							tempFilePath: res.tempFilePath,
							success: (r) => {
								plus.zip.decompress(r.savedFilePath, "_doc/", () => {
									this.end();
								}, () => {
									throw "解压错误";
								});
							}
						});
					}
				});
				downloadTask.onProgressUpdate((res) => {
					this.downloadProgress = res.progress;
				});
			} catch (e) {
				uni.showToast({
					icon: "errror",
					title: "下载发生错误，请重进APP再试"
				});
			}
			// #endif
			// #ifdef H5
			this.end();
			// #endif
		},
		methods: {
			end: function() {
				uni.setStorageSync("oobe", true);
				uni.navigateTo({
					url: '/'
				});
			}
		}
	}
</script>

<style>
	.primary-button {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 100rpx;
		background-color: #114598;
		color: #fff;
		margin-top: 80rpx;
	}

	.icon {
		font-size: 40rpx;
	}
</style>