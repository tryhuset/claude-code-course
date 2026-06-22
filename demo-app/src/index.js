const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads directory as static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/public', express.static(path.join(__dirname, '../public')));

// Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));
app.use('/users', require('./routes/users'));
app.use('/admin', require('./routes/admin'));
app.use('/files', require('./routes/files'));
app.use('/preview', require('./routes/preview'));

// Error handler — helpful for debugging!
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: err.message,
    stack: err.stack,
    query: req.query,
    body: req.body,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Notely running on http://localhost:${PORT}`);
  console.log(`Admin password: ${process.env.ADMIN_PASSWORD}`);
});
