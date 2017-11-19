# Receiver

If you implement the route to receive webhook events from GitHub yourself then you can use the `receiver` as a standalone module

## Example

```js
const Receiver = require('@octokit/webhooks/receiver')
const receiver = new Receiver({secret: 'mysecret'})

receiver.on('installation', asyncInstallationHook)

// put in webhooks route handler
receiver.handle({
  name: request.headers['X-GitHub-Event'],
  data: request.body,
  signature: request.headers['X-Hub-Signature']
}).catch(handleErrorsFromHooks)
```

## API

The `receiver` API implements [`.handle()`](../#webhookshandle), [`.on()`](../#webhookson) and [`.removeListener()`](../#webhooksremovelistener).

Back to [@octokit/webhooks README](..).
