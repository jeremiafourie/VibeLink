const User        = require('../models/User');
const crypto      = require('crypto');
const { sendWhatsApp } = require('./whatsappService');
const { sendEmail }     = require('./emailService');

async function sendOtp(phone) {
  // 1. Generate a 6-digit code and expiration
  const code    = crypto.randomInt(100000, 999999).toString();
  const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

  // 2. Lookup the user by phone – we only send to existing accounts
  const user = await User.findOne({ phone });
  if (!user) {
    throw new Error(`No user found with phone ${phone}`);
  }

  // 3. Persist the OTP on that user
  user.otp = { code, expires };
  await user.save();

  // 4. Fire off notifications (don’t block on them)
  const message = `Your VibeLink verification code is ${code}. It expires in 5 minutes.`;

  sendWhatsApp(phone, message)
    .catch(err => console.error('WhatsApp send error:', err));

  sendEmail(user.email, 'Your VibeLink verification code', message)
    .catch(err => console.error('Email send error:', err));

  // 5. Return the code for testing/logging (not sent to client in prod)
  return code;
}

async function verifyOtp(phone, code) {
  const user = await User.findOne({ phone });
  if (!user || !user.otp.code || user.otp.expires < Date.now() || user.otp.code !== code) {
    return false;
  }
  user.otp = {};
  await user.save();
  return true;
}

module.exports = { sendOtp, verifyOtp };
