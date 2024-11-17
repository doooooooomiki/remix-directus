import directus from '../lib/directus';
import { readSingleton } from '@directus/sdk';
import { useLoaderData } from '@remix-run/react';

export const loader = async () => {
  const global = await directus.request(readSingleton('global'));
  return global;
};

export default function Index() {
  const { title, description } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
