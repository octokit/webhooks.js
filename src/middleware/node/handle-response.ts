export function handleResponse(
  body: string | null,
  status = 200 as number,
  headers = {} as Record<string, string>,
  response?: any,
) {
  if (body === null) {
    return true;
  }
  headers["content-length"] = body.length.toString();
  response.writeHead(status, headers);
  response.end(body);
  return response;
}
