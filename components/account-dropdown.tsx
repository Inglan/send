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
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";

export function AccountDropdown() {
  return (
    <DropdownMenu>
      <Tooltip>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Authenticated>
                <span className="sr-only">Account</span>
                <CircleUser />
              </Authenticated>
              <Unauthenticated>
                <span className="sr-only">Sign in</span>
                <LogIn />
              </Unauthenticated>
              <AuthLoading>
                <Skeleton className="size-5 rounded-md" />
              </AuthLoading>
            </Button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <TooltipContent>
          <div className="flex items-center gap-2">Source code</div>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent>
        <Authenticated>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </Authenticated>
        <Unauthenticated>
          <DropdownMenuItem>Google</DropdownMenuItem>
          <DropdownMenuItem>Github</DropdownMenuItem>
        </Unauthenticated>
        <AuthLoading>
          <DropdownMenuLabel>Loading</DropdownMenuLabel>
        </AuthLoading>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
