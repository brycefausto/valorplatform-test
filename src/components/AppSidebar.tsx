import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { APP_NAME } from "@/config/env"

export function AppSidebar() {
  return (
    <Sidebar className="p-4">
      <SidebarHeader className="p-4 bg-white">
        <h2 className="text-lg font-semibold">{APP_NAME}</h2>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard" className="text-primary">
                <Icon icon="mdi:view-dashboard" width={32} height={32} />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/users" className="text-primary">
                <Icon icon="mdi:user" width={32} height={32} />
                <span>Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/profile" className="text-primary">
                <Icon icon="mdi:user-circle" width={32} height={32} />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

