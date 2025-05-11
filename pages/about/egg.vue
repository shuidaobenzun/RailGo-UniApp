<template>
	<view class="ux-bg-grey5" style="min-height:100vh;">
		<!-- headers begin -->
		<view class="ux-flex ux-align-items-start ux-bg-primary ux-padding">
			<view style="border-radius:50%;" hover-class="ux-tap" @click="back">
				<uni-icons class="va" color="white" type="arrow-left" size="25"></uni-icons>
			</view>
			&nbsp;&nbsp;
			<text class="ux-h4 ux-color-white va">从600号门口路过后写的小作文</text>
		</view>

		<!-- Main content -->
		<view class="ux-padding">
			<!--
			<text class="ux-text-center">
				ChenMo:<br> “生活就像一段代码，有时会出错，有时会卡顿，但别忘了——你才是自己人生的开发者。每一次调试都是成长，每一次坚持都在为未来埋下惊喜的伏笔。无论今天遇到多少‘404’，请相信：你的努力终会‘编译’成想要的模样。加油，世界正等待你运行出独一无二的精彩！”
			</text>
			<text>
				<br>———————————————————
			</text>
			-->
			<text class="ux-text-center">
				TKP30:<br>刘同学握着她那台索尼A7S2站在教学楼二楼风雨长廊的门口，Exmor传感器吞吐着4K级别的黄昏，而我瞳孔的CMOS却始终对不上焦。<br>我向她伸出右手，她却冲回了204的七（9）班教室。独留一位孤独的初三生，站在一座熟悉但又陌生的七十六岁校园里。<br>她曾经说，她的小军鼓最多能敲出184的滚奏。我说我吹高音笙的手速没这么快，但我还是得在乐团里坐在她的前面——虽然小军鼓不可能拥有Solo。<br>她曾经说，她的数学成绩每次都在下滑。我说我在初三只能排到一百名，但我只得屈于她的年级顶尖水平——虽然她还需要我教压强切除题的做法。<br>她曾经说，她会找到机会跟我一起出去吃饭，一起拍照。我说我没有这个月的京沪55191计划，但我还是和她约定了到中山公园最便宜的餐厅里吃饭的时间——虽然我的D300s早已陈旧不堪。<br>我们在梦里经常想着对方在围场河路的泥泞土坡上拍摄着34L上落地的B-2445，望着对方眼里纯洁的羞涩。<br>直到月考后的第三个周末，我向她发出了TCP三次握手，却无法收回一句心跳包。我打开Kali检查网络连接，才发现连接早就被另一个同段终端UDP劫持了。<br>日志里的最后一行定格在2025/04/13 22:12:10。我合上落后的笔记本，合上《中考文言考试篇目点击》，合上《青青思念》的乐谱。<br>我终于意识到再一次回到了孤独。<br>lxy，明天CR400BF-J-0003检测沪春线，我们能再到外环路去一趟吗？<br>
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			back: function() {
				uni.navigateBack()
			}
		}
	}
</script>

<style>

</style>
