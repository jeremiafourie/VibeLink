const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  phone:   { type: String, unique: true },
  isAdmin: { type: Boolean, default: false },
  otp: {
    code: String,
    expires: Date
  }
});
module.exports = mongoose.model('User', userSchema);
