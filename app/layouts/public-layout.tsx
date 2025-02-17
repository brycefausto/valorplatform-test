import { Outlet, redirect } from 'react-router'
import Footer from '~/components/footer'
import { checkAuth } from '~/service/auth.service'
import { getSession } from '~/sessions.server'
import type { Route } from '../+types/root'

export async function loader({ params, request }: Route.LoaderArgs) {
  const session = await getSession(request)

  let isAuth = false

  if (session.has("userId")) {
    const user = await checkAuth(session.get("userId"))

    if (user) {
      isAuth = true
    }
  }
  
  if (isAuth) {
    return redirect('/dashboard')
  }
}

export default function PublicLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}
