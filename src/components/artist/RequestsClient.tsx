"use client";

import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import BookingCard from "@/components/cards/BookingCard";
import { useBookings } from "@/hooks/useBookings";
import { services } from "@/lib/mockData";

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

export default function RequestsClient() {
  const searchParams = useSearchParams();
  const artistId = searchParams.get("artistId") ?? "artist-1";
  const { data, loading, error } = useBookings({ artistId });

  const requests = data.filter((booking) => booking.status === "pending");

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={`request-skeleton-${index}`} className="space-y-3">
            <div className="h-20 rounded-[24px] shimmer" />
            <div className="h-16 rounded-[24px] shimmer" />
          </div>
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

  if (requests.length === 0) {
    return (
      <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 text-sm text-[#6B6B6B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        No booking requests yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((booking) => {
        const customerName = customerNames[booking.customerId] ?? "Client";
        const service = services.find((item) => item.id === booking.serviceId);

        return (
          <div key={booking.id} className="space-y-3">
            <BookingCard
              artist={customerName}
              date={booking.date}
              time={booking.time}
              status={booking.status}
            />
            <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 text-sm text-[#6B6B6B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between">
                <span>Service</span>
                <span className="text-[#0B0B0B]">
                  {service?.name ?? "Service"}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span>Location</span>
                <span>{booking.location.label}</span>
              </div>
              <div className="mt-2 flex items-center justify-between font-semibold text-[#0B0B0B]">
                <span>Total</span>
                <span>{booking.totalPrice.display}</span>
              </div>
              <div className="mt-4 flex gap-3">
                <Button variant="secondary" fullWidth>
                  Decline Booking
                </Button>
                <Button fullWidth>Accept Booking</Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
