export default defineNuxtRouteMiddleware(async (to, from) => {
  console.info({ from });
  console.info({ to });
  // Get all request headers
  const headers = useRequestHeaders();
  console.info({ headers });

  // const sessionCookie = useCookie('_sp_id.1fff');
  // if (sessionCookie.value) {
  //   return navigateTo('/me');
  // }
});
