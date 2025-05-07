const Submission = require('../models/Submission');
const { sendWhatsApp } = require('../services/whatsappService');

exports.submit = async (req, res) => {
  const { name, email, message, phone } = req.body;
  const sub = await Submission.create({ name, email, message });
  // send notification to admin’s WhatsApp
  await sendWhatsApp(process.env.ADMIN_PHONE, `New contact from ${name}: ${message}`);
  res.redirect('/#contact?thanks=1');
};
