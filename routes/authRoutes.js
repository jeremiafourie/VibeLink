const router = require('express').Router();
const { sendOtp, verifyOtp } = require('../services/otpService');

// request OTP
router.post('/login/request', async (req, res) => {
  await sendOtp(req.body.phone);
  res.sendStatus(200);
});

// verify OTP
router.post('/login/verify', async (req, res) => {
  const ok = await verifyOtp(req.body.phone, req.body.code);
  if (!ok) return res.status(400).send('Invalid OTP');
  req.session.user = { phone: req.body.phone };
  res.redirect('/admin');
});

module.exports = router;
