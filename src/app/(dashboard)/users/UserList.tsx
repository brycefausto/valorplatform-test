"use client"

import ProfileAvatar from "@/components/ui/profile-avatar/ProfileAvatar";
import { AppUser } from "@/model/user";
import { useAlertModal } from "@/providers/alert.modal.provider";
import { useUserContext } from "@/store/user.store";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip
} from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { Key } from "react";
import { deleteUserAction } from "./actions";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "PHONE", uid: "phone" },
  { name: "ADDRESS", uid: "address" },
  { name: "ACTIONS", uid: "actions" },
];

export interface UserListProps {
  users: AppUser[];
}

export default function UserList({ users }: UserListProps) {
  const appUser = useUserContext((s) => s.user)
  const alert = useAlertModal()

  const renderCell = React.useCallback((user: AppUser, columnKey: Key) => {
    const cellValue = user[columnKey as keyof AppUser];
    const deleteHandler = (id: string) => {
      alert.showDeleteModal("user", async () => {
        await deleteUserAction(id)
      })
    }

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-row gap-4">
            <ProfileAvatar name={user.name} image={user.image} size="sm" />
            <div className="flex items-center">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        );
      case "phone":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "address":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-4">
            <Tooltip content="Details">
              <Button variant="light" isIconOnly as={Link} href={`/users/${user.id}`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Icon icon="mdi:information-box-outline" width="24" height="24" />
                </span>
              </Button>

            </Tooltip>
            <Tooltip content="Edit user">
              <Button variant="light" color="primary" isIconOnly as={Link} href={`/users/edit/${user.id}`}>
                <span className="text-lg text-primary cursor-pointer active:opacity-50">
                  <Icon icon="mdi:edit-outline" width="24" height="24" />
                </span>
              </Button>
            </Tooltip>
            {appUser?.id !== user.id ? (
              <Tooltip color="danger" content="Delete user">
                <Button type="submit" variant="light" color="danger" isIconOnly onPress={() => deleteHandler(user.id)}>
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <Icon icon="mdi:delete-outline" width="24" height="24" />
                  </span>
                </Button>
              </Tooltip>
            ) : (
              <Tooltip color="default" content="Cannot delete currently logged in user.">
                <Button type="submit" variant="light" color="default" isIconOnly disabled>
                  <span className="text-lg text-default-200 cursor-pointer active:opacity-50">
                    <Icon icon="mdi:delete-outline" width="24" height="24" />
                  </span>
                </Button>
              </Tooltip>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, [alert, appUser?.id]);

  return (
    <div className="container p-5">
      <div className="overflow-x-auto">
        <div className="flex p-5">
          <div className="flex">
            <span className="text-2xl font-bold">Users</span>
          </div>
          <div className="flex flex-auto">
          </div>
          <div className="mr-5">
            {/* <SearchInput value={searchQuery} onChange={setSearchQuery} /> */}
          </div>
          <Button className="justify-self-end" color="primary" as={Link} href="/users/create">Add</Button>
        </div>
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(item) => (
              <TableRow key={item.id} className="border-b-1 border-gray-200 hover:bg-gray-100">
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

