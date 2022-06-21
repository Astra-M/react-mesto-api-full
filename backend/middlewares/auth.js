const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

// const generateToken = (payload) =>
//  jwt.sign(payload, 'some-secret-key', { expiresIn: '7d' });

const generateToken = (payload) =>
jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });

 // const token = jwt.sign(
//   { _id: user._id },
//   NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
// );

const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    const err = new Error('Authorization error2: try again');
    err.statusCode = 401;
    throw err;
  }
  const token = auth.replace('Bearer ', '');
  let payload;
  try {
    // payload = jwt.verify(token, 'some-secret-key');
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (e) {
    const err = new Error('Authorization error2 - please, try again');
    err.statusCode = 401;
    return next(err);
  }
  req.user = payload;
  return next();
};

module.exports = { generateToken, isAuthorized };
