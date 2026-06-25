const express = require('express');
const router = express.Router();
const { insert, get, getById, query, update, remove, upsert, count } = require('../db/json-db');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Get all products (public)
router.get('/', (req, res) => {
    try {
        const { category, search, sort, page = 1, limit = 50 } = req.query;
        let products = get('products');
        // Normalize field names
        products = products.map(p => {
            const catName = p.category_name || p.categoryName || p.category || '';
            const origPrice = p.original_price || p.originalPrice || p.price;
            const disc = p.discount || (origPrice && p.price ? Math.round((1 - p.price / origPrice) * 100) : 0);
            return {
                ...p,
                category_name: catName,
                categoryName: catName,
                original_price: origPrice,
                originalPrice: origPrice,
                rating: p.rating || 4.5,
                reviews: p.reviews || 0,
                stock: p.stock || 100,
                sales: p.sales || 0,
                icon: p.icon || 'fa-box',
                badge: p.badge || '',
                discount: disc,
                color: p.color || '#6366f1'
            };
        });
        if (category) products = products.filter(p => p.category === category);
        if (search) { const s = search.toLowerCase(); products = products.filter(p => p.name.toLowerCase().includes(s) || (p.subtitle||'').toLowerCase().includes(s) || (p.category_name||'').includes(s)); }
        if (sort === 'price-asc') products.sort((a,b) => a.price - b.price);
        else if (sort === 'price-desc') products.sort((a,b) => b.price - a.price);
        else if (sort === 'rating') products.sort((a,b) => b.rating - a.rating);
        else if (sort === 'reviews') products.sort((a,b) => b.reviews - a.reviews);
        else products.sort((a,b) => b.id - a.id);
        const total = products.length;
        const offset = (parseInt(page)-1)*parseInt(limit);
        res.json({ success: true, data: products.slice(offset, offset+parseInt(limit)), pagination: { page: parseInt(page), limit: parseInt(limit), total } });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Get single product
router.get('/:id', (req, res) => {
    try {
        const product = getById('products', req.params.id);
        if (!product) return res.status(404).json({ success: false, message: '商品不存在' });
        res.json({ success: true, data: product });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin: Create product
router.post('/', authenticateToken, isAdmin, (req, res) => {
    try {
        const p = { ...req.body };
        if (p.originalPrice) p.original_price = p.originalPrice;
        if (p.categoryName) p.category_name = p.categoryName;
        if (p.features && Array.isArray(p.features)) p.features = JSON.stringify(p.features);
        if (!p.stock) p.stock = 100;
        if (!p.sales) p.sales = 0;
        if (!p.rating) p.rating = 4.5;
        if (!p.reviews) p.reviews = 0;
        if (!p.discount && p.price && p.original_price) {
            p.discount = Math.round((1 - p.price / p.original_price) * 100);
        }
        const product = insert('products', p);
        res.json({ success: true, message: '商品添加成功', data: product });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin: Update product
router.put('/:id', authenticateToken, isAdmin, (req, res) => {
    try {
        const p = { ...req.body };
        if (p.originalPrice) p.original_price = p.originalPrice;
        if (p.categoryName) p.category_name = p.categoryName;
        if (p.features && Array.isArray(p.features)) p.features = JSON.stringify(p.features);
        if (!p.discount && p.price && p.original_price && p.original_price > p.price) {
            p.discount = Math.round((1 - p.price / p.original_price) * 100);
        }
        const product = update('products', req.params.id, p);
        if (!product) return res.status(404).json({ success: false, message: '商品不存在' });
        res.json({ success: true, message: '商品更新成功', data: product });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin: Delete product
router.delete('/:id', authenticateToken, isAdmin, (req, res) => {
    try {
        remove('products', req.params.id);
        res.json({ success: true, message: '商品已删除' });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
