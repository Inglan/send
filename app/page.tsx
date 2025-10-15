"use client";

import CodeInput from "@/components/code-input";
import { Header } from "@/components/header";
import { useAppState } from "@/lib/state";

export default function Home() {
  const sessionId = useAppState((state) => state.sessionId);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <CodeInput />
      </div>
    </div>
  );
}
