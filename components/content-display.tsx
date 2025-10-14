"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAppState } from "@/lib/state";
import { useQuery } from "convex/react";
import { useState } from "react";

export default function ContentDisplay() {
  const sessionId = useAppState((state) => state.sessionId);
  const content = useQuery(api.sessions.getContent, {
    id: sessionId as Id<"sessions">,
  });

  return (
    <div>
      {content ? (
        <div>
          <p>{content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
