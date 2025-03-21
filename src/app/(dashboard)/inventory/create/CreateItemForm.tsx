"use client";

import Loader from "@/components/Loader";
import ItemSelect from "@/components/inputs/ItemSelect";
import { useUserContext } from "@/store/user.store";
import { Button, NumberInput, Select, SelectItem } from "@heroui/react";
import { FormEventHandler, useState } from "react";
import { toast } from "react-toastify";
import { CreateInventoryItemData } from "./CreateItemSchema";
import { createItemAction } from "./actions";
import { Item, ItemVariant } from "@/model/item";

export interface CreateInventoryItemDto {
  itemId: string
  vendorId: string
  variantName: string
  stock: number
  price: number
}

export default function CreateItemForm() {
  const appUser = useUserContext((s) => s.user)
  const [loading, setLoading] = useState(false)
  const [itemId, setItemId] = useState("")
  const [stock, setStock] = useState(0)
  const [price, setPrice] = useState(0)
  const [variants, setVariants] = useState<ItemVariant[]>([])
  const [variantName, setVariantName] = useState("")

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (!itemId) {
      toast.error("Please select an item.", {
        position: "bottom-center",
        hideProgressBar: true,
        theme: "colored",
      })
      return
    }
    const data: CreateInventoryItemData = {
      itemId,
      vendorId: appUser?.id,
      variantName,
      stock,
      price
    }
    setLoading(true)
    const resultState = await createItemAction(data)
    if (resultState.error) {
      console.log("resultState error", resultState.error)
      toast.error(resultState.error, {
        position: "bottom-center",
        hideProgressBar: true,
        theme: "colored",
      })
    }
    setLoading(false)
  }

  const handleItemSelect = (item: Item) => {
    setItemId(item.id)
    setPrice(item.variants.length ? item.variants[0].price : 0)
    setVariants(item.variants)
    setVariantName(item.variants.length ? item.variants[0].name : "")
  }

  const handleVariantSelect = (variantName: string) => {
    setVariantName(variantName)
    const variant = variants.find(it => it.name == variantName)

    if (variant) {
      setPrice(variant.price)
    }
  }

  return (
    <Loader loading={loading}>
      <div className="flex w-full pt-20 items-center justify-center">
        <div className="flex w-full max-w-lg flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
          <p className="pb-4 text-left text-3xl font-semibold">
            Create Inventory Item
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-2">
              <label>Select Item</label>
              <ItemSelect onChange={handleItemSelect} />
            </div>
            {variants.length > 1 && (
              <div className="flex flex-col gap-2">
                <label>Select Item Variant</label>
                <Select aria-label="variant" selectedKeys={[variantName]} onChange={(e) => handleVariantSelect(e.target.value)}>
                  {variants.map(variant => (
                    <SelectItem key={variant.name}>{variant.name}</SelectItem>
                  ))}
                </Select>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="stock">Stock</label>
              <NumberInput
                id="stock"
                aria-label="stock"
                value={stock}
                onValueChange={setStock}
                minValue={0}
                classNames={{ mainWrapper: "max-w-[200px]" }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price</label>
              <NumberInput
                id="price"
                aria-label="price"
                value={price}
                onValueChange={setPrice}
                minValue={0}
                placeholder="0.00"
                formatOptions={{
                  style: "currency",
                  currency: "PHP",
                }}
                classNames={{ mainWrapper: "max-w-[200px]" }} />
            </div>
            <Button color="primary" type="submit" disabled={loading}>
              Save
            </Button>
          </form>
        </div>
      </div>
    </Loader>
  )
}
