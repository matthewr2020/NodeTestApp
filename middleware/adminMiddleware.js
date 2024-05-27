const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = adminMiddleware;
