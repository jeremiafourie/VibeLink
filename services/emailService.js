require('dotenv').config();
const nodemailer = require('nodemailer');

// create reusable transporter
const transporter = nodemailer.createTransport({
  host:    process.env.EMAIL_HOST,
  port:    parseInt(process.env.EMAIL_PORT, 10),
  secure:  true, // upgrade with STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send a plain‐text email.
 * @param {string} to — recipient
 * @param {string} subject
 * @param {string} text — body
 */
async function sendEmail(to, subject, text) {
  await transporter.sendMail({
    from:    `"VibeLink" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  });
}

module.exports = { sendEmail };
