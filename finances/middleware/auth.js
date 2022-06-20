const jwt = require("jsonwebtoken");
const cfg = require("../config");

function auth(request, response, next) {
  const { authorization: tokenAuth } = request.headers;

  if (!tokenAuth) {
    return response.status(401).json({ message: `Access denied` });
  }

  const token = tokenAuth.split(/\s/)[1];

  if (!token) {
    return response.status(401).json({ message: `Access denied` });
  }

  jwt.verify(token, cfg.jwt_key, error => {
    if (error) {
      return response.status(401).json({ message: `Access denied` })
    }
    return next();
  });
}

module.exports = auth;