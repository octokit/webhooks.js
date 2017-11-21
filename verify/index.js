module.exports = verify

const Buffer = require('buffer').Buffer

const sign = require('../sign')

function verify (secret, data, signature) {
  if (!secret || !data || !signature) {
    throw new TypeError('secret, data & signature required')
  }

  return Buffer.compare(
    Buffer.from(signature),
    Buffer.from(sign(secret, data))
  ) === 0
}
