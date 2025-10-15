import { api } from "@/convex/_generated/api";
import { ReactMutation, useMutation } from "convex/react";
import { create } from "zustand";

interface AppState {
  sessionId: string;
  setSessionId: (id: string) => void;
  createSession: (
    text: string,
    createSessionMutation: ReactMutation<typeof api.sessions.createWithCode>,
  ) => Promise<void>;
  sendDialogOpen: boolean;
  setSendDialogOpen: (open: boolean) => void;
}

export const useAppState = create<AppState>((set) => ({
  sessionId: "",
  setSessionId: (id) => set({ sessionId: id }),
  createSession: async (text, createSessionMutation) => {
    const session = await createSessionMutation({ content: text });
    set({ sessionId: session.sessionId });
  },
  sendDialogOpen: false,
  setSendDialogOpen: (open) => set({ sendDialogOpen: open }),
}));
