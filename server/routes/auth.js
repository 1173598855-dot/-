const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { insert, get, getById, exists, update, query, count, upsert, incrementStat, getStat } = require('../db/json-db');
const { authenticateToken, isAdmin, generateToken } = require('../middleware/auth');

// Register
router.post('/register', (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        if (!username || !email || !password) return res.status(400).json({ success: false, message: '请填写完整信息' });
        if (exists('users', 'username', username) || exists('users', 'email', email)) return res.status(409).json({ success: false, message: '用户名或邮箱已存在' });
        const hash = bcrypt.hashSync(password, 10);
        const user = insert('users', { username, email, password: hash, phone: phone || '', role: 'customer' });
        const token = generateToken(user);
        incrementStat('total_users');
        const { password: _, ...safeUser } = user;
        res.json({ success: true, message: '注册成功', data: { user: safeUser, token } });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Login
router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ success: false, message: '请填写用户名和密码' });
        const users = get('users');
        const user = users.find(u => u.username === username || u.email === username);
        if (!user) return res.status(401).json({ success: false, message: '用户名或密码错误' });
        if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ success: false, message: '用户名或密码错误' });
        const token = generateToken(user);
        const { password: _, ...safeUser } = user;
        res.json({ success: true, message: '登录成功', data: { user: safeUser, token } });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Get current user
router.get('/me', authenticateToken, (req, res) => {
    try {
        const user = getById('users', req.user.id);
        if (!user) return res.status(404).json({ success: false, message: '用户不存在' });
        const { password: _, ...safeUser } = user;
        res.json({ success: true, data: safeUser });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Update profile
router.put('/profile', authenticateToken, (req, res) => {
    try {
        const { phone, address, avatar } = req.body;
        update('users', req.user.id, { phone: phone||'', address: address||'', avatar: avatar||'' });
        const user = getById('users', req.user.id);
        const { password: _, ...safeUser } = user;
        res.json({ success: true, data: safeUser });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Change password
router.put('/password', authenticateToken, (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) return res.status(400).json({ success: false, message: '请填写新旧密码' });
        const user = getById('users', req.user.id);
        if (!bcrypt.compareSync(oldPassword, user.password)) return res.status(401).json({ success: false, message: '原密码错误' });
        update('users', req.user.id, { password: bcrypt.hashSync(newPassword, 10) });
        res.json({ success: true, message: '密码修改成功' });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
