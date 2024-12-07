export default defineNuxtRouteMiddleware((to, from) => {
  const header = useResponseHeader('X-Dki-Is-Awsome');
  header.value = true;
});
