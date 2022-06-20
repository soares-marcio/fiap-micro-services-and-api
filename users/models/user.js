const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const users = new mongoose.Schema({
  username: { type: String, unique: true, required: 'Username is required' },
  password: { type: String, required: 'Password is required'  },
  email: {
    type: String,
    unique: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  name: { type: String, required: 'Name is required' },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now},
});

users.pre('save',function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10, (error, hashpass) => {
    user.password = hashpass;
    return next();
  })
});

module.exports = mongoose.model('users', users);