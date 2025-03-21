
'use client';

import {
  Button, 
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@heroui/react";
import { Icon } from "@iconify/react";

export interface DialogModalProps {
  show: boolean
  setShow: (show: boolean) => void
  message?: string
  onConfirm: () => void | Promise<void>
  hasIcon?: boolean
}

export function DialogModal({ show, setShow, message, onConfirm, hasIcon }: DialogModalProps) {
  const handleConfirm = () => {
    setShow(false)
    onConfirm()
  }

  return (
    <>
      <Modal isOpen={show} onOpenChange={setShow}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader />
              <ModalBody>
                {hasIcon && (
                  <span className="mb-4 text-gray-400 dark:text-gray-200">
                    <Icon icon="mdi:warning-circle-outline" className="mx-auto" width="32" height="32" />
                  </span>
                )}
                <p>
                  {message}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleConfirm}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
