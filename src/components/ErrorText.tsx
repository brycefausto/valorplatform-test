import React, { PropsWithChildren } from 'react'

export default function ErrorText({ children }: PropsWithChildren) {
  return (
    <div className="my-2">
      <p className="text-danger-500">{children}</p>
    </div>
  )
}
