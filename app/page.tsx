"use client";

import CodeInput from "@/components/code-input";
import { Header } from "@/components/header";
import { Spinner } from "@/components/ui/spinner";
import { useAppState } from "@/lib/state";
import { convex } from "@convex-dev/better-auth/plugins";
import { useConvexAuth } from "convex/react";
import { motion, AnimatePresence } from "motion/react";

export default function Home() {
  const sessionId = useAppState((state) => state.sessionId);
  const convexAuth = useConvexAuth();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <AnimatePresence>
          {" "}
          {(convexAuth.isLoading || !convexAuth.isAuthenticated) && (
            <motion.div
              className="absolute"
              key="spinner"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Spinner />
            </motion.div>
          )}
          {!(convexAuth.isLoading || !convexAuth.isAuthenticated) && (
            <motion.div
              className="absolute"
              key="content"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <CodeInput />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
