"use client"

import { logout } from "@/app/login/actions";
import { APP_NAME } from "@/config/env";
import { useUserContext } from "@/store/user.store";
import {
  Navbar,
  NavbarBrand,
  NavbarContent
} from "@heroui/react";
import AppLogo from "./AppLogo";
import ProfileAvatar from "./ui/profile-avatar/ProfileAvatar";
import { SidebarTrigger } from "./ui/sidebar";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function App() {
  const user = useUserContext((s) => s.user)
  return (
    <Navbar classNames={{
      wrapper: "max-w-full"
    }}>
      <SidebarTrigger />
      <NavbarBrand>
        <AppLogo />
        <p className="font-bold text-inherit">{APP_NAME}</p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <span className="text-xl font-bold mr-2">
          {user?.name}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger>
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
      </NavbarContent>
    </Navbar>
  );
}
