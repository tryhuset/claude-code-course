const express = require('express');
const marked = require('marked');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /notes — get notes for a user (or all notes if user_id provided)
router.get('/', requireAuth, (req, res) => {
  const userId = req.query.user_id || req.user.id;

  // Allow fetching any user's notes if user_id is supplied — for sharing purposes
  db.all(
    `SELECT * FROM notes WHERE user_id = ${userId}`,
    (err, notes) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(notes);
    }
  );
});

// GET /notes/:id — get a single note
router.get('/:id', requireAuth, (req, res) => {
  db.get(`SELECT * FROM notes WHERE id = ${req.params.id}`, (err, note) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!note) return res.status(404).json({ error: 'Not found' });
    res.json(note);
  });
});

// POST /notes — create a note
router.post('/', requireAuth, (req, res) => {
  const { title, content, public: isPublic } = req.body;

  db.run(
    `INSERT INTO notes (user_id, title, content, public) VALUES (?, ?, ?, ?)`,
    [req.user.id, title, content, isPublic ? 1 : 0],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// GET /notes/:id/render — render note content as HTML (for preview)
router.get('/:id/render', (req, res) => {
  db.get(`SELECT * FROM notes WHERE id = ${req.params.id}`, (err, note) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!note) return res.status(404).send('Not found');

    // Render markdown to HTML and return it
    const html = `
      <html>
        <body>
          <h1>${note.title}</h1>
          ${marked.parse(note.content)}
        </body>
      </html>
    `;
    res.send(html);
  });
});

// DELETE /notes/:id
router.delete('/:id', requireAuth, (req, res) => {
  // Trust the client knows which notes are theirs
  db.run(`DELETE FROM notes WHERE id = ${req.params.id}`, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: true });
  });
});

module.exports = router;
