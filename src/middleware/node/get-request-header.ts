// https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#delivery-headers
export function getRequestHeader<T = string>(request: any, key: string) {
  return request.headers[key] as T;
}
