// ===== 商品数据库 =====
const products = [
    {
        "id": 1,
        "name": "Apple iPhone 16 Pro Max 256GB 原色钛金属",
        "subtitle": "A18 Pro芯片 | 4800万像素主摄 | USB-C接口",
        "category": "electronics",
        "categoryName": "数码电器",
        "price": 9999,
        "originalPrice": 13999,
        "discount": 29,
        "rating": 4.9,
        "reviews": 12580,
        "icon": "fa-mobile-screen-button",
        "color": "#1a1a2e",
        "badge": "爆款",
        "image": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
        "features": [
            "A18 Pro芯片",
            "4800万像素",
            "USB-C快充",
            "全天候续航"
        ]
    },
    {
        "id": 2,
        "name": "MacBook Air M3 15英寸 午夜色",
        "subtitle": "M3芯片 | 16GB内存 | 512GB固态硬盘",
        "category": "electronics",
        "categoryName": "数码电器",
        "price": 10499,
        "originalPrice": 12999,
        "discount": 19,
        "rating": 4.8,
        "reviews": 8920,
        "icon": "fa-laptop",
        "color": "#2d2d44",
        "badge": "新品",
        "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
        "features": [
            "Apple M3芯片",
            "15.3英寸屏",
            "18小时续航",
            "无风扇静音"
        ]
    },
    {
        "id": 3,
        "name": "Sony WH-1000XM5 头戴式无线降噪耳机",
        "subtitle": "行业领先降噪 | 30小时续航 | Hi-Res音质",
        "category": "electronics",
        "categoryName": "数码电器",
        "price": 2299,
        "originalPrice": 2999,
        "discount": 23,
        "rating": 4.7,
        "reviews": 15600,
        "icon": "fa-headphones",
        "color": "#16213e",
        "badge": "特价",
        "image": "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
        "features": [
            "30小时续航",
            "降噪技术",
            "Hi-Res音质",
            "多点连接"
        ]
    },
    {
        "id": 4,
        "name": "Samsung Galaxy S24 Ultra 12+512GB",
        "subtitle": "Galaxy AI | 2亿像素 | S Pen内置",
        "category": "electronics",
        "categoryName": "数码电器",
        "price": 9699,
        "originalPrice": 11999,
        "discount": 19,
        "rating": 4.8,
        "reviews": 7340,
        "icon": "fa-tablet-screen-button",
        "color": "#1b1b2f",
        "badge": "",
        "image": "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=400&h=400&fit=crop",
        "features": [
            "Snapdragon 8 Gen 3",
            "2亿像素",
            "Galaxy AI",
            "S Pen"
        ]
    },
    {
        "id": 5,
        "name": "iPad Pro M4 平板电脑 11英寸",
        "subtitle": "Ultra Retina XDR | Apple Pencil Pro",
        "category": "electronics",
        "categoryName": "数码电器",
        "price": 7999,
        "originalPrice": 8999,
        "discount": 11,
        "rating": 4.9,
        "reviews": 5620,
        "icon": "fa-tablet-alt",
        "color": "#0f3460",
        "badge": "热销",
        "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
        "features": [
            "M4芯片",
            "XDR屏幕",
            "Apple Pencil Pro",
            "超薄设计"
        ]
    },
    {
        "id": 6,
        "name": "DJI Mini 4 Pro 航拍无人机",
        "subtitle": "249g轻巧机身 | 4K HDR视频 | 全向避障",
        "category": "electronics",
        "categoryName": "数码电器",
        "price": 5788,
        "originalPrice": 6988,
        "discount": 17,
        "rating": 4.6,
        "reviews": 3210,
        "icon": "fa-helicopter",
        "color": "#1a1a2e",
        "badge": "",
        "image": "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop",
        "features": [
            "249g轻量",
            "4K/60fps",
            "全向避障",
            "34分钟续航"
        ]
    },
    {
        "id": 7,
        "name": "Nike Air Max 270 男子运动鞋",
        "subtitle": "Air Max气垫 | 透气网面 | 缓震回弹",
        "category": "clothing",
        "categoryName": "时尚服饰",
        "price": 899,
        "originalPrice": 1299,
        "discount": 31,
        "rating": 4.6,
        "reviews": 23450,
        "icon": "fa-shoe-prints",
        "color": "#e94560",
        "badge": "特价",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        "features": [
            "Air Max 270气垫",
            "工程网眼",
            "泡棉中底",
            "橡胶外底"
        ]
    },
    {
        "id": 8,
        "name": "优衣库 男女同款轻型羽绒服",
        "subtitle": "650蓬松度 | 可收纳设计 | 多色可选",
        "category": "clothing",
        "categoryName": "时尚服饰",
        "price": 399,
        "originalPrice": 599,
        "discount": 33,
        "rating": 4.5,
        "reviews": 45600,
        "icon": "fa-vest",
        "color": "#073b4c",
        "badge": "爆款",
        "image": "https://images.unsplash.com/photo-1591047139829-d91aecb9caea?w=400&h=400&fit=crop",
        "features": [
            "650蓬松度",
            "轻便可收纳",
            "防泼水面料",
            "多色可选"
        ]
    },
    {
        "id": 9,
        "name": "Adidas Ultraboost 23 跑步鞋",
        "subtitle": "Boost中底 | Primeknit鞋面 | Continental大底",
        "category": "clothing",
        "categoryName": "时尚服饰",
        "price": 1099,
        "originalPrice": 1690,
        "discount": 35,
        "rating": 4.7,
        "reviews": 18900,
        "icon": "fa-shoe-prints",
        "color": "#16213e",
        "badge": "",
        "image": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop",
        "features": [
            "BOOST能量回馈",
            "Primeknit鞋面",
            "Continental大底",
            "Torsion系统"
        ]
    },
    {
        "id": 10,
        "name": "Levis 501 原版直筒牛仔裤",
        "subtitle": "经典501版型 | 100纯棉 | 永恒时尚",
        "category": "clothing",
        "categoryName": "时尚服饰",
        "price": 599,
        "originalPrice": 890,
        "discount": 33,
        "rating": 4.6,
        "reviews": 32100,
        "icon": "fa-shirt",
        "color": "#2c3e50",
        "badge": "经典",
        "image": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
        "features": [
            "经典501版型",
            "纯棉丹宁",
            "纽扣门襟",
            "永恒时尚"
        ]
    },
    {
        "id": 11,
        "name": "戴森 V15 Detect 无线吸尘器",
        "subtitle": "激光探测 | 240AW吸力 | 整机密封HEPA",
        "category": "home",
        "categoryName": "家居生活",
        "price": 4990,
        "originalPrice": 5990,
        "discount": 17,
        "rating": 4.8,
        "reviews": 12340,
        "icon": "fa-broom",
        "color": "#e67e22",
        "badge": "智能",
        "image": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop",
        "features": [
            "激光探测",
            "240AW吸力",
            "HEPA密封",
            "60分钟续航"
        ]
    },
    {
        "id": 12,
        "name": "MUJI 无印良品 香薰机",
        "subtitle": "超声波雾化 | 定时关机 | 氛围灯",
        "category": "home",
        "categoryName": "家居生活",
        "price": 350,
        "originalPrice": 450,
        "discount": 22,
        "rating": 4.5,
        "reviews": 28900,
        "icon": "fa-spa",
        "color": "#f5f0e8",
        "badge": "",
        "image": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
        "features": [
            "超声波雾化",
            "定时关机",
            "氛围灯",
            "极简设计"
        ]
    },
    {
        "id": 13,
        "name": "小米米家 智能LED台灯",
        "subtitle": "调光调色 | 护眼模式 | 定时休息提醒",
        "category": "home",
        "categoryName": "家居生活",
        "price": 459,
        "originalPrice": 699,
        "discount": 34,
        "rating": 4.6,
        "reviews": 15430,
        "icon": "fa-lightbulb",
        "color": "#ffeaa7",
        "badge": "特价",
        "image": "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop",
        "features": [
            "5500K自然光",
            "无频闪",
            "智能调光",
            "USB充电"
        ]
    },
    {
        "id": 14,
        "name": "小米米家 扫地机器人Pro",
        "subtitle": "LDS激光导航 | 5000Pa吸力 | 自动集尘",
        "category": "home",
        "categoryName": "家居生活",
        "price": 2699,
        "originalPrice": 3499,
        "discount": 23,
        "rating": 4.7,
        "reviews": 21560,
        "icon": "fa-robot",
        "color": "#dfe6e9",
        "badge": "智能",
        "image": "https://images.unsplash.com/photo-1589830852856-9c6b3d2e5f6d?w=400&h=400&fit=crop",
        "features": [
            "LDS导航",
            "5000Pa吸力",
            "自动集尘",
            "APP控制"
        ]
    },
    {
        "id": 15,
        "name": "Garmin Forerunner 265 GPS手表",
        "subtitle": "AMOLED彩屏 | 训练状态 | 续航13天",
        "category": "sports",
        "categoryName": "运动户外",
        "price": 3680,
        "originalPrice": 4280,
        "discount": 14,
        "rating": 4.8,
        "reviews": 6780,
        "icon": "fa-stopwatch",
        "color": "#2d3436",
        "badge": "",
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        "features": [
            "AMOLED屏幕",
            "训练状态",
            "GPS多卫星",
            "13天续航"
        ]
    },
    {
        "id": 16,
        "name": "Coleman 自动速开帐篷 四人款",
        "subtitle": "60秒快速搭建 | 防雨涂层 | 遮阳顶棚",
        "category": "sports",
        "categoryName": "运动户外",
        "price": 1299,
        "originalPrice": 1899,
        "discount": 32,
        "rating": 4.5,
        "reviews": 4320,
        "icon": "fa-campground",
        "color": "#00b894",
        "badge": "户外",
        "image": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=400&fit=crop",
        "features": [
            "60秒搭建",
            "TX2防雨",
            "遮阳顶棚",
            "电线管理口"
        ]
    },
    {
        "id": 17,
        "name": "Keep 智能健身镜 家用全能健身房",
        "subtitle": "AI动作识别 | 实时课程 | 4K高清屏",
        "category": "sports",
        "categoryName": "运动户外",
        "price": 2999,
        "originalPrice": 3999,
        "discount": 25,
        "rating": 4.4,
        "reviews": 3210,
        "icon": "fa-dumbbell",
        "color": "#636e72",
        "badge": "新品",
        "image": "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&h=400&fit=crop",
        "features": [
            "43寸4K屏",
            "AI动作纠正",
            "500+课程",
            "镜面模式"
        ]
    },
    {
        "id": 18,
        "name": "SK-II 神仙水护肤精华露 230ml",
        "subtitle": "PITERA精华 | 改善肌肤质地 | 经典畅销",
        "category": "beauty",
        "categoryName": "美妆个护",
        "price": 1190,
        "originalPrice": 1590,
        "discount": 25,
        "rating": 4.8,
        "reviews": 34560,
        "icon": "fa-spray-can-sparkles",
        "color": "#fd79a8",
        "badge": "爆款",
        "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
        "features": [
            "PITERA精华",
            "改善肌肤",
            "清爽不黏腻",
            "畅销经典"
        ]
    },
    {
        "id": 19,
        "name": "戴森 Supersonic HD08 吹风机",
        "subtitle": "高速数码马达 | 智能温控 | 负离子护发",
        "category": "beauty",
        "categoryName": "美妆个护",
        "price": 2790,
        "originalPrice": 3390,
        "discount": 18,
        "rating": 4.7,
        "reviews": 18900,
        "icon": "fa-wind",
        "color": "#e17055",
        "badge": "",
        "image": "https://images.unsplash.com/photo-1522338242992-e1a54571a9f7?w=400&h=400&fit=crop",
        "features": [
            "高速数码马达",
            "智能温控",
            "4款风嘴",
            "轻量化"
        ]
    },
    {
        "id": 20,
        "name": "雅诗兰黛 小棕瓶精华露 第七代",
        "subtitle": "肌因修护 | 抗老紧致 | 夜间修护",
        "category": "beauty",
        "categoryName": "美妆个护",
        "price": 980,
        "originalPrice": 1380,
        "discount": 29,
        "rating": 4.7,
        "reviews": 28700,
        "icon": "fa-pump-soap",
        "color": "#2d3436",
        "badge": "经典",
        "image": "https://images.unsplash.com/photo-1583501910003-03aa3b0b0cba?w=400&h=400&fit=crop",
        "features": [
            "第七代配方",
            "ChronoluxCB",
            "夜间修护",
            "100ml大容量"
        ]
    }
];

// ===== 轮播图数据 =====
const slides = [
    {
        "title": "夏日狂欢节",
        "subtitle": "精选好物低至3折起",
        "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "cta": "立即抢购"
    },
    {
        "title": "新品首发",
        "subtitle": "最新科技产品抢先体验",
        "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "cta": "查看详情"
    },
    {
        "title": "品牌特卖",
        "subtitle": "大牌正品，超值优惠",
        "gradient": "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "cta": "马上选购"
    }
];
