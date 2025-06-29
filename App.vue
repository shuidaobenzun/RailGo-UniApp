<script>
	// UXUI INIT
	import {
		loadDB
	} from "@/scripts/jsonDB.js";
	import axios from "axios";

	function checkTime(timestamp1, timestamp2) {
		const interval = 72 * 60 * 60 * 1000;
		const difference = Math.abs(timestamp1 - timestamp2);
		return difference > interval;
	}
	async function check() {
		try {
			const Response = await axios.get("https://auth.railgo.zenglingkun.cn/api/check/" + uni.getStorageSync(
				'version') + "?userid=" + uni.getStorageSync('qq') + "&key=" + uni.getStorageSync('key'));
			if (Response.data.valid) {
				uni.setStorageSync("AuthTime", new Date().getTime())
				console.log("鉴权成功")
			} else {
				uni.showToast({
					title: '鉴权无效',
					position: 'bottom',
				})
				uni.setStorageSync("oobe", false)
				uni.navigateTo({
					url: '/pages/oobe/welcome'
				})
			}

		} catch (error) {
			if (checkTime(uni.getStorageSync("AuthTime"), new Date().getTime())) {
				uni.showToast({
					title: '鉴权超时，请重新鉴权',
					position: 'bottom',
				})
				uni.setStorageSync("oobe", false)
				uni.navigateTo({
					url: '/pages/oobe/welcome'
				})
			} else {
				console.log("无网络但未超时")
			}
		}
	}
	let firstBackTime = 0;
	export default {
		onLaunch: async function() {
			const value = uni.getStorageSync('launchFlag');
			if (value) {
				uni.setStorage({
					key: 'version',
					data: 1
				});
				uni.setStorage({
					key: 'versionText',
					data: "1.0.0 Pre 1"
				});
			} else {
				uni.setStorage({
					key: 'launchFlag',
					data: true
				});
				uni.setStorage({
					key: 'offlineDataVersion',
					data: 0
				});
				uni.setStorage({
					key: 'offlineDataVersionText',
					data: "未下载"
				});
			}
			// #ifdef H5
			await loadDB(); // debug
			// #endif
			// #ifdef APP-PLUS
			if (uni.getStorageSync("mode") == "local") {
				loadDB();
			}
			// #endif
			if (uni.getStorageSync('oobe')) {
				//* 不操作 */
			} else {
				uni.navigateTo({
					url: '/pages/oobe/welcome'
				})
			}

			// 鉴权
			check()

		},
		onShow: function() {},
		onHide: function() {},
		onLastPageBackPress: function() {
			if (firstBackTime == 0) {
				uni.showToast({
					title: '再按一次退出应用',
					position: 'bottom',
				})
				firstBackTime = Date.now();
				setTimeout(() => {
					firstBackTime = 0
				}, 2000);
			} else if (Date.now() - firstBackTime < 2000) {
				firstBackTime = Date.now();
				uni.exit();
			}

		},
		onExit() {},
	}
</script>

<style lang="scss">
	@font-face {
		font-family: "Material Icons";
		src: url("/static/fonts/mdicon.ttf");
	}

	@font-face {
		font-family: "DIN1451";
		src: url("/static/fonts/din1451.ttf");
	}

	@font-face {
		font-family: "HMSans";
		src: url("/static/fonts/hmsans.ttf");
	}

	page {
		font-family: "HMSans";
	}

	.consolas {
		font-family: "DIN1451";
	}

	.icon {
		font-family: "Material Icons";
		font-weight: 300;
	}

	.va {
		vertical-align: middle;
	}

	/* UXUI */

	/* 主体结构 */
	$ux-body-space: 30rpx;
	/* 主题色 */
	$primaryColor: #114598;
	/* 页面背景色 */
	$ux-page-color: #f7f9f9;
	/* 文本颜色 */
	$ux-primary-text-color: rgba(55, 55, 55, 1);
	$ux-secondary-text-color: rgba(116, 116, 116, 1);
	$ux-third-text-color: rgba(150, 150, 150, 1);
	/* 点击背景 */
	$ux-tap-color: rgba(239, 241, 246, 0.3);
	/* 圆角尺寸 */
	$ux-radius-sm: 6rpx;
	$ux-radius: 10rpx;
	$ux-radius-lg: 20rpx;
	/* 文本尺寸 */
	$ux-text: 30rpx;
	$ux-text-small: 24rpx;
	$ux-h1: 60rpx;
	$ux-h2: 50rpx;
	$ux-h3: 40rpx;
	$ux-h4: 36rpx;
	$ux-h5: 32rpx;
	$ux-h6: 30rpx;
	/* 通用间距 */
	$ux-space: 30rpx;
	$ux-space-large: 50rpx;
	$ux-space-small: 16rpx;
	/* 边框颜色 */
	$ux-border-color: #F5F7F8;
	/* 按钮尺寸 */
	$ux-button-text-size: 30rpx;
	$ux-button-size: 82rpx;
	$ux-button-border-radius: 8rpx;
	$ux-button-mini-text-size: 22rpx;
	$ux-button-mini-size: 66rpx;
	@import "@/uni_modules/unix-ui/uxui.scss";
</style>