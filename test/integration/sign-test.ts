import { sign } from "../../src/sign";

const eventPayload = {
  foo: "bar",
};
const secret = "mysecret";

test("sign(secret, eventPayload) with eventPayload as object returns expected signature", () => {
  const signature = sign(secret, eventPayload);
  expect(signature).toBe("sha1=d03207e4b030cf234e3447bac4d93add4c6643d8");
});

test("sign(secret, eventPayload) with eventPayload as string returns expected signature", () => {
  const signature = sign(secret, JSON.stringify(eventPayload));
  expect(signature).toBe("sha1=d03207e4b030cf234e3447bac4d93add4c6643d8");
});
