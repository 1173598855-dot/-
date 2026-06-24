# ShopWorld - 全球精选好物

一个基于Amazon设计风格的全功能电商网站前端项目，采用纯HTML/CSS/JavaScript构建。

## ✨ 功能特性

- 🏠 **首页**：轮播图、分类导航、限时抢购、商品推荐、品牌专区
- 🔍 **搜索**：支持关键词搜索、分类筛选、搜索结果反馈
- 📦 **商品详情**：图片展示、价格信息、用户评价、相关推荐
- 🛒 **购物车**：添加/删除商品、数量调整、价格汇总、优惠券
- 💳 **结算**：订单汇总、运费计算、税费计算
- 📱 **响应式设计**：完美适配桌面端和移动端
- ⚡ **流畅动画**：页面加载动画、悬停效果、平滑过渡
- 🔔 **Toast提示**：操作反馈提示
- 💾 **数据持久化**：购物车数据本地存储
- 🎯 **SEO优化**：Meta标签、Open Graph协议支持

## 🛠 技术栈

- **HTML5** - 语义化标签结构
- **CSS3** - Flexbox/Grid布局、CSS变量、动画效果
- **Vanilla JavaScript** - 原生JavaScript交互逻辑
- **Font Awesome** - 图标库
- **LocalStorage** - 购物车数据持久化

## 📁 项目结构

```
电商网站部署/
├── index.html          # 首页
├── product.html        # 商品详情页
├── cart.html           # 购物车页面
├── 404.html            # 404错误页面
├── styles.css          # 样式文件
├── data.js             # 商品数据
├── app.js              # 交互逻辑
├── .gitignore          # Git忽略文件配置
└── README.md           # 项目说明文档
```

## 🚀 本地运行

### 方法一：直接打开
直接在浏览器中打开 `index.html` 文件即可预览。

### 方法二：使用本地服务器
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

然后访问 `http://localhost:8000`

## 🌐 部署

### GitHub Pages 部署

1. 将代码推送到GitHub仓库
2. 进入仓库 Settings -> Pages
3. 选择分支和文件夹，保存
4. 等待部署完成后访问页面

### Netlify 部署
1. 将代码推送到GitHub
2. 在Netlify中导入GitHub仓库
3. 自动部署完成

### Vercel 部署
1. 将代码推送到GitHub
2. 在Vercel中导入GitHub仓库
3. 自动部署完成

## 📱 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge
- Opera

## 🎨 设计特点

- 采用Amazon经典的深色导航栏设计
- 橙色主题色搭配，符合电商行业规范
- 响应式网格布局，自适应各种屏幕尺寸
- 流畅的交互动画和过渡效果
- 清晰的视觉层次和信息架构

## 📊 商品分类

- 数码电器 (电子产品)
- 时尚服饰 (服装鞋包)
- 家居生活
- 运动户外
- 美妆个护

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 👨‍💻 作者

ShopWorld Team

---

© 2026 ShopWorld. All rights reserved.
