const { decodeToken } = require('../services/token.service');

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization;
  
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
      let decoded = decodeToken(token);
      if (req.params.userId && req.params.userId != decoded.userId) {
        return res.status(401).send({ message: 'Unauthorized.' });
      }
      
      req.decodedToken = decoded;
      next();
    } else {
      return res.status(401).send({ message: 'Token is required' });
    }

  } catch (error) {
    error.status = 401;
    next(error);
  }
};
