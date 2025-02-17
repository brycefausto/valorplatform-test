import { Outlet, redirect, useLoaderData } from 'react-router';
import Footer from '~/components/footer';
import { UserProvider } from '~/providers/user.provider';
import { checkAuth } from '~/service/auth.service';
import { getSession } from '~/sessions.server';
import type { Route } from '../+types/root';

export async function loader({ params, request }: Route.LoaderArgs) {
  const session = await getSession(request)

  if (!session.has("userId")) {
    return redirect('/login')
  }

  const user = await checkAuth(session.get("userId"))

  if (user) {
    return { user }
  } else {
    session.unset("userId")
    return redirect('/login')
  }
}

export default function ProtectedLayout() {
  const loaderData = useLoaderData<typeof loader>()
  
  return (
    <UserProvider user={loaderData?.user}>
      <Outlet />
      <Footer />
    </UserProvider>
  )
}
