import { AnimatePresence, motion } from "framer-motion";

export interface FadeProps extends React.PropsWithChildren<{}> {
  isActive: boolean;
}

export default function Fade({ isActive, children }: FadeProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
