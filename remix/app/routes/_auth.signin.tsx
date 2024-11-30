import { Form } from '@remix-run/react';
import { redirect } from '@remix-run/node';
import type { ActionFunctionArgs } from '@remix-run/node';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const response = await fetch('http://directus:8055/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: String(formData.get('email')),
      password: String(formData.get('password')),
      mode: 'session',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return redirect('/me', {
    headers: {
      // why not res.headers.getSetCookie()?
      // https://developer.mozilla.org/en-US/docs/Web/API/Headers/getSetCookie
      // TypeError: getSetCookie is not a function
      // https://github.com/remix-run/remix/issues/9324'
      // https://github.com/remix-run/remix/blob/main/CHANGELOG.md#single-fetch-unstable
      'Set-Cookie': response.headers.get('set-cookie') as string,
    },
  });
}

export default function SignIn() {
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
