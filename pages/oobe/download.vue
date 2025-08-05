<template>
	<view class="ux-bg-grey6" style="min-height:100vh;">
		<view class="ux-bg-primary">&nbsp;</view>
		<view class="ux-padding-large">
			<view class="ux-mt-large">
				<text class="ux-h1">马上开始...</text><br><br>
				<text class="ux-h6">正在下载离线数据库。</text><br><br>
				<text>{{err}}</text>
				<progress :percent="downloadProgress" show-info stroke-width="3" activeColor="#114598" />
			</view>
		</view>
	</view>
</template>
<script>
	import uniGet from "@/scripts/req.js";
	import {
		loadDB
	} from "@/scripts/jsonDB.js";
	const saveFileAsync = (tempFilePath) => {
		return new Promise((resolve, reject) => {
			uni.saveFile({
				tempFilePath: tempFilePath,
				success: res => resolve(res),
				fail: err => reject(err)
			});
		});
	};

	const decompressAsync = (filePath, targetDir) => {
		return new Promise((resolve, reject) => {
			plus.zip.decompress(filePath, targetDir, resolve, reject);
		});
	};

	export default {
		data() {
			return {
				downloadProgress: 0,
				err: ""
			}
		},
		async onReady() {
			// #ifdef APP-PLUS
			try {
				const dbUrlResponse = await uniGet("https://api.state.railgo.zenglingkun.cn/api/v1/url/db");
				const downloadUrl = dbUrlResponse.data.url;

				const downloadResult = await new Promise((resolve, reject) => {
					const downloadTask = uni.downloadFile({
						url: downloadUrl,
						success: res => resolve(res),
						fail: err => reject(err)
					});
					downloadTask.onProgressUpdate((res) => {
						this.downloadProgress = res.progress;
					});
				});
				const savedFile = await saveFileAsync(downloadResult.tempFilePath);
				await decompressAsync(savedFile.savedFilePath, "_doc/");
				const infoUrlResponse = await uniGet("https://api.state.railgo.zenglingkun.cn/api/v1/url/info");
				const finalInfoResponse = await uniGet(infoUrlResponse.data.url);
				if (finalInfoResponse.status === 200) {
					uni.setStorageSync("offlineDataVersion", finalInfoResponse.data.latest_db);
					uni.setStorageSync("offlineDataVersionText", finalInfoResponse.data.db);
				} else {
                    throw new Error("获取数据库信息失败: " + JSON.stringify(finalInfoResponse.data));
                }
				await loadDB();
				uni.setStorageSync("oobe", true);
				uni.reLaunch({ 
					url: '/pages/index/index' 
				});

			} catch (e) {
				console.error("下载或初始化过程中发生错误:", e);
				this.err = "发生错误: " + (e.message || JSON.stringify(e));
				uni.showToast({
					icon: "error", 
					title: "下载发生错误，请重试"
				});
			}
			// #endif

			// #ifdef H5
			uni.setStorageSync("oobe", true);
			uni.reLaunch({ 
				url: '/pages/index/index' 
			});
			// #endif
		},
		methods: {
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