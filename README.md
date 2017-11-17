# @octokit/webhooks

> GitHub webhooks toolset for Node.js

[GitHub webhooks](https://developer.github.com/webhooks/) can be registered in multiple ways

1. In repository or organization settings on [github.com](https://github.com/).
2. Using the REST API for [repositories](https://developer.github.com/v3/repos/hooks/) or [organizations](https://developer.github.com/v3/orgs/hooks/)
3. By installing a [GitHub App](https://developer.github.com/apps/).

`@octokit/webhooks` helps you handle the webhooks sent by GitHub to your server.

## Example

```js
// install with: npm install @octokit/webhooks
const Webhooks = require('@octokit/webhooks')
const middleware = Webhooks.createMiddleware({ secret: 'mysecret' })

middleware.hook('installation.deleted', {installation} => {
  return myApp.installations.remove(installation)
})

middleware.hook('installation.created', async {installation, sender} => {
  const numAvailableInstallations = await myApp.installations.availableFor(sender.id)
  if (numAvailableInstallations === 0) {
    throw Error(`${sender.id} is out of installations`)
  }

  return myApp.installations.add(installation)
})

http.createServer(middleware).listen(3000)
```

## APIs

`@octokit/webhooks` provides 5 APIs that build upon each other.

1. [**sign**](#sign)  
   Create a signature based on a secret and webhook payload
2. [**verify**](#verify)  
   Verify a signature based on a secret and webhook payload
3. [**Receiver**](#receiver)  
   Provides events & hook APIs which are emitted based on webhook payloads you pass in.
4. [**Middleware**](#middleware)  
   Module that can be directly passed into a [Node HTTP Server](https://nodejs.org/api/http.html#http_class_http_server), [connect](https://github.com/senchalabs/connect) or [express](http://expressjs.com/).
5. [**Server**](#server)  
   Standalone server if all you need is receiving & handling webhooks without custom routes.

Instances of `Receiver`, `Middleware` and `Server` expose [Events & Hook APIs](#events-and-hooks).

### Sign

```js
const sign = require('@octokit/webhooks').sign
// or: const sign = require('@octokit/webhooks/sign')

const signature = sign({
  data: webhookRequestBody,
  secret: 'mysecret'
})
```

`sign({data, secret})` returns a signature as String.

<table width="100%">
  <tr>
    <th>
      <code>
        data
      </code>
    </th>
    <td>
      Object
    </td>
    <td>
      <strong>Required.</strong>
      Webhook request body as received from GitHub
    </td>
  </tr>
  <tr>
    <th>
      <code>
        secret
      </code>
    </th>
    <td>
      String
    </td>
    <td>
      <strong>Required.</strong>
      Secret as configured in GitHub Settings. If no <code>secret</code> was configured, don’t use the <code>sign()</code> method.
    </td>
  </tr>
</table>

### Verify

```js
const verify = require('@octokit/webhooks').verify
// or: const verify = require('@octokit/webhooks/verify')

const signatureMatches = verify({
  data: webhookRequestBody,
  secret: 'mysecret',
  signature: 'sha1=0544bd735451ecd85a1297d2242ed9c38083aba7'
})
```

`verify({data, secret, signature})` returns either `true` or `false`.

<table width="100%">
  <tr>
    <th>
      <code>
        data
      </code>
    </th>
    <td>
      Object
    </td>
    <td>
      <strong>Required.</strong>
      Webhook request body as received from GitHub
    </td>
  </tr>
  <tr>
    <th>
      <code>
        secret
      </code>
    </th>
    <td>
      String
    </td>
    <td>
      <strong>Required.</strong>
      Secret as configured in GitHub Settings. If no <code>secret</code> was configured, don’t use the <code>verify()</code> method.
    </td>
  </tr>
  <tr>
    <th>
      <code>
        signature
      </code>
    </th>
    <td>
      String
    </td>
    <td>
      <strong>Required.</strong>
      Signature string as calculated by <code><a href="#sign">sign()</a></code>.
    </td>
  </tr>
</table>

### Receiver

```js
const createReceiver = require('@octokit/webhooks').receiver
// or: const createReceiver = require('@octokit/webhooks/receiver')

const receiver = createReceiver({secret: 'mysecret'})

receiver.on('installation', handleInstallationEvent)
receiver.hook('installation', asyncInstallationHook)

// assuming request is an object with .headers & .body properties
receiver.handle({
  name: request.headers['X-GitHub-Event'],
  data: request.body,
  signature: request.headers['X-Hub-Signature']
}).catch(handleErrorsFromHooks)
```

`createReceiver({secret})` returns a `receiver` instance. The `secret` option is _not_ required.

<a name="receiver-handle"></a>

The `receiver` has a `.handle({name, data, signature})` method which returns a Promise and expects the following options

<table width="100%">
  <tr>
    <th>
      <code>
        name
      </code>
    </th>
    <td>
      String
    </td>
    <td>
      <strong>Required.</strong>
      Name of the event. Passed as <a href="https://developer.github.com/webhooks/#delivery-headers"><code>X-GitHub-Event</code> header</a>
      in the webhook request.
    </td>
  </tr>
  <tr>
    <th>
      <code>
        data
      </code>
    </th>
    <td>
      Object
    </td>
    <td>
      <strong>Required.</strong>
      Webhook request body as received from GitHub
    </td>
  </tr>
  <tr>
    <th>
      <code>
        signature
      </code>
    </th>
    <td>
      String
    </td>
    <td>
      <strong>Required if <code>secret</code> passed to <code>createReceiver</code>.</strong>
      Passed as <a href="https://developer.github.com/webhooks/#delivery-headers"><code>X-Hub-Signature</code> header</a>
      in the webhook request.
    </td>
  </tr>
</table>

Besides the `.handle({name, data, signature})` method, the `receiver` instance also exposes the [Events & Hook](#events-and-hooks) methods.

### Middleware

```js
const createMiddleware = require('@octokit/webhooks').middleware
// or: const createMiddleware = require('@octokit/webhooks/middleware')

const middleware = createMiddleware({ secret: 'mysecret' })

middleware.on('installation', handleInstallationEvent)
middleware.hook('installation', installationEventHook)

http.createServer(function (request, response) {
  if (request.url !== '/github-webhooks' || request.method !== 'POST') {
    response.statusCode = 404
    response.end('Not found')
    return
  }

  middleware(request, response)
}).listen(3000)
```

`createMiddleware({secret})` returns a `middleware` function. The `secret` option is _not_ required.

The `middleware` function also exposes the [Events & Hook](#events-and-hooks) methods.

### Server

```js
const createServer = require('@octokit/webhooks').server
// or: const createServer = require('@octokit/webhooks/server')

const server = createServer({ secret: 'mysecret' })

server.on('installation', handleInstallationEvent)
server.hook('installation', installationEventHook)

server.listen(3000)
```

`createServer({secret})` returns a `server` instance. The `secret` option is _not_ required.

The `server` instance also exposes the [Events & Hook](#events-and-hooks) methods.

### Events & Hooks

Instances of `receiver`, `middleware` and `server` expose additional methods to handle synchronous events as well as hook into events with asynchronous handlers which can return a promise or throw an error, in which case the asynchronous `receiver.handle()` method rejects and the `middleware` / `server` route handlers respond with an error.

See a [list of all available webhooks](#list-of-all-webhook-names) below.

#### .on()

```js
api.on('installation', handleInstallationEvent)
api.on(['installation.created', 'installation.deleted'], handleInstallationEvent)
```

Behaves just like Node’s built-in EventEmitter’s [`.on` method](https://nodejs.org/docs/latest/api/events.html#events_emitter_on_eventname_listener). The only difference is that `api.on()` also accepts an array of event names as first argument.

Event handlers are run synchronously. Return values are ignored. Thrown errors are caught and logged in the [receiver’s handle method](#receiver-handle).

#### .removeListener()

```js
api.removeListener('installation', handleInstallationEvent)
api.removeListener(['installation.created', 'installation.deleted'], handleInstallationEvent)
```

Behaves just like Node’s built-in EventEmitter’s [`.removeListener` method](https://nodejs.org/docs/latest/api/events.html#events_emitter_removelistener_eventname_listener). The only difference is that `api.removeListener()` also accepts an array of event names as first argument.

#### .hook()

```js
api.hook('installation', installationHook)
api.hook(['installation.created', 'installation.deleted'], installationHook)
```

A hook can be an asynchronous method returning a promise. The [receiver’s handle method](#receiver-handle) runs all defined hooks in parallel and waits until they finish before either resolving or rejecting in case any error occurred in one of the hooks.

#### .removeHook()

```js
api.removeHook('installation', installationHook)
api.removeHook(['installation.created', 'installation.deleted'], installationHook)
```

Removes a hook for one or multiple events.

#### List of all webhook names

See the full list of [event types with example payloads](https://developer.github.com/v3/activity/events/types/).

If there are actions for a webhook, events are emitted for both, the webhook name as well as a combination of the webhook name and the action, e.g. `installation` and `installation.created`. The `*` event is always emitted.

<table>
  <thead>
    <tr>
      <th>Webhook</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tr>
    <th align=left valign=top>
      <code>*</code>
    </th>
    <td></td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>commit_comment</code>
    </th>
    <td>
      <code>.created</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>create</code>
    </th>
    <td></td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>delete</code>
    </th>
    <td></td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>deployment</code>
    </th>
    <td></td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>deployment_status</code>
    </th>
    <td></td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>fork</code>
    </th>
    <td></td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>gollum</code>
    </th>
    <td></td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>installation</code>
    </th>
    <td>
      <code>.created</code><br><code>.deleted</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>installation_repositories</code>
    </th>
    <td>
      <code>.added</code><br><code>.removed</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>issue_comment</code>
    </th>
    <td>
      <code>.created</code><br><code>.edited</code><br><code>.deleted</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>issues</code>
    </th>
    <td>
      <code>.assigned</code><br><code>.unassigned</code><br><code>.labeled</code><br><code>.unlabeled</code><br><code>.opened</code><br><code>.edited</code><br><code>.milestoned</code><br><code>.demilestoned</code><br><code>.closed</code><br><code>.reopened</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>label</code>
    </th>
    <td>
      <code>.created</code><br><code>.edited</code><br><code>.deleted</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>marketplace_purchase</code>
    </th>
    <td>
      <code>.purchased</code><br><code>.cancelled</code><br><code>.changed</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>member</code>
    </th>
    <td>
      <code>.added</code><br><code>.edited</code><br><code>.deleted</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>membership</code>
    </th>
    <td>
      <code>.added</code><br><code>.removed</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>milestone</code>
    </th>
    <td>
      <code>.created</code><br><code>.closed</code><br><code>.opened</code><br><code>.edited</code><br><code>.deleted</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>org_block</code>
    </th>
    <td>
      <code>.blocked</code><br><code>.unblocked</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>organization</code>
    </th>
    <td>
      <code>.member_added</code><br><code>.member_removed</code><br><code>.member_invited</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>page_build</code>
    </th>
    <td></td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>ping</code>
    </th>
    <td></td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>project</code>
    </th>
    <td>
      <code>.created</code><br><code>.edited</code><br><code>.converted</code><br><code>.moved</code><br><code>.deleted</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>project_card</code>
    </th>
    <td>
      <code>.created</code><br><code>.edited</code><br><code>.closed</code><br><code>.reopened</code><br><code>.deleted</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>project_column</code>
    </th>
    <td>
      <code>.created</code><br><code>.edited</code><br><code>.moved</code><br><code>.deleted</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>public</code>
    </th>
    <td></td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>pull_request</code>
    </th>
    <td>
      <code>.assigned</code><br><code>.unassigned</code><br><code>.review_requested</code><br><code>.review_request_removed</code><br><code>.labeled</code><br><code>.unlabeled</code><br><code>.opened</code><br><code>.edited</code><br><code>.closed</code><br><code>.reopened</code><br><code>.synchronize</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>pull_request_review</code>
    </th>
    <td>
      <code>.submitted</code><br><code>.edited</code><br><code>.dismissed</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>pull_request_review_comment</code>
    </th>
    <td>
      <code>.created</code><br><code>.edited</code><br><code>.deleted</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>push</code>
    </th>
    <td></td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>release</code>
    </th>
    <td>
      <code>.published</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>repository</code>
    </th>
    <td>
      <code>.created</code><br><code>.deleted</code><br><code>.archived</code><br><code>.unarchived</code><br><code>.publicized</code><br><code>.privatized</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>status</code>
    </th>
    <td></td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>team</code>
    </th>
    <td>
      <code>.created</code><br><code>.deleted</code><br><code>.edited</code><br><code>.added_to_repository</code><br><code>.removed_from_repository</code>
    </td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>team_add</code>
    </th>
    <td></td>
  </tr>
  <tr>
    <th align=left valign=top>
      <code>watch</code>
    </th>
    <td>
      <code>.started</code>
    </td>
  </tr>
</table>

## License

[MIT](LICENSE.md)
