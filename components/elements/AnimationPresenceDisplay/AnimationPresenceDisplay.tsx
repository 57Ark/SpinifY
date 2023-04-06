import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren } from "react";

const variants = {
  initial: {
    y: "100px",
    opacity: 0,
    zIndex: 0,
    transition: {
      duration: 1,
      type: "spring",
    },
  },
  animate: { y: 0, opacity: 1, zIndex: 1 },
  exit: {
    y: "-100px",
    opacity: 0,
    zIndex: 0,
    transition: {
      duration: 0.5,
      type: "spring",
    },
  },
};

export default function AnimationPresenceDisplay({
  presence,
  children,
}: PropsWithChildren<{
  presence: boolean;
}>) {
  return (
    <AnimatePresence mode="popLayout">
      {presence && (
        <motion.div
          variants={variants}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          transition={{
            duration: 1,
            type: "spring",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
