import { Spinner } from '@heroui/react'
import React from 'react'

export default function LoadingComponent() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Spinner size="lg" classNames={{
        wrapper: "h-[100px] w-[100px]",
        circle1: "border-5",
        circle2: "border-5",
      }} />
    </div>
  )
}
