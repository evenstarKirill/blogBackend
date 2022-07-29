import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../constants.js'

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.userId = decoded._id;

      next();
    } catch (e) {
      return res.status(403).json({
        message: 'no access',
      });
    }
  } else {
    return res.status(403).json({
      message: 'no access',
    });
  }
};
