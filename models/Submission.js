const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [100, 'Name can be at most 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    trim: true,
    // match: [
    //   /^\+[1-9]\d{4,14}$/,
    //   'Phone must be E.164 format (e.g. +27111234567) — no leading “0” after the country code'
    // ]
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  message: {
    type: String,
    required: [true, 'Please enter a message'],
    trim: true,
    maxlength: [1000, 'Message can be at most 1000 characters']
  }
}, {
  // Auto-manage a `created` timestamp only
  timestamps: { createdAt: 'created', updatedAt: false }
});

module.exports = mongoose.model('Submission', submissionSchema);
