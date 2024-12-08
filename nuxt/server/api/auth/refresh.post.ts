export default defineEventHandler(async (event) => {
  const cookie = getRequestHeader(event, 'cookie');

  const response = await $fetch.raw<any>('http://directus:8055/auth/refresh', {
    method: 'POST',
    headers: {
      Cookie: cookie ? cookie : '',
    },
    body: {
      mode: 'session',
    },
  });

  if (response.ok) {
    return sendWebResponse(
      event,
      new Response(JSON.stringify(response._data), {
        headers: response.headers,
      })
    );
  }

  return new Response(response._data, { headers: response.headers });
});
