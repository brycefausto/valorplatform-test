import * as React from "react"
import { AiFillDashboard, AiFillDatabase, AiFillProduct } from "react-icons/ai"
import { FaUser } from "react-icons/fa"
import { MdCategory } from "react-icons/md"
import { IoMdSettings } from "react-icons/io"

import { Link, useLoaderData } from "react-router"
import { NavMain } from "~/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "~/components/ui/sidebar"
import type { loader } from "~/routes/dashboard"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/images/profile_placeholder.jpg",
  },
  navMain: [
    {
      title: "Manage Data",
      url: "#",
      icon: AiFillDatabase,
      isActive: true,
      items: [
        {
          title: "Users",
          url: "/users",
          icon: FaUser,
        },
        {
          title: "Products",
          url: "#",
          icon: AiFillProduct,
        },
        {
          title: "Categories",
          url: "#",
          icon: MdCategory,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: IoMdSettings,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ]
}

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  appName: string
}

export function AppSidebar({ appName, ...props }: AppSidebarProps) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{appName}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <AiFillDashboard  />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  )
}
