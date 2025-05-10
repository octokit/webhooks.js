// https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#delivery-headers
export function getRequestHeader<T = string>(request: Request, key: string) {
  return request.headers.get(key) as T;
}
