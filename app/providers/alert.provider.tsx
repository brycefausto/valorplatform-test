import { createContext, useContext, useState, type PropsWithChildren } from 'react'
import MessageAlertDialog from '~/components/message-alert-dialog'

export type OnContinueCallback = () => void | Promise<void>

export const alertModalContextValue = {
  open: false,
  onOpenChange: (showModal: boolean) => {},
  setTitle: (title: string) => {},
  setDescription: (description: string) => {},
  setOnContinue: (callback: () => OnContinueCallback) => {},
}

export const AlertModalContext = createContext(alertModalContextValue)

export const useAlertModal = () => {
  const { onOpenChange, setTitle, setDescription, setOnContinue } = useContext(AlertModalContext)

  const close = () => {
    onOpenChange(false)
    setTitle('')
    setDescription('')
    setOnContinue(() => () => {})
  }

  const showMessageModal = (title: string,  description: string, callback: OnContinueCallback) => {
    onOpenChange(true)
    setTitle(title)
    setDescription(description)
    setOnContinue(() => callback)

    return { close }
  }

  return { showMessageModal }
}

export default function AlertModalProvider({ children }: PropsWithChildren) {
  const [open, onOpenChange] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [onContinue, setOnContinue] = useState<OnContinueCallback>(() => () => {})

  const value = { open, onOpenChange, title, setTitle, setDescription, setOnContinue }

  const renderModal = () => <MessageAlertDialog { ...{ open, onOpenChange, title, description, onContinue } } />

  return (
    <AlertModalContext.Provider value={value}>
      {renderModal()}
      {children}
    </AlertModalContext.Provider>
  )
}
