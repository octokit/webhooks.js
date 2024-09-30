export function onUnhandledRequestDefault(
  request: Request,
) {
  return new Response(JSON.stringify({
      error: `Unknown route: ${request.method} ${request.url}`,
    }), {
      status: 404,
      headers: {
        "content-type": "application/json",
      },
    });
}
