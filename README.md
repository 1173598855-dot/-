# ShopWorld - 全球精选好物

一个基于 Amazon 设计风格的**全功能电商网站**，包含前端展示、用户登录注册、后台管理系统。

## ✨ 功能特性

### 前台功能
- 🏠 **首页**：轮播图、分类导航、限时抢购、商品推荐、品牌专区
- 🔍 **搜索**：关键词搜索、分类筛选、排序
- 📦 **商品详情**：真实商品图片、价格、评价、相关推荐
- 🛒 **购物车**：增删改查、优惠券、价格汇总
- 📋 **订单中心**：订单列表、状态管理
- ❤️ **收藏夹**：收藏商品管理
- ℹ️ **关于我们** / 📞 **联系我们**

### 用户系统
- 👤 **注册/登录**：JWT Token 认证
- 🔐 **密码加密**：bcrypt 加密存储
- 👤 **个人中心**：修改资料、修改密码

### 管理后台
- 📊 **数据概览**：访问量、用户数、订单数、收入统计
- 📦 **商品管理**：增删改查、批量同步
- 📋 **订单管理**：查看所有订单、修改状态
- 👥 **用户管理**：查看用户列表、删除用户

## 🛠 技术栈

### 前端
- **HTML5** / **CSS3** / **Vanilla JavaScript**
- **Font Awesome** 图标
- **Unsplash** 商品图片

### 后端
- **Node.js** + **Express.js**
- **JSON 文件存储**（无需数据库安装）
- **bcryptjs** 密码加密
- **jsonwebtoken** Token 认证

## 🚀 快速开始

### 1. 安装依赖
`ash
npm install
`

### 2. 启动服务器
`ash
npm start
`

访问：
- **前台网站**：http://localhost:3000
- **管理后台**：http://localhost:3000/admin/dashboard.html
- **API 文档**：http://localhost:3000/api/products

### 3. 默认账号

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 管理员 | admin | admin123 |
| 普通用户 | customer | customer123 |

## 📁 项目结构

`
电商网站部署/
├── index.html              # 首页
├── product.html            # 商品详情
├── cart.html               # 购物车
├── search.html             # 搜索结果
├── orders.html             # 订单中心
├── wishlist.html           # 收藏夹
├── about.html              # 关于我们
├── contact.html            # 联系我们
├── login.html              # 登录/注册
├── 404.html                # 404页面
├── styles.css              # 样式文件
├── data.js                 # 商品数据
├── app.js                  # 前端交互逻辑
├── package.json            # 项目配置
├── server/                 # 后端服务
│   ├── index.js            # 服务器入口
│   ├── db/
│   │   └── json-db.js      # 数据存储层
│   ├── middleware/
│   │   └── auth.js         # JWT 认证
│   └── routes/
│       ├── auth.js         # 认证路由
│       ├── products.js     # 商品路由
│       ├── orders.js       # 订单路由
│       └── admin.js        # 管理路由
├── public/
│   └── admin/
│       └── dashboard.html  # 管理后台
├── data/                   # 运行时数据
│   └── db.json             # 数据库文件（自动生成）
└── README.md
`

## 🌍 部署

### GitHub Pages + Backend
1. 将代码推送到 GitHub
2. 使用 **Railway** / **Render** / **Heroku** 部署后端
3. 使用 **GitHub Pages** 托管静态文件

### Docker 部署
`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server/index.js"]
`

## 📱 浏览器兼容
Chrome / Firefox / Safari / Edge / Opera

## 🤝 贡献
欢迎提交 Issue 和 Pull Request！

## 📄 许可
MIT License

## 👋 作者
ShopWorld Team

---
© 2026 ShopWorld. All rights reserved.
