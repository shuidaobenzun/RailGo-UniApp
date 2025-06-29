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
		<view class="ux-padding">
			<!-- 站名小卡片 -->
			<view class="ux-bg-white ux-border-radius">
				<view class="ux-pl ux-pr ux-pb-small ux-pt ux-flex ux-align-items-center ux-justify-content-center">
					<view class="ux-flex ux-align-items-center">
						<view v-for="(tag,i) in this.data.type" :key="i">
							<text class="ux-badge ux-color-white ux-mr-small"
								:style="'background-color:'+this.badgeFlag[tag]">{{tag}}</text>
						</view>
					</view>
					<view>
						<text class="ux-h3">{{this.data.name}}站</text><br>
						<text class="ux-text-small">{{this.data.pinyin}} Station</text>
					</view>
				</view>
				<view
					class="ux-flex ux-space-between ux-color-white ux-pt-small ux-pb-small ux-pl ux-pr ux-text-small"
					style="border-bottom-left-radius:10rpx;border-bottom-right-radius:10rpx;"
					:style="'background-color:'+(this.data.type.includes('客')?'#114598':'#eeba67')">
					<text>{{this.data.pinyinTriple}}/-{{this.data.telecode}}</text>
					<text>{{this.data.bureau}} {{this.data.belong}}辖</text>
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

			<view class="ux-pt" v-if="selectIndex==0">
				<view v-if="this.trains.length!=0">
					<view class="ux-flex">
						<button class="ux-flex1 ux-mr-small ux-bg-primary ux-color-white" size="mini">
							<view class="ux-flex ux-align-items-center ux-justify-content-center">
								<text class="icon">&#xe164;</text>&nbsp;排序
							</view>
						</button>
						<button class="ux-flex1 ux-ml-small ux-bg-primary ux-color-white" size="mini">
							<view class="ux-flex ux-align-items-center ux-justify-content-center">
								<text class="icon">&#xe06d;</text>&nbsp;筛选
							</view>
						</button>
					</view>
					<br>
					<uni-table border stripe>
						<uni-tr>
							<uni-th align="center" width="70">车次</uni-th>
							<uni-th align="center">起点</uni-th>
							<uni-th align="center">终点</uni-th>
							<uni-th align="center" width="60">到达</uni-th>
							<uni-th align="center" width="60">出发</uni-th>
							<uni-th align="center" width="60">停车</uni-th>
						</uni-tr>
						<uni-tr v-for="(item,index) in trains" :key="index">
							<uni-td>{{item.numberKind + item.numberFull.join("/").replace(item.numberKind, "").replace(item.numberKind, "")}}</uni-td>
							<uni-td>{{item.timetable[0].station}}</uni-td>
							<uni-td>{{item.timetable[item.timetable.length-1].station}}</uni-td>
							<uni-td>{{item.timetable[item.indexStopThere].arrive}}</uni-td>
							<uni-td>{{item.timetable[item.indexStopThere].depart}}</uni-td>
							<uni-td>{{item.timetable[item.indexStopThere].stopTime}}'</uni-td>
						</uni-tr>
					</uni-table>
				</view>
				<view v-if="this.trains.length==0">
					<view class="ux-padding ux-text-center">本站不办理客运业务或无列车停靠</view>
				</view>
			</view>

			<view class="ux-padding ux-text-center" v-if="selectIndex==2">
				<text>暂未开放，敬请期待</text>
			</view>
		</view>
	</view>
</template>

<<<<<<< HEAD
<script>
	import {
		queryMainKey
	} from "@/scripts/jsonDB.js";
	import {
		toRaw
	} from "@vue/reactivity";
	export default {
		data() {
			return {
				keyword: "",
				data: {},
				badgeFlag: {
					"客": "#114598",
					"货": "#eeba67",
					"高": "#c0392b",
					"行": "#459811",
					"运": "#5499c7"
				},
				topTabList: [{
					name: '车次',
				}, {
					name: '大屏',
				}, {
					name: '路线'
				}],
				selectIndex: 0,
				trains: []
			}
		},
		onLoad(options) {
=======
<script>
	import json from '~@/static/offline/stations.json'
	export default {
		data() {
			return {
				"keyword": "",
				"data": []  ,// 用于存储过滤后的数据,
				"title": this.keyword
			}
		},
		onLoad(options) {
>>>>>>> ce7d720ee640acdb2851c1f5a0b1c048322fdd2b
			this.keyword = options.keyword;
			this.fillInData();
		},
		methods: {
			// 返回上一页
			back: function() {
				uni.navigateBack();
			},
			fillInData: async function() {
				this.data = toRaw(await queryMainKey("stations", this.keyword))[0];
				for (let i of this.data.trainList) {
					let t = toRaw(await queryMainKey("trains", i))[0];
					for (var x = 0; x < t.timetable.length; x++) {
						if (t.timetable[x].stationTelecode == this.keyword) {
							t.indexStopThere = x;
							break;
						}
					}
					if(t.indexStopThere!=undefined){
						this.trains.push(t);
					}
				}
			},
			tabChange: function(e) {
				this.selectIndex = e.index;
			}
		}
	}
</script>