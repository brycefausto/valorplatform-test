"use client"

import ImageHolder from "@/components/image-selector/ImageHolder";
import SearchInput from "@/components/inputs/SearchInput";
import { BASE_ITEMS_IMAGE_URL } from "@/config/env";
import { pageUtils } from "@/lib/pageUtils";
import { formatPrice } from "@/lib/stringUtils";
import { PaginatedDocument } from "@/model";
import { Item } from "@/model/item";
import { useAlertModal } from "@/providers/alert.modal.provider";
import {
  Button,
  Pagination,
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { deleteItemAction } from "./actions";

export interface ItemListProps {
  data: PaginatedDocument<Item>
  page: number
  search: string
}

export default function ItemList({ data, page, search }: ItemListProps) {
  const items = data.docs
  const alert = useAlertModal()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(search)

  const deleteHandler = (item: Item) => {
    alert.showDeleteModal("item", async () => {
      await deleteItemAction(item)
    })
  }

  const handlePageChange = (newPage: number) => {
    pageUtils.changePage(newPage, searchParams, router, pathname)
  }

  const handleSearchChange = (newSearch: string) => {
    setSearchQuery(newSearch)
    pageUtils.changeSearch(newSearch, searchParams, router, pathname)
  }

  return (
    <div className="container p-5">
      <div className="overflow-x-auto">
        <div className="flex p-5">
          <div className="flex">
            <span className="text-2xl font-bold">Items</span>
          </div>
          <div className="flex flex-auto">
          </div>
          <div className="mr-5">
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
          </div>
          <Button className="justify-self-end" color="primary" as={Link} href="/items/create">Add</Button>
        </div>
        <Table aria-label="Example table with custom cells">
          <TableHeader >
            <TableColumn align="start">
              NAME
            </TableColumn>
            <TableColumn align="start">
              IMAGE
            </TableColumn>
            <TableColumn align="start">
              BRAND
            </TableColumn>
            <TableColumn align="start">
              CATEGORY
            </TableColumn>
            <TableColumn align="start">
              PRICE
            </TableColumn>
            {/* <TableColumn align="start">
              VARIANTS
            </TableColumn> */}
            <TableColumn align="center">
              ACTIONS
            </TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.id} className="border-b-1 border-gray-200 hover:bg-gray-100">
                <TableCell>
                  <div className="flex flex-row gap-4">
                    <div className="flex items-center">
                      <p className="text-bold text-sm capitalize">{item.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <ImageHolder src={item.image ? BASE_ITEMS_IMAGE_URL + item.image : ""} alt={item.name} width={90} radius="none" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <p className="text-bold text-sm">{item.brand}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <p className="text-bold text-sm">{item.category}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <p className="text-bold text-sm">{formatPrice(item.variants.length ? item.variants[0].price : 0)}</p>
                  </div>
                </TableCell>
                {/* <TableCell>
                  <div className="flex items-center justify-center">
                    <p className="text-bold text-sm">{item.variants.length}</p>
                  </div>
                </TableCell> */}
                <TableCell>
                  <div className="relative flex items-center justify-center gap-4">
                    <Tooltip content="Details">
                      <Button variant="light" isIconOnly as={Link} href={`/items/${item.id}`}>
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <Icon icon="mdi:information-box-outline" width="24" height="24" />
                        </span>
                      </Button>
                    </Tooltip>
                    <Tooltip content="Edit">
                      <Button variant="light" color="primary" isIconOnly as={Link} href={`/items/edit/${item.id}`}>
                        <span className="text-lg text-primary cursor-pointer active:opacity-50">
                          <Icon icon="mdi:edit-outline" width="24" height="24" />
                        </span>
                      </Button>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete">
                      <Button type="submit" variant="light" color="danger" isIconOnly onPress={() => deleteHandler(item)}>
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <Icon icon="mdi:delete-outline" width="24" height="24" />
                        </span>
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center">
        <Pagination initialPage={page} total={1} showControls onChange={handlePageChange} />
      </div>
    </div>
  );
}

