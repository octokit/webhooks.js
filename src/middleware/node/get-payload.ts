import { concatUint8Array } from "../common/concat-uint8array.js";

type IncomingMessage = any;

const textDecoder = new TextDecoder("utf-8");
const decode = textDecoder.decode.bind(textDecoder);

export function getPayload(request: IncomingMessage): Promise<string> {
  if (
    typeof request.body === "object" &&
    "rawBody" in request &&
    request.rawBody instanceof Uint8Array
  ) {
    // The body is already an Object and rawBody is a Buffer/Uint8Array (e.g. GCF)
    return Promise.resolve(decode(request.rawBody));
  } else if (typeof request.body === "string") {
    // The body is a String (e.g. Lambda)
    return Promise.resolve(request.body);
  }

  // We need to load the payload from the request (normal case of Node.js server)
  return new Promise((resolve, reject) => {
    let data: Uint8Array[] = [];

    request.on("error", (error: Error) =>
      reject(new AggregateError([error], error.message)),
    );
    request.on("data", data.push.bind(data));
    request.on("end", () => {
      const result = concatUint8Array(data);
      queueMicrotask(() => resolve(decode(result)));
    });
  });
}
