const EventEmitter = require('events')

const test = require('tap').test
const simple = require('simple-mock')

const createMiddleware = require('../../middleware')

const headers = {
  'x-github-delivery': '123e4567-e89b-12d3-a456-426655440000',
  'x-github-event': 'push',
  'x-hub-signature': 'sha1=f4d795e69b5d03c139cc6ea991ad3e5762d13e2f'
}

test('request error', t => {
  const requestMock = new EventEmitter()
  requestMock.method = 'POST'
  requestMock.headers = headers
  requestMock.url = '/'

  const responseMock = {
    end: simple.spy()
  }

  const middleware = createMiddleware({secret: 'mysecret'})
  middleware(requestMock, responseMock)

  const error = new Error('oops')
  requestMock.emit('error', error)

  t.is(responseMock.statusCode, 500)
  t.is(responseMock.end.lastCall.arg, 'Error: oops')

  t.end()
})
