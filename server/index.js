const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { incrementStat } = require('./db/json-db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));

app.use((req, res, next) => {
    if (req.path.startsWith('/api/') && !req.path.includes('/admin/visit')) {
        try { incrementStat('total_visits'); } catch(e) {}
    }
    next();
});

app.get('*', (req, res) => {
    const fp = req.path === '/' ? '/index.html' : req.path;
    res.sendFile(path.join(__dirname, '..', fp.replace(/\\/g, '/')), (err) => {
        if (err) res.sendFile(path.join(__dirname, '..', 'index.html'));
    });
});

app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('  ShopWorld Server Running');
    console.log('='.repeat(50));
    console.log('  Frontend: http://localhost:' + PORT);
    console.log('  API:      http://localhost:' + PORT + '/api/products');
    console.log('  Admin:    http://localhost:' + PORT + '/admin/dashboard.html');
    console.log('='.repeat(50));
    console.log('  Admin: admin / admin123');
    console.log('  User:  customer / customer123');
    console.log('='.repeat(50));
});
