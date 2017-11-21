module.exports = sign

const crypto = require('crypto')

function sign (secret, data) {
  if (!secret || !data) {
    throw new TypeError('secret & data required')
  }

  data = typeof data === 'string' ? data : JSON.stringify(data)
  return 'sha1=' + crypto.createHmac('sha1', secret).update(data).digest('hex')
}
