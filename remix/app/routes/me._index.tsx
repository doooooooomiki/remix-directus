import { useLoaderData } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/node';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const me = await fetch('http://directus:8055/users/me', {
    headers: {
      Cookie: request.headers.get('cookie') as string,
    },
  })
    .then((response) => response.json())
    .then((json) => json.data);

  return {
    id: me.id,
    prename: me.first_name,
    surname: me.last_name,
    email: me.email,
  };
};

export default function Me() {
  const { id, prename, surname, email } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>{id}</h1>
      <ul>
        <li>{prename}</li>
        <li>{surname}</li>
        <li>{email}</li>
      </ul>
    </div>
  );
}
