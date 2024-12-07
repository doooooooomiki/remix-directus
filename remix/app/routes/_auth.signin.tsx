import { Form } from '@remix-run/react';
import { redirect } from '@remix-run/node';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.info('request', request);
  console.info('request cookie', request.headers.get('cookie'));
  console.info('request headers', request.headers);

  return request;
};

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

export default function Signin() {
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
      <div>
        <a href="https://edit.cottoncottage.shop/auth/login/google?redirect=https://cottoncottage.shop/signin">
          Continue with Google
        </a>
      </div>
    </div>
  );
}
