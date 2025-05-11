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
			<view class="ux-padding-small ux-mb ux-h6 ux-text-center"
				style="background-color:#e3edff;border:1px solid #114598;border-radius:10rpx;color:#114598;">
				<text class="ux-bold">信息仅供参考 请以铁路运营企业实际运用为准</text>
			</view>

			<!-- 车次小卡片 -->
			<view class="ux-bg-white ux-border-radius ux-box-shadow" style="position: relative;z-index:0;">
				<view class="ux-flex ux-space-between ux-pt ux-pl ux-pr">
					<view>
						<text class="ux-bold consolas" style="font-size:60rpx;"
							:style="'color:'+this.cardColor">{{this.carData.numberKind}}</text>
						<text class="ux-bold consolas"
							style="font-size:50rpx;padding-left:5rpx;">{{this.carData.numberFull.join("/").replace(this.carData.numberKind, "").replace(this.carData.numberKind, "")}}</text>
					</view>
					<text class="ux-badge ux-text-small ux-color-white ux-bold"
						style="padding-top:0.3vh;margin-top:1vh;"
						:style="'background-color:'+this.cardColor">{{this.carData.type}}</text>
				</view>
				<view class="ux-flex ux-space-between ux-mt-small ux-pb-small ux-pl ux-pr ux-pt-small ux-color-white"
					:style="'background-color:'+this.cardColor">
					<text class="ux-text-small">{{this.carData.timetable[0].station}} ⋙
						{{this.carData.timetable[this.carData.timetable.length-1].station}} |
						{{Math.floor(this.carData.spend/60)}}h{{this.carData.spend%60}}m</text>
					<text class="ux-text-small">{{this.carData.bureauName}}{{this.carData.runner}}&nbsp;&nbsp;</text>
				</view>
				<view style="position: absolute;z-index: -1;width:100%;bottom:-0.5vh;" class="ux-border-radius"
					:style="'background-color:'+this.cardColor">
					&nbsp;
				</view>
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
						<uni-th width="100">车站名</uni-th>
						<uni-th width="80">车次</uni-th>
						<uni-th width="60">到达</uni-th>
						<uni-th width="60">出发</uni-th>
						<uni-th width="75">停车</uni-th>
						<uni-th width="85">里程</uni-th>
						<uni-th width="90">区间均速</uni-th>
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
						<uni-td style="border:none">{{item.stopTime}} 分</uni-td>
						<uni-td style="border:none">{{item.distance}} km</uni-td>
						<uni-td style="border:none">{{item.speed}} km/h</uni-td>
						<uni-td style="border:none">{{item.day}} 天</uni-td>
					</uni-tr>
				</uni-table>

				<uni-section title="正晚点信息" type="line" style="background-color: transparent;"
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
						<uni-td>{{item.trainNumber}}<uni-badge v-if="crType === 'CR400'" text="复"
								type="error"></uni-badge>
							<uni-badge v-if="crType === 'CR300'" text="复" type="warning"></uni-badge>
							<uni-badge v-if="crType === 'CR200'" text="复" type="success"></uni-badge></uni-td>
						<uni-td>{{item.arrivalTime}}<br>{{item.departureTime}}</uni-td>
						<uni-td>{{item.arrivalDate}}</uni-td>
						<uni-td>{{item.status}}</uni-td>
					</uni-tr>
				</uni-table>
			</view>

			<view v-if="selectIndex==1">
				<uni-section title="交路" type="line" style="background-color: transparent;"
					title-font-size="25rpx"></uni-section>


				<navigator v-for="(item,index) in carData.diagram" :key="index"
					:url="'/pages/train/trainResult?keyword='+item.train_num">
					<view class="ux-bg-white ux-border-radius ux-mt-small ux-flex">
						<view :style="'background-color:'+this.colorMap[item.train_num[0]]">
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
	export default {
		components: {
			calendar
		},
		data() {
			return {
				"carData": {},
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
				},
				"delay": [],
				"title": this.keyword,
				"train": "",
				"cardColor": "#114598",
				"cardBureau": "Q",
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
			this.train = options.keyword;
			this.title = this.train;
			this.fillInData(); // 调用数据填充方法
		},
		methods: {
			back: function() {
				uni.navigateBack()
			},
			fillInData: async function() {
				try {
					this.carData = toRaw(await queryMainKey("trains", this.title)).at(0);
					this.cardColor = this.colorMap[this.carData.numberKind];
					console.log(this.carData);
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