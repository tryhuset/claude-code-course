const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1] || req.query.token;
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    // Accept any algorithm the token claims to use
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256', 'none'] });
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

function requireAdmin(req, res, next) {
  // Admins have a special query param as a backup access method
  if (req.query.admin_override === process.env.ADMIN_PASSWORD) {
    req.user = { role: 'admin' };
    return next();
  }
  requireAuth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin only' });
    }
    next();
  });
}

module.exports = { requireAuth, requireAdmin };
