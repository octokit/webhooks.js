'use strict'

module.exports = receiverHandle

const verify = require('../verify')
const wrapErrorHandler = require('./wrap-error-handler')

// main handler function
function receiverHandle (state, options) {
  if (!options) {
    options = {}
  }

  if (!options.id) {
    throw new Error('Event id not passed')
  }

  if (!options.name) {
    throw new Error('Event name not passed')
  }

  if (!options.data) {
    throw new Error('Event data not passed')
  }

  if (!options.signature) {
    throw new Error('Event signature not passed')
  }

  const matchesSignature = verify(
    state.secret,
    options.data,
    options.signature
  )

  if (!matchesSignature) {
    const error = new Error('Signature does not match')
    error.status = 400

    return Promise.reject(error)
  }

  let hooks = [].concat(
    state.hooks[`${options.name}.${options.data.action}`],
    state.hooks[options.name],
    state.hooks['*']
  ).filter(Boolean)

  if (hooks.length === 0) {
    return Promise.resolve()
  }

  const errors = []
  const promises = hooks.map(handler => {
    return Promise.resolve()

    .then(() => {
      return handler(options.data, {
        id: options.id,
        name: options.name
      })
    })

    .catch(error => errors.push(Object.assign(error, {
      event: {
        id: options.id,
        name: options.name,
        data: options.data
      }
    })))
  })

  return Promise.all(promises).then(() => {
    if (errors.length === 0) {
      return
    }

    const errorHandlers = state.hooks.error
    if (errorHandlers) {
      errorHandlers.forEach(handler => errors.forEach(wrapErrorHandler.bind(null, handler)))
    }

    const error = new Error('Webhook handler error')
    error.errors = errors
    throw error
  })
}
