module.exports = receiverOn

const webhookNames = require('../lib/webhook-names.json')

function receiverOn (state, webhookNameOrNames, handler) {
  if (Array.isArray(webhookNameOrNames)) {
    webhookNameOrNames.forEach(webhookName => receiverOn(state, webhookName, handler))
    return
  }

  if (webhookNames.indexOf(webhookNameOrNames) === -1) {
    throw new Error(`${webhookNameOrNames} is not a valid webhook name`)
  }

  if (!state.hooks[webhookNameOrNames]) {
    state.hooks[webhookNameOrNames] = []
  }

  state.hooks[webhookNameOrNames].push(handler)
}
