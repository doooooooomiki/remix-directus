import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import directus from '../lib/directus';
import { readItem } from '@directus/sdk';
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

  if (!post) {
    return new Response('Invalid id', { status: 401 });
  }

  const version = searchParams.get('version');

  const session = await getSession(request.headers.get('Cookie'));
  session.set('preview', 'yes');

  return redirect(`/blog/${post.slug}?version=${version}`, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};
