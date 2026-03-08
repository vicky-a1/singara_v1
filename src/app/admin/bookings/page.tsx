"use client";

import Link from "next/link";
import { useState } from "react";
import HeaderBar from "@/components/layout/HeaderBar";
import { StatusPill } from "@/components/ui/Badges";
import { useBookings } from "@/hooks/useBookings";
import { artists, services } from "@/lib/mockData";

const filters = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const customerNames: Record<string, string> = {
  "cust-1": "Rhea Kapoor",
  "cust-2": "Neha Varma",
  "cust-3": "Tara Singh",
  "cust-4": "Asha Rao",
  "cust-5": "Zara Ali",
  "cust-6": "Divya R",
  "cust-7": "Lina D",
  "cust-8": "Ritika Jain",
  "cust-9": "Ira B",
  "cust-10": "Maya K",
};

type FilterValue =
  | "all"
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export default function BookingManagementPage() {
  const { data, loading, error } = useBookings({ all: true });
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const filtered =
    activeFilter === "all"
      ? data
      : data.filter((booking) => booking.status === activeFilter);

  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <HeaderBar title="Bookings" subtitle="Manage all bookings" />
      <div className="space-y-6 px-5 py-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = filter.value === activeFilter;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value as FilterValue)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition shadow-[0_10px_30px_rgba(0,0,0,0.08)] ${
                  isActive
                    ? "border-[#C8A96A] bg-[#0B0B0B] text-white"
                    : "border-[#E7DED0] bg-white text-[#6B6B6B]"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`booking-admin-skeleton-${index}`}
                className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              >
                <div className="h-4 w-40 rounded shimmer" />
                <div className="mt-3 h-4 w-64 rounded shimmer" />
                <div className="mt-3 h-4 w-32 rounded shimmer" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 text-sm text-[#6B6B6B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-[24px] border border-[#E7DED0] bg-white p-6 text-center text-sm text-[#6B6B6B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            No bookings match this filter.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((booking) => {
              const customerName =
                customerNames[booking.customerId] ?? "Customer";
              const artist =
                artists.find((item) => item.id === booking.artistId) ?? null;
              const service =
                services.find((item) => item.id === booking.serviceId) ?? null;

              return (
                <Link
                  key={booking.id}
                  href={`/bookings/${booking.id}`}
                  className="block"
                >
                  <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{booking.id}</p>
                      <StatusPill label={booking.status} tone={booking.status} />
                    </div>
                    <div className="mt-3 grid gap-3 text-sm text-[#6B6B6B] sm:grid-cols-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em]">
                          Customer
                        </p>
                        <p className="mt-1 text-[#0B0B0B]">{customerName}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em]">
                          Artist
                        </p>
                        <p className="mt-1 text-[#0B0B0B]">
                          {artist?.name ?? "Artist"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em]">
                          Service
                        </p>
                        <p className="mt-1 text-[#0B0B0B]">
                          {service?.name ?? "Service"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em]">
                          Event
                        </p>
                        <p className="mt-1 text-[#0B0B0B]">
                          {booking.date} · {booking.time}
                        </p>
                        <p className="text-[#6B6B6B]">
                          {booking.location.label}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-[#6B6B6B]">Total</span>
                      <span className="font-semibold text-[#0B0B0B]">
                        {booking.totalPrice.display}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
