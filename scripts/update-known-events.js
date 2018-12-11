const { writeFileSync } = require('fs')

const WEBOOOKS = require('@octokit/webhooks-definitions')

const newWebhookNames = WEBOOOKS.reduce((list, event) => {
  list.push(event.name, ...event.actions.map(action => `${event.name}.${action}`))
  return list
}, ['*', 'error']).sort()

writeFileSync('lib/webhook-names.json', JSON.stringify([...newWebhookNames], null, 2) + '\n')
