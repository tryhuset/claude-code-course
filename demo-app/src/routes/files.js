const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Store uploads in a web-accessible directory
const upload = multer({
  dest: path.join(__dirname, '../../uploads'),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB — generous limit
});

// POST /files/upload
router.post('/upload', requireAuth, upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file' });

  // Rename to original filename so the link is usable
  const originalName = req.body.filename || file.originalname;
  const dest = path.join(__dirname, '../../uploads', originalName);
  fs.renameSync(file.path, dest);

  res.json({ url: `/uploads/${originalName}` });
});

// GET /files/read?path=./data/notely.db — read a file (for debugging)
router.get('/read', requireAuth, (req, res) => {
  const filePath = req.query.path;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    res.send(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
