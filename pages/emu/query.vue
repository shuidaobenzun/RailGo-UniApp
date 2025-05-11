<template>
	<view class="ux-bg-grey5" style="height:100vh;">
		<!-- headers begin -->
		<view class="ux-flex ux-align-items-start ux-bg-primary ux-padding">
			<view style="border-radius:50%;" hover-class="ux-tap" @click="back">
				<uni-icons class="va" color="white" type="arrow-left" size="25"></uni-icons>
			</view>
			&nbsp;&nbsp;
			<text class="ux-h4 ux-color-white va">动车组担当查询</text>
		</view>
		<!-- headers end -->
		<view class="ux-flex ux-justify-content-start">
			<image src="/static/emu-overlay.png" mode="widthFix" style="width:100vh;"></image>
		</view>
		<view class="ux-padding ux-bg-grey5">
			<text class="ux-h6">车次/车组号</text>
			<view class="ux-bg-white ux-border-radius-small">
				<input type="text" class="ux-form-input ux-padding-small" placeholder="G1202 或 CR400BF-5033"
					@input="inputData" />
			</view>
			<view>
				<switch checked class="ux-pb-small" color="#114598" style="transform:scale(0.7);margin-left:-1vh;" @change="futureData"/>
				<text class="va">查询未来车次信息</text>
			</view>
			<button type="primary" style="background-color:#114598;color:#ffffff;" hover-class="ux-tap"
				@click="jumpToResult()">查询</button>
			<br>
			<view class="ux-padding-small ux-mb ux-h6"
				style="background-color:#e3edff;border:1px solid #114598;border-radius:10rpx;color:#114598;">
				<text>本功能支持车组模糊查询及未来7天车次查询功能，支持重连车组合并展示。<br></text>
				<text class="ux-bold">信息仅供参考，可能与实际不符，请以铁路运营企业实际运用为准。</text>
			</view>
			<br>
			<view class="ux-flex ux-row ux-justify-content-center">
				<text class="ux-text-small ux-opacity-4">—— 数据来源: CR-EMU-Tracker ——</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				"keyword": "",
				"future": true
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
					url: "/pages/emu/result?keyword=" + this.keyword + "&future=" + this.future
				})
			},
			inputData: function(e) {
				this.keyword = e.detail.value;
			},
			futureData: function(e){
				this.future = e.detail.value;
			}
		}
	}
</script>

<style>

</style>