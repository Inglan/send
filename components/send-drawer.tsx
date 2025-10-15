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

export function SendDrawer() {
  const open = useAppState((state) => state.sendDrawerOpen);
  const setOpen = useAppState((state) => state.setSendDrawerOpen);

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={true}>
      <DrawerContent className="h-full">
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
