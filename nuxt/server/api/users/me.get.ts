export default defineEventHandler(async (event) => {
  const cookie = getRequestHeader(event, 'cookie');

  const { data: me } = await $fetch<{ data: Record<any, string> }>(
    'http://directus:8055/users/me',
    {
      headers: {
        Cookie: cookie ? cookie : '',
      },
    }
  );

  return {
    fname: me.first_name,
    lname: me.last_name,
    email: me.email,
  };
});
