"use client";

import CodeInput from "@/components/code-input";
import { Header } from "@/components/header";
import { Spinner } from "@/components/ui/spinner";
import { EASE_CURVE } from "@/lib/constants";
import { useAppState } from "@/lib/state";
import { useConvexAuth } from "convex/react";
import {
  motion,
  AnimatePresence,
  TargetAndTransition,
  VariantLabels,
} from "motion/react";

export default function Home() {
  const sessionId = useAppState((state) => state.sessionId);
  const convexAuth = useConvexAuth();
  const hidden: TargetAndTransition | VariantLabels | undefined = {
    opacity: 0,
    scale: 0.9,
    filter: "blur(2px)",
    transition: {
      ease: EASE_CURVE,
    },
  };
  const visible: TargetAndTransition | VariantLabels | undefined = {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      ease: EASE_CURVE,
    },
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <AnimatePresence>
          {(convexAuth.isLoading || !convexAuth.isAuthenticated) && (
            <motion.div
              className="absolute"
              key="spinner"
              exit={hidden}
              initial={hidden}
              animate={visible}
            >
              <Spinner />
            </motion.div>
          )}
          {!(convexAuth.isLoading || !convexAuth.isAuthenticated) && (
            <motion.div
              className="absolute"
              key="content"
              exit={hidden}
              initial={hidden}
              animate={visible}
            >
              <CodeInput />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
