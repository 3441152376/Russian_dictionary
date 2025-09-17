# 俄汉词典系统

俄汉词典查询系统，基于本地 JSON 数据源的后端 API 和前端网站。

语言切换：简体中文 | [English](./README.en.md) | [Русский](./README.ru.md)

## 系统架构

```
cidian_russiam/
├── tools/export/           # 数据准备脚本（可选，本仓库不含云端访问）
├── server/src/            # Express 后端 API
├── web/                   # Vite + React 前端
├── exports/               # 导出的 JSON 数据文件
└── README.md             # 项目说明
```

## 快速开始

### 1. 环境准备
```bash
# 确保 Node.js 18+ 已安装
node --version

# 安装项目依赖
npm install
```

### 2. 准备数据
将已有的 `DictionaryCache.part*.json` 和 `DictionaryCache.index.json` 放入 `exports/` 目录。


### 3. 启动后端服务
```bash
# 开发模式
npm run dev:server

# 或后台运行
nohup npx ts-node --esm server/src/index.ts > server.dev.log 2>&1 &
```

后端服务运行在 `http://localhost:3000`，提供：
- REST API 接口
- Swagger 文档：`http://localhost:3000/docs`

### 4. 启动前端网站
```bash
cd web
npm install
npm run dev
```

前端网站运行在 `http://localhost:5173`（或 5174）

## 数据统计

- **总记录数**: 21,636 条俄汉词典数据
- **数据来源**: 本地 JSON 分片文件（`exports/`）
- **导出格式**: JSON 分片文件
- **数据字段**: 包含发音、语法、用法、文化注释等完整信息

## API 接口

### 搜索接口
```http
GET /api/search?q=关键词&limit=20&offset=0
```

### 详情接口
```http
GET /api/by-id/:objectId
```

### 统计接口
```http
GET /api/stats
```

### 健康检查
```http
GET /health
```

详细 API 文档：`你部署的域名/docs`

## 部署指南

### 后端部署
1. 构建项目：`npm run build`
2. 上传 `dist/` 目录到服务器
3. 安装生产依赖：`npm install --production`
4. 启动服务：`npm run start:server`

### 前端部署
1. 进入前端目录：`cd web`
2. 构建前端：`npm run build`
3. 上传 `dist/` 目录到 Web 服务器
4. 配置 Nginx 代理到后端 API

### 环境变量
```bash
# 后端
PORT=3000

# 前端（如需要）
VITE_API_BASE_URL=你部署的域名/api
VITE_DOCS_URL=你部署的域名/docs
```

## 开发指南

### 技术栈
- **后端**: Node.js + Express + TypeScript
- **前端**: Vite + React + TypeScript + Tailwind CSS
- **数据源**: 本地 JSON（无云端依赖）
- **架构**: MVVM 模式

### 项目结构
```
├── tools/export/              # 可选的数据准备脚本目录（无云端凭证）
├── server/src/index.ts        # Express 后端服务
├── web/src/                   # React 前端源码
│   ├── services/api.ts        # API 服务层
│   ├── viewmodels/            # MVVM 视图模型
│   ├── pages/                 # 页面组件
│   └── App.tsx               # 主应用
└── exports/                   # 导出的数据文件
```

### 开发命令
```bash
# 后端开发
npm run dev:server

# 前端开发
cd web && npm run dev

# 构建生产版本
npm run build
cd web && npm run build
```

## 功能特性

### 搜索功能
- 支持俄语和中文关键词搜索
- 实时搜索建议
- 搜索结果分页
- 加载状态和错误处理

### 单词详情
- 完整单词信息展示
- 语法信息（词性、性、变格等）
- 发音信息（音标、重音位置）
- 相关词汇（同义词、反义词、词族）
- 使用示例和固定搭配
- 文化注释和词源信息
- 句子分析
- 元数据信息

### 用户体验
- 响应式设计，支持移动端
- 现代化 UI 设计
- 流畅的动画效果
- 键盘快捷键支持

## 安全说明
- 生产环境建议使用环境变量管理密钥

## 更新日志

### v1.0.0
- ✅ React + TypeScript 前端网站
- ✅ 完整的单词详情页面
- ✅ 响应式设计和现代化 UI
- ✅ MVVM 架构模式
- ✅ Swagger API 文档

## 许可证（Non-Commercial Use License）
- 个人非商业用途：免费、无需授权。
- 商业用途：须联系作者并获得书面授权后方可使用。
- 详情见仓库根目录 `LICENSE`。

## 作者与公司

- 作者与产品：鹅语菌（俄语学习应用）参见官网说明与下载页：[russian.egg404.com](https://russian.egg404.com/)
- 公司：泸州山禾网络科技有限责任公司，参见企业官网：[egg404.com](https://egg404.com/)

