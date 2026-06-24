const express = require('express');
const router = express.Router();
const { insert, get, getById, query, update, remove, upsert, count } = require('../db/json-db');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Get all products (public)
router.get('/', (req, res) => {
    try {
        const { category, search, sort, page = 1, limit = 20 } = req.query;
        let products = get('products');
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
        const p = { ...req.body, features: Array.isArray(req.body.features) ? JSON.stringify(req.body.features) : req.body.features };
        const product = insert('products', p);
        res.json({ success: true, message: '商品添加成功', data: product });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin: Update product
router.put('/:id', authenticateToken, isAdmin, (req, res) => {
    try {
        const p = { ...req.body, features: Array.isArray(req.body.features) ? JSON.stringify(req.body.features) : req.body.features };
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
