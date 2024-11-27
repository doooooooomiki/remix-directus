import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const me = await fetch('http://directus:8055/users/me', {
    headers: {
      Cookie: request.headers.get('cookie') as string,
    },
  })
    .then((response) => response.json())
    .then((json) => json.data);

  const profile = await fetch(
    `http://directus:8055/items/user_profile?filter[user][_eq]=${me.id}`,
    {
      headers: {
        Cookie: request.headers.get('cookie') as string,
      },
    }
  )
    .then((response) => response.json())
    .then((json) => json.data)
    .then((data) => data[0]);

  return {
    id: me.id,
    prename: me.first_name,
    surname: me.last_name,
    email: me.email,
    message: profile.message,
  };
};

export default function Me() {
  const { id, prename, surname, email, message } =
    useLoaderData<typeof loader>();

  return (
    <div>
      <h1>{id}</h1>
      <ul>
        <li>{prename}</li>
        <li>{surname}</li>
        <li>{email}</li>
      </ul>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
}
