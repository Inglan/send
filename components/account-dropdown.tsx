"use client";

import { Button } from "@/components/ui/button";
import { CircleUser, LogIn } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Authenticated,
  AuthLoading,
  Unauthenticated,
  useConvexAuth,
} from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "motion/react";
import { authClient } from "@/lib/auth-client";
import { useAppState } from "@/lib/state";
import { toast } from "sonner";

export function AccountDropdown() {
  const convexAuth = useConvexAuth();
  const setLoading = useAppState((state) => state.setLoading);

  return (
    <DropdownMenu>
      <Tooltip>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <AnimatePresence>
                {convexAuth.isLoading ? (
                  <motion.div
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Skeleton className="size-5 rounded-md" />
                  </motion.div>
                ) : convexAuth.isAuthenticated ? (
                  <motion.div
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="sr-only">Account</span>
                    <CircleUser />
                  </motion.div>
                ) : (
                  <motion.div
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="sr-only">Sign in</span>
                    <LogIn />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <TooltipContent>
          <div className="flex items-center gap-2">
            {convexAuth.isLoading
              ? "Loading..."
              : convexAuth.isAuthenticated
                ? "Account"
                : "Sign in"}
          </div>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent>
        <Authenticated>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              setLoading(true);
              await authClient.signOut();
              setLoading(false);
              toast.success("Signed out successfully!");
            }}
          >
            Sign out
          </DropdownMenuItem>
        </Authenticated>
        <Unauthenticated>
          <DropdownMenuItem>Google</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setLoading(true);
              authClient.signIn.social({ provider: "github" });
            }}
          >
            Github
          </DropdownMenuItem>
        </Unauthenticated>
        <AuthLoading>
          <DropdownMenuLabel>Loading</DropdownMenuLabel>
        </AuthLoading>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
