"use client"

import ImageHolder from "@/components/image-selector/ImageHolder";
import SearchInput from "@/components/inputs/SearchInput";
import { BASE_ITEMS_IMAGE_URL } from "@/config/env";
import { pageUtils } from "@/lib/pageUtils";
import { formatPrice } from "@/lib/stringUtils";
import { PaginatedDocument } from "@/model";
import { InventoryItem } from "@/model/inventory";
import { useAlertModal } from "@/providers/alert.modal.provider";
import {
  Button,
  NumberInput,
  Pagination,
  Spinner,
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
import { toast } from "react-toastify";
import { deleteInventoryItemAction, updateInventoryItemAction } from "./actions";
import { getErrorMessage } from "@/lib/serverFetch";

export interface InventoryListProps {
  data: PaginatedDocument<InventoryItem>
  page: number
  search: string
}

export default function InventoryList({ data, page, search }: InventoryListProps) {
  const inventory = data.docs
  const alert = useAlertModal()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(search)
  const [selectedInventoryItemId, setSelectedInventoryItemId] = useState<string | null>(null)
  const [stock, setStock] = useState(0)
  const [price, setPrice] = useState(0)
  const [loading, setLoading] = useState(false)

  const getImage = (inventoryItem: InventoryItem) => {
    const variant = inventoryItem.item?.variants.find(it => it.name == inventoryItem.variantName)

    if (variant) {
      return variant.image ? BASE_ITEMS_IMAGE_URL + variant.image : ""
    } else {
      return inventoryItem.image ? BASE_ITEMS_IMAGE_URL + inventoryItem.image : ""
    }
  }

  const deleteHandler = (inventory: InventoryItem) => {
    alert.showDeleteModal("inventory", async () => {
      await deleteInventoryItemAction(inventory)
      router.refresh()
    })
  }

  const handlePageChange = (newPage: number) => {
    pageUtils.changePage(newPage, searchParams, router, pathname)
  }

  const handleSearchChange = (newSearch: string) => {
    setSearchQuery(newSearch)
    pageUtils.changeSearch(newSearch, searchParams, router, pathname)
  }

  const handleEdit = (item: InventoryItem) => {
    setSelectedInventoryItemId(item.id)
    setStock(item.stock)
    setPrice(item.price)
  }

  const handleSave = async (id: string) => {
    setSelectedInventoryItemId(null)
    setLoading(true)
    try {
      const resultState = await updateInventoryItemAction(id, { stock, price })

      if (resultState.error) {
        toast.error(resultState.error, {
          position: "bottom-center",
          hideProgressBar: true,
          theme: "colored",
        })
      } else {
        router.refresh()
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(getErrorMessage(error), {
        position: "bottom-center",
        hideProgressBar: true,
        theme: "colored",
      })
    }
    setLoading(false)
    setStock(0)
    setPrice(0)
  }

  const handleCancel = () => {
    setSelectedInventoryItemId(null)
    setStock(0)
    setPrice(0)
  }

  return (
    <div className="container p-5">
      <div className="overflow-x-auto">
        <div className="flex p-5">
          <div className="flex">
            <span className="text-2xl font-bold">Inventory</span>
          </div>
          <div className="flex flex-auto">
          </div>
          <div className="mr-5">
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
          </div>
          <Button className="justify-self-end" color="primary" as={Link} href="/inventory/create">Add</Button>
        </div>
        <Table aria-label="Example table with custom cells">
          <TableHeader >
            <TableColumn align="start">
              ITEM NAME
            </TableColumn>
            <TableColumn align="start">
              VARIANT
            </TableColumn>
            <TableColumn align="start">
              IMAGE
            </TableColumn>
            <TableColumn align="start">
              STOCK
            </TableColumn>
            <TableColumn align="start">
              PRICE
            </TableColumn>
            <TableColumn align="center">
              ACTIONS
            </TableColumn>
          </TableHeader>
          <TableBody>
            {inventory.map((inventoryItem) => (
              <TableRow key={inventoryItem.id} className="border-b-1 border-gray-200 hover:bg-gray-100">
                <TableCell>
                  <div className="flex flex-row gap-4">
                    <div className="flex items-center">
                      <p className="text-bold text-sm capitalize">{inventoryItem.item?.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <p className="text-bold text-sm">{(inventoryItem.item?.variants?.length || 0) > 1 ? inventoryItem.variantName : ""}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <ImageHolder src={getImage(inventoryItem)} alt={inventoryItem.item?.name} width={90} radius="none" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    {inventoryItem.id == selectedInventoryItemId ? (
                      <NumberInput value={stock} onValueChange={setStock} minValue={0} aria-label="stock" classNames={{ mainWrapper: "max-w-[200px]" }} />
                    ) : (
                      <p className="text-bold text-sm">{inventoryItem.stock}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    {inventoryItem.id == selectedInventoryItemId ? (
                      <div className="flex flex-row items-center">
                        <NumberInput value={price} onValueChange={setPrice} minValue={0} aria-label="price" placeholder="0.00"
                          formatOptions={{
                            style: "currency",
                            currency: "PHP",
                          }}
                          classNames={{ mainWrapper: "max-w-[200px]" }} />
                      </div>
                    ) : (
                      <p className="text-bold text-sm">{formatPrice(inventoryItem.price)}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center justify-center gap-4">
                    <Tooltip content="Details">
                      <Button variant="light" isIconOnly as={Link} href={`/inventory/${inventoryItem.id}`}>
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <Icon icon="mdi:information-box-outline" width="24" height="24" />
                        </span>
                      </Button>
                    </Tooltip>
                    {inventoryItem.id == selectedInventoryItemId ? (
                      <>
                        <Tooltip content="Save">
                          <Button variant="light" color="primary" isIconOnly onPress={() => handleSave(inventoryItem.id)}>
                            <span className="text-lg text-primary cursor-pointer active:opacity-50">
                              {loading ? (
                                <Spinner size="sm" />
                              ) : (
                                <Icon icon="mdi:content-save" width="24" height="24" />
                              )}
                            </span>
                          </Button>
                        </Tooltip>
                        <Tooltip content="Cancel">
                          <Button variant="light" isIconOnly onPress={handleCancel}>
                            <span className="text-lg cursor-pointer active:opacity-50">
                              <Icon icon="mdi:cancel" width="24" height="24" />
                            </span>
                          </Button>
                        </Tooltip>
                      </>
                    ) : (
                      <Tooltip content="Edit">
                        <Button variant="light" color="primary" isIconOnly onPress={() => handleEdit(inventoryItem)}>
                          <span className="text-lg text-primary cursor-pointer active:opacity-50">
                            <Icon icon="mdi:edit-outline" width="24" height="24" />
                          </span>
                        </Button>
                      </Tooltip>
                    )}
                    <Tooltip color="danger" content="Delete">
                      <Button type="submit" variant="light" color="danger" isIconOnly onPress={() => deleteHandler(inventoryItem)}>
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <Icon icon="mdi:delete-outline" width="24" height="24" />
                        </span>
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center">
        <Pagination initialPage={page} total={1} showControls onChange={handlePageChange} />
      </div>
    </div>
  );
}

