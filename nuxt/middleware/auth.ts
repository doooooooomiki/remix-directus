export default defineNuxtRouteMiddleware(async () => {
  const response = await $fetch
    .raw<Record<any, string>>('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
      headers: useRequestHeaders(),
    })
    .catch((e) => console.error(e));

  if (response?.ok) {
    return navigateTo('/me');
  }
});
