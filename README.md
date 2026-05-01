# ETF股息率监控 - 纯客户端PWA

**零服务器、零依赖、任何网络都能用。**

## 使用方法

直接用浏览器打开 `client/index.html`，或部署到任意静态托管。

### iPhone添加到主屏幕
1. Safari 打开页面
2. 点击底部分享按钮 ⊘
3. 选择「添加到主屏幕」

## 原理

- 数据来源：东方财富 `pingzhongdata` 接口（CORS友好）
- 一个 `<script>` 标签获取完整净值走势 + 分红记录
- 纯浏览器端计算TTM股息率和百分位
- 无需后端服务器

## 部署

### 方案1：GitHub Pages（免费）
```bash
cd client
git init && git add .
git commit -m "ETF monitor PWA"
# 推送到GitHub仓库，开启Pages即可
```

### 方案2：Vercel（免费）
```bash
# 直接拖拽 client/ 文件夹到 vercel.com
```

### 方案3：本地运行
```bash
cd client
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

## 文件结构

```
client/
├── index.html      # 主页面（含全部JS逻辑）
├── style.css       # 暗色主题样式
├── sw.js           # Service Worker
├── manifest.json   # PWA配置
└── icons/          # PWA图标
```

## 数据说明

- 净值数据来自东方财富基金平台
- 分红记录从净值走势中的 `unitMoney` 字段提取
- 部分ETF（如创业板ETF）无分红记录，显示为「无分红数据」
- TTM股息率 = 过去365天累计分红 / 当前净值
- 百分位 = 当前股息率在过去750个交易日中的排名位置
