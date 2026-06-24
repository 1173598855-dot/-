# ShopWorld - 全球精选好物

一个基于 Amazon 设计风格的**全功能电商网站前端项目**，采用纯 HTML/CSS/JavaScript 构建。

## ✨ 功能特性

- 🏠 **首页**：轮播图、分类导航、限时抢购、商品推荐、品牌专区
- 🔍 **搜索**：支持关键词搜索、分类筛选、搜索结果页
- 📦 **商品详情**：图片展示、价格信息、用户评价、相关推荐
- 🛒 **购物车**：添加/删除商品、数量调整、价格汇总、优惠券
- 📋 **订单中心**：查看订单状态、管理待付款/待发货/待收货订单
- ❤️ **收藏夹**：收藏喜欢的商品，快速管理
- 📞 **联系我们**：在线客服、在线留言、常见问题
- ℹ️ **关于我们**：公司介绍、数据统计、品牌理念
- 📱 **响应式设计**：完美适配桌面端和移动端
- ✨ **流畅动画**：页面加载动画、悬停效果、平滑过渡
- 🔔 **Toast 提示**：操作反馈提示
- 💾 **数据持久化**：购物车数据本地存储
- 🔍 **SEO 优化**：Meta 标签、Open Graph 协议支持
- 🎨 **真实商品图片**：使用 Unsplash 高清图库

## 🌐 新增页面

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | index.html | 商品浏览、分类导航、限时抢购 |
| 商品详情 | product.html | 商品图片、价格、评价、相关推荐 |
| 购物车 | cart.html | 商品管理、价格汇总、优惠券 |
| 搜索结果 | search.html | 关键词搜索、排序筛选 |
| 订单中心 | orders.html | 订单列表、状态管理 |
| 收藏夹 | wishlist.html | 收藏商品管理 |
| 关于我们 | bout.html | 公司介绍、数据统计 |
| 联系我们 | contact.html | 联系方式、在线留言、FAQ |
| 404页面 | 404.html | 自定义错误页面 |

## 🛠 技术栈

- **HTML5** - 语义化标签结构
- **CSS3** - Flexbox/Grid 布局、CSS 变量、动画效果
- **Vanilla JavaScript** - 原生 JavaScript 交互逻辑
- **Font Awesome** - 图标库
- **LocalStorage** - 购物车数据持久化
- **Unsplash** - 商品图片源

## 📁 项目结构

`
电商网站部署/
├── index.html          # 首页
├── product.html        # 商品详情页
├── cart.html           # 购物车页面
├── search.html         # 搜索结果页
├── orders.html         # 订单中心
├── wishlist.html       # 收藏夹
├── about.html          # 关于我们
├── contact.html        # 联系我们
├── 404.html            # 404错误页面
├── styles.css          # 样式文件（2000+行）
├── data.js             # 商品数据（20个商品）
├── app.js              # 交互逻辑
├── .gitignore          # Git忽略文件配置
└── README.md           # 项目说明文档
`

## 🚀 本地运行

### 方法一：直接打开
直接在浏览器中打开 index.html 文件即可预览。

### 方法二：使用本地服务器
`ash
# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
`
然后访问 http://localhost:8000

## 🌍 部署

### GitHub Pages 部署

1. 将代码推送到 GitHub 仓库
2. 进入仓库 **Settings** → **Pages**
3. 选择 **main** 分支和 **/ (root)** 文件夹
4. 等待部署完成后访问页面

### 其他部署方式

- **Netlify**：导入 GitHub 仓库，自动部署
- **Vercel**：导入 GitHub 仓库，自动部署
- **Cloudflare Pages**：连接仓库，一键部署

## 🌐 在线预览

访问：https://github.com/1173598855-dot/-

## 📱 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge
- Opera

## 🎨 设计特点

- 采用 Amazon 经典的深色导航栏设计
- 橙色主题色搭配，符合电商行业规范
- 响应式网格布局，自适应各种屏幕尺寸
- 流畅的交互动画和过渡效果
- 清晰的视觉层次和信息架构
- **商品使用真实照片**（Unsplash 高清图库）

## 🏷 商品分类

- 📱 数码电器（手机、笔记本、耳机、平板、无人机）
- 👗 时尚服饰（运动鞋、羽绒服、牛仔裤）
- 🏠 家居生活（吸尘器、香薰机、台灯、扫地机器人）
- ⚽ 运动户外（手表、帐篷、健身镜）
- 💄 美妆个护（护肤品、吹风机、精华液）

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可

MIT License

## 👋 作者

ShopWorld Team

---

© 2026 ShopWorld. All rights reserved.
