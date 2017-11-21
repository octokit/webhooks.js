module.exports = createEventHandler

const on = require('./on')
const receive = require('./receive')
const removeListener = require('./remove-listener')
const sign = require('../sign')
const verify = require('../verify')

function createEventHandler (options) {
  if (!options || !options.secret) {
    throw new Error('secret option required')
  }

  const state = {
    hooks: {},
    secret: options.secret
  }

  return {
    sign: sign.bind(null, state.secret),
    verify: verify.bind(null, state.secret),
    on: on.bind(null, state),
    removeListener: removeListener.bind(null, state),
    receive: receive.bind(null, state)
  }
}
