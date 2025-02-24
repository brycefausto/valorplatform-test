"use client"

import { logout } from "@/app/login/actions";
import { APP_NAME } from "@/config/env";
import { useUserContext } from "@/store/user.store";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent
} from "@heroui/react";
import AppLogo from "./AppLogo";
import ProfileAvatar from "./ProfileAvatar";
import { SidebarTrigger } from "./ui/sidebar";
import Link from "next/link";

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
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <ProfileAvatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              size="sm"
              src="/images/avatar_placeholder.png"
              user={user}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile">
              <Link href="/profile">My Profile</Link>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={() => logout()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
