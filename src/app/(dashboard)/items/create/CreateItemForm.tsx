"use client";

import ErrorText from "@/components/ErrorText";
import Loader from "@/components/Loader";
import ImageSelector from "@/components/image-selector/ImageSelector";
import { BASE_ITEMS_IMAGE_FOLDER, BASE_ITEMS_IMAGE_URL } from "@/config/env";
import { uploadImage } from "@/lib/imagekitLib";
import { ItemVariant } from "@/model/item";
import { Button, Checkbox, Input, NumberInput, Textarea } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CreateItemData, createItemSchema } from "./CreateItemSchema";
import ItemVariantForm, { ItemVariantData } from "./ItemVariantForm";
import { createItemAction } from "./actions";
import { useUserContext } from "@/store/user.store";

export default function CreateItemForm() {
  const appUser = useUserContext((s) => s.user)
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | undefined | null>()
  const [itemVariantData, setItemVariantData] = useState<ItemVariantData[]>([])
  const [price, setPrice] = useState(0)
  const [hasVariants, setHasVariants] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(createItemSchema),
  })

  const handleFormSubmit = handleSubmit(async (data: CreateItemData) => {
    setLoading(true)
    data.vendorId = appUser?.id
    let uploadError = false
    try {
      if (imageFile) {
        const result = await uploadImage(imageFile, BASE_ITEMS_IMAGE_FOLDER)
        data.image = result.name

        if (!hasVariants && data.image) {
          data.variants = [{
            name: data.name,
            image: data.image,
            price: price
          }]
        } else if (hasVariants) {
          const hasImages = itemVariantData.every(it => it.imageFile)
          if (hasImages) {
            for (const itemVariant of itemVariantData) {
              const result = await uploadImage(itemVariant.imageFile as File, BASE_ITEMS_IMAGE_FOLDER)
              itemVariant.image = result.name
            }
            data.variants = itemVariantData.map(it => it as ItemVariant)
          } else {
            throw new Error("Image required.")
          }
        }
      } else {
        throw new Error("Image required.")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      uploadError = true
      console.log("upload error", error)
      toast.error(error.message, {
        position: "bottom-center",
        hideProgressBar: true,
        theme: "colored",
      })
    }

    if (!uploadError) {
      const resultState = await createItemAction(data)
      if (resultState.error) {
        console.log("resultState error", resultState.error)
        toast.error(resultState.error, {
          position: "bottom-center",
          hideProgressBar: true,
          theme: "colored",
        })
      }
    }
    setLoading(false)
  })

  return (
    <Loader loading={loading}>
      <div className="flex w-full pt-20 items-center justify-center">
        <div className="flex w-full max-w-lg flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
          <p className="pb-4 text-left text-3xl font-semibold">
            Create Item
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            <Input
              isRequired
              label="Name"
              labelPlacement="outside"
              placeholder="Enter name"
              type="text"
              variant="bordered"
              {...register("name")}
            />
            {errors.name && (
              <ErrorText>{errors.name?.message}</ErrorText>
            )}
            <Input
              isRequired
              label="Brand"
              labelPlacement="outside"
              placeholder="Enter brand"
              type="text"
              variant="bordered"
              {...register("brand")}
            />
            {errors.brand && (
              <ErrorText>{errors.brand?.message}</ErrorText>
            )}
            <Input
              isRequired
              label="Category"
              labelPlacement="outside"
              placeholder="Enter category"
              type="text"
              variant="bordered"
              {...register("category")}
            />
            {errors.category && (
              <ErrorText>{errors.category?.message}</ErrorText>
            )}
            <Textarea
              label="Description"
              placeholder="Enter your description"
              {...register("description")}
            />
            {errors.description && (
              <ErrorText>{errors.description?.message}</ErrorText>
            )}
            <div id="imageUpload" className="max-w-md">
              <ImageSelector baseUrl={BASE_ITEMS_IMAGE_URL} required onChangeFile={setImageFile} />
            </div>
            {!hasVariants && (
              <NumberInput
                label="Price"
                placeholder="0.00"
                minValue={0}
                required
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">₱</span>
                  </div>
                }
                value={price}
                onValueChange={(value) => setPrice(value)}
              />
            )}
            <Checkbox isSelected={hasVariants} onValueChange={setHasVariants}>Has variants</Checkbox>
            {hasVariants && (
              <ItemVariantForm onChange={setItemVariantData} />
            )}
            <Button color="primary" type="submit" disabled={loading}>
              Save
            </Button>
          </form>
        </div>
      </div>
    </Loader>
  )
}
