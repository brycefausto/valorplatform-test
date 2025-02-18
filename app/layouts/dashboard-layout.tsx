import { Outlet, useLoaderData } from "react-router"
import { AppSidebar } from "~/components/app-sidebar"
import DashboardNavbar from "~/components/navbar/dashboard-navbar"
import {
  SidebarInset,
  SidebarProvider
} from "~/components/ui/sidebar"
import { APP_NAME } from "~/config"

export function loader() {
  return { appName: APP_NAME }
}

export default function DashboardLayout() {
  const { appName } = useLoaderData<typeof loader>()
  console.log({ appName })

  return (
    <SidebarProvider>
      <AppSidebar appName={appName} />
      <SidebarInset>
        <DashboardNavbar />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
