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
  const open = useAppState((state) => state.sendDialogOpen);
  const setOpen = useAppState((state) => state.setSendDialogOpen);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
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
