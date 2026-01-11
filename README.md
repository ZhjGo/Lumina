# LUMINA | 灵感起始页 - Chrome 扩展

**LUMINA** 是一个为创意工作者打造的极简、沉浸式导航 Chrome 扩展，完全替换你的新标签页。汇聚全球顶级设计灵感、开发工具与AI资源，提供丝滑的交互体验与每日灵感一言，让每一次新标签页的打开都成为享受。

![LUMINA Preview](/public/Snipaste_2026-01-11_22-15-03.png)

## 🚀 快速安装

### 方式 1：下载扩展包（推荐）

1. **下载最新版本**
   - 访问 [Releases 页面](https://github.com/ZhjGo/Lumina/releases)
   - 下载 `lumina-extension-v1.0.0.zip`
   - 解压到任意文件夹

2. **加载扩展**
   - 打开 Chrome 浏览器，访问 `chrome://extensions/`
   - 开启右上角的"**开发者模式**"
   - 点击"**加载已解压的扩展程序**"
   - 选择解压后的文件夹

3. **开始使用**
   - 打开新标签页 (Cmd/Ctrl + T)
   - 享受 LUMINA！

### 方式 2：从源码构建

```bash
# 1. 克隆项目
git clone https://github.com/ZhjGo/Lumina.git
cd Lumina/chrome_extension

# 2. 安装依赖
npm install

# 3. 构建扩展
npm run build

# 4. 加载扩展
# 在 Chrome 中加载 chrome_extension/dist 文件夹
```

---

## ✨ 核心功能

### 🎨 沉浸式体验
- **精选 4K 壁纸**：支持一键切换，每次都有新感觉
- **Glassmorphism 设计**：磨砂玻璃拟态，深色模式质感
- **平滑动画**：Framer Motion 流畅过渡

### ⚙️ 完全自定义
- ✅ 自由添加、编辑、删除分类
- ✅ 管理分类下的链接（标题、URL、描述）
- ✅ 8 种分类颜色可选
- ✅ 拖拽排序（即将推出）

### 💾 数据管理
- **本地存储**：Chrome Storage Local，数据安全可靠
- **导入/导出**：JSON 格式配置，方便备份和迁移
- **一键重置**：恢复默认设置
- **手动同步**：通过导入/导出实现跨设备数据迁移

### 🔍 智能工具
- **多引擎搜索**：百度、搜狗、必应一键切换
- **底部导航栏**：支持横向滚动，无限分类
- **数字时钟**：醒目的时间显示
- **每日一言**：触动人心的文字

---

## 🎮 使用指南

### 切换壁纸
点击右上角的 **🌀 风扇按钮**

### 打开设置
点击右上角的 **⚙️ 设置按钮**

### 管理分类和链接
1. 打开设置面板
2. 点击分类展开查看链接
3. 使用编辑/删除按钮管理
4. 点击"+ 添加分类"创建新分类
5. 点击"+ 添加链接"添加网站

### 导入/导出配置
- **导出**：设置面板 → 导出配置 → 保存 JSON
- **导入**：设置面板 → 导入配置 → 选择 JSON 文件
- **重置**：设置面板 → 重置为默认设置

---

## 🛠 技术栈

- **框架**: React 19 + TypeScript
- **构建**: Vite 6 + CRXJS Plugin
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **存储**: Chrome Storage API
- **图标**: Lucide React

---

## 🌐 网页版

LUMINA 也提供网页版本，可部署到服务器或静态托管平台。

**在线体验**: [https://lumina.jkai.de](https://lumina.jkai.de)

### 本地运行网页版

```bash
# 安装依赖
npm install
# 或者
pnpm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 部署网页版

#### Vercel (推荐)
1. 将代码推送到 GitHub
2. 登录 [Vercel](https://vercel.com/)
3. 导入仓库并部署

#### Cloudflare Pages
1. 推送代码到 GitHub
2. 登录 Cloudflare Dashboard
3. **Build Command**: `npm run build`
4. **Build output**: `out`

---

## 📄 项目结构

```
.
├── chrome_extension/       # Chrome 扩展（主要）
│   ├── dist/               # 构建输出
│   ├── src/
│   │   ├── components/     # React 组件
│   │   ├── data/           # 链接和壁纸数据
│   │   ├── hooks/          # useCategories Hook
│   │   ├── lib/            # storage.ts 工具
│   │   └── newtab.tsx      # 入口文件
│   ├── manifest.json       # 扩展配置
│   └── vite.config.ts      # Vite 配置
│
├── app/                    # Next.js 网页版
├── components/             # 共享组件
├── data/                   # 静态数据
└── public/                 # 静态资源
```

---

## ⚙️ 自定义配置

### 扩展版
通过设置面板可视化配置，无需修改代码。

### 网页版

**修改导航链接**：编辑 `data/links.ts`

```typescript
export const linkData: Category[] = [
  {
    id: "design",
    name: "设计灵感",
    icon: Palette,
    color: "bg-pink-500",
    links: [
      { title: "Dribbble", url: "https://dribbble.com" },
      // ... 添加更多
    ]
  },
];
```

**修改壁纸**：编辑 `data/wallpapers.ts`

---

## 🐛 问题反馈

如遇到问题，请[提交 Issue](https://github.com/ZhjGo/Lumina/issues/new)

---

## 🔮 路线图

- [ ] 发布到 Chrome Web Store
- [ ] 拖拽排序功能
- [ ] 自定义壁纸上传
- [ ] 主题切换（明暗模式）
- [ ] 快捷键支持
- [ ] 书签导入
- [ ] 分类图标自定义

---

## 📝 更新日志

查看完整更新日志：[chrome_extension/RELEASE_NOTES.md](./chrome_extension/RELEASE_NOTES.md)

---

## 📜 许可证

MIT License

---

## 🙏 致谢

- 壁纸来自 [Unsplash](https://unsplash.com/)
- 每日一言来自 [Hitokoto API](https://hitokoto.cn/)
- 图标来自 [Lucide](https://lucide.dev/)

---

Made with ❤️ for creativity.
