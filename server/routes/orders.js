const express = require('express');
const router = express.Router();
const { insert, get, getById, query, update, count } = require('../db/json-db');
const { authenticateToken } = require('../middleware/auth');

// Create order
router.post('/', authenticateToken, (req, res) => {
    try {
        const { items, receiver_name, receiver_phone, receiver_address, payment_method, remark } = req.body;
        if (!items || items.length === 0) return res.status(400).json({ success: false, message: '购物车为空' });
        let shipping = items.reduce((s, i) => s + (i.price||0) * i.quantity, 0);
        if (shipping < 99) shipping = 15; else shipping = 0;
        const tax = Math.round(shipping * 0.06);
        const totalAmount = shipping + tax;
        const orderNo = 'SW' + Date.now().toString().slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
        const order = insert('orders', { order_no: orderNo, user_id: req.user.id, total_amount: totalAmount, shipping_fee: shipping, tax_amount: tax, status: 'pending', payment_method: payment_method||'online', receiver_name, receiver_phone, receiver_address, remark: remark||'' });
        items.forEach(item => {
            insert('order_items', { order_id: order.id, product_id: item.product_id, product_name: item.name, product_image: item.image||'', quantity: item.quantity, price: item.price, subtotal: item.price * item.quantity });
        });
        incrementProductSales(items);
        res.json({ success: true, message: '下单成功', data: order });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

function incrementProductSales(items) {
    const products = get('products');
    items.forEach(item => {
        const idx = products.findIndex(p => String(p.id) === String(item.product_id));
        if (idx >= 0) { products[idx].sales = (products[idx].sales || 0) + item.quantity; }
    });
    require('../db/json-db').set('products', products);
}

// Get user orders
router.get('/', authenticateToken, (req, res) => {
    try {
        const { status } = req.query;
        let orders = get('orders').filter(o => o.user_id === req.user.id);
        if (status) orders = orders.filter(o => o.status === status);
        orders.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
        orders.forEach(o => { o.items = get('order_items').filter(i => i.order_id === o.id); });
        res.json({ success: true, data: orders });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Cancel order
router.put('/:id/cancel', authenticateToken, (req, res) => {
    try {
        const order = getById('orders', req.params.id);
        if (!order || order.user_id !== req.user.id) return res.status(404).json({ success: false, message: '订单不存在' });
        update('orders', req.params.id, { status: 'cancelled' });
        res.json({ success: true, message: '订单已取消' });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Confirm receipt
router.put('/:id/confirm', authenticateToken, (req, res) => {
    try {
        const order = getById('orders', req.params.id);
        if (!order || order.user_id !== req.user.id) return res.status(404).json({ success: false, message: '订单不存在' });
        update('orders', req.params.id, { status: 'completed' });
        incrementStat('total_revenue', order.total_amount);
        res.json({ success: true, message: '确认收货成功' });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

const { incrementStat } = require('../db/json-db');
module.exports = router;
