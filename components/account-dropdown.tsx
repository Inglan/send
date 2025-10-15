"use client";

import { Button } from "@/components/ui/button";

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
  useQuery,
} from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  motion,
  AnimatePresence,
  TargetAndTransition,
  VariantLabels,
} from "motion/react";
import { useAppState } from "@/lib/state";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { CircleUser, LogIn } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

export function AccountDropdown() {
  const convexAuth = useConvexAuth();
  const setLoading = useAppState((state) => state.setLoading);
  const loading = useAppState((state) => state.loading);
  const user = useQuery(api.auth.getCurrentUser);

  const hidden: TargetAndTransition | VariantLabels | undefined = {
    opacity: 0,
    scale: 0.7,
  };
  const visible: TargetAndTransition | VariantLabels | undefined = {
    opacity: 1,
    scale: 1,
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <AnimatePresence>
                {convexAuth.isLoading ? (
                  <motion.div
                    key="loading"
                    className="absolute"
                    exit={hidden}
                    initial={hidden}
                    animate={visible}
                  >
                    <Skeleton className="size-5 rounded-md" />
                  </motion.div>
                ) : convexAuth.isAuthenticated && !user?.isAnonymous ? (
                  <motion.div
                    key="user"
                    className="absolute"
                    exit={hidden}
                    initial={hidden}
                    animate={visible}
                  >
                    <span className="sr-only">Account</span>
                    <CircleUser />
                  </motion.div>
                ) : (
                  <motion.div
                    key="signin"
                    className="absolute"
                    exit={hidden}
                    initial={hidden}
                    animate={visible}
                  >
                    <span className="sr-only">Sign in</span>
                    <LogIn />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        {!loading && (
          <TooltipContent>
            <div className="flex items-center gap-2">
              {convexAuth.isLoading
                ? "Loading..."
                : convexAuth.isAuthenticated
                  ? "Account"
                  : "Sign in"}
            </div>
          </TooltipContent>
        )}
      </Tooltip>
      <DropdownMenuContent>
        <Authenticated>
          <UserMenu />
        </Authenticated>
        <AuthLoading>
          <DropdownMenuLabel>Loading</DropdownMenuLabel>
        </AuthLoading>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenu() {
  const user = useQuery(api.auth.getCurrentUser);
  const setLoading = useAppState((state) => state.setLoading);
  const { signIn, signOut } = useAuthActions();

  return (
    <>
      {user?.isAnonymous ? (
        <>
          <DropdownMenuItem>Google</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setLoading(true);
              void signIn("github");
            }}
          >
            Github
          </DropdownMenuItem>
        </>
      ) : (
        <>
          <DropdownMenuLabel>
            {user?.name}
            <br />
            <span className="text-xs">{user?.email}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              setLoading(true);
              await signOut();
              setLoading(false);
              toast.success("Signed out successfully!");
            }}
          >
            Sign out
          </DropdownMenuItem>
        </>
      )}
    </>
  );
}
