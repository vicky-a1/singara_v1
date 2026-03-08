"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useBookings } from "@/hooks/useBookings";

const slots = [
  { label: "9 AM", value: "09:00" },
  { label: "11 AM", value: "11:00" },
  { label: "2 PM", value: "14:00" },
  { label: "4 PM", value: "16:00" },
  { label: "6 PM", value: "18:00" },
];

const formatDateKey = (date: Date) =>
  date.toISOString().split("T")[0] ?? "";

const formatDayLabel = (date: Date) =>
  date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

export default function AvailabilityClient() {
  const searchParams = useSearchParams();
  const artistId = searchParams.get("artistId") ?? "artist-1";
  const { data, loading, error } = useBookings({ artistId });
  const [availability, setAvailability] = useState<Record<string, boolean>>({});

  const weekDays = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      return { key: formatDateKey(date), label: formatDayLabel(date) };
    });
  }, []);

  const bookedSlots = useMemo(() => {
    const booked = new Set<string>();
    data.forEach((booking) => {
      booked.add(`${booking.date}|${booking.time}`);
    });
    return booked;
  }, [data]);

  const handleToggle = (dateKey: string, timeValue: string) => {
    const slotKey = `${dateKey}|${timeValue}`;
    if (bookedSlots.has(slotKey)) {
      return;
    }
    setAvailability((prev) => ({
      ...prev,
      [slotKey]: !(prev[slotKey] ?? true),
    }));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`availability-skeleton-${index}`}
            className="h-28 rounded-[24px] shimmer"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 text-sm text-[#6B6B6B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {weekDays.map((day) => (
        <div
          key={day.key}
          className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.3em] text-[#6B6B6B]">
              {day.label}
            </p>
            <span className="text-xs text-[#6B6B6B]">Tap to toggle</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {slots.map((slot) => {
              const slotKey = `${day.key}|${slot.value}`;
              const isBooked = bookedSlots.has(slotKey);
              const isAvailable = availability[slotKey] ?? true;
              const label = isBooked
                ? "Booked"
                : isAvailable
                  ? "Available"
                  : "Unavailable";

              return (
                <button
                  key={slotKey}
                  type="button"
                  disabled={isBooked}
                  onClick={() => handleToggle(day.key, slot.value)}
                  className={`flex flex-col items-start gap-1 rounded-[16px] border px-3 py-2 text-left text-xs font-semibold transition ${
                    isBooked
                      ? "border-[#E7DED0] bg-[#F4EFE6] text-[#9B9388]"
                      : isAvailable
                        ? "border-[#C8A96A] bg-[#0B0B0B] text-white"
                        : "border-[#E7DED0] bg-white text-[#6B6B6B]"
                  }`}
                >
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#C8A96A]">
                    {slot.label}
                  </span>
                  <span className="text-[11px]">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
