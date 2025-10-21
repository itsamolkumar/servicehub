const jwtUtil = require('../utils/jwt');
const User = require('../models/User');

async function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Missing token' });

  const token = auth.split(' ')[1];
  try {
    const payload = jwtUtil.verify(token);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid token user' });
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function authorize(roles = []) {
  if (typeof roles === 'string') roles = [roles];
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    if (roles.length && !roles.includes(req.user.role))
      return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}

module.exports = { authenticate, authorize };
