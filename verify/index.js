module.exports = verify

const Buffer = require('buffer').Buffer

const sign = require('../sign')

function verify (secret, eventPayload, signature) {
  if (!secret || !eventPayload || !signature) {
    throw new TypeError('secret, eventPayload & signature required')
  }

  return Buffer.compare(
    Buffer.from(signature),
    Buffer.from(sign(secret, eventPayload))
  ) === 0
}
