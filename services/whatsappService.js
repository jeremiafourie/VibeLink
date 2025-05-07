const Uazapi = require('uazapi');

const client = new Uazapi({
  apiKey: process.env.UAZAPI_KEY
});

/**
 * Send a WhatsApp message via Uazapi.
 * @param {string} to — E.164 phone (e.g. "+1555…")
 * @param {string} text — message body
 */
async function sendWhatsApp(to, text) {
  return client.messages.send({
    channel: 'whatsapp',
    to,
    text
  });
}

module.exports = { sendWhatsApp };
