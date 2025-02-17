import type { AlertDialogProps } from "@radix-ui/react-alert-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "~/components/ui/alert-dialog"

export interface MessageAlertDialogProps extends AlertDialogProps {
  title: string
  description: string
  onCancel?: () => void
  onContinue: () => void
}

export default function MessageAlertDialog({ title, description, onCancel, onContinue, ...props }: MessageAlertDialogProps) {
  return (
    <AlertDialog {...props} >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onCancel?.()}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onContinue()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

