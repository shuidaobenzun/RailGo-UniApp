<template>
	<view class="ux-bg-grey5" style="height:100vh;">
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
			<view class="ux-padding-small ux-mb ux-h6"
				style="background-color:#e3edff;border:1px solid #114598;border-radius:10rpx;color:#114598;">
				<text class="ux-bold">信息仅供参考，可能与实际不符。</text>
			</view>
			<uni-table border stripe>
				<uni-tr>
						<uni-th align="center">车站名</uni-th>
						<uni-th align="center">拼音码</uni-th>
						<uni-th align="center">电报码</uni-th>
						<uni-th align="center">TMIS</uni-th>
						<uni-th align="center">省份简称</uni-th>
						<uni-th align="center">归属路局</uni-th>
				</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td>{{item.name}}</uni-td>
						<uni-td>{{item.pinyincode}}</uni-td>
						<uni-td>{{item.telecode}}</uni-td>
						<uni-td>{{item.tmis}}</uni-td>
						<uni-td>{{item.region}}</uni-td>
						<uni-td>{{item.bureau}}</uni-td>
					</uni-tr>
			</uni-table>
			<br>
			<view class="ux-flex ux-row ux-justify-content-center">
				<text class="ux-text-small ux-opacity-4">—— 数据来源: 铁路12306 ——</text>
			</view>
		</view>
	</view>
</template>

<script>
	import json from '~@/static/stations.json'
	export default {
		data() {
			return {
				"keyword": "",
				"data": []  ,// 用于存储过滤后的数据,
				"title": this.keyword
			}
		},
		onLoad(options) {
			this.keyword = options.keyword;
			this.vague = options.vague;
			this.jsonData = json;  // 载入JSON数据
			this.fillInData();  // 调用数据填充方法
			if (this.vague === "true"){
				this.title = this.keyword + " (模糊查询)"
			} else{
				this.title = this.keyword
			}
		},
		methods: {
			// 返回上一页
			back: function() {
				uni.navigateBack();
			},
			// 根据关键字过滤数据
			fillInData: function() {
			    const query = this.keyword.toLowerCase();
			    if (!query) {
			        this.data = [];  // 如果没有搜索关键词，清空过滤结果
			        return;
			    }
				if (this.vague === "true"){
					this.data = this.jsonData.filter(item => {
						return Object.keys(item).some(key => {
							if (key === 'bureau') {
								return false; 
							}
							return String(item[key]).toLowerCase().includes(query);
						});
					});
				} else{
					this.data = this.jsonData.filter(item => {
						return Object.keys(item).some(key => {
							return String(item[key]).toLowerCase() === (query);
						});
					});
				}

			}
			
		}
	}
</script>
