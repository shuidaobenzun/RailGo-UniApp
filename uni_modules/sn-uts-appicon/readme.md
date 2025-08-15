# sn-uts-appicon

	暂时仅支持iOS

## 使用

### ios配置

* 项目根目录创建***Info.plist***

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
	<dict>
		<key>CFBundleIcons</key>
		<dict>
			<key>CFBundleAlternateIcons</key>
			<dict>
				<key>Test1</key>
				<dict>
					<key>CFBundleIconFiles</key>
					<array>
						<string>Test1</string>
					</array>
					<key>UIPrerenderedIcon</key>
					<false />
				</dict>
				<key>Test2</key>
				<dict>
					<key>CFBundleIconFiles</key>
					<array>
						<string>Test2</string>
					</array>
					<key>UIPrerenderedIcon</key>
					<false />
				</dict>
			</dict>
		</dict>
	</dict>
</plist>
```

* 项目根目录创建资源，如下

	注意，icon资源需要2x、3x图，icon名字需要与***Info.plist***配置相同，不同则会找不到

```bash
nativeResources/
└── ios
    └── Resources
        ├── Test1@2x.png
        ├── Test1@3x.png
        ├── Test2@2x.png
        └── Test2@3x.png
```

### 引入

```js
import * as AppIconUtil from '@/uni_modules/sn-uts-appicon'
```

### 是否支持动态设置icon

```js
let isSupport = AppIconUtil.supportsAlternateIcons()
```

### 获取当前icon

```js
let lastIcon = AppIconUtil.getAppIcon()
```

### 设置

```js
AppIconUtil.setAppIcon("Test1", e => {
	console.log('setAppIcon', e)
})
```

