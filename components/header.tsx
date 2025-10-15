import { useAppState } from "@/lib/state";
import { Button } from "@/components/ui/button";
import { CircleUser, Code, LogIn, Send, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
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
import { AccountDropdown } from "./account-dropdown";
import Link from "next/link";

export function Header() {
  const setSendDrawerOpen = useAppState((state) => state.setSendDrawerOpen);
  const setSettingsDrawerOpen = useAppState(
    (state) => state.setSettingsDrawerOpen,
  );

  return (
    <div className="w-full p-2">
      <div className="container mx-auto flex flex-row gap-2 items-center p-2 bg-card rounded-lg">
        <div className="px-2 text-xl">Send</div>
        <div className="grow"></div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/Inglan/send"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Source code</span>
                <Code />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-2">Source code</div>
          </TooltipContent>
        </Tooltip>
        <AccountDropdown />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              onClick={() => setSettingsDrawerOpen(true)}
              size="icon"
            >
              <span className="sr-only">Settings</span>
              <Settings />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-2">
              Settings
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>,</Kbd>
              </KbdGroup>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" onClick={() => setSendDrawerOpen(true)}>
              <Send /> Send
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-2">
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>Enter</Kbd>
              </KbdGroup>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
