import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import directus from '../lib/directus';
import {
  readItem,
  readContentVersions,
  readContentVersion,
} from '@directus/sdk';
import { getSession, commitSession } from '~/sessions';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);

  const secret = searchParams.get('secret');

  if (secret !== '123') {
    return new Response('Invalid token', { status: 401 });
  }

  const id = searchParams.get('id');

  if (!id) {
    return new Response('Missing id', { status: 401 });
  }

  const post = await directus.request(readItem('posts', id));

  console.info({ id });

  const versions = await directus.request(
    readContentVersions({
      fields: ['*'],
    })
  );

  console.info({ versions });

  const version = await directus.request(
    readContentVersion('6d4d1a24-b6d2-4e37-b39c-cd0d8b89c479')
  );

  console.info({ version });

  if (!post) {
    return new Response('Invalid id', { status: 401 });
  }

  const session = await getSession(request.headers.get('Cookie'));
  session.set('preview', 'yes');

  return redirect(`/blog/${post.slug}`, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};
