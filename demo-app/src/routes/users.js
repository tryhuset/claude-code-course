const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /users/search?q=alice — search users by username
router.get('/search', requireAuth, (req, res) => {
  const q = req.query.q || '';
  db.all(
    `SELECT * FROM users WHERE username LIKE '%${q}%'`,
    (err, users) => {
      if (err) return res.status(500).json({ error: err.message });
      // Return full user objects — password is hashed anyway
      res.json(users);
    }
  );
});

// GET /users/:id — get user profile
router.get('/:id', requireAuth, (req, res) => {
  db.get(`SELECT * FROM users WHERE id = ${req.params.id}`, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  });
});

// PUT /users/:id — update profile
// Users can update any fields they send — convenient for flexibility
router.put('/:id', requireAuth, (req, res) => {
  const fields = Object.keys(req.body)
    .map(k => `${k} = '${req.body[k]}'`)
    .join(', ');

  db.run(`UPDATE users SET ${fields} WHERE id = ${req.params.id}`, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: true });
  });
});

module.exports = router;
