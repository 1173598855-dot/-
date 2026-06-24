const express = require('express');
const router = express.Router();
const { insert, get, getById, update, remove, query, count, upsert, incrementStat, getStat } = require('../db/json-db');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Dashboard stats
router.get('/stats', authenticateToken, isAdmin, (req, res) => {
    try {
        const users = get('users').filter(u => u.role === 'customer');
        const orders = get('orders');
        const revenue = orders.filter(o => o.status === 'completed' || o.status === 'shipped').reduce((s,o) => s + (o.total_amount||0), 0);
        const recentOrders = orders.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10);
        recentOrders.forEach(o => { const u = users.find(x => x.id === o.user_id); o.username = u ? u.username : '-'; });
        // Top products
        const products = get('products');
        const orderItems = get('order_items');
        const topProducts = products.map(p => {
            const sold = orderItems.filter(i => i.product_id === p.id).reduce((s,i) => s + i.quantity, 0);
            return { ...p, total_sold: sold };
        }).sort((a,b) => b.total_sold - a.total_sold).slice(0, 5);
        res.json({ success: true, data: { totalUsers: users.length, totalOrders: orders.length, totalRevenue: revenue, recentOrders, topProducts } });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Get all orders
router.get('/orders', authenticateToken, isAdmin, (req, res) => {
    try {
        let orders = get('orders');
        const { status, search } = req.query;
        if (status) orders = orders.filter(o => o.status === status);
        if (search) { const s = search.toLowerCase(); orders = orders.filter(o => o.order_no.toLowerCase().includes(s)); }
        orders.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
        const users = get('users');
        orders.forEach(o => { const u = users.find(x => x.id === o.user_id); o.username = u ? u.username : '-'; });
        res.json({ success: true, data: orders });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Update order status
router.put('/orders/:id/status', authenticateToken, isAdmin, (req, res) => {
    try {
        const { status } = req.body;
        if (!['pending','paid','shipped','completed','cancelled'].includes(status)) return res.status(400).json({ success: false, message: '无效的状态值' });
        update('orders', req.params.id, { status });
        res.json({ success: true, message: '订单状态已更新' });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Get all users
router.get('/users', authenticateToken, isAdmin, (req, res) => {
    try {
        let users = get('users').filter(u => u.role === 'customer');
        const { search } = req.query;
        if (search) { const s = search.toLowerCase(); users = users.filter(u => u.username.toLowerCase().includes(s) || (u.email||'').toLowerCase().includes(s)); }
        users.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
        res.json({ success: true, data: users });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Delete user
router.delete('/users/:id', authenticateToken, isAdmin, (req, res) => {
    try {
        remove('users', req.params.id);
        res.json({ success: true, message: '用户已删除' });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Get all products
router.get('/products', authenticateToken, isAdmin, (req, res) => {
    try {
        const products = get('products').sort((a,b) => b.id - a.id);
        res.json({ success: true, data: products });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Sync products
router.post('/sync-products', authenticateToken, isAdmin, (req, res) => {
    try {
        const products = req.body.products || [];
        products.forEach(p => { p.features = Array.isArray(p.features) ? JSON.stringify(p.features) : p.features; upsert('products', p, 'id'); });
        res.json({ success: true, message: '已同步 ' + products.length + ' 个商品' });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Visit counter
router.post('/visit', (req, res) => {
    try {
        incrementStat('total_visits');
        res.json({ success: true });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
