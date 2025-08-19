<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="navbar">
      <view class="navbar-left">
        <image src="/static/images/logo.png" class="logo" mode="widthFix"></image>
      </view>
      <view class="navbar-center">
        <text class="app-name">RailGo出行</text>
      </view>
      <view class="navbar-right">
        <button class="user-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">
          <image src="/static/icons/user.png" class="user-icon" mode="widthFix"></image>
        </button>
      </view>
    </view>

    <!-- 搜索栏 -->
    <view class="search-bar">
      <view class="search-box">
        <image src="/static/icons/search.png" class="search-icon" mode="widthFix"></image>
        <input type="text" placeholder="请输入车站或车次" class="search-input" @focus="toSearchPage" />
      </view>
    </view>

    <!-- 主要功能区 -->
    <view class="main-functions">
      <view class="function-grid">
        <!-- 功能按钮1：车票预订 -->
        <view class="function-item" @click="navigateTo('/pages/ticket/ticket')">
          <view class="function-icon bg-primary">
            <image src="/static/icons/ticket.png" mode="widthFix"></image>
          </view>
          <text class="function-name">车票预订</text>
        </view>
        
        <!-- 功能按钮2：订单查询 -->
        <view class="function-item" @click="navigateTo('/pages/order/order')">
          <view class="function-icon bg-secondary">
            <image src="/static/icons/order.png" mode="widthFix"></image>
          </view>
          <text class="function-name">订单查询</text>
        </view>
        
        <!-- 功能按钮3：改签退票 -->
        <view class="function-item" @click="navigateTo('/pages/change/change')">
          <view class="function-icon bg-tertiary">
            <image src="/static/icons/change.png" mode="widthFix"></image>
          </view>
          <text class="function-name">改签退票</text>
        </view>
        
        <!-- 功能按钮4：正晚点查询 -->
        <view class="function-item" @click="navigateTo('/pages/status/status')">
          <view class="function-icon bg-quaternary">
            <image src="/static/icons/status.png" mode="widthFix"></image>
          </view>
          <text class="function-name">正晚点查询</text>
        </view>
        
        <!-- 功能按钮5：车站服务 -->
        <view class="function-item" @click="navigateTo('/pages/station/station')">
          <view class="function-icon bg-quinary">
            <image src="/static/icons/station.png" mode="widthFix"></image>
          </view>
          <text class="function-name">车站服务</text>
        </view>
        
        <!-- 功能按钮6：更多服务 -->
        <view class="function-item" @click="navigateTo('/pages/more/more')">
          <view class="function-icon bg-senary">
            <image src="/static/icons/more.png" mode="widthFix"></image>
          </view>
          <text class="function-name">更多服务</text>
        </view>
      </view>
    </view>

    <!-- 行程提醒 -->
    <view class="trip-reminder" v-if="hasUpcomingTrip">
      <view class="reminder-header">
        <text class="reminder-title">近期行程</text>
        <text class="reminder-more" @click="navigateTo('/pages/trip/trip')">查看全部</text>
      </view>
      <view class="trip-card">
        <view class="trip-info">
          <view class="trip-station">
            <text class="station-name">{{ upcomingTrip.fromStation }}</text>
            <text class="station-code">{{ upcomingTrip.fromCode }}</text>
          </view>
          <view class="trip-route">
            <view class="route-line"></view>
            <view class="route-train">
              <text class="train-number">{{ upcomingTrip.trainNumber }}</text>
              <text class="train-date">{{ upcomingTrip.date }}</text>
            </view>
          </view>
          <view class="trip-station">
            <text class="station-name">{{ upcomingTrip.toStation }}</text>
            <text class="station-code">{{ upcomingTrip.toCode }}</text>
          </view>
        </view>
        <view class="trip-time">
          <text class="departure-time">{{ upcomingTrip.departureTime }}</text>
          <text class="arrival-time">{{ upcomingTrip.arrivalTime }}</text>
        </view>
        <button class="checkin-btn" @click="navigateTo('/pages/checkin/checkin')">立即检票</button>
      </view>
    </view>

    <!-- 铁路资讯 -->
    <view class="rail-news">
      <view class="news-header">
        <text class="news-title">铁路资讯</text>
        <text class="news-more" @click="navigateTo('/pages/news/news')">更多</text>
      </view>
      <view class="news-list">
        <view class="news-item" v-for="(news, index) in newsList" :key="index" @click="navigateTo('/pages/news/detail?id='+news.id)">
          <image :src="news.imageUrl" class="news-image" mode="widthFix"></image>
          <view class="news-content">
            <text class="news-title">{{ news.title }}</text>
            <text class="news-time">{{ news.publishTime }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="tabbar">
      <view class="tabbar-item active" @click="switchTab('/pages/index/index')">
        <image src="/static/icons/home-active.png" class="tabbar-icon" mode="widthFix"></image>
        <text class="tabbar-text">首页</text>
      </view>
      <view class="tabbar-item" @click="switchTab('/pages/ticket/ticket')">
        <image src="/static/icons/ticket-normal.png" class="tabbar-icon" mode="widthFix"></image>
        <text class="tabbar-text">车票</text>
      </view>
      <view class="tabbar-item" @click="switchTab('/pages/order/order')">
        <image src="/static/icons/order-normal.png" class="tabbar-icon" mode="widthFix"></image>
        <text class="tabbar-text">订单</text>
      </view>
      <view class="tabbar-item" @click="switchTab('/pages/mine/mine')">
        <image src="/static/icons/mine-normal.png" class="tabbar-icon" mode="widthFix"></image>
        <text class="tabbar-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 模拟数据：近期行程
      hasUpcomingTrip: true,
      upcomingTrip: {
        fromStation: "北京南",
        fromCode: "BJP",
        toStation: "上海虹桥",
        toCode: "SHA",
        trainNumber: "G101",
        date: "2023-07-15",
        departureTime: "08:00",
        arrivalTime: "13:20"
      },
      // 模拟数据：铁路资讯
      newsList: [
        {
          id: 1,
          title: "全国铁路7月1日起实行新的列车运行图",
          imageUrl: "/static/images/news1.jpg",
          publishTime: "2023-06-28"
        },
        {
          id: 2,
          title: "铁路部门推出暑期学生票优惠活动",
          imageUrl: "/static/images/news2.jpg",
          publishTime: "2023-06-25"
        }
      ]
    };
  },
  onLoad() {
    // 页面加载时的初始化操作
  },
  methods: {
    // 获取用户信息
    getUserInfo(e) {
      console.log("用户信息:", e.detail.userInfo);
      // 处理用户信息逻辑
    },
    // 跳转到搜索页面
    toSearchPage() {
      uni.navigateTo({
        url: '/pages/search/search'
      });
    },
    // 导航到指定页面
    navigateTo(url) {
      uni.navigateTo({
        url: url
      });
    },
    // 切换底部导航
    switchTab(url) {
      uni.switchTab({
        url: url
      });
    }
  }
};
</script>

<style scoped>
/* 基础样式 */
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* 导航栏样式 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx 30rpx;
  background-color: #1e88e5;
}

.logo {
  width: 80rpx;
  height: auto;
}

.app-name {
  color: #ffffff;
  font-size: 36rpx;
  font-weight: bold;
}

.user-btn {
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
}

.user-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
}

/* 搜索栏样式 */
.search-bar {
  padding: 20rpx 30rpx;
  background-color: #1e88e5;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 60rpx;
  padding: 14rpx 30rpx;
}

.search-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 16rpx;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
  color: #333333;
  height: 40rpx;
  line-height: 40rpx;
}

/* 主要功能区样式 */
.main-functions {
  padding: 30rpx;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30rpx;
}

.function-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.function-icon {
  width: 120rpx;
  height: 120rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.function-icon:active {
  transform: scale(0.95);
}

.function-icon image {
  width: 60rpx;
  height: 60rpx;
}

.function-name {
  font-size: 26rpx;
  color: #333333;
}

/* 功能图标背景色 */
.bg-primary {
  background-color: #e3f2fd;
}

.bg-secondary {
  background-color: #e8f5e9;
}

.bg-tertiary {
  background-color: #fff8e1;
}

.bg-quaternary {
  background-color: #f3e5f5;
}

.bg-quinary {
  background-color: #ffebee;
}

.bg-senary {
  background-color: #e0f7fa;
}

/* 行程提醒样式 */
.trip-reminder {
  padding: 0 30rpx 30rpx;
}

.reminder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.reminder-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.reminder-more {
  font-size: 26rpx;
  color: #1e88e5;
}

.trip-card {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.trip-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.trip-station {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120rpx;
}

.station-name {
  font-size: 34rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8rpx;
}

.station-code {
  font-size: 24rpx;
  color: #999999;
}

.trip-route {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 0 20rpx;
}

.route-line {
  width: 100%;
  height: 4rpx;
  background-color: #e0e0e0;
  position: relative;
  margin-bottom: 16rpx;
}

.route-line::after {
  content: '';
  position: absolute;
  width: 16rpx;
  height: 16rpx;
  background-color: #1e88e5;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.route-train {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.train-number {
  font-size: 28rpx;
  color: #1e88e5;
  font-weight: bold;
  margin-bottom: 4rpx;
}

.train-date {
  font-size: 24rpx;
  color: #999999;
}

.trip-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20rpx;
}

.departure-time {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8rpx;
}

.arrival-time {
  font-size: 28rpx;
  color: #666666;
}

.checkin-btn {
  background-color: #1e88e5;
  color: #ffffff;
  border-radius: 60rpx;
  padding: 18rpx 30rpx;
  font-size: 28rpx;
  border: none;
  min-width: 160rpx;
  box-shadow: 0 4rpx 10rpx rgba(30, 136, 229, 0.3);
  transition: background-color 0.3s ease;
}

.checkin-btn:active {
  background-color: #1565c0;
}

/* 铁路资讯样式 */
.rail-news {
  padding: 0 30rpx 140rpx;
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.news-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.news-more {
  font-size: 26rpx;
  color: #1e88e5;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.news-item {
  display: flex;
  background-color: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.news-item:active {
  transform: scale(0.99);
}

.news-image {
  width: 200rpx;
  height: 140rpx;
  flex-shrink: 0;
}

.news-content {
  padding: 20rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.news-title {
  font-size: 28rpx;
  color: #333333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

.news-time {
  font-size: 24rpx;
  color: #999999;
}

/* 底部导航样式 */
.tabbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 120rpx;
  background-color: #ffffff;
  border-top: 1rpx solid #eeeeee;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10rpx;
}

.tabbar-icon {
  width: 50rpx;
  height: 50rpx;
  margin-bottom: 8rpx;
}

.tabbar-text {
  font-size: 24rpx;
  color: #999999;
}

.tabbar-item.active .tabbar-text {
  color: #1e88e5;
}
</style>