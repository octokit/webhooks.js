const test = require('tap').test

const receiverOn = require('../../event-handler/on')

function noop () {}

const state = {
  hooks: []
}

test('receiver.on with invalid event name', t => {
  t.throws(() => {
    receiverOn(state, 'foo', noop)
  })
  t.end()
})
