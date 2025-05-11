<template>
  <view class="calendar-container ux-padding-small">
    <!-- 日历头部 - 显示年月和切换按钮 -->
    <view class="calendar-header">
      <view class="arrow-btn" @click="prevMonth">❮</view>
      <view class="month-title">{{ currentYear }}年{{ currentMonth + 1 }}月</view>
      <view class="arrow-btn" @click="nextMonth">❯</view>
    </view>
    
    <!-- 星期标题 -->
    <view class="week-header">
      <view class="week-day" v-for="day in weekDays" :key="day">{{ day }}</view>
    </view>
    
    <!-- 日历内容 -->
    <view class="calendar-body">
      <view 
        class="calendar-day" 
        v-for="(day, index) in days" 
        :key="index"
        :class="{'other-month': !day.isCurrentMonth}"
        :style="getDayStyle(day.date)"
      >
        {{ day.day }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 要高亮的日期数组，格式为[{date: 'YYYY-MM-DD', bgColor: '#ff0000', textColor: '#ffffff'}]
    highlightedDates: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      weekDays: ['日', '一', '二', '三', '四', '五', '六'],
      currentDate: new Date(),
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth()
    };
  },
  computed: {
    days() {
      const year = this.currentYear;
      const month = this.currentMonth;
      
      const firstDay = new Date(year, month, 1);
      const firstDayOfWeek = firstDay.getDay();
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const nextMonthFirstDayOfWeek = new Date(year, month + 1, 1).getDay();
      const daysFromNextMonth = nextMonthFirstDayOfWeek === 0 ? 0 : 7 - nextMonthFirstDayOfWeek;
      
      const days = [];
      
      // 添加上个月的最后几天
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        days.push({
          day,
          date: this.formatDate(new Date(year, month - 1, day)),
          isCurrentMonth: false
        });
      }
      
      // 添加当月的天数
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({
          day: i,
          date: this.formatDate(new Date(year, month, i)),
          isCurrentMonth: true
        });
      }
      
      // 添加下个月的前几天
      for (let i = 1; i <= daysFromNextMonth; i++) {
        days.push({
          day: i,
          date: this.formatDate(new Date(year, month + 1, i)),
          isCurrentMonth: false
        });
      }
      
      return days;
    }
  },
  methods: {
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    
    getDayStyle(dateStr) {
      const highlightItem = this.highlightedDates.find(item => item.date === dateStr);
      if (!highlightItem) return {};
      
      return {
        backgroundColor: highlightItem.bgColor || '#ffeb3b',
        color: highlightItem.textColor || this.getContrastColor(highlightItem.bgColor || '#ffeb3b')
      };
    },
    
    getContrastColor(hexColor) {
      if (!hexColor) return '#000';
      
      // 转换hex为rgb
      const r = parseInt(hexColor.substr(1, 2), 16);
      const g = parseInt(hexColor.substr(3, 2), 16);
      const b = parseInt(hexColor.substr(5, 2), 16);
      
      // 计算亮度
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      
      return brightness > 128 ? '#000' : '#fff';
    },
    
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    }
  }
};
</script>

<style scoped>
.calendar-container {
  font-family: Arial, sans-serif;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}

.month-title {
  flex: 1;
  text-align: center;
}

.arrow-btn {
  padding: 5px 15px;
  cursor: pointer;
}

.week-header {
  display: flex;
  border-bottom: 1px solid #eee;
}

.week-day {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-weight: bold;
}

.calendar-body {
  display: flex;
  flex-wrap: wrap;
}

.calendar-day {
  width: calc(100% / 7);
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
  position: relative;
}

.other-month {
  color: #ccc;
}
</style>