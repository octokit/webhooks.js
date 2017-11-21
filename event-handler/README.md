# event-handler

If you implement the route to receive webhook events from GitHub yourself then you can use the `event-handler` as a standalone module

## Example

```js
const eventHandler = require('@octokit/webhooks/event-handler')({secret: 'mysecret'})

eventHandler.on('installation', asyncInstallationHook)

// put this inside your webhooks route handler
eventHandler.reiceive({
  name: request.headers['X-GitHub-Event'],
  data: request.body,
  signature: request.headers['X-Hub-Signature']
}).catch(handleErrorsFromHooks)
```

## API

The `event-handler` API implements [`.reiceive()`](../#webhooksreceive), [`.on()`](../#webhookson) and [`.removeListener()`](../#webhooksremovelistener).

Back to [@octokit/webhooks README](..).
