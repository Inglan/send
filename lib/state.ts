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
  sendDrawerOpen: boolean;
  setSendDrawerOpen: (open: boolean) => void;
  settingsDrawerOpen: boolean;
  setSettingsDrawerOpen: (open: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useAppState = create<AppState>((set) => ({
  sessionId: "",
  setSessionId: (id) => set({ sessionId: id }),
  createSession: async (text, createSessionMutation) => {
    const session = await createSessionMutation({ content: text });
    set({ sessionId: session.sessionId });
  },
  sendDrawerOpen: false,
  setSendDrawerOpen: (open) => set({ sendDrawerOpen: open }),
  settingsDrawerOpen: false,
  setSettingsDrawerOpen: (open) => set({ settingsDrawerOpen: open }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
