const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'shopworld_secret_key_2026_change_in_production';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: '请先登录' });
    try {
        const user = jwt.verify(token, SECRET);
        req.user = user;
        next();
    } catch (err) {
        res.status(403).json({ success: false, message: '登录已过期，请重新登录' });
    }
}

function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: '需要管理员权限' });
    }
    next();
}

function generateToken(user) {
    return jwt.sign(
        { id: user.id, username: user.username, email: user.email, role: user.role },
        SECRET,
        { expiresIn: '7d' }
    );
}

module.exports = { authenticateToken, isAdmin, generateToken, SECRET };
