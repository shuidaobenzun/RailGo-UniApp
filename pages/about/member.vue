<template>
	<view class="ux-bg-grey5" style="height:100vh;">
		<!-- headers begin -->
		<view class="ux-flex ux-align-items-start ux-bg-primary ux-padding">
			<view style="border-radius:50%;" hover-class="ux-tap" @click="back">
				<uni-icons class="va" color="white" type="arrow-left" size="25"></uni-icons>
			</view>
			&nbsp;&nbsp;
			<text class="ux-h4 ux-color-white va">开发人员</text>
		</view>

		<!-- Main content -->
		<view class="content">
			<text class="ux-text-center ux-h3 thanks-text">Thanks</text>
			<view class="developer-list">
				<text class="ux-h5 developer-name">@XHG78999</text>
				<text class="ux-h5 developer-name">@zlk-sys（辰墨）</text>
				<text class="ux-h5 developer-name">@mstouk57g</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			back: function() {
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	.content {
		padding: 20px;
		text-align: center;
	}

	.thanks-text {
		font-size: 32px;
		font-weight: bold;
		color: #333;
		margin-top: 30px;
	}

	.developer-list {
		margin-top: 20px;
	}

	.developer-name {
		display: block;
		font-size: 18px;
		color: #555;
		margin: 5px 0;
	}

</style>
