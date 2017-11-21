module.exports = createEventHandler

const on = require('./on')
const removeListener = require('./remove-listener')
const receive = require('./receive')

function createEventHandler (options) {
  if (!options || !options.secret) {
    throw new Error('secret option required')
  }

  const state = {
    hooks: {},
    secret: options.secret
  }

  return {
    on: on.bind(null, state),
    removeListener: removeListener.bind(null, state),
    receive: receive.bind(null, state)
  }
}
