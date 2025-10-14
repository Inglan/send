"use client";

import CodeInput from "@/components/code-input";
import { useAppState } from "@/lib/state";

export default function Home() {
  const sessionId = useAppState((state) => state.sessionId);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      {!sessionId && <CodeInput />}
    </div>
  );
}
