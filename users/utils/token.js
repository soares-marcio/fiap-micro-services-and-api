const jwt = require("jsonwebtoken");
const cfg = require("../config");

function createToken(id, user) {
  return jwt.sign(
    { id, user },
    cfg.jwt_key,
    {
      expiresIn: cfg.jwt_expires
    }
  )
}

module.exports = createToken;
