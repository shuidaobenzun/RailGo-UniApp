<!-- 未完成！！！！！ -->
<template>
	<view class="ux-bg-grey5" style="min-height:100vh;">
		<!-- headers begin -->
		<view class="ux-flex ux-align-items-center ux-bg-primary ux-padding">
			<view style="border-radius:50%;" hover-class="ux-tap" @click="back">
				<uni-icons class="va" color="white" type="arrow-left" size="25"></uni-icons>
			</view>
			&nbsp;&nbsp;
			<text class="ux-h4 ux-color-white va">{{title}}</text>
		</view>
		<!-- headers end -->
		<view class="ux-padding">
			<view class="ux-text-center ux-padding-small ux-mb ux-h6"
				style="background-color:#e3edff;border:1px solid #114598;border-radius:10rpx;color:#114598;">
				<text class="ux-bold">信息仅供参考 请以铁路运营企业实际运用为准</text>
			</view>
			<navigator v-for="(item,index) in data" :key="index" :url="'/pages/train/trainResult?keyword='+item.number">
				<view class="ux-bg-white ux-border-radius ux-mt-small ux-flex">
					<view :style="'background-color:'+this.colorMap[item.number[0]]">
						&nbsp;&nbsp;
					</view>
					<view class="ux-flex ux-align-items-center ux-space-between ux-pr ux-pt ux-pb ux-pl-small"
						style="width:100%;">
						<view style="width:calc(100% - 70px);">
							<view class="ux-flex ux-align-items-center">
								<text class="consolas" style="font-size:40rpx;">{{item.numberFull.join("/")}}</text>
								<text class="ux-ml-small ux-badge ux-color-white"
									:style="'background-color:'+this.colorMap[item.number[0]]">{{item.type}}</text>
							</view>
							<text class="ux-text-small">{{item.timetable[0].station}} ⋙
								{{item.timetable[item.timetable.length-1].station}}</text>
						</view>
						<text class="ux-text"><text class="icon">&#xe5c8;</text></text>
					</view>
				</view>
			</navigator>
			<br>
			<view class="ux-flex ux-row ux-justify-content-center">
				<text class="ux-text-small ux-opacity-4">—— 数据来源: MoeFactory ——</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		query
	} from "@/scripts/jsonDB.js";
	import {
		toRaw
	} from "@vue/reactivity";
	import {
		TRAIN_KIND_COLOR_MAP
	} from "@/scripts/config.js";
	export default {
		data() {
			return {
				"keyword": "",
				"date": "",
				"data": [],
				"title": "",
				"colorMap": TRAIN_KIND_COLOR_MAP
			}
		},
		onLoad(options) {
			this.keyword = options.keyword;
			this.title = this.keyword
			this.date = options.date;
			this.fillInData();
		},
		onShow() {
			plus.navigator.setStatusBarBackground('#114598');
		},
		methods: {
			back: function() {
				uni.navigateBack()
			},
			fillInData: async function() {
				try {
					/*
					const response = await new Promise((resolve, reject) => {
						uni.request({
							url: "https://api.state.railgo.zenglingkun.cn/train/query?train=" + this.keyword + "&date=" + this.date,
							success: (res) => resolve(res.data),
							fail: (error) => reject(error),
						});
					});
					this.data = response.data;*/
					uni.showLoading({
						title:"加载中"
					});
					this.data = toRaw(await query("trains", (item) => {
						if (this.keyword[0] in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
							for (var i = 0; i < item.numberFull.length; i++) {
								if (item.numberFull[i].replace(item.numberKind, "").startsWith(this
										.keyword)) {
									return true;
								}
							}
							return false;
						}
						for (var i = 0; i < item.numberFull.length; i++) {
							if (item.numberFull[i].startsWith(this.keyword)) {
								return true;
							}
						}
						return false;
					})).sort((a, b) => parseInt(a.numberFull.join("/").match(/\d+/)[0]) - parseInt(b.numberFull
						.join("/").match(/\d+/)[0]));
					if(this.data.length==0){
						uni.showModal({
							title: '提示',
							content: '未查询到与条件相符的数据',
							showCancel: false,
							success: function (res) {
								this.back();
							}
						});
						return;
					}else if(this.data.length==1){
						uni.navigateTo({
							url: '/pages/train/trainResult?keyword='+this.data[0].number
						});
					}
				} catch (error) {
					console.error("数据加载失败", error);
					uni.showToast({
						title:"加载失败",
						duration:1000
					});
				}
				uni.hideLoading();
			},
			runsToday: function(item){
				
			}
		}
	}
</script>