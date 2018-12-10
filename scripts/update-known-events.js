const axios = require('axios')
const cheerio = require('cheerio')
const { writeFileSync } = require('fs')

updateKnownEventTypes()

async function updateKnownEventTypes () {
  const { data } = await axios.get('https://developer.github.com/v3/activity/events/types/')
  const $ = cheerio.load(data)

  const events = $('h3')
    .filter((index, el) => $(el).text().trim() === 'Webhook event name')
    .map((index, el) => {
      const name = $(el).nextUntil('h2, h3').last().text().trim()
      const $table = $(el).prev()

      if (!$table.is('table')) {
        return {
          name,
          actions: []
        }
      }

      const [keyEl,, descriptionEl] = $table.find('tbody tr:first-child td').get()

      if ($(keyEl).text().trim() !== 'action') {
        return {
          name,
          actions: []
        }
      }

      const actions = $(descriptionEl)
        .find('code')
        .map((index, el) => {
          return $(el).text().trim()
        })
        .get()

      return {
        name,
        actions
      }
    })
    .get()

  const newWebhookNames = events.reduce((list, event) => {
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
}
