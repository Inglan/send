import { useAppState } from "@/lib/state";
import { Button } from "@/components/ui/button";
import { Code, Send, Settings } from "lucide-react";

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
        <Button variant="ghost">
          <Code /> Source Code
        </Button>
        <Button variant="ghost" onClick={() => setSettingsDrawerOpen(true)}>
          <Settings /> Settings
        </Button>
        <Button onClick={() => setSendDrawerOpen(true)}>
          <Send /> Send
        </Button>
      </div>
    </div>
  );
}
