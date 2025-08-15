# 动态切换应用图标、名称（节假日、VIP用户、活动等场景的动态切换（ima-icons）

`ima-icons` 是一款动态切换应用图标、名称的UTS插件，支持`切换应用图标`、`切换应用名称`、`切换应用图标和名称`等功能,可实现节假日（元旦、春节）、VIP用户（vip、svip）、活动（6.18、双11、春节年货）等场景的动态切换应用图标、名称

## ⚙️配置

- 将`/uni_modules/ima-icons/utssdk/app-android/AndroidManifest.xml`中`<manifest>`标签中的`package`属性改成你打包的`Android包名`
- 将你的图标放在目录`/uni_modules/ima-icons/utssdk/app-android/res/mipmap-xxhdpi`下,然后在`AndroidManifest.xml`配置你的名称与图标

## 💎建议

- 切换图标（即启用 activity-alias）时，Android 系统的默认行为是：`重启整个 app 进程，以便 Launcher 更新图标和入口`。
- 因此，`App 自动退出并重新启动（或不启动）是系统行为，无法完全避免，`但我们可以做一些`“静默处理”`的优化，使`切换尽量不打扰用户体验`。
- 因某些品牌的手机内核或者是系统的问题，导致切换app时会退出应用，我们可以采用一些`用户体验优化`手段【有些品牌手机不受影响】
+ ✅ 方法一：切换图标后自动拉起 App（模拟“静默”）
+ ✅ 方法二：切图标后提示“切换成功，稍后自动返回 App”，增强体验感知
+ ✅ 方法三：将图标切换放在 App 空闲状态或退出后执行

## ⚠️注意️

- `android 端`已全部完成代码的开发与测试（已完成）
- 运行到基座时，只要是更改过代码后，代码‘正在同步手机端程序文件’时可能无法打开，需要手动去打开应用（正式发布不影响）

## 需要权限

- 无

## 使用示例【此示例的代码只实现了`基础操作`的逻辑，更多示例请导入项目】

- 新建一个`test.vue`的文件

```vue

<template>
  <view class="ima-test">
    <view class="ima-test-item" @click="onSwitchList">可切换列表名称</view>
    <view class="ima-test-item" @click="onSwitchIcons">切换 图标｜名称</view>
    <view class="ima-test-item" @click="onRestoreIcons">恢复默认</view>
  </view>
</template>

<script>
  import {getSwitchList, switchIcons, restoreIcons} from "@/uni_modules/ima-icons";

  let _this = null
  export default {
    data() {
      return {
        switchList: []
      }
    },
    methods: {
      // 可切换列表名称
      onSwitchList() {
        getSwitchList()
					.then((res: IReturn) => {
						console.log('获取可切换列表名称 成功', res)
					})
					.catch((err: any) => {
						console.error('获取可切换列表名称 失败', err)
					})
      },
      // 切换 图标｜名称
      onSwitchIcons() {
        const aliasName = _this.switchList(0) // 选择第一个切换方式
        switchIcons(aliasName)
					.then((res: IReturn) => {
						console.log('切换 图标｜名称 成功', res)
					})
					.catch((err: any) => {
						console.error('切换 图标｜名称 失败', err)
					})
      },
      // 恢复默认
      onRestoreIcons() {
        restoreIcons()
					.then((res: IReturn) => {
						console.log('恢复默认（图标别名 + 名称) 成功', res)
					})
					.catch((err: any) => {
						console.error('恢复默认（图标别名 + 名称) 失败', err)
					})
      }
    }
  }
</script>

<style lang="scss">
  .ima-test {

  }
</style>
```

## 方法

| 方法名称          | 说明                | 方法参数                                      | 平台        |
|---------------|-------------------|-------------------------------------------|-----------|
| getSwitchList | 返回可切换列表           | 无                                         | `android` |
| switchIcons   | 切换图标（图标、名称、图标+名称） | aliasName: 可切换列表参数（数据来源getSwitchList中返回的） | `android` |
| restoreIcons  | 恢复默认（默认的图标+名称）    | 无                                         | `android` |

## 图标配置

- 将图标放在`uni_modules/ima-icons/utssdk/app-android/res/mipmap-xxhdpi`中
- 建议图标格式：png
- 建议图标尺寸：最低不低于`144x144`、最大不大于：`512x512`

## 切换配置

- 【必须】`android:name`: 切换`switchIcons`方法中的`aliasName`参数（即切换的名称），
- 【必须】`android:enabled`: 设置值为`false`(不要为true,否则导致多图标)【固定值】
- 【必须】`android:exported`: 设置值为`true`【固定值】
- 【按需】`android:icon`: 图标参数，`"@mipmap/xxxx"`(其中的‘xxxx’为图标的名称，不带后缀)
- 【按需】`android:roundIcon`: 圆形图标（有则配置，无则不配）【和`android:icon`放在同一个目录】
- 【按需】`android:label`: 应用名称（即app的名称）
- 【必须】`android:targetActivity`: 设置值为`io.dcloud.PandoraEntry`【固定值】

> `uni_modules/ima-icons/utssdk/app-android/AndroidManifest.xml`中的配置

```xml
<activity-alias
    android:name="MyIconAndLabel1"
    android:enabled="false"
    android:exported="true"
    android:icon="@mipmap/icon1"
    android:roundIcon="@mipmap/icon1_round"
    android:label="切换图标名称1" 
    android:targetActivity="io.dcloud.PandoraEntry">
    <!-- 相同部分，去掉,具体请导入示例参看 -->
</activity-alias>
```

### 切换（图标 + 名称）配置

- 【必须配置】`android:icon`
- 【必须配置】`android:label`
- 【按需配置】`android:roundIcon`（没有的话删除，不建议为空）

### 切换图标、不切换名称

- 【必须配置】`android:icon`
- ⚠️【不要配置】`android:label`（删除掉）
- 【按需配置】`android:roundIcon`（没有的话删除，不建议为空）

### 切换名称、不切换图标

- ⚠️【不要配置】`android:icon`（删除掉）
- 【必须配置】`android:label`
- 【按需配置】`android:roundIcon`（没有的话删除，不建议为空）
