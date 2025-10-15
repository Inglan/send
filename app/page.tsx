"use client";

import CodeInput from "@/components/code-input";
import ContentDisplay from "@/components/content-display";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/lib/state";
import { Code, Send, Settings } from "lucide-react";

export default function Home() {
  const sessionId = useAppState((state) => state.sessionId);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-card w-full p-3">
        <div className="container mx-auto flex flex-row gap-2">
          <div className="text-xl">send</div>
          <div className="grow"></div>
          <Button variant="ghost">
            <Code /> Source Code
          </Button>
          <Button variant="ghost">
            <Settings /> Settings
          </Button>
          <Button>
            <Send /> Send
          </Button>
        </div>
      </div>
    </div>
  );
}
