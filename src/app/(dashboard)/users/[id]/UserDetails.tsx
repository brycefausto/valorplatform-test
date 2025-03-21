"use client";

import ProfileAvatar from "@/components/ui/profile-avatar/ProfileAvatar";
import { AppUser } from "@/model/user";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export interface UserDetailsProps {
  user: AppUser
}

export default function UserDetailsForm({ user }: UserDetailsProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full max-w-xl flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <div className="flex flex-row">
          <p className="pb-4 text-left text-3xl font-semibold">
            User Details
          </p>
          <div className="flex-auto"></div>
          <div className="flex">
            <Button variant="bordered" color="primary" isIconOnly as={Link} href={`/users/edit/${user.id}`}>
              <Icon icon="mdi:edit-outline" width="24" height="24" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ProfileAvatar name={user.name} image={user.image} className="h-20 w-20" size="lg" isBordered />
          <div className="space-y-1.5">
            <h3 className="font-semibold text-lg leading-none">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="font-bold text-lg">Role</p>
            <p className="text-lg">{user.role}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-lg">Phone</p>
            <p className="text-lg">{user.phone}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-lg">Address</p>
            <p className="text-lg">{user.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
