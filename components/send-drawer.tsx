"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAppState } from "@/lib/state";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Kbd, KbdGroup } from "./ui/kbd";

export function SendDrawer() {
  const open = useAppState((state) => state.sendDrawerOpen);
  const setOpen = useAppState((state) => state.setSendDrawerOpen);

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={true}>
      <DrawerContent className="h-full">
        <DrawerHeader>
          <DrawerTitle>Send</DrawerTitle>
        </DrawerHeader>
        <div className="h-full w-full p-2">
          <Textarea className="h-full max-w-2xl mx-auto" />
        </div>
        <DrawerFooter className="flex flex-row justify-end max-w-2xl mx-auto w-full">
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
          <Button variant="outline">
            Send{" "}
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>⏎</Kbd>
            </KbdGroup>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
