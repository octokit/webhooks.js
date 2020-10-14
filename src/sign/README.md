# sign

The `sign` method can be used as a standalone method.

```js
const { sign } = require('@octokit/webhooks')
const signature = sign(secret, eventPayload)
const signature = sign({ secret, algorithm }, eventPayload)
// string like "sha1=d03207e4b030cf234e3447bac4d93add4c6643d8"
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
        algorithm
      </code>
      <em>
        (String)
      </em>
    </td>
    <td>
      Algorithm to calculate signature. Can be set to `sha1` or `sha256`. Defaults to `sha1`.
    </td>
  </tr>
  <tr>
    <td>
      <code>
        eventPayload
      </code>
      <em>
        (Object)
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      Webhook request payload as received from GitHub
    </td>
  </tr>
</table>

Returns a `signature` string. Throws error if required arguments are not passed.

Back to [@octokit/webhooks README](..).
