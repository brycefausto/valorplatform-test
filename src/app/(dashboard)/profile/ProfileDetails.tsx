"use client";

import ProfileAvatar from "@/components/ProfileAvatar";
import { useUserContext } from "@/store/user.store";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProfileDetails() {
  const user = useUserContext((s) => s.user)

  if (!user) {
    notFound()
  }
  
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full max-w-xl flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <div className="flex flex-row">
          <p className="pb-4 text-left text-3xl font-semibold">
            Profile Details
          </p>
          <div className="flex-auto"></div>
          <div className="flex">
            <Button variant="bordered" color="primary" isIconOnly as={Link} href={`/profile/edit`}>
              <Icon icon="mdi:edit-outline" width="24" height="24" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4">
          <ProfileAvatar user={user} className="h-20 w-20" size="lg" isBordered />
          <div className="space-y-1.5">
            <h3 className="font-semibold text-lg leading-none">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
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
  )
}
