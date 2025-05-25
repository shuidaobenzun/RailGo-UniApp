<template>
	<view class="ux-bg-grey5" style="height:100vh;">
		<!-- headers begin -->
		<view class="ux-flex ux-align-items-center ux-bg-primary ux-padding">
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
		<view class="ux-padding ux-pt-small ux-bg-grey5">
			<text class="ux-h6">车次</text>
			<view style="position:relative;">
				<view class="ux-bg-white ux-border-radius-small">
					<input type="text" class="ux-form-input ux-padding-small" placeholder="车次号码" @input="inputData" v-model="keyword"/>
				</view>
				<view v-if="shouldShowPlacehold()"
					style="position:absolute;z-index:114514;margin-top:-0.78125rem;width:100%;"
					class="ux-bg-white ux-box-shadow ux-text">
					<scroll-view scroll-y="true" style="max-height:5rem;">
						<view v-for="(item,index) in placeholderData" :key="index" class="ux-flex ux-space-between"
							style="padding:0.2rem 0.5rem;" hover-class="ux-bg-grey5"
							@click='inputPlacehold(item.numberFull.join("/"))'>
							<view class="ux-flex ux-space-around">
								<!--
								<view :style="'background-color:'+this.colorMap[item.number[0]]">
									&nbsp;
								</view>
								&nbsp;
								-->
								<view style="font-size:0.96rem;">
									{{item.numberFull.join("/")}}
								</view>
							</view>
							<view class="ux-opacity-5 ux-text-small">
								{{item.timetable[0].station}} ⋙
								{{item.timetable[item.timetable.length-1].station}}
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<text class="ux-h6">日期</text>
			<view class="ux-bg-white ux-border-radius-small ux-mb-small ux-mt-small">
				<uni-datetime-picker type="date" v-model="today" start="2007-04-18" end="2099-01-01"
					@change="inputDate" />
			</view>
			<button type="primary" style="background-color:#114598;color:#ffffff;" hover-class="ux-tap"
				@click="jumpToResult()">查询</button>
			<br>
			<view class="ux-text-center ux-padding-small ux-mb ux-h6"
				style="background-color:#e3edff;border:1px solid #114598;border-radius:10rpx;color:#114598;">
				<text class="ux-bold">信息仅供参考 请以铁路运营企业实际运用为准</text>
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
				"colorMap": TRAIN_KIND_COLOR_MAP,
				"date": new Date().toISOString().slice(0, 10).replace("-", "").replace("-", ""),
				"today": new Date().toISOString().slice(0, 10),
				"placeholderData": [],
				"placeholderCollapsed": false
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
					url: "/pages/train/trainResult?keyword=" + this.keyword + "&date=" + this.date
				})
			},
			inputData: async function(e) {
				this.keyword = e.detail.value;
				if (this.keyword.length >= 2) {
					this.placeholderData = toRaw(await query("trains", (item) => {
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
					this.placeholderCollapsed = false;
				}
			},
			inputDate: function(e) {
				// replace不用RegExp只会替换一次
				this.date = e.replace("-", "").replace("-", "");
			},
			shouldShowPlacehold: function() {
				return this.keyword.length >= 2 && !this.placeholderCollapsed && this.placeholderData.length!=0;
			},
			inputPlacehold: function(ph) {
				this.keyword = ph;
				this.placeholderCollapsed = true;
			}
		}
	}
</script>

<style>

</style>