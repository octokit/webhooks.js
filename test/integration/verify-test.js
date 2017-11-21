const test = require('tap').test

const verify = require('../../verify')

const data = {
  foo: 'bar'
}
const secret = 'mysecret'
const signature = 'sha1=d03207e4b030cf234e3447bac4d93add4c6643d8'

test('verify() without options throws', (t) => {
  t.throws(verify)
  t.end()
})

test('verify(data) without options.secret throws', (t) => {
  t.throws(verify.bind(null, undefined, data))
  t.end()
})

test('verify(secret) without options.data throws', (t) => {
  t.throws(verify.bind(null, secret))
  t.end()
})

test('verify(data, secret) without options.signature throws', (t) => {
  t.throws(verify.bind(null, secret, data))
  t.end()
})

test('verify(data, secret, signature) returns true for correct signature', (t) => {
  const signatureMatches = verify(secret, data, signature)
  t.is(signatureMatches, true)

  t.end()
})

test('verify(data, secret, signature) returns false for incorrect signature', (t) => {
  const signatureMatches = verify(secret, data, 'foo')
  t.is(signatureMatches, false)

  t.end()
})

test('verify(data, secret, signature) returns false for correct secret', (t) => {
  const signatureMatches = verify('foo', data, signature)
  t.is(signatureMatches, false)

  t.end()
})
