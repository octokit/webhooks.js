const test = require('tap').test

const sign = require('../../sign')

const data = {
  foo: 'bar'
}
const secret = 'mysecret'

test('sign() without options throws', (t) => {
  t.throws(sign)
  t.end()
})

test('sign(data) without options.secret throws', (t) => {
  t.throws(sign.bind(null, undefined, data))
  t.end()
})

test('sign(secret) without options.data throws', (t) => {
  t.throws(sign.bind(null, secret))
  t.end()
})

test('sign(data, secret) with data as object returns expected signature', (t) => {
  const signature = sign(secret, data)
  t.is(signature, 'sha1=d03207e4b030cf234e3447bac4d93add4c6643d8')

  t.end()
})

test('sign(data, secret) with data as string returns expected signature', (t) => {
  const signature = sign(secret, JSON.stringify(data))
  t.is(signature, 'sha1=d03207e4b030cf234e3447bac4d93add4c6643d8')

  t.end()
})
