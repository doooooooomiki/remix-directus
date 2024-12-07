export default defineCachedEventHandler(
  async (event) => {
    const id = getRouterParam(event, 'id');

    const user = await $fetch<Record<any, string>>(
      `https://dummyjson.com/users/${id}`
    );

    setResponseHeader(event, 'X-Dki-Is-Awsome', true);

    return {
      fname: user.firstName,
      lname: user.lastName,
    };
  },
  { maxAge: 60 * 60 /* 1 hour */ }
);
