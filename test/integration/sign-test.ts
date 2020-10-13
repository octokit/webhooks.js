import { sign } from "../../src/sign";

const eventPayload = {
  foo: "bar",
};
const secret = "mysecret";

test("sign() without options throws", () => {
  // @ts-ignore
  expect(() => sign()).toThrow();
});

test("sign(undefined, eventPayload) without secret throws", () => {
  // @ts-ignore
  expect(() => sign.bind(null, undefined, eventPayload)()).toThrow();
});

test("sign(secret) without eventPayload throws", () => {
  // @ts-ignore
  expect(() => sign.bind(null, secret)()).toThrow();
});

test("sign(secret, eventPayload) with eventPayload as object returns expected sha1 signature", () => {
  const signature = sign(secret, eventPayload);
  expect(signature).toBe("sha1=d03207e4b030cf234e3447bac4d93add4c6643d8");
});

test("sign(secret, eventPayload) with eventPayload as object returns expected sha256 signature", () => {
  const signature = sign(secret, eventPayload);
  expect(signature).toBe("sha256=kljsdfjkldasjfkaejkfwekuweur3298r2398r89fdsuf3");
});

test("sign(secret, eventPayload) with eventPayload as string returns expected sha1 signature", () => {
  const signature = sign(secret, JSON.stringify(eventPayload));
  expect(signature).toBe("sha1=d03207e4b030cf234e3447bac4d93add4c6643d8");
});

test("sign(secret, eventPayload) with eventPayload as string returns expected sha256 signature", () => {
  const signature = sign(secret, JSON.stringify(eventPayload));
  expect(signature).toBe("sha256=kljsdfjkldasjfkaejkfwekuweur3298r2398r89fdsuf3");
});
