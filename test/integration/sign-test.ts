import { sign } from "../../src/sign";

const eventPayload = {
  foo: "bar",
};
const secret = "mysecret";

test("sign() without options throws", () => {
  // @ts-expect-error
  expect(() => sign()).toThrow();
});

test("sign(undefined, eventPayload) without secret throws", () => {
  // @ts-expect-error
  expect(() => sign.bind(null, undefined, eventPayload)()).toThrow();
});

test("sign(secret) without eventPayload throws", () => {
  // @ts-expect-error
  expect(() => sign.bind(null, secret)()).toThrow();
});

test("sign({secret, algorithm}) with invalid algorithm throws", () => {
  expect(() =>
    sign.bind(null, { secret, algorithm: "sha2" as "sha1" }, eventPayload)()
  ).toThrow();
});

describe("with eventPayload as object", () => {
  describe("returns expected sha1 signature", () => {
    test("sign(secret, eventPayload)", () => {
      const signature = sign(secret, eventPayload);
      expect(signature).toBe("sha1=d03207e4b030cf234e3447bac4d93add4c6643d8");
    });

    test("sign({secret}, eventPayload)", () => {
      const signature = sign({ secret }, eventPayload);
      expect(signature).toBe("sha1=d03207e4b030cf234e3447bac4d93add4c6643d8");
    });

    test("sign({secret, algorithm: 'sha1'}, eventPayload)", () => {
      const signature = sign({ secret, algorithm: "sha1" }, eventPayload);
      expect(signature).toBe("sha1=d03207e4b030cf234e3447bac4d93add4c6643d8");
    });
  });

  describe("returns expected sha256 signature", () => {
    test("sign({secret, algorithm}, eventPayload)", () => {
      const signature = sign({ secret, algorithm: "sha256" }, eventPayload);
      expect(signature).toBe(
        "sha256=4864d2759938a15468b5df9ade20bf161da9b4f737ea61794142f3484236bda3"
      );
    });
  });
});

describe("with eventPayload as string", () => {
  describe("returns expected sha1 signature", () => {
    test("sign(secret, eventPayload)", () => {
      const signature = sign(secret, JSON.stringify(eventPayload));
      expect(signature).toBe("sha1=d03207e4b030cf234e3447bac4d93add4c6643d8");
    });

    test("sign({secret}, eventPayload)", () => {
      const signature = sign({ secret }, JSON.stringify(eventPayload));
      expect(signature).toBe("sha1=d03207e4b030cf234e3447bac4d93add4c6643d8");
    });

    test("sign({secret, algorithm: 'sha1'}, eventPayload)", () => {
      const signature = sign(
        { secret, algorithm: "sha1" },
        JSON.stringify(eventPayload)
      );
      expect(signature).toBe("sha1=d03207e4b030cf234e3447bac4d93add4c6643d8");
    });
  });

  describe("returns expected sha256 signature", () => {
    test("sign({secret, algorithm: 'sha256'}, eventPayload)", () => {
      const signature = sign(
        { secret, algorithm: "sha256" },
        JSON.stringify(eventPayload)
      );
      expect(signature).toBe(
        "sha256=4864d2759938a15468b5df9ade20bf161da9b4f737ea61794142f3484236bda3"
      );
    });
  });
});
