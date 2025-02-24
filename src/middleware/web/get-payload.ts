export function getPayload(request: Request): Promise<string> {
  return request.text();
}
