'use client'
import { Button } from '@heroui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

export interface FormLayoutProps extends PropsWithChildren {
  title?: string
  backUrl?: string
}

export default function FormLayout({ title, backUrl, children }: FormLayoutProps) {
  const router = useRouter()

  return (
    <div>
      <div className="flex p-5">
        {backUrl ? (
          <Link href={backUrl}>
            <Button className="justify-self-start" variant="bordered" color="secondary">Back</Button>
          </Link>
        ) : (
          <Button className="justify-self-start" onPress={() => router.back()}>Back</Button>
        )}
        <div className="flex flex-auto">
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[500px]">
          {title && (
            <div className="mb-5">
              <span className="text-4xl font-bold">{title}</span>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
