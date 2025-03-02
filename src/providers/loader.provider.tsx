/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import LoadingComponent from '@/components/LoadingComponent'
import LoadingScreen from '@/components/LoadingScreen'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

export type ConfirmCallback = () => void | Promise<void>

export interface ILoaderContext {
  show: boolean
  setShow: (showLoader: boolean) => void,
}

export const LoaderContext = createContext<ILoaderContext>({
  show: false,
  setShow: (showLoader: boolean) => { },
})

export function useLoader() {
  const { setShow: showLoader } = useContext(LoaderContext)

  return { showLoader }
}

export default function LoaderProvider({ children }: PropsWithChildren) {
  const [show, setShow] = useState(false)

  console.log("is loader shown", show)

  return (
    <LoaderContext.Provider value={{ show, setShow }}>
      <>
        {children}
        {show && <LoadingComponent />}
      </>
    </LoaderContext.Provider>
  )
}

