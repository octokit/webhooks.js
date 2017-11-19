# @octokit/webhooks

> GitHub webhooks toolset for Node.js

[GitHub webhooks](https://developer.github.com/webhooks/) can be registered in multiple ways

1. In repository or organization settings on [github.com](https://github.com/).
2. Using the REST API for [repositories](https://developer.github.com/v3/repos/hooks/) or [organizations](https://developer.github.com/v3/orgs/hooks/)
3. By installing a [GitHub App](https://developer.github.com/apps/).

`@octokit/webhooks` helps to handle webhook events sent by GitHub to your server. Note that while setting a secret is optional on GitHub, it is required to be set in order to use `@octokit/webhooks`.

## Example

```js
// install with: npm install @octokit/webhooks
const WebhooksApi = require('@octokit/webhooks')
const webhooks = new WebhooksApi({
  secret: 'mysecret'
})

webhooks.on('*', ({id, name, payload}) => {
  console.log(name, 'event received')
})

require('http').createServer(webhooks.middleware).listen(3000)
// can now receive webhook events at port 3000
```

## API

1. [Constructor](#constructor)
2. [webhooks.sign()](#webhookssign)
3. [webhooks.verify()](#webhooksverify)
4. [webhooks.handle()](#webhookshandle)
5. [webhooks.on()](#webhookson)
6. [webhooks.removeListener()](#webhooksremoveListener)
7. [webhooks.middleware()](#webhooksmiddleware)
8. [List of all webhook names](#listofalleventnames)

### Constructor

```js
new WebhooksApi({secret[, path]})
```

<table width="100%">
  <tr>
    <td>
      <code>
        secret
      </code>
      <em>(String)</em>
    </td>
    <td>
      <strong>Required.</strong>
      Secret as configured in GitHub Settings.
    </td>
  </tr>
  <tr>
    <td>
      <code>
        path
      </code>
      <em>(String)</em>
    </td>
    <td>
      Only relevant for <a href="#webhooksmiddleware"><code>middleware</code></a>.
      Custom path to match requests against. Defaults to <code>/</code>.
    </td>
  </tr>
</table>

Returns the `webhooks` API.

### webhooks.sign()

```js
weebhooks.sign(eventData)
```

<table width="100%">
  <tr>
    <td>
      <code>
        data
      </code>
      <em>
        (Object)
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      Webhook request body as received from GitHub
    </td>
  </tr>
</table>

Returns a `signature` string. Throws error if `data` is not passed.

Can also be used [standalone](sign/).

### webhooks.verify()

```js
weebhooks.verify(eventData, signature)
```

<table width="100%">
  <tr>
    <td>
      <code>
        data
      </code>
      <em>
        (Object)
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      Webhook event request body as received from GitHub.
    </td>
  </tr>
  <tr>
    <td>
      <code>
        signature
      </code>
      <em>
        (String)
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      Signature string as calculated by <code><a href="#webhookssign">webhooks.sign()</a></code>.
    </td>
  </tr>
</table>

Returns `true` or `false`. Throws error if `data` or `signature` not passed.

Can also be used [standalone](verify/).

### webhooks.handle()

```js
webhooks.handle({name, data, signature})
```

<table width="100%">
  <tr>
    <td>
      <code>
        name
      </code>
      <em>
        String
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      Name of the event. (Event names are set as <a href="https://developer.github.com/webhooks/#delivery-headers"><code>X-GitHub-Event</code> header</a>
      in the webhook event request.)
    </td>
  </tr>
  <tr>
    <td>
      <code>
        data
      </code>
      <em>
        Object
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      Webhook event request body as received from GitHub.
    </td>
  </tr>
  <tr>
    <td>
      <code>
        signature
      </code>
      <em>
        String
      </em>
    </td>
    <td>
      <strong>Required</strong>.
      Passed as <a href="https://developer.github.com/webhooks/#delivery-headers"><code>X-Hub-Signature</code> header</a>
      in the webhook request.
    </td>
  </tr>
</table>

Returns a promise. Runs all event handlers set with [`webhooks.on()`](#webhookson) in paralell and waits for them to finish. If one of the handlers rejects or throws an error, then `webhooks.handle()` rejects. The returned error has an `.errors` property which holds an array of all errors caught from the handlers. If no errors occur, `webhooks.handle()` resolves without passing any value.

The `.handle()` method belongs to the [receiver](receiver/) module which can be used standalone if you don’t need the server middleware.

### webhooks.on()

```js
webhooks.on(eventName, handler)
webhooks.on(eventNames, handler)
```

<table width="100%">
  <tr>
    <td>
      <code>
        eventName
      </code>
      <em>
        String
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      Name of the event. One of <a href="#listofalleventnames">GitHub’s supported event names</a>.
    </td>
  </tr>
  <tr>
    <td>
      <code>
        eventNames
      </code>
      <em>
        Array
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      Array of event names.
    </td>
  </tr>
  <tr>
    <td>
      <code>
        handler
      </code>
      <em>
        Function
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      Method to be run each time the event with the passed name is received.
      the <code>handler</code> function can be an async function, throw an error or
      return a Promise.
    </td>
  </tr>
</table>

The `.on()` method belongs to the [receiver](receiver/) module which can be used standalone if you don’t need the server middleware.

### webhooks.removeHandler()

```js
webhooks.removeHandler(eventName, handler)
webhooks.removeHandler(eventNames, handler)
```

<table width="100%">
  <tr>
    <td>
      <code>
        eventName
      </code>
      <em>
        String
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      Name of the event. One of <a href="#listofalleventnames">GitHub’s supported event names</a>.
    </td>
  </tr>
  <tr>
    <td>
      <code>
        eventNames
      </code>
      <em>
        Array
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      Array of event names.
    </td>
  </tr>
  <tr>
    <td>
      <code>
        handler
      </code>
      <em>
        Function
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      Method which was previously passed to <code><a href="webhookson">webhooks.on()</a></code>. If the same handler was registered multiple times for the same event, only the most recent handler gets removed.
    </td>
  </tr>
</table>

The `.removeHandler()` method belongs to the [receiver](receiver/) module which can be used standalone if you don’t need the server middleware.

### webhooks.middleware()

```js
webhooks.middleware(request, response[, next])
```

<table width="100%">
  <tr>
    <td>
      <code>
        request
      </code>
      <em>
        Object
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      A Node.js <a href="https://nodejs.org/docs/latest/api/http.html#http_class_http_clientrequest">http.ClientRequest</a>.
    </td>
  </tr>
  <tr>
    <td>
      <code>
        response
      </code>
      <em>
        Object
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      A Node.js <a href="https://nodejs.org/docs/latest/api/http.html#http_class_http_serverresponse">http.ServerResponse</a>.
    </td>
  </tr>
  <tr>
    <td>
      <code>
        next
      </code>
      <em>
        Function
      </em>
    </td>
    <td>
      Optional function which invokes the next middleware, as used by <a href="https://github.com/senchalabs/connect">Connect</a> and <a href="http://expressjs.com/">Express</a>.
    </td>
  </tr>
</table>

Returns a `requestListener` (or _middleware_) method which can be directly passed to [`http.createServer()`](https://nodejs.org/docs/latest/api/http.html#http_http_createserver_requestlistener), <a href="http://expressjs.com/">Express</a> and other compatible Node.js server frameworks.

#### List of all event names

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
