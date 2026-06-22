const express = require('express');
const fetch = require('node-fetch');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// POST /preview/url — fetch a URL and return its content (for link previews in notes)
router.post('/url', requireAuth, async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'url required' });

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.json({ content: text, status: response.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
