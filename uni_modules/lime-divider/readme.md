# lime-divider 分割线
- 用于将内容分隔为多个区域。

## 文档
[divider](https://limex.qcoon.cn/components/divider.html)

## 安装
在插件市场导入即可，首次导入可能需要重新编译

## 代码演示

### 基础用法

默认渲染一条水平分割线。

```html
<l-divider />
```

### 展示文本

通过插槽在可以分割线中间插入内容。可使用`content`或默认插槽

```html
<l-divider>文本</l-divider>
<l-divider content="文本"></l-divider>
```

### 内容位置

通过 `align` 指定内容所在位置。

```html
<l-divider align="left">文本</l-divider>
<l-divider align="right">文本</l-divider>
```

### 虚线

添加 `dashed` 属性使分割线渲染为虚线。

```html
<l-divider dashed>文本</l-divider>
```

### 自定义样式

可以直接通过 `color`设置线条颜色，`text-color` 属性设置文本颜色。

```html
<l-divider >文本</l-divider>
```

### 垂直

```html
文本
<l-divider vertical />
文本
<l-divider vertical dashed />
文本
```

### 查看示例
- 导入后直接使用这个标签查看演示效果

```html
 // 代码位于 uni_modules/lime-divider/compoents/lime-divider 
<lime-divider />
```

### 插件标签
- 默认 l-divider 为 component
- 默认 lime-divider 为 demo

### 关于vue2的使用方式
- 插件使用了`composition-api`, 如果你希望在vue2中使用请按官方的教程[vue-composition-api](https://uniapp.dcloud.net.cn/tutorial/vue-composition-api.html)配置
- 关键代码是: 在main.js中 在vue2部分加上这一段即可.

```js
// vue2
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
```



## API

### Props

| 参数              | 说明                              | 类型      | 默认值   |
| ----------------- | --------------------------------- | --------- | -------- |
| dashed            | 是否使用虚线                      | _boolean_ | `false`  |
| content            | 文本                      | _string_ | `-`  |
| align  | 内容位置，可选值为 `left` `right` | _string_  | `center` |
| vertical | 是否使用垂直                      | _boolean_ | `false`  |
| color | 线条颜色      | _string_ | `-`  |
| textColor | 文本颜色   | _string_ | `-`  |

### Slots

| 名称    | 说明 |
| ------- | ---- |
| default | 内容 |


## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                              | 默认值                    | 描述 |
| --------------------------------- | ------------------------- | ---- |
| --l-divider-margin              | _10px_ | -    |
| --l-divider-text-color          | _rgba(0, 0, 0, 0.45)_ | -    |
| --l-divider-font-size           | _12px_ | -    |
| --l-divider-line-height         | _20px_                    | -    |
| --l-divider-color        | _rgba(0, 0, 0, 0.06)_ | -    |


## 打赏

如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/alipay.png)
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/wpay.png)