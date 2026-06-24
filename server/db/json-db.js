const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function loadDB() {
    try {
        if (fs.existsSync(DB_FILE)) {
            return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
        }
    } catch(e) { console.error('Failed to load DB:', e.message); }
    return { users: [], products: [], orders: [], order_items: [], cart_items: [], wishlists: [], reviews: [], site_stats: [] };
}

function saveDB(db) {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
}

let dbCache = loadDB();

function get(key) { return dbCache[key] || []; }
function set(key, val) { dbCache[key] = val; saveDB(dbCache); }

function getById(table, id) { return get(table).find(r => String(r.id) === String(id)); }
function exists(table, field, value) { return get(table).some(r => String(r[field]) === String(value)); }

function insert(table, record) {
    const items = get(table);
    const maxId = items.length > 0 ? Math.max(...items.map(i => parseInt(i.id) || 0)) : 0;
    if (!record.id) record.id = maxId + 1;
    if (!record.created_at) record.created_at = new Date().toISOString();
    record.updated_at = new Date().toISOString();
    items.push(record);
    set(table, items);
    return record;
}

function update(table, id, updates) {
    const items = get(table);
    const idx = items.findIndex(r => String(r.id) === String(id));
    if (idx === -1) return null;
    Object.assign(items[idx], updates, { updated_at: new Date().toISOString() });
    set(table, items);
    return items[idx];
}

function remove(table, id) {
    const items = get(table);
    const filtered = items.filter(r => String(r.id) !== String(id));
    set(table, filtered);
    return filtered.length < items.length;
}

function query(table, conditions = {}, sortField = 'id', sortOrder = 'DESC', limit = 100, offset = 0) {
    let items = [...get(table)];
    // Apply conditions
    Object.keys(conditions).forEach(field => {
        const cond = conditions[field];
        if (typeof cond === 'string' && cond.startsWith('LIKE:')) {
            const search = cond.slice(5).toLowerCase();
            items = items.filter(r => String(r[field]).toLowerCase().includes(search));
        } else if (typeof cond === 'object' && cond.startsWith && cond.includes) {
            items = items.filter(r => cond.includes(r[field]));
        } else {
            items = items.filter(r => String(r[field]) === String(cond));
        }
    });
    // Sort
    items.sort((a, b) => {
        const av = a[sortField] || 0;
        const bv = b[sortField] || 0;
        return sortOrder === 'ASC' ? av - bv : bv - av;
    });
    return items.slice(offset, offset + limit);
}

function count(table) { return get(table).length; }

function upsert(table, record, uniqueField) {
    const items = get(table);
    const idx = items.findIndex(r => String(r[uniqueField || 'id']) === String(record[uniqueField || 'id']));
    if (idx >= 0) {
        items[idx] = { ...items[idx], ...record, updated_at: new Date().toISOString() };
    } else {
        if (!record.id) {
            const maxId = items.length > 0 ? Math.max(...items.map(i => parseInt(i.id) || 0)) : 0;
            record.id = maxId + 1;
        }
        record.created_at = record.created_at || new Date().toISOString();
        record.updated_at = new Date().toISOString();
        items.push(record);
    }
    set(table, items);
    return record;
}

function incrementStat(key, amount = 1) {
    const stats = get('site_stats');
    const idx = stats.findIndex(s => s.stat_key === key);
    if (idx >= 0) {
        stats[idx].stat_value = (stats[idx].stat_value || 0) + amount;
        stats[idx].updated_at = new Date().toISOString();
    } else {
        stats.push({ stat_key: key, stat_value: amount, updated_at: new Date().toISOString() });
    }
    set('site_stats', stats);
}

function getStat(key) {
    const stats = get('site_stats');
    const stat = stats.find(s => s.stat_key === key);
    return stat ? stat.stat_value : 0;
}

// Initialize default data
function initDB() {
    if (get('users').length === 0) {
        const bcrypt = require('bcryptjs');
        const salt = bcrypt.genSaltSync(10);
        insert('users', { username: 'admin', email: 'admin@shopworld.com', password: bcrypt.hashSync('admin123', salt), role: 'admin', created_at: new Date().toISOString() });
        insert('users', { username: 'customer', email: 'customer@shopworld.com', password: bcrypt.hashSync('customer123', salt), role: 'customer', created_at: new Date().toISOString() });
    }
    if (get('site_stats').length === 0) {
        ['total_visits','total_users','total_orders','total_revenue'].forEach(k => {
            insert('site_stats', { stat_key: k, stat_value: 0 });
        });
    }
}

initDB();

module.exports = { get, set, getById, exists, insert, update, remove, query, count, upsert, incrementStat, getStat, loadDB, saveDB };
