<!-- 未完成！！！！！ -->
<template>
	<view class="ux-bg-grey5" style="min-height:100vh;">
		<!-- headers begin -->
		<view class="ux-flex ux-align-items-start ux-bg-primary ux-padding">
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
	export default {
		data() {
			return {
				"keyword": "",
				"date": "",
				"data": [],
				"title": "",
				"colorMap": {
					"": "#a9dfbf", // 普慢
					"1": "#a9dfbf", // 普慢
					"2": "#a9dfbf", // 普慢
					"3": "#a9dfbf", // 普慢
					"4": "#a9dfbf", // 普慢
					"5": "#a9dfbf", // 普慢
					"6": "#a9dfbf", // 普慢
					"7": "#a9dfbf", // 普慢
					"8": "#a9dfbf", // 普慢
					"K": "#f39c12", // 快速
					"T": "#114514", // 特快
					"Z": "#114598", // 直特
					"G": "#c0392b", // 高动
					"D": "#5499c7", // 动车+城际
					"C": "#98c0da",
					"S": "#8e44ad", // 市域
					"L": "#a9dfbf", // 临客
					"Y": "#f39c12" // 旅游
				}
			}
		},
		onLoad(options) {
			this.keyword = options.keyword;
			this.title = this.keyword
			this.date = options.date;
			this.fillInData();
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
					console.log(this.data)
				} catch (error) {
					console.error("数据加载失败", error);
				}
			}
		}
	}
</script>