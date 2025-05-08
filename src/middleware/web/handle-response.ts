export function handleResponse(
  body: string | null,
  status = 200 as number,
  headers = {} as Record<string, string>,
) {
  if (body === null) {
    return new Response(null);
  }
  return new Response(body, {
    status,
    headers: {
      ...headers,
      "content-length": body.length.toString(),
    },
  });
}
