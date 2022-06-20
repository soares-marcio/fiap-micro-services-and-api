const User = require("../models/user");

async function userExist(request, response, next) {
  const { username } = request.body;
  const user = await User.exists({ username });
  if (user !== null) {
    return response.status(422).json({ message: `User already exists.` });
  }
  return next();
}

module.exports = userExist;