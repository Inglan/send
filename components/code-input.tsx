"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { api } from "@/convex/_generated/api";
import { useAppState } from "@/lib/state";
import { useMutation } from "convex/react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useState } from "react";
import { toast } from "sonner";

export default function CodeInput() {
  const getSessionId = useMutation(api.sessions.retrieveSessionByCode);
  const createSessionMutation = useMutation(api.sessions.createWithCode);

  const [inputtedCode, setInputtedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const setSessionId = useAppState((state) => state.setSessionId);
  const createSession = useAppState((state) => state.createSession);

  return (
    <InputOTP
      disabled={loading}
      autoFocus
      maxLength={4}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      value={inputtedCode}
      onPaste={(e) => {
        const clipboardData = e.clipboardData.getData("text");

        if (!(clipboardData.length === 4)) {
          e.preventDefault();
          setLoading(true);
          toast.promise(createSession(clipboardData, createSessionMutation), {
            loading: "Loading...",
            error: "Something went wrong",
          });
        }
      }}
      onChange={async (value) => {
        setInputtedCode(value.toUpperCase());
        if (value.length === 4) {
          toast.promise(
            new Promise<void>((resolve: () => void, reject: () => void) => {
              setLoading(true);
              getSessionId({ code: value.toUpperCase() })
                .then((session) => {
                  setSessionId(session.sessionId);
                  setInputtedCode("");
                  resolve();
                })
                .catch(() => {
                  reject();
                })
                .finally(() => {
                  setLoading(false);
                });
            }),
            {
              loading: "Loading...",
              success: "Code found",
              error: "Code not found",
            },
          );
        }
      }}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  );
}
