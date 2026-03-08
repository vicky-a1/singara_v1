"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BrandHeader from "@/components/layout/BrandHeader";
import Card from "@/components/layout/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LoadingAnimation from "@/components/feedback/LoadingAnimation";
import { ArtistApplication, ArtistStatus } from "@/types/marketplace";

export default function ArtistLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(
    Array.from({ length: 6 }).map(() => ""),
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const otp = useMemo(() => otpDigits.join(""), [otpDigits]);

  const handleOtpChange = (index: number, value: string) => {
    const nextValue = value.replace(/\D/g, "").slice(0, 1);
    setOtpDigits((prev) => {
      const next = [...prev];
      next[index] = nextValue;
      return next;
    });
  };

  const handleLogin = async () => {
    if (otp.length < 6 || !phone) {
      setMessage("Enter your phone number and OTP.");
      return;
    }
    setLoading(true);
    setMessage(null);

    const response = await fetch(`/api/artist-application?phone=${phone}`);
    const data = (await response.json()) as {
      application: ArtistApplication | null;
    };
    const status = data.application?.status ?? ArtistStatus.Pending;
    localStorage.setItem("artist_status", status);

    if (status === ArtistStatus.Approved) {
      router.push("/artist/dashboard");
      return;
    }

    if (status === ArtistStatus.Rejected) {
      setMessage("Your application was not approved.");
    } else {
      setMessage("Your application is under review.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <BrandHeader variant="auth" />
      <div className="mx-auto max-w-md space-y-6 px-5 py-8">
        <Card className="space-y-4">
          <p className="font-[family:var(--font-display)] text-2xl text-[#0B0B0B]">
            Artist Login
          </p>
          <Input
            label="Phone Number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <div className="grid grid-cols-6 gap-2">
            {otpDigits.map((digit, index) => (
              <input
                key={`otp-${index}`}
                value={digit}
                onChange={(event) => handleOtpChange(index, event.target.value)}
                className="h-12 rounded-[14px] border border-[#E7DED0] bg-white text-center text-lg font-semibold text-[#0B0B0B] outline-none focus:border-[#C8A96A]"
              />
            ))}
          </div>
          {message ? (
            <p className="text-sm text-[#6B6B6B]">{message}</p>
          ) : null}
          <Button fullWidth onClick={handleLogin} disabled={loading}>
            {loading ? "Checking..." : "Continue"}
          </Button>
        </Card>
        {loading ? (
          <div className="flex flex-col items-center">
            <LoadingAnimation className="h-20 w-20" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
