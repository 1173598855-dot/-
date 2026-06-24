const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '..', '..', 'data', 'shopworld.db');
const dataDir = path.join(__dirname, '..', '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

function run(sql, params) {
    try { db.prepare(sql).run(params); } catch(e) { console.error('DB run error:', e.message); throw e; }
}
function get(sql, params) {
    try { return db.prepare(sql).get(params); } catch(e) { console.error('DB get error:', e.message); throw e; }
}
function all(sql, params) {
    try { return db.prepare(sql).all(params); } catch(e) { console.error('DB all error:', e.message); throw e; }
}

function initDB() {
    run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL, email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL, role TEXT DEFAULT 'customer',
        avatar TEXT DEFAULT '', phone TEXT DEFAULT '', address TEXT DEFAULT '',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY, name TEXT NOT NULL, subtitle TEXT,
        category TEXT NOT NULL, category_name TEXT NOT NULL,
        price REAL NOT NULL, original_price REAL NOT NULL, discount INTEGER DEFAULT 0,
        rating REAL DEFAULT 5.0, reviews INTEGER DEFAULT 0,
        icon TEXT, color TEXT, badge TEXT, image TEXT, features TEXT,
        stock INTEGER DEFAULT 100, sales INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT, order_no TEXT UNIQUE NOT NULL,
        user_id INTEGER NOT NULL, total_amount REAL NOT NULL,
        shipping_fee REAL DEFAULT 0, tax_amount REAL DEFAULT 0, discount_amount REAL DEFAULT 0,
        status TEXT DEFAULT 'pending', payment_method TEXT DEFAULT '',
        receiver_name TEXT DEFAULT '', receiver_phone TEXT DEFAULT '',
        receiver_address TEXT DEFAULT '', remark TEXT DEFAULT '',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);
    run(`CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL, product_name TEXT NOT NULL,
        product_image TEXT DEFAULT '', quantity INTEGER NOT NULL,
        price REAL NOT NULL, subtotal REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    )`);
    run(`CREATE TABLE IF NOT EXISTS cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL, quantity INTEGER NOT NULL DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id),
        UNIQUE(user_id, product_id)
    )`);
    run(`CREATE TABLE IF NOT EXISTS wishlists (
        id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id),
        UNIQUE(user_id, product_id)
    )`);
    run(`CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL, order_id INTEGER, rating INTEGER NOT NULL,
        content TEXT, images TEXT DEFAULT '',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    )`);
    run(`CREATE TABLE IF NOT EXISTS site_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT, stat_key TEXT UNIQUE NOT NULL,
        stat_value INTEGER DEFAULT 0, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    const salt = bcrypt.genSaltSync(10);
    const aHash = bcrypt.hashSync('admin123', salt);
    const cHash = bcrypt.hashSync('customer123', salt);
    run("INSERT OR IGNORE INTO users (username,email,password,role) VALUES (?,?,?,?)", ['admin','admin@shopworld.com',aHash,'admin']);
    run("INSERT OR IGNORE INTO users (username,email,password,role) VALUES (?,?,?,?)", ['customer','customer@shopworld.com',cHash,'customer']);
    run("INSERT OR IGNORE INTO site_stats (stat_key,stat_value) VALUES ('total_visits',0)");
    run("INSERT OR IGNORE INTO site_stats (stat_key,stat_value) VALUES ('total_users',0)");
    run("INSERT OR IGNORE INTO site_stats (stat_key,stat_value) VALUES ('total_orders',0)");
    run("INSERT OR IGNORE INTO site_stats (stat_key,stat_value) VALUES ('total_revenue',0)");
    console.log('DB initialized | admin/admin123 | customer/customer123');
}

initDB();

module.exports = { db, run, get, all };
