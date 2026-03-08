"use client";

import { useState } from "react";
import HeaderBar from "@/components/layout/HeaderBar";
import Card from "@/components/layout/Card";
import Button from "@/components/ui/Button";

export default function PostBookingReviewPage() {
  const [rating, setRating] = useState(5);

  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="Post-booking" subtitle="Share your experience" />
      <div className="space-y-6 px-5 py-6">
        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
            Upload
          </p>
          <p className="mt-3 font-[family:var(--font-display)] text-2xl text-[#0B0B0B]">
            Before & after photos
          </p>
          <div className="mt-4 grid gap-3">
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-[14px] border border-[#E7DED0] bg-[#F7F3EF] p-3 text-sm text-[#0B0B0B]"
            />
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-[14px] border border-[#E7DED0] bg-[#F7F3EF] p-3 text-sm text-[#0B0B0B]"
            />
          </div>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
            Products used
          </p>
          <textarea
            placeholder="List the products used (optional)"
            rows={4}
            className="mt-4 w-full rounded-[14px] border border-[#E7DED0] bg-[#F7F3EF] p-3 text-sm text-[#0B0B0B]"
          />
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
            Rating
          </p>
          <div className="mt-4 flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => {
              const value = index + 1;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`text-2xl ${
                    value <= rating ? "text-[#C8A96A]" : "text-[#E7DED0]"
                  }`}
                >
                  ★
                </button>
              );
            })}
          </div>
        </Card>
        <Button fullWidth>Submit Review</Button>
      </div>
    </div>
  );
}
