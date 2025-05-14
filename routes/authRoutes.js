const router = require('express').Router();
const { sendOtp, verifyOtp } = require('../services/otpService');
const User = require('../models/User');

// status route
router.get('/status', (req, res) => {
  if (req.session && req.session.user) {
    return res.json({ success: true, user: req.session.user });
  }
  return res.json({ success: false });
});

// logout route
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    return res.json({ success: true, user: null });
  });
});

// request OTP
router.post('/login/request', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone number required' });
    }
    await sendOtp(phone);
    return res.json({ success: true, message: 'OTP sent' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// Quick existence-check so we only send OTPs to registered users
router.post('/check-user', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone number required' });
    }
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ success: false, message: 'No such user' });
    }
    return res.json({ success: true, exists: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// verify OTP
router.post('/login/verify', async (req, res) => {
  try {
    const { phone, code } = req.body;
    const ok = await verifyOtp(phone, code);
    if (!ok) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
    const user = await User.findOne({ phone });
    req.session.user = { id: user._id, phone: user.phone, userType: user.userType, name: user.name };
    return res.json({ success: true, message: `Welcome, ${user.name}!`, userType: user.userType, name: user.name });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;