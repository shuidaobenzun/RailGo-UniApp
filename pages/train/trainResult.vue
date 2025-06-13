<template>
	<view class="ux-bg-grey5" style="min-height:100vh;">
		<!-- headers begin -->
		<view class="ux-bg-primary">&nbsp;</view>
		<view class="ux-padding">
			<view hover-class="ux-bg-grey8" @click="back">
				<text class="icon" style="font-size: 45rpx;">&#xe5c4;</text>
			</view>
		</view>
		<!-- headers end -->
		<view class="ux-pl ux-pr ux-pb">

			<!-- 车次小卡片 -->
			<view class="ux-bg-white ux-border-radius">
				<view class="ux-flex ux-space-between ux-pt ux-pl ux-pr ux-align-items-center">
					<view>
						<text class="ux-bold consolas" style="font-size:60rpx;"
							:style="'color:'+this.cardColor">{{this.carData.numberKind}}</text>
						<text class="consolas"
							style="font-size:50rpx;padding-left:5rpx;">{{this.carData.numberFull.join("/").replace(this.carData.numberKind, "").replace(this.carData.numberKind, "")}}</text>
					</view>
					<text class="ux-badge ux-text-small ux-color-white"
						style="padding:5rpx 15rpx;"
						:style="'background-color:'+this.cardColor">{{this.carData.type}}</text>
				</view>
				<view class="ux-flex ux-space-between ux-mt-small ux-pl ux-pr ux-pt-small ux-color-white"
					:style="'background-color:'+this.cardColor">
					<text class="ux-text-small">{{this.carData.timetable[0].station}} ⋙
						{{this.carData.timetable[this.carData.timetable.length-1].station}}</text>
					<text class="ux-text-small">{{this.carData.bureauName}}{{this.carData.runner}}&nbsp;&nbsp;</text>
				</view>
				<view class="ux-pb-small" style="border-bottom-left-radius:10rpx; border-bottom-right-radius:10rpx;"
					:style="'background-color:'+this.cardColor">
				</view>
			</view>
			<br>
			<view class="ux-padding-small ux-h6 ux-text-center"
				style="background-color:#e9eef5;border:1px solid #114598;border-radius:10rpx;color:#114598;">
				<text class="ux-bold">信息仅供参考 请以铁路运营企业实际运用为准</text>
			</view>
			<view class="ux-flex ux-justify-content-center">
				<uv-tabs :list="topTabList" lineWidth="60" lineColor="#114598" :activeStyle="{
							color: '#303133',
							fontWeight: 'bold',
							transform: 'scale(1.05)'
				    	}" :inactiveStyle="{
							color: '#606266',
							transform: 'scale(1)'
						}" itemStyle="height: 34px;padding-left:30px;padding-right:30px;" class="ux-mt-small"
					@click="tabChange"></uv-tabs>
			</view>

			<view v-if="selectIndex==0">
				<uni-section title="时刻表" type="line" style="background-color: transparent;"
					title-font-size="25rpx"></uni-section>
				<uni-table style="border:none">
					<uni-tr style="border:none">
						<uni-th style="border:none" width="10">
							<image style="width:1px;height:1px;transform:translateY(10px) scale(40);" mode="aspectFit"
								src="@/static/station-mark-th.png"></image>
						</uni-th>
						<uni-th>车站名</uni-th>
						<uni-th width="70">车次</uni-th>
						<uni-th width="60">到达</uni-th>
						<uni-th width="60">出发</uni-th>
						<uni-th width="50">停车</uni-th>
						<uni-th width="80">里程</uni-th>
						<uni-th width="100">区间均速</uni-th>
						<uni-th width="50">日期</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in this.carData.timetable" :key="index" style="border:none"
						hover-class="ux-bg-grey5">
						<uni-td style="border:none">
							<image style="width:1px;height:1px;transform:translateY(-5px) scale(40)" mode="aspectFit"
								src="@/static/station-mark-unpass.png"></image>
						</uni-td>
						<uni-td style="border:none">{{item.station}}</uni-td>
						<uni-td style="border:none">{{item.trainCode}}</uni-td>
						<uni-td style="border:none">{{item.arrive}}</uni-td>
						<uni-td style="border:none">{{item.depart}}</uni-td>
						<uni-td style="border:none">{{item.stopTime}}'</uni-td>
						<uni-td style="border:none">{{item.distance}} km</uni-td>
						<uni-td style="border:none">{{item.speed.toFixed(1)}} km/h</uni-td>
						<uni-td style="border:none">{{item.day}} 天</uni-td>
					</uni-tr>
				</uni-table>

				<uni-section title="正晚点" type="line" style="background-color: transparent;"
					title-font-size="25rpx"></uni-section>
				<uni-table border stripe>
					<uni-tr>
						<uni-th align="center">车站</uni-th>
						<uni-th align="center">车次</uni-th>
						<uni-th align="center">到达时间<br>发车时间</uni-th>
						<uni-th align="center">停站时间</uni-th>
						<uni-th align="center">日期</uni-th>
						<uni-th align="center">状态</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in delay" :key="index">
						<uni-td>{{item.stationName}}</uni-td>
						<uni-td>{{item.trainNumber}}</uni-td>
						<uni-td>{{item.arrivalTime}}<br>{{item.departureTime}}</uni-td>
						<uni-td>{{item.arrivalDate}}</uni-td>
						<uni-td>{{item.status}}</uni-td>
					</uni-tr>
				</uni-table>
			</view>

			<view v-if="selectIndex==1">
				<uni-section title="担当" type="line" style="background-color: transparent;"
					title-font-size="25rpx"></uni-section>
				<view class="ux-bg-white ux-border-radius ux-padding">
					<view class="ux-flex ux-space-between">
						<view class="ux-flex ux-align-items-center">
							<view class="ux-pt-small">
								<text class="ux-color-primary icon" style="font-size:60rpx;">&#xe7fd;</text>
							</view>
							<view class="ux-pl-small">
								<text class="ux-text-small ux-opacity-5">
									值乘单位
								</text>
								<br>
								<text>
									{{this.carData.runner}}
								</text>
							</view>
						</view>
						<view class="ux-flex ux-align-items-center">
							<view class="ux-pt-small">
								<text class="ux-color-primary icon" style="font-size:60rpx;">&#xe570;</text>
							</view>
							<view class="ux-pl-small">
								<text class="ux-text-small ux-opacity-5">
									车辆归属
								</text>
								<br>
								<text>
									{{this.carData.carOwner}}
								</text>
							</view>
						</view>
					</view>
					<uv-divider></uv-divider>
					<view class="ux-flex ux-space-between">
						<text class="ux-text-small ux-opacity-5">车型</text>
						<text>{{this.carData.car}}</text>
					</view>
					<view class="ux-flex ux-space-between ux-align-items-center">
						<view>
							<view class="ux-pr-small ux-flex ux-align-items-center ux-mt-small">
								<text class="ux-color-primary icon" style="font-size:50rpx;">&#xe915;</text>
								<view class="ux-pl-small ux-text-small">
									<text>{{this.carMap[this.carData.car.replace("重联","")][0]}}节编组</text>
								</view>
							</view>
							<view class="ux-pr-small ux-flex ux-align-items-center ux-mt-small">
								<text class="ux-color-primary icon" style="font-size:50rpx;">&#xe5c3;</text>
								<view class="ux-pl-small ux-text-small">
									<text>{{this.carMap[this.carData.car.replace("重联","")][1]}}</text>
								</view>
							</view>
							<view class="ux-pr-small ux-flex ux-align-items-center ux-mt-small">
								<text class="ux-color-primary icon" style="font-size:50rpx;">&#xe556;</text>
								<view class="ux-pl-small ux-text-small">
									<text>{{this.carMap[this.carData.car.replace("重联","")][2]}}</text>
								</view>
							</view>
						</view>
						<view class="">
							<image src="@/static/trainHead/missing.png" style="width:164rpx;height:196rpx;"></image>
						</view>
					</view>
				</view>
				<uni-section title="交路" type="line" style="background-color: transparent;"
					title-font-size="25rpx"></uni-section>
				<navigator v-for="(item,index) in carData.diagram" :key="index"
					:url="'/pages/train/trainResult?keyword='+item.train_num">
					<view class="ux-bg-white ux-border-radius ux-mt-small ux-flex">
						<view style="border-bottom-left-radius: 10rpx; border-top-left-radius:10rpx;" :style="'background-color:'+this.colorMap[item.train_num[0]]">
							&nbsp;&nbsp;
						</view>
						<view class="ux-flex ux-align-items-center ux-space-between ux-pr ux-pt ux-pb ux-pl-small"
							style="width:100%;">
							<view style="width:calc(100% - 70px);">
								<view class="ux-flex ux-align-items-center">
									<text class="consolas" style="font-size:40rpx;">{{item.train_num}}</text>
								</view>
								<text class="ux-text-small">{{item.from[0]}} {{item.from[1]}} ⋙ {{item.to[0]}}
									{{item.to[1]}}</text>
							</view>
							<text class="ux-text"><text class="icon">&#xe5c8;</text></text>
						</view>
					</view>
				</navigator>
				<view v-if="carData.diagram.length==0" class="ux-padding-large ux-text-center">
					暂无交路
				</view>
				<uni-section title="开行日" type="line" style="background-color: transparent;"
					title-font-size="25rpx"></uni-section>
				<calendar class="ux-bg-white ux-border-radius"
					:highlighted-dates="(()=>{var l=[]; this.carData.rundays.forEach((i)=>{l.push({date: i.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3'), bgColor: '#114598'});});return l;})()" />
				<view class="ux-flex ux-space-between ux-pt-small">
					<text class="ux-text-small ux-opacity-4">*实际开行请以站车公告为准</text>
					<view class="ux-flex ux-align-items-center ux-nowrap">
						<view class="ux-bg-primary ux-padding-small" style="width:0.2vh;height:0.2vh;"></view>
						<text>&nbsp;当日开行</text>
					</view>
				</view>
			</view>

			<view class="ux-padding ux-text-center" v-if="selectIndex==2">
				<text>暂未开放，敬请期待</text>
			</view>

			<br>
			<view class="ux-flex ux-row ux-justify-content-center">
				<text class="ux-text-small ux-opacity-4">—— · ——</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryMainKey
	} from "@/scripts/jsonDB.js";
	import calendar from "@/components/diagram-calendar/diagram-calendar.vue";
	import {
		toRaw
	} from "@vue/reactivity";
	import {
		TRAIN_KIND_COLOR_MAP,
		CAR_PERFORMANCE
	} from "@/scripts/config.js";
	export default {
		components: {
			calendar
		},
		data() {
			return {
				"carData": {},
				"colorMap": TRAIN_KIND_COLOR_MAP,
				"carMap": CAR_PERFORMANCE,
				"delay": [],
				"title": this.keyword,
				"train": "",
				"cardColor": "#114598",
				"topTabList": [{
					name: '时刻',
				}, {
					name: '运行',
				}, {
					name: '路径'
				}],
				"selectIndex": 0
			}
		},
		onLoad(options) {
			this.train = options.keyword.split("/")[0];
			this.title = this.train;
			this.fillInData(); // 调用数据填充方法
		},
		onShow() {
			// #ifdef APP
			plus.navigator.setStatusBarBackground('#114598');
			// #endif
		},
		methods: {
			back: function() {
				uni.navigateBack()
			},
			fillInData: async function() {
				try {
					this.carData = toRaw(await queryMainKey("trains", this.title)).at(0);
					this.cardColor = this.colorMap[this.carData.numberKind];
					//console.log(this.carData);
				} catch (error) {

					console.error("数据加载失败", error);
				}
			},
			tabChange: function(e) {
				this.selectIndex = e.index;
			}
		}
	}
</script>