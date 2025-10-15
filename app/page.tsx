"use client";

import CodeInput from "@/components/code-input";
import ContentDisplay from "@/components/content-display";
import { useAppState } from "@/lib/state";

export default function Home() {
  const sessionId = useAppState((state) => state.sessionId);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {sessionId ? <ContentDisplay /> : <CodeInput />}
    </div>
  );
}
