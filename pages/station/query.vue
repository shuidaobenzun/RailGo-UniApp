<template>
	<view class="ux-bg-grey5" style="height:100vh;">
		<!-- headers begin -->
		<view class="ux-flex ux-align-items-start ux-bg-primary ux-padding">
			<view style="border-radius:50%;" hover-class="ux-tap" @click="back">
				<uni-icons class="va" color="white" type="arrow-left" size="25"></uni-icons>
			</view>
			&nbsp;&nbsp;
			<text class="ux-h4 ux-color-white va">车站查询</text>
		</view>
		<!-- headers end -->
		<view class="ux-flex ux-justify-content-start">
			<image src="~@/static/overlay/station.png" style="width: 100vh" mode="left"></image>
		</view>
		<view class="ux-padding ux-bg-grey5">
			<text class="ux-h6">查询关键词</text>
			<view class="ux-bg-white ux-border-radius-small">
				<input type="text" class="ux-form-input ux-padding-small" placeholder="北京北 或 VAP"
					@input="inputData" />
			</view>
			<view>
				<switch class="ux-pb-small" color="#114598" style="transform:scale(0.7);margin-left:-1vh;" @change="vague"/>
				<text class="va">模糊查询</text>
			</view>
			<button type="primary" style="background-color:#114598;color:#ffffff;" hover-class="ux-tap"
				@click="jumpToResult()">查询</button>
			<br>
			<view class="ux-padding-small ux-mb ux-h6"
				style="background-color:#e3edff;border:1px solid #114598;border-radius:10rpx;color:#114598;">
				<text>本功能支持通过多种关键词离线查询车站。<br></text>
				<text class="ux-bold">信息仅供参考，由于数据的时效性，可能与实际不符。</text><br/>
				<text class="ux-bold">请勿输入过于模糊或简短的关键词(例如：1)，否则可能会因为数据过多导致程序卡死。</text>

			</view>
			<br>
			<view class="ux-flex ux-row ux-justify-content-center">
				<text class="ux-text-small ux-opacity-4">—— 数据来源: 铁路12306 ——</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				"keyword": "",
				"vagueData": false,
			}
		},
		methods: {
			back: function() {
				uni.navigateBack()
			},
			jumpToResult: function() {
				if (this.keyword == "") {
					uni.showToast({
						icon: "none",
						title: "不允许输入空值"
					})
				}
				uni.navigateTo({
					url: "/pages/station/result?keyword=" + this.keyword  + "&vague=" + this.vagueData
				})
			},
			inputData: function(e) {
				this.keyword = e.detail.value;
			},
			vague: function(e){
				this.vagueData = e.detail.value;
			}
		}
	}
</script>

<style>

</style>