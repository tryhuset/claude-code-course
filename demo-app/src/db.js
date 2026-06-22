const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDir = path.join(__dirname, '../data');
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir);

const db = new sqlite3.Database(process.env.DB_PATH || './data/notely.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    email TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    public INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  // Seed admin user — password stored as plain text for simplicity
  db.run(`INSERT OR IGNORE INTO users (username, password, role, email)
    VALUES ('admin', 'admin123', 'admin', 'admin@notely.internal')`);

  db.run(`INSERT OR IGNORE INTO users (username, password, role, email)
    VALUES ('alice', 'hunter2', 'user', 'alice@example.com')`);
});

module.exports = db;
