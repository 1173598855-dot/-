// ===== 全局状态 =====
let cart = JSON.parse(localStorage.getItem('shopworld_cart')) || [];
let currentSlide = 0;
let slideInterval;

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // 判断当前页面
    if (window.location.pathname.includes('product.html')) {
        initProductDetail();
    } else if (window.location.pathname.includes('cart.html')) {
        initCart();
    } else {
        initHomepage();
    }
});

// ===== 首页初始化 =====
function initHomepage() {
    renderFlashSale();
    renderProducts('all');
    initSlider();
    initFilters();
    initCountdown();

    // 搜索框回车事件
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }
}

// ===== 轮播图 =====
function initSlider() {
    const dotsContainer = document.getElementById('sliderDots');
    if (!dotsContainer) return;

    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    });

    startAutoSlide();
}

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateSlider();
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetAutoSlide();
}

function updateSlider() {
    const container = document.getElementById('sliderContainer');
    if (container) {
        container.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function startAutoSlide() {
    slideInterval = setInterval(() => changeSlide(1), 5000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// ===== 限时抢购 =====
function renderFlashSale() {
    const container = document.getElementById('flashSaleProducts');
    if (!container) return;

    const flashItems = products.slice(0, 8);
    container.innerHTML = flashItems.map(product => createProductCard(product)).join('');

    // 为限时抢购商品添加点击跳转
    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.add-to-cart-btn')) {
                const id = card.dataset.id;
                if (id) window.location.href = `product.html?id=${id}`;
            }
        });
    });
}

// ===== 商品渲染 =====
function renderProducts(filter) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    let filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(product => createProductCard(product)).join('');

    // 为每个商品卡片添加点击跳转
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.add-to-cart-btn')) {
                const id = card.dataset.id;
                if (id) window.location.href = `product.html?id=${id}`;
            }
        });
    });
}

function createProductCard(product) {
    const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '');
    const discountTag = product.discount > 20 ? `<span class="discount-tag">-${product.discount}%</span>` : '';
    const badgeHtml = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';

    return `
        <div class="product-card" data-id="${product.id}">
            ${badgeHtml}
            <div class="product-image" style="background: ${product.color}15; color: ${product.color};">
                <i class="fas ${product.icon}"></i>
            </div>
            <div class="product-info">
                <div class="product-category">${product.categoryName}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-count">(${product.reviews.toLocaleString()})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">¥${product.price.toLocaleString()}</span>
                    <span class="original-price">¥${product.originalPrice.toLocaleString()}</span>
                    ${discountTag}
                </div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> 加入购物车
                </button>
            </div>
        </div>
    `;
}

// ===== 筛选器 =====
function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.filter);
        });
    });
}

// ===== 搜索 =====
function handleSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!query) {
        renderProducts('all');
        return;
    }

    const results = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query) ||
        p.categoryName.includes(query)
    );

    const grid = document.getElementById('productGrid');
    if (grid && results.length > 0) {
        grid.innerHTML = results.map(product => createProductCard(product)).join('');
        showToast(`找到 ${results.length} 件相关商品`);
    } else if (grid) {
        grid.innerHTML = '<div class="cart-empty"><i class="fas fa-search"></i><h3>未找到相关商品</h3><p>试试其他关键词吧</p></div>';
    }
}

// ===== 倒计时 =====
function initCountdown() {
    let totalSeconds = 8 * 3600 + 45 * 60 + 30;

    setInterval(() => {
        if (totalSeconds <= 0) return;
        totalSeconds--;

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const hEl = document.getElementById('hours');
        const mEl = document.getElementById('minutes');
        const sEl = document.getElementById('seconds');

        if (hEl) hEl.textContent = String(hours).padStart(2, '0');
        if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
        if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// ===== 购物车功能 =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            icon: product.icon,
            color: product.color,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showToast(`✓ ${product.name.substring(0, 15)}... 已加入购物车`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    renderCart();
}

function saveCart() {
    localStorage.setItem('shopworld_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const countEl = document.getElementById('cartCount');
    if (countEl) {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        countEl.textContent = total;
    }
}

function goToCart() {
    window.location.href = 'cart.html';
}

function goToProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

// ===== Toast提示 =====
function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    toast.classList.add('show');

    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== 回到顶部 =====
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== 商品详情页 =====
function initProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const product = products.find(p => p.id === productId);

    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    document.title = `${product.name} - ShopWorld`;

    const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '');
    const featuresHtml = product.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('');

    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productSubtitle').textContent = product.subtitle;
    document.getElementById('detailStars').innerHTML = `<span class="stars">${stars}</span> <span>${product.rating}</span> <span>(${product.reviews.toLocaleString()} 条评价)</span>`;
    document.getElementById('detailCurrentPrice').textContent = `¥${product.price.toLocaleString()}`;
    document.getElementById('detailOriginalPrice').textContent = `¥${product.originalPrice.toLocaleString()}`;
    document.getElementById('detailDiscount').textContent = `省¥${(product.originalPrice - product.price).toLocaleString()}`;
    document.getElementById('detailFeatures').innerHTML = featuresHtml;

    // 设置主图颜色
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
        mainImage.style.background = `${product.color}15`;
        mainImage.style.color = product.color;
    }

    // 缩略图
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
        thumb.style.background = `${product.color}${['15', '20', '25', '30'][i]}`;
        thumb.style.color = product.color;
    });

    // 添加到购物车按钮
    const addToCartBtn = document.querySelector('.btn-add-cart');
    if (addToCartBtn) {
        addToCartBtn.onclick = () => {
            const qty = parseInt(document.querySelector('.qty-input').value);
            for (let i = 0; i < qty; i++) {
                addToCart(product.id);
            }
        };
    }

    // 立即购买
    const buyNowBtn = document.querySelector('.btn-buy-now');
    if (buyNowBtn) {
        buyNowBtn.onclick = () => {
            addToCart(product.id);
            goToCart();
        };
    }

    // 数量选择器
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.querySelector('.qty-input');
            let val = parseInt(input.value);
            if (btn.textContent === '+') {
                val = Math.min(val + 1, 99);
            } else {
                val = Math.max(val - 1, 1);
            }
            input.value = val;
        });
    });

    // 缩略图点击
    thumbnails.forEach((thumb, i) => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            const mainImg = document.querySelector('.main-image i');
            if (mainImg) {
                mainImg.className = `fas ${product.icon}`;
            }
        });
    });
}

// ===== 购物车页面 =====
function initCart() {
    renderCart();
}

function renderCart() {
    const cartBody = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const couponBox = document.getElementById('couponBox');
    const summaryBox = document.getElementById('summaryBox');

    if (!cartBody) return;

    if (cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (couponBox) couponBox.style.display = 'none';
        if (summaryBox) summaryBox.style.display = 'none';
        return;
    }

    if (cartEmpty) cartEmpty.style.display = 'none';
    if (couponBox) couponBox.style.display = 'block';
    if (summaryBox) summaryBox.style.display = 'block';

    let html = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;

        html += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info" style="cursor:pointer;" onclick="window.location.href='product.html?id=${item.id}'">
                    <div class="cart-item-image" style="background: #f8f8f8;">
                        <i class="fas ${item.icon}" style="color: #ddd;"></i>
                    </div>
                    <div>
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-meta">自营 · 正品保证</div>
                    </div>
                </div>
                <div class="cart-item-price">
                    ¥${item.price.toLocaleString()}
                </div>
                <div class="cart-qty">
                    <button class="qty-btn" onclick="event.stopPropagation(); updateQuantity(${item.id}, -1)">-</button>
                    <input type="text" class="qty-input" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="event.stopPropagation(); updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-subtotal">
                    ¥${itemSubtotal.toLocaleString()}
                </div>
                <button class="remove-btn" onclick="event.stopPropagation(); removeFromCart(${item.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    });

    cartBody.innerHTML = html;

    // 更新汇总
    const savings = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? (product.originalPrice - product.price) * item.quantity : 0);
    }, 0);

    const shipping = subtotal >= 99 ? 0 : 15;
    const tax = Math.round(subtotal * 0.06);
    const total = subtotal + shipping + tax;

    document.getElementById('subtotal').textContent = `¥${subtotal.toLocaleString()}`;
    document.getElementById('savings').textContent = `-¥${savings.toLocaleString()}`;
    document.getElementById('shipping').textContent = shipping === 0 ? '免运费' : `¥${shipping}`;
    document.getElementById('tax').textContent = `¥${tax.toLocaleString()}`;
    document.getElementById('orderTotal').textContent = `¥${total.toLocaleString()}`;

    // 满减进度条
    if (subtotal < 99) {
        const progress = (subtotal / 99) * 100;
        document.querySelector('.free-shipping').innerHTML = `
            <i class="fas fa-truck"></i> 再购 <strong>¥${(99 - subtotal).toLocaleString()}</strong> 可享免运费
            <div class="progress-bar" style="height:4px;background:#eee;border-radius:2px;margin-top:8px;">
                <div style="height:100%;width:${progress}%;background:var(--success);border-radius:2px;transition:width 0.3s;"></div>
            </div>
        `;
    }
}

// 优惠券
document.addEventListener('click', (e) => {
    if (e.target.closest('#applyCoupon')) {
        const input = document.querySelector('#couponCode');
        if (input && input.value.trim()) {
            showToast('✓ 优惠券已应用，立减¥50');
            input.value = '';
        }
    }
});

// 结算
document.addEventListener('click', (e) => {
    if (e.target.closest('#checkoutBtn')) {
        if (cart.length === 0) {
            showToast('购物车是空的哦~');
            return;
        }
        showToast('正在跳转至结算页面...');
        // 实际项目中这里会跳转到结算页面
    }
});
