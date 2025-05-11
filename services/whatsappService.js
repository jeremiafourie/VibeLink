
/**
 * Send a WhatsApp message via Uazapi.
 * @param {string} to — E.164 phone (e.g. "+1555…")
 * @param {string} text — message body
 */
async function sendWhatsApp(to, text) {
  return await fetch(`${process.env.UAZAPI_BASEURL}/send/text`, {
    method: 'POST',
    headers: {'token': process.env.UAZAPI_KEY, 'Content-Type': 'application/json'},
    body: JSON.stringify({
      number: to,
      text
    })
  }).then(response => response.json())
  .catch(err => console.error(`Failed to send whatsapp (to: ${to}, text: ${text}):\n`, err));
}

module.exports = { sendWhatsApp };

