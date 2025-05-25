<template>
	<view class="ux-bg-grey5" style="height:100vh;">
		<!-- headers begin -->
		<view class="ux-flex ux-align-items-start ux-bg-primary ux-padding">
			<view style="border-radius:50%;" hover-class="ux-tap" @click="back">
				<uni-icons class="va" color="white" type="arrow-left" size="25"></uni-icons>
			</view>
			&nbsp;&nbsp;
			<text class="ux-h4 ux-color-white va">车次查询</text>
		</view>
		<!-- headers end -->
		<view class="ux-flex ux-justify-content-start">
			<image src="~@/static/overlay/train_query.png" style="width: 100vw" mode="widthFix"></image>
		</view>
		<view class="ux-padding ux-bg-grey5">
			<text class="ux-h6">车次</text>
			<view class="ux-bg-white ux-border-radius-small">
				<input type="text" class="ux-form-input ux-padding-small" placeholder="G3 或 D1" @input="inputData" />
			</view>
			<text class="ux-h6">日期</text>
			<view class="ux-bg-white ux-border-radius-small ux-mb-small">
				<uni-datetime-picker type="date" v-model="today" start="2007-04-18" end="2099-01-01" @change="inputDate" />
			</view>
			<button type="primary" style="background-color:#114598;color:#ffffff;" hover-class="ux-tap"
				@click="jumpToResult()">查询</button>
			<br>
			<view class="ux-text-center ux-padding-small ux-mb ux-h6"
				style="background-color:#e3edff;border:1px solid #114598;border-radius:10rpx;color:#114598;">
				<text class="ux-bold">信息仅供参考 请以铁路运营企业实际运用为准</text>
			</view>
			<br>
			<view class="ux-flex ux-row ux-justify-content-center">
				<text class="ux-text-small ux-opacity-4">—— 数据来源: MoeFactory ——</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				"keyword": "",
				"date": new Date().toISOString().slice(0, 10).replace("-","").replace("-",""),
				"today": new Date().toISOString().slice(0, 10)
			}
		},
		methods: {
			back: function() {
				uni.navigateBack()
			},
			jumpToResult: function() {
				if (this.keyword == "" || this.date == "") {
					uni.showToast({
						icon: "none",
						title: "不允许输入空值"
					})
				}
				uni.navigateTo({
					url: "/pages/train/result?keyword=" + this.keyword + "&date=" + this.date
				})
			},
			inputData: function(e) {
				this.keyword = e.detail.value;
			},
			inputDate: function(e) {
				// replace不用RegExp只会替换一次
				this.date = e.replace("-","").replace("-","");
			}
		}
	}
</script>

<style>

</style>