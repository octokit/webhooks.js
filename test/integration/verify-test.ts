import { verify } from "../../src/verify";

const eventPayload = {
  foo: "bar",
};
const secret = "mysecret";
const signatureSHA1 = "sha1=d03207e4b030cf234e3447bac4d93add4c6643d8";
const signatureSHA256 =
  "sha256=4864d2759938a15468b5df9ade20bf161da9b4f737ea61794142f3484236bda3";

test("verify() without options throws", () => {
  expect(() => verify()).toThrow();
});

test("verify(undefined, eventPayload) without secret throws", () => {
  expect(() => verify.bind(null, undefined, eventPayload)()).toThrow();
});

test("verify(secret) without eventPayload throws", () => {
  expect(() => verify.bind(null, secret)()).toThrow();
});

test("verify(secret, eventPayload) without options.signature throws", () => {
  expect(() => verify.bind(null, secret, eventPayload)()).toThrow();
});

test("verify(secret, eventPayload, signatureSHA1) returns true for correct signature", () => {
  const signatureMatches = verify(secret, eventPayload, signatureSHA1);
  expect(signatureMatches).toBe(true);
});

test("verify(secret, eventPayload, signatureSHA1) returns false for incorrect signature", () => {
  const signatureMatches = verify(secret, eventPayload, "foo");
  expect(signatureMatches).toBe(false);
});

test("verify(secret, eventPayload, signatureSHA1) returns false for correct secret", () => {
  const signatureMatches = verify("foo", eventPayload, signatureSHA1);
  expect(signatureMatches).toBe(false);
});

test("verify(secret, eventPayload, signatureSHA1) returns true if eventPayload contains special characters (#71)", () => {
  // https://github.com/octokit/webhooks.js/issues/71
  const signatureMatchesLowerCaseSequence = verify(
    "development",
    {
      foo: "Foo\n\u001b[34mbar: ♥♥♥♥♥♥♥♥\nthis-is-lost\u001b[0m\u001b[2K",
    },
    "sha1=7316ec5e7866e42e4aba4af550d21a5f036f949d"
  );
  expect(signatureMatchesLowerCaseSequence).toBe(true);
  const signatureMatchesUpperCaseSequence = verify(
    "development",
    {
      foo: "Foo\n\u001B[34mbar: ♥♥♥♥♥♥♥♥\nthis-is-lost\u001B[0m\u001B[2K",
    },
    "sha1=7316ec5e7866e42e4aba4af550d21a5f036f949d"
  );
  expect(signatureMatchesUpperCaseSequence).toBe(true);
  const signatureMatchesEscapedSequence = verify(
    "development",
    {
      foo: "\\u001b",
    },
    "sha1=2c440a176f4cb84c8c921dfee882d594c2465097"
  );
  expect(signatureMatchesEscapedSequence).toBe(true);
});

test("verify(secret, eventPayload, signatureSHA256) returns true for correct signature", () => {
  const signatureMatches = verify(secret, eventPayload, signatureSHA256);
  expect(signatureMatches).toBe(true);
});

test("verify(secret, eventPayload, signatureSHA256) returns false for incorrect signature", () => {
  const signatureMatches = verify(secret, eventPayload, "foo");
  expect(signatureMatches).toBe(false);
});

test("verify(secret, eventPayload, signatureSHA256) returns false for correct secret", () => {
  const signatureMatches = verify("foo", eventPayload, signatureSHA256);
  expect(signatureMatches).toBe(false);
});

test("verify(secret, eventPayload, signatureSHA256) returns true if eventPayload contains (#71)", () => {
  // https://github.com/octokit/webhooks.js/issues/71
  const signatureMatchesLowerCaseSequence = verify(
    "development",
    {
      foo: "Foo\n\u001b[34mbar: ♥♥♥♥♥♥♥♥\nthis-is-lost\u001b[0m\u001b[2K",
    },
    "sha1=7316ec5e7866e42e4aba4af550d21a5f036f949d"
  );
  expect(signatureMatchesLowerCaseSequence).toBe(true);
  const signatureMatchesUpperCaseSequence = verify(
    "development",
    {
      foo: "Foo\n\u001B[34mbar: ♥♥♥♥♥♥♥♥\nthis-is-lost\u001B[0m\u001B[2K",
    },
    "sha1=7316ec5e7866e42e4aba4af550d21a5f036f949d"
  );
  expect(signatureMatchesUpperCaseSequence).toBe(true);
  const signatureMatchesEscapedSequence = verify(
    "development",
    {
      foo: "\\u001b",
    },
    "sha1=2c440a176f4cb84c8c921dfee882d594c2465097"
  );
  expect(signatureMatchesEscapedSequence).toBe(true);
});
