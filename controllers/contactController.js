// controllers/contactController.js
const Submission      = require('../models/Submission');
const { sendWhatsApp } = require('../services/whatsappService');
const { sendEmail }    = require('../services/emailService');

exports.submit = async (req, res, next) => {
  try {
    const { name, email, message, phone } = req.body;
    
    // 1) save to MongoDB
    const sub = await Submission.create({ name, email, message, phone });
    
    // 2) notify admin by WhatsApp
    await sendWhatsApp(
      process.env.ADMIN_PHONE,
      `New contact form submission from ${name} (${phone || 'no phone'}):\n${message}`
    );
    
    // 3) notify admin by Email
    await sendEmail(
      process.env.ADMIN_EMAIL,
      `New VibeLink Contact from ${name}`,
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'n/a'}\n\nMessage:\n${message}`
    );
    
    // 4) Send confirmation email back to user
    await sendEmail(
      email,
      `Thanks for contacting VibeLink`,
      `Hi ${name},\n\nThanks for your message! We'll get back to you soon.\n\n— The VibeLink Team`
    );
    
    // 5) redirect with thank‐you anchor
    res.redirect('/#contact?thanks=1');
  } catch (err) {
    next(err);
  }
};
