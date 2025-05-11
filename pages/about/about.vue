<template>
	<view class="ux-bg-grey5" style="height: 100vh; position: relative;">
		<!-- headers begin -->
		<view class="ux-flex ux-align-items-start ux-bg-primary ux-padding">
			<view style="border-radius:50%;" hover-class="ux-tap" @click="back">
				<uni-icons class="va" color="white" type="arrow-left" size="25"></uni-icons>
			</view>
			&nbsp;&nbsp;
			<text class="ux-h4 ux-color-white va">关于</text>
		</view>
		<!-- headers end -->

		<view class="ux-padding ux-bg-grey5" style="text-align: center;">
			<br/>
			<image src="~@/static/logo.png" style="width: 140rpx; height: 140rpx;" @click="add"></image><br/>
			<text class="ux-bold ux-h4">RailGo</text><br/>
			<text style="font-size: 12px; color: grey;">Version 1.0 Pre</text>
		</view>

		<view class="ux-padding ux-bg-grey5">
			<view class="ux-th ux-bg-white ux-border-radius-large ux-padding ux-ml-small ux-flex ux-space-between ux-padding ux-mt-small">
				<text class="ux-text-left ux-text-small">QQ交流群</text>
				<text class="ux-text-right ux-text-small ux-color-grey1">929571596</text>
			</view>
			<view class="ux-th ux-bg-white ux-border-radius-large ux-padding ux-ml-small ux-flex ux-space-between ux-padding ux-mt-small">
				<text class="ux-text-left ux-text-small">开源协议</text>
				<text class="ux-text-right ux-text-small ux-color-grey1">MIT</text>
			</view>
			<navigator url="/pages/about/member" class="ux-th ux-bg-white ux-border-radius-large ux-padding ux-ml-small ux-padding ux-mt-small">
				<view class="ux-flex ux-space-between">
					<text class="ux-text-small">开发人员</text>
					<text class="ux-text-small ux-color-grey1"><text class="icon">&#xe5c8;</text></text>
				</view>
			</navigator>
			<navigator v-if="count >= 10" url="/pages/about/egg" class="ux-th ux-bg-white ux-border-radius-large ux-padding ux-ml-small ux-mt-small">
				<view class="ux-flex ux-space-between">
					<text class="ux-text-left ux-text-small">达速跨越北京北站！</text>
					<text class="ux-text-right ux-text-small ux-color-grey1"><text class="icon">&#xe5c8;</text></text>
				</view>
			</navigator>
		</view>

		<text class="ux-color-grey2 va" style="text-align: center; position: absolute; bottom: 50rpx; width: 100%; font-size: 23rpx;">赣ICP备2023000786号-2A</text>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 0
			};
		},
		methods: {
			back: function() {
				uni.navigateBack()
			},
			add: function() {
				this.count += 1
			}
		}
	}
</script>

<style>

</style>
