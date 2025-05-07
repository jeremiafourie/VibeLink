const User = require('../models/User');
const crypto = require('crypto');

async function sendOtp(phone) {
  const code = crypto.randomInt(100000, 999999).toString();
  const expires = Date.now() + 5*60*1000; // 5m

  let user = await User.findOneAndUpdate(
    { phone },
    { otp: { code, expires } },
    { upsert: true, new: true }
  );

  // TODO: integrate Twilio to send SMS or WhatsApp
  return code;
}

async function verifyOtp(phone, code) {
  const user = await User.findOne({ phone });
  if (!user || user.otp.expires < Date.now() || user.otp.code !== code)
    return false;
  user.otp = {};
  await user.save();
  return true;
}

module.exports = { sendOtp, verifyOtp };
