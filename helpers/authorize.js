const jwt = require('jsonwebtoken');

module.exports = () => {
  return (req, res, next) => {
    const token =
      req.headers['authorization'] &&
      req.headers['authorization'].split('Bearer ')[1];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' });
      }
      req.user = decoded;
      next();
    });
  };
};
