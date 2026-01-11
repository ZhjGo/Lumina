# Chrome Extension Release Notes

## v1.0.0 - 首次发布 🎉

**发布日期**: 2026-01-11

### ✨ 核心功能

- **🎨 沉浸式导航体验**
  - 精选 4K 壁纸背景，支持一键切换
  - Glassmorphism 磨砂玻璃设计
  - 平滑的动画过渡效果

- **⚙️ 完全自定义**
  - 自由添加、编辑、删除分类
  - 管理分类下的链接（标题、URL、描述）
  - 8 种分类颜色可选
  - 拖拽排序（即将推出）

- **💾 数据持久化**
  - 使用 Chrome Storage API 本地存储
  - 支持跨标签页数据同步
  - 导入/导出配置（JSON 格式）
  - 一键重置为默认设置

- **🔍 智能搜索**
  - 集成百度、搜狗、必应搜索引擎
  - 快速切换搜索引擎
  - 点击外部自动关闭下拉菜单

- **🎯 便捷导航**
  - 底部分类导航栏
  - 自动高亮当前浏览分类
  - 支持横向滚动（多分类时）
  - 平滑滚动到对应分类

- **🕐 实用工具**
  - 大号数字时钟
  - 每日灵感一言（Hitokoto API）
  - SmartFavicon 自动获取网站图标

### 🛠 技术栈

- React 19 + TypeScript
- Vite 6 + CRXJS Plugin
- Tailwind CSS 4
- Framer Motion
- Chrome Storage API

### 📦 安装方式

1. 下载 `lumina-extension-v1.0.0.zip`
2. 解压到任意文件夹
3. 打开 Chrome 浏览器，访问 `chrome://extensions/`
4. 开启右上角的"开发者模式"
5. 点击"加载已解压的扩展程序"
6. 选择解压后的文件夹
7. 打开新标签页，享受 LUMINA！

### 📸 预览

- 沉浸式壁纸背景
- 右上角风扇按钮：切换壁纸
- 右上角设置按钮：打开设置面板
- 底部导航栏：快速跳转分类

### 🐛 已知问题

- 暂无

### 🔮 下一步计划

- [ ] 拖拽排序功能
- [ ] 自定义壁纸上传
- [ ] 主题切换（明暗模式）
- [ ] 快捷键支持
- [ ] 更多搜索引擎选项

---

**开源地址**: https://github.com/ZhjGo/Lumina

**问题反馈**: https://github.com/ZhjGo/Lumina/issues

**许可证**: MIT License
