<template>
	<view class="ux-bg-grey5" style="height:100vh;">
		<!-- headers begin -->
		<view class="ux-flex ux-align-items-start ux-bg-primary ux-padding">
			<view style="border-radius:50%;" hover-class="ux-tap" @click="back">
				<uni-icons class="va" color="white" type="arrow-left" size="25"></uni-icons>
			</view>
			&nbsp;&nbsp;
			<text class="ux-h4 ux-color-white va">特别鸣谢</text>
		</view>

		<!-- Main content -->
		<view style=" margin-left: 15rpx;"><br/>
		<uni-section title="开发者" type="line" style="background-color: transparent;" title-font-size="35rpx"></uni-section>
		<fui-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1316280182"></fui-avatar>&nbsp;
		<fui-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=572747232"></fui-avatar>&nbsp;
		<fui-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1219439938"></fui-avatar>&nbsp;
		<fui-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=3776473661"></fui-avatar>&nbsp;
		</view>
		
		<view style=" margin-left: 15rpx;"><br/>
		<uni-section title="反馈" type="line" style="background-color: transparent;" title-font-size="35rpx"></uni-section>
		    <fui-avatar v-for="(nk, index) in items" :src="`https://q1.qlogo.cn/g?b=qq&s=100&nk=${nk}`"></fui-avatar>
		</view>
		
	</view>
</template>

<script>
	import axios from "axios";

	export default {
		// Railgo Code
		data() {
			return {
				items: []
			};
		},
		mounted() {
			this.fetchData();
		},
		methods: {
			async fetchData() {
				try {
					const Response = await axios.get("https://feedback.azteam.cn/api/get_users");
					this.items = Response.data.users;
				} catch (error) {
					console.error('Error fetching data:', error);
					this.items = [];
				}
			}
		}
	};
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
