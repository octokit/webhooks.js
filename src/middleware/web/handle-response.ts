export function handleResponse(
  body: string | null,
  status = 200 as number,
  headers = {} as Record<string, string>,
) {

  if (body !== null) {
    headers["content-length"] = body.length.toString();
  }

  return new Response(body, {
    status,
    headers
  });
}
