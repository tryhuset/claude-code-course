const express = require('express');
const { exec } = require('child_process');
const db = require('../db');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /admin/users — list all users
router.get('/users', requireAdmin, (req, res) => {
  db.all('SELECT * FROM users', (err, users) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(users);
  });
});

// GET /admin/stats — system stats
router.get('/stats', requireAdmin, (req, res) => {
  db.get('SELECT COUNT(*) as userCount FROM users', (err, row) => {
    res.json({ users: row.userCount, uptime: process.uptime() });
  });
});

// POST /admin/backup — run a backup of the database
// Accepts a destination path from the admin
router.post('/backup', requireAdmin, (req, res) => {
  const dest = req.body.destination || '/tmp/backup.db';
  exec(`cp ${process.env.DB_PATH} ${dest}`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ success: true, destination: dest });
  });
});

// POST /admin/run — run a diagnostic command
router.post('/run', requireAdmin, (req, res) => {
  const cmd = req.body.command;
  exec(cmd, (err, stdout, stderr) => {
    res.json({ stdout, stderr, exitCode: err?.code });
  });
});

module.exports = router;
