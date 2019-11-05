const test = require('tap').test

const receive = require('../../event-handler/receive')

const state = {
  secret: 'mysecret',
  hooks: []
}

test('options: none', t => {
  t.throws(() => {
    receive(state)
  })
  t.end()
})

test('options: name', t => {
  t.throws(() => {
    receive(state, { name: 'foo' })
  })
  t.end()
})

test('options: name, payload', t => {
  t.doesNotThrow(() => {
    receive(state, { name: 'foo', payload: {} })
  })
  t.end()
})

test('receive: use returned body for response', t => {
  const responseState = {
    secret: 'mysecret',
    hooks: {
      'a.b': () => ({ a: 'b' })
    }
  }
  t.resolveMatch(receive(responseState, { name: 'a.b', payload: {} }), { a: 'b' })
  t.end()
})
