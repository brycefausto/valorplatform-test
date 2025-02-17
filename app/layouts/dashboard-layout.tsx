import { Outlet } from "react-router"
import { AppSidebar } from "~/components/app-sidebar"
import DashboardNavbar from "~/components/navbar/dashboard-navbar"
import {
  SidebarInset,
  SidebarProvider
} from "~/components/ui/sidebar"

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardNavbar />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
