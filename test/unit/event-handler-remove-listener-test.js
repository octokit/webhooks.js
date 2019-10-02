const test = require('tap').test

const removeListener = require('../../event-handler/remove-listener')

test('remove-listener: single listener', t => {
  const push = () => {}

  const state = {
    hooks: {
      push: [push]
    }
  }

  t.doesNotThrow(() => {
    removeListener(state, 'push', push)
  })
  t.deepEqual(state, { hooks: { push: [] } })
  t.end()
})

test('remove-listener: multiple listeners', t => {
  const push1 = () => {}
  const push2 = () => {}
  const push3 = () => {}

  const ping = () => {}

  const state = {
    hooks: {
      push: [push1, push2, push3],
      ping: [ping]
    }
  }

  t.doesNotThrow(() => {
    removeListener(state, 'push', push1)
    removeListener(state, 'push', push2)
    removeListener(state, 'push', push3)
  })
  t.deepEqual(state, { hooks: { push: [], ping: [ping] } })
  t.end()
})
