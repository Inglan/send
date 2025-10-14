import { create } from "zustand";

interface AppState {
  sessionId: string;
  setSessionId: (id: string) => void;
}

export const useAppState = create<AppState>((set) => ({
  sessionId: "",
  setSessionId: (id: string) => set({ sessionId: id }),
}));
