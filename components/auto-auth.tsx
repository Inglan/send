"use client";

import { useConvexAuth } from "convex/react";
import { useEffect } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

export function AutoAuth() {
  const { signIn } = useAuthActions();

  const convexAuth = useConvexAuth();
  useEffect(() => {
    if (!convexAuth.isLoading) {
      if (!convexAuth.isAuthenticated) {
        signIn("anonymous");
      }
    }
  }, [convexAuth.isLoading, convexAuth.isAuthenticated]);
  return null;
}
