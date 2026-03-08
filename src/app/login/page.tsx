"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BrandHeader from "@/components/layout/BrandHeader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [otpDigits, setOtpDigits] = useState<string[]>(
    Array.from({ length: 6 }).map(() => ""),
  );
  const [error, setError] = useState<string | null>(null);

  const otp = useMemo(() => otpDigits.join(""), [otpDigits]);

  const handleOtpChange = (index: number, value: string) => {
    const nextValue = value.replace(/\D/g, "").slice(0, 1);
    setOtpDigits((prev) => {
      const next = [...prev];
      next[index] = nextValue;
      return next;
    });
    if (error) {
      setError(null);
    }
  };

  const handleLogin = () => {
    if (otp === "123456") {
      router.push("/home");
      return;
    }
    setError("Invalid OTP");
  };

  return (
    <div className="min-h-screen bg-[#F7F3EF] text-[#0B0B0B]">
      <BrandHeader variant="auth" />
      <div className="mx-auto flex max-w-[420px] flex-col gap-10 px-6 py-10">
        <div className="space-y-6 rounded-[24px] bg-white p-6 text-[#0B0B0B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <p className="font-[family:var(--font-display)] text-2xl">
            Welcome back
          </p>
          <Input label="Phone or Email" placeholder="+91 90000 00000" />
          <div className="grid grid-cols-6 gap-2">
            {otpDigits.map((digit, index) => (
              <input
                key={`otp-${index}`}
                value={digit}
                onChange={(event) =>
                  handleOtpChange(index, event.target.value)
                }
                inputMode="numeric"
                type="text"
                maxLength={1}
                aria-label={`OTP digit ${index + 1}`}
                className="h-12 w-full rounded-[14px] border border-[#E7DED0] bg-white text-center text-sm font-semibold text-[#0B0B0B] outline-none focus:border-[#C8A96A]"
              />
            ))}
          </div>
          {error ? (
            <p className="text-sm text-[#B23B3B]">{error}</p>
          ) : null}
          <Button fullWidth onClick={handleLogin}>
            Continue
          </Button>
          {/* TODO: replace with real OTP authentication before production */}
        </div>
      </div>
    </div>
  );
}
