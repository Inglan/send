"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useState } from "react";

export default function CodeInput() {
  const [inputtedCode, setInputtedCode] = useState("");

  return (
    <InputOTP
      maxLength={4}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      value={inputtedCode}
      onChange={(value) => setInputtedCode(value.toUpperCase())}
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
