const { writeFileSync } = require('fs')

const WEBOOOKS = require('@octokit/webhooks-definitions')

const newWebhookNames = WEBOOOKS.reduce((list, event) => {
  list.push(event.name, ...event.actions.map(action => `${event.name}.${action}`))
  return list
}, ['*', 'error'])

// the documentation at https://developer.github.com/v3/activity/events/types/#labelevent
// does not include all actions, or the actions are not formatted correctly.
// So for the time being we merge into the current webhook names to prevent
// events or actions from being removed
const currentWebhookNames = require('../lib/webhook-names')
const webhookNames = new Set(newWebhookNames.concat(currentWebhookNames).sort())

writeFileSync('lib/webhook-names.json', JSON.stringify([...webhookNames], null, 2) + '\n')
