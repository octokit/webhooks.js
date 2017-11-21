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

test('options: id', t => {
  t.throws(() => {
    receive(state, {id: '123'})
  })
  t.end()
})

test('options: id, name', t => {
  t.throws(() => {
    receive(state, {id: '123', name: 'foo'})
  })
  t.end()
})

test('options: id, name, data', t => {
  t.throws(() => {
    receive(state, {id: '123', name: 'foo', data: {}})
  })
  t.end()
})
