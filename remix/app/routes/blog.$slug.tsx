import { LoaderFunctionArgs } from '@remix-run/node';
import { getPostById } from '../lib/directus';
import { useLoaderData } from '@remix-run/react';
import { getSession } from '~/sessions';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));
  const { slug } = params;
  const { searchParams } = new URL(request.url);
  const version = searchParams.get('version')?.toString();
  const page = await getPostById(
    slug as string,
    session.has('preview') ? version : undefined
  );
  return page;
};

export default function Page() {
  const { title, content } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}
