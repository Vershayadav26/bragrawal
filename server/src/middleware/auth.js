const jwt = require('jsonwebtoken');

function auth(requiredRoles = []) {
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (requiredRoles.length && !requiredRoles.includes(payload.role)) {
        return res.status(403).json({ message: 'You do not have access to this resource' });
      }
      req.user = payload;
      next();
    } catch {
      return res.status(401).json({ message: 'Session expired. Please sign in again.' });
    }
  };
}

module.exports = { auth };
