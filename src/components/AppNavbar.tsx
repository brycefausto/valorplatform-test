"use client"

import { logout } from "@/app/login/actions";
import { APP_NAME } from "@/config/env";
import { useUserContext } from "@/store/user.store";
import Link from "next/link";
import AppLogo from "./AppLogo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import ProfileAvatar from "./ui/profile-avatar/ProfileAvatar";
import { SidebarTrigger } from "./ui/sidebar";

export default function App() {
  const user = useUserContext((s) => s.user)
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-row gap-2 items-center">
          <AppLogo />
          <p className="font-bold text-inherit">{APP_NAME}</p>
        </div>
        <div className="flex flex-1"></div>
        <div className="flex flex-row gap-2 items-center">
          <span className="text-xl font-bold mr-2">
            {user?.name}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ProfileAvatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                name={user?.name}
                image={user?.image}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem key="profile" textValue="My Profile">
                <Link className="flex" href="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem key="settings">My Settings</DropdownMenuItem>
              <DropdownMenuItem key="team_settings">Team Settings</DropdownMenuItem>
              <DropdownMenuItem key="analytics">Analytics</DropdownMenuItem>
              <DropdownMenuItem key="system">System</DropdownMenuItem>
              <DropdownMenuItem key="configurations">Configurations</DropdownMenuItem>
              <DropdownMenuItem key="help_and_feedback">Help & Feedback</DropdownMenuItem>
              <DropdownMenuItem key="logout" color="danger" onClick={() => logout()}>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
