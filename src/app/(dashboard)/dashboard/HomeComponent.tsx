"use client"

import { Button } from '@heroui/react'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

export default function HomeComponent() {
  return (
    <div className="flex flex-row w-full overflow-x-auto">
      <div className="flex flex-col gap-5 basis-1/2 items-center p-3">
        <span className="text-2xl font-bold">Manage Data</span>
        <div className="flex flex-col gap-5 min-w-[300px]">
          <Button color="primary" href="/users" as={Link} className="w-full"><Icon icon="mdi:user" width={32} height={32} />Users</Button>
          <Button color="primary" href="/items" as={Link} className="w-full"><Icon icon="mdi:format-list-bulleted" width={32} height={32} />Items</Button>
          <Button color="primary" href="/inventory" as={Link} className="w-full"><Icon icon="mdi:package" width={32} height={32} />Inventory</Button>
        </div>
      </div>
      <div className="flex flex-col gap-5 basis-1/2 p-3">
      </div>
    </div>
  )
}
