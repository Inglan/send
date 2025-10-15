"use client";

import { authClient } from "@/lib/auth-client";
import { useConvexAuth } from "convex/react";
import { useEffect } from "react";

export function AutoAuth() {
  const convexAuth = useConvexAuth();
  useEffect(() => {
    if (!convexAuth.isLoading) {
      if (!convexAuth.isAuthenticated) {
        authClient.signIn.anonymous();
      }
    }
  }, [convexAuth.isLoading, convexAuth.isAuthenticated]);
  return null;
}
