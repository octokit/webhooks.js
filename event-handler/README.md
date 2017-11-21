# event-handler

If you implement the route to receive webhook events from GitHub yourself then you can use the `event-handler` as a standalone module

🚨 Make sure to _always_ verify that the event request is coming from GitHub itself using the `eventHandler.verify(data, signature)` method.

## Example

```js
const eventHandler = require('@octokit/webhooks/event-handler')({secret: 'mysecret'})

eventHandler.on('installation', asyncInstallationHook)

// put this inside your webhooks route handler
if (!eventHandler.verify(options.data, request.headers['x-github-signature'])) {
  throw new Error('Signature does not match event payload & secret')
}

eventHandler.reiceive({
  name: request.headers['x-github-event'],
  data: request.body
}).catch(handleErrorsFromHooks)
```

## API

The `event-handler` API implements [`.sign()`](../#webhookssign), [`.verify()`](../#webhooksverify), [`.reiceive()`](../#webhooksreceive), [`.on()`](../#webhookson) and [`.removeListener()`](../#webhooksremovelistener).

Back to [@octokit/webhooks README](..).
