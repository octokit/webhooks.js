# middleware

If you only need the middleware with access to the `.sign()`, `.verify()` or the receiver’s `.receive()` method, you can use the webhooks middleware directly

```js
const { createMiddleware } = require('@octokit/webhooks')
const middleware = createMiddleware({
  secret: 'mysecret',
  path: '/github-webhooks'
})

middleware.on('installation', asyncInstallationHook)

require('http').createServer(middleware).listen(3000)
```

## API

The `middleware` API implements [`.on()`](../#webhookson) and [`.removeListener()`](../#webhooksremovelistener).

Back to [@octokit/webhooks README](..).
