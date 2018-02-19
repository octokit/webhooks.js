module.exports = middleware

const isntWebhook = require('./isnt-webhook')
const getMissingHeaders = require('./get-missing-headers')
const verifyAndReceive = require('./verify-and-receive')

const debug = require('debug')('webhooks:receiver')
function middleware (state, request, response, next) {
  if (isntWebhook(request, {path: state.path})) {
    // the next callback is set when used as an express middleware. That allows
    // it to define custom routes like /my/custom/page while the webhooks are
    // expected to be sent to the / root path. Otherwise the root path would
    // match all requests and would make it impossible to define custom rooutes
    if (typeof next === 'function') {
      next()
      return
    }

    debug(`ignored: ${request.method} ${request.url}`)
    response.statusCode = 404
    response.end('Not found')
    return
  }

  const missingHeaders = getMissingHeaders(request).join(', ')
  if (missingHeaders) {
    debug(`ignored: ${request.method} ${request.url} due to missing headers: ${missingHeaders}`)

    response.statusCode = 400
    response.end(`Required headers missing: ${missingHeaders}`)
    return
  }

  const eventName = request.headers['x-github-event']
  const signature = request.headers['x-hub-signature']
  const id = request.headers['x-github-delivery']

  debug(`${eventName} event received (id: ${id})`)

  const dataChunks = []
  request.on('error', (error) => {
    response.statusCode = 500
    response.end(error.toString())
  })

  request.on('data', (chunk) => {
    dataChunks.push(chunk)
  })

  request.on('end', () => {
    const payload = Buffer.concat(dataChunks).toString()

    verifyAndReceive(state, {
      id: id,
      name: eventName,
      payload: JSON.parse(payload),
      signature
    })

      .then(() => {
        response.end('ok\n')
      })

      .catch(error => {
        response.statusCode = error.status || 500
        response.end(error.toString())
      })
  })
}
