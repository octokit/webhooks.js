module.exports = createWebhooksApi

const createEventHandler = require('./event-handler')
const middleware = require('./middleware/middleware')

function createWebhooksApi (options) {
  if (!options) {
    options = {}
  }

  const state = {
    eventHandler: createEventHandler(options),
    path: options.path || '/'
  }

  const webhooksMiddleware = middleware.bind(null, state)

  return {
    sign: state.eventHandler.sign,
    verify: state.eventHandler.verify,
    on: state.eventHandler.on,
    removeListener: state.eventHandler.removeListener,
    receive: state.eventHandler.receive,
    middleware: webhooksMiddleware
  }
}
