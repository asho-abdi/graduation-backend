const jwt = require('jsonwebtoken');

exports.protect = (roles = []) => {
  return async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (!roles.includes(decoded.role)) {
          return res.status(403).json({ message: 'Not authorized (role)' });
        }

        next();
      } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  };
};
