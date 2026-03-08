"use client";

import Image from "next/image";
import HeaderBar from "@/components/layout/HeaderBar";
import Button from "@/components/ui/Button";
import {
  CalendarBlank,
  CreditCard,
  Gear,
  Heart,
  Question,
  Sparkle,
} from "phosphor-react";

export default function CustomerProfilePage() {
  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="Profile" subtitle="Luxury member" />
      <div className="space-y-6 px-5 py-6">
        <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-[#0B0B0B]/10">
              <Image
                src="/images/beauty/bridal-1.jpg"
                alt="Rhea Kapoor"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-[family:var(--font-display)] text-xl text-[#0B0B0B]">
                Rhea Kapoor
              </p>
              <p className="text-sm text-[#6B6B6B]">rhea@singara.com</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { label: "My bookings", icon: CalendarBlank },
              { label: "Saved artists", icon: Heart },
              { label: "Beauty profile", icon: Sparkle },
              { label: "Payments", icon: CreditCard },
              { label: "Settings", icon: Gear },
              { label: "Help", icon: Question },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                className="flex items-center gap-3 rounded-[16px] border border-[#E7DED0] bg-[#F7F3EF] px-4 py-3 text-sm font-semibold text-[#0B0B0B] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.16)]"
              >
                <item.icon className="h-6 w-6 text-[#C8A96A]" weight="thin" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <p className="text-xs uppercase tracking-[0.35em] text-[#C8A96A]">
            Preferences
          </p>
          <p className="mt-3 text-sm text-[#0B0B0B]">Skin Tone: Warm</p>
          <p className="text-sm text-[#0B0B0B]">Style: Soft glam</p>
        </div>
        <Button fullWidth>Manage Payments</Button>
      </div>
    </div>
  );
}
