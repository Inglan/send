"use client";

import { motion, AnimatePresence } from "motion/react";
import { Spinner } from "@/components/ui/spinner";
import { useAppState } from "@/lib/state";

export function Loader() {
  const loading = useAppState((state) => state.loading);
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-background/10 backdrop-blur-sm z-50 flex justify-center items-center"
        >
          <Spinner />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
