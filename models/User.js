const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email']
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  otp: {
    code: { type: String, trim: true },
    expires: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
