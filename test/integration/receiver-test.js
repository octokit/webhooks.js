const test = require('tap').test

const EventHandler = require('../../event-handler')
const pushEventPayload = require('../fixtures/push-payload')
const installationCreatedPayload = require('../fixtures/installation-created-payload')

test('events', t => {
  t.plan(5)

  const eventHandler = EventHandler({secret: 'mysecret'})

  const hooksCalled = []
  function hook1 () {
    return Promise.resolve()

    .then(() => {
      hooksCalled.push('hook1')
    })
  }
  function hook2 () {
    hooksCalled.push('hook2')
  }
  function hook3 () {
    hooksCalled.push('hook3')
  }
  function hook4 () {
    hooksCalled.push('hook4')
  }
  function hook5 () {
    hooksCalled.push('installation')
  }
  function hook6 () {
    hooksCalled.push('installation.created')
  }
  function hook7 (event, meta) {
    hooksCalled.push(`* (${meta.name})`)
  }

  eventHandler.on('push', hook1)
  eventHandler.on('push', hook2)
  eventHandler.on('push', hook3)
  eventHandler.on(['push'], hook4)
  eventHandler.on('installation', hook5)
  eventHandler.on('installation.created', hook6)
  eventHandler.on('*', hook7)

  eventHandler.removeListener('push', hook3)
  eventHandler.removeListener(['push'], hook4)
  eventHandler.removeListener('unknown', () => {})

  eventHandler.receive({
    id: '123',
    name: 'push',
    data: pushEventPayload,
    signature: 'sha1=f4d795e69b5d03c139cc6ea991ad3e5762d13e2f'
  })

  .then(() => {
    return eventHandler.receive({
      id: '456',
      name: 'installation',
      data: installationCreatedPayload,
      signature: 'sha1=eb212f42b999ccdf2e027bcf9025eb498a8d75f8'
    })
  })

  .then(() => {
    t.deepEqual(hooksCalled, ['hook2', '* (push)', 'hook1', 'installation.created', 'installation', '* (installation)'])

    eventHandler.on('error', (error) => {
      t.pass('error event triggered')
      t.is(error.message, 'oops')
    })

    eventHandler.on('push', () => {
      throw new Error('oops')
    })

    return eventHandler.receive({
      id: '123',
      name: 'push',
      data: pushEventPayload,
      signature: 'sha1=f4d795e69b5d03c139cc6ea991ad3e5762d13e2f'
    })
  })

  .catch(error => {
    t.is(error.errors.length, 1)
    t.is(error.errors[0].message, 'oops')
  })

  .catch(t.error)
})
