"use client";

import ImageHolder from "@/components/image-selector/ImageHolder";
import { BASE_ITEMS_IMAGE_URL } from "@/config/env";
import { formatPrice } from "@/lib/stringUtils";
import { Item } from "@/model/item";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export interface ItemDetailsProps {
  item: Item
}

export default function ItemDetailsForm({ item }: ItemDetailsProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full max-w-xl flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <div className="flex flex-row">
          <p className="pb-4 text-left text-3xl font-semibold">
            Item Details
          </p>
          <div className="flex-auto"></div>
          <div className="flex">
            <Button variant="bordered" color="primary" isIconOnly as={Link} href={`/items/edit/${item.id}`}>
              <Icon icon="mdi:edit-outline" width="24" height="24" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ImageHolder src={item.image ? BASE_ITEMS_IMAGE_URL + item.image : ""} alt={item.name} width={200} radius="none" />
          <div className="space-y-1.5">
            <h3 className="font-semibold text-lg leading-none">{item.name}</h3>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="font-bold text-lg">Brand</p>
            <p className="text-lg">{item.brand}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-lg">Category</p>
            <p className="text-lg">{item.category}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-lg">Description</p>
            <p className="text-lg">{item.description}</p>
          </div>
          {item.variants.length == 1 ? (
            <div className="flex flex-col">
              <p className="font-bold text-lg">Price</p>
              <p className="text-lg">{formatPrice(item.variants.length ? item.variants[0].price : 0)}</p>
            </div>
          ) : (
            <div className="flex flex-col">
              <p className="font-bold text-lg">Variants</p>
              <Table>
                <TableHeader>
                  <TableColumn>
                    Name
                  </TableColumn>
                  <TableColumn>
                    Image
                  </TableColumn>
                  <TableColumn>
                    Price
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {item.variants.map((variant, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        {variant.name}
                      </TableCell>
                      <TableCell>
                        <ImageHolder src={variant.image ? BASE_ITEMS_IMAGE_URL + variant.image : ""} alt={variant.name} width={90} radius="none" />
                      </TableCell>
                      <TableCell>
                        {formatPrice(variant.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
