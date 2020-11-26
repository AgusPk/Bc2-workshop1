const jwt = require("jsonwebtoken");
const LLAVE_SECRETA = process.env.JWT_KEY;

exports.validateAutentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: 401,
        message: "Authorization header missing",
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Authorization token missing",
      });
    }

    jwt.verify(token, LLAVE_SECRETA, (err, decode) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: "Invalid token",
        });
      }

      // para usar el middleware express-acl
      req.decoded = decode;
      next();
    });
  } catch (err) {
    next(err);
  }
};
