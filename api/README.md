# RailGo API Server

这是一个为RailGo项目提供后端API服务的Flask应用。

## 🚀 快速开始

### 安装依赖

```bash
pip install -r requirements.txt
```

### 启动服务

```bash
python app.py
```

服务将在 `http://localhost:5000` 启动

## 📡 API接口

### 1. 根路径
- **GET** `/`
- 返回API服务信息和可用端点

### 2. 鉴权接口
- **GET** `/api/check/<version>?userid=<userid>&key=<key>`
- 模拟原项目的鉴权逻辑
- 参数：
  - `version`: 版本号
  - `userid`: 用户ID
  - `key`: 鉴权密钥

### 3. 车次查询
- **GET** `/api/query?keyword=<keyword>&future=<true|false>`
- 查询车次信息
- 参数：
  - `keyword`: 查询关键词（车次号、出发站、到达站）
  - `future`: 是否查询未来车次（默认true）

### 4. 站点查询
- **GET** `/api/stations?keyword=<keyword>`
- 获取站点信息
- 参数：
  - `keyword`: 站点名称或拼音（可选）

### 5. 车次列表
- **GET** `/api/trains?type=<type>`
- 获取车次列表
- 参数：
  - `type`: 车次类型（G、D、K等，可选）

### 6. EMU查询
- **GET** `/api/emu/query?keyword=<keyword>&future=<true|false>`
- 查询EMU信息
- 参数：
  - `keyword`: 查询关键词
  - `future`: 是否查询未来（默认true）

### 7. 站点详情查询
- **GET** `/api/station/query?station=<station_name>`
- 查询特定站点的详细信息
- 参数：
  - `station`: 站点名称

### 8. 数据库更新
- **GET** `/api/update/db`
- 模拟数据库更新操作

### 9. 健康检查
- **GET** `/api/health`
- 服务健康状态检查

## 🔧 测试示例

### 鉴权测试
```bash
curl "http://localhost:5000/api/check/1?userid=test_user&key=test_key_123"
```

### 车次查询测试
```bash
curl "http://localhost:5000/api/query?keyword=G1&future=true"
```

### 站点查询测试
```bash
curl "http://localhost:5000/api/stations?keyword=北京"
```

### EMU查询测试
```bash
curl "http://localhost:5000/api/emu/query?keyword=G1&future=true"
```

## 📊 数据结构

### 车次数据结构
```json
{
  "trainNum": "G1",
  "trainCode": ["G1"],
  "from": "北京南",
  "to": "上海虹桥",
  "departure": "09:00",
  "arrival": "14:28",
  "duration": "5小时28分",
  "type": "G",
  "carType": "CR400AF",
  "status": "正常"
}
```

### 站点数据结构
```json
{
  "code": "BJP",
  "name": "北京",
  "pinyin": "beijing"
}
```

## 🛠️ 开发说明

### 模拟数据
- 所有数据都是模拟数据，存储在内存中
- 启动时会自动创建 `data/railgo-db.json` 文件

### 跨域支持
- 已启用CORS支持，允许前端跨域请求

### 错误处理
- 包含404和500错误处理
- 返回标准JSON格式错误信息

## 🔗 与原项目集成

这个API服务器模拟了原RailGo项目中的以下功能：

1. **鉴权系统** - 模拟 `https://auth.railgo.zenglingkun.cn/api/check/`
2. **查询接口** - 模拟 `https://crtracker.azteam.cn/api/query`
3. **数据库操作** - 模拟本地JSON数据库查询

前端可以通过修改API地址来使用这个本地服务器：

```javascript
// 原地址
const response = await axios.get("https://auth.railgo.zenglingkun.cn/api/check/1?userid=123&key=456");

// 改为本地地址
const response = await axios.get("http://localhost:5000/api/check/1?userid=123&key=456");
```

## �� 许可证

MIT License 