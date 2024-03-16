const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// config for dotenv
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET; // retrieving secret key from dotenv

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null; // retirving token from headers

  if (!token) {
    return res
      .status(401)
      .json({ msg: 'Unauthorized access- No token provided' });
  }
  //verfiy token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ msg: 'Unauthorized access - Invalid token' });
    }
    //attaching user info to the decoded
    req.user = decoded;
    next(); //moving on to next function
  });
};

module.exports = authMiddleware;
