import { createCookieSessionStorage } from '@remix-run/node';

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: '__session',
      maxAge: 604_800,
      path: '/',
      secrets: ['s3cret1'],
    },
  });
export { getSession, commitSession, destroySession };
