import { RegisterForm } from '~/components/register-form';
import { APP_NAME } from '~/config';
import type { Route } from './+types/register';
import type { RegisterDto } from '~/types/auth-types';
import { registerUser } from '~/service/auth.service';
import { redirect } from 'react-router';
import { commitSession, getSession } from '~/sessions.server';

export function loader() {
  return { appName: APP_NAME };
}

export async function action({
  request,
}: Route.ActionArgs) {
  let formData = await request.formData()
  let registerDto = Object.fromEntries(formData.entries()) as RegisterDto
  const session = await getSession(request)

  try {
    const user = await registerUser(registerDto)
    session.set("userId", user.id)

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    })
  } catch (error) {
    
  }

  return registerDto;
}

export default function Register({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          {loaderData.appName}
        </a>
        <RegisterForm />
      </div>
    </div>
  )
}
