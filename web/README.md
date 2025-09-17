# 俄汉词典前端

基于 Vite + React + TypeScript + Tailwind CSS 构建的现代化俄汉词典查询网站。

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn

### 安装依赖
```bash
cd web
npm install
```

### 开发模式
```bash
npm run dev
```
访问 `http://localhost:5173`（或终端显示的端口）

### 生产构建
```bash
npm run build
npm run preview
```

## 📁 项目结构

```
web/
├── src/
│   ├── components/          # 可复用组件
│   ├── pages/              # 页面组件
│   │   └── WordDetail.tsx  # 单词详情页
│   ├── services/           # API 服务层
│   │   └── api.ts         # 后端 API 接口
│   ├── viewmodels/         # MVVM 视图模型
│   │   └── searchViewModel.ts
│   ├── App.tsx            # 主应用组件
│   ├── main.tsx           # 应用入口
│   └── index.css          # 全局样式（Tailwind）
├── public/                # 静态资源
├── tailwind.config.js     # Tailwind 配置
├── postcss.config.js      # PostCSS 配置
└── vite.config.ts         # Vite 配置
```

## 🔧 技术栈

- **构建工具**: Vite 7.x
- **前端框架**: React 19.x + TypeScript
- **路由**: React Router DOM
- **样式**: Tailwind CSS 4.x
- **HTTP 客户端**: Fetch API
- **架构模式**: MVVM

## 🌐 API 对接

### 后端服务
确保后端服务运行在 `http://localhost:3000`，提供以下接口：

- `GET /health` - 健康检查
- `GET /api/stats` - 数据统计
- `GET /api/search?q=关键词&limit=20&offset=0` - 搜索单词
- `GET /api/by-id/:id` - 获取单词详情
- `GET /docs` - Swagger API 文档

### 代理配置
Vite 开发服务器已配置代理，将 `/api` 和 `/docs` 请求转发到后端：

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/docs': 'http://localhost:3000',
    },
  },
})
```

## 📱 功能特性

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
- 键盘快捷键支持（回车搜索）

## 🎨 样式系统

### Tailwind CSS 配置
使用自定义主题色彩：

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        // ... 更多色阶
        900: '#1e3a8a',
      }
    }
  }
}
```

### 自定义组件类
```css
/* src/index.css */
.btn-primary { /* 主要按钮样式 */ }
.btn-secondary { /* 次要按钮样式 */ }
.card { /* 卡片容器样式 */ }
.input-field { /* 输入框样式 */ }
```

## 🔄 数据流

### MVVM 架构
1. **Model**: `services/api.ts` - 数据获取和 API 调用
2. **ViewModel**: `viewmodels/searchViewModel.ts` - 业务逻辑和状态管理
3. **View**: `App.tsx`, `WordDetail.tsx` - 用户界面

### 状态管理
使用 React Hooks 进行状态管理：
- `useState` - 本地状态
- `useCallback` - 性能优化
- `useMemo` - 计算属性

## 🚀 部署

### 构建生产版本
```bash
npm run build
```

### 部署到服务器
1. 将 `dist/` 目录上传到 Web 服务器
2. 配置 Nginx 或其他 Web 服务器
3. 确保后端 API 可访问
4. 更新 API 基础 URL（如需要）

### 环境变量
生产环境可能需要配置：
```bash
VITE_API_BASE_URL=你部署的域名/api
VITE_DOCS_URL=你部署的域名/docs
```

## 🛠 开发指南

### 添加新功能
1. 在 `services/api.ts` 中添加 API 接口
2. 在 `viewmodels/` 中创建对应的 ViewModel
3. 在 `pages/` 或组件中使用 ViewModel
4. 更新路由配置（如需要）

### 样式开发
- 优先使用 Tailwind 工具类
- 复杂样式在 `index.css` 中定义组件类
- 保持响应式设计原则

### 类型安全
- 所有 API 接口都有 TypeScript 类型定义
- 组件 Props 使用接口定义
- 避免使用 `any` 类型

## 📝 更新日志

### v1.0.0
- ✅ 基础搜索功能
- ✅ 单词详情页
- ✅ 响应式设计
- ✅ Tailwind CSS 样式系统
- ✅ MVVM 架构
- ✅ TypeScript 类型安全

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License