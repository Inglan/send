"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { api } from "@/convex/_generated/api";
import { CODE_LENGTH } from "@/lib/constants";
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
      maxLength={CODE_LENGTH}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      value={inputtedCode}
      onPaste={(e) => {
        const clipboardData = e.clipboardData.getData("text");

        if (!(clipboardData.length === CODE_LENGTH)) {
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
        if (value.length === CODE_LENGTH) {
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
        {Array(CODE_LENGTH)
          .fill(null)
          .map((_, index) => (
            <InputOTPSlot
              className="size-12 text-2xl"
              key={index}
              index={index}
            />
          ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
