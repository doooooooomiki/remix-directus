import { Form } from '@remix-run/react';
import { redirect } from '@remix-run/node';
import type { ActionFunctionArgs } from '@remix-run/node';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const res = await fetch('http://directus:8055/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: String(formData.get('email')),
      password: String(formData.get('password')),
      mode: 'session',
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  const directusSessionToken = res.headers
    .getSetCookie()
    .find((s) => s.startsWith('directus_session_token'));

  return redirect(`/`, {
    headers: {
      'Set-Cookie': directusSessionToken as string,
    },
  });
}

export default function Index() {
  return (
    <div>
      <Form method="post">
        <div>
          <input type="email" name="email" />
        </div>
        <div>
          <input type="password" name="password" />
        </div>
        <div>
          <button type="submit">Sign in</button>
        </div>
      </Form>
    </div>
  );
}
