"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/layout/Card";
import SuccessAnimation from "@/components/feedback/SuccessAnimation";
import { useBooking } from "@/hooks/useBooking";
import { artists, services } from "@/lib/mockData";

export default function BookingConfirmationClient() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id") ?? "";
  const { data: booking, loading, error } = useBooking(
    bookingId || undefined,
  );

  const artist = booking
    ? artists.find((item) => item.id === booking.artistId)
    : undefined;
  const service = booking
    ? services.find((item) => item.id === booking.serviceId)
    : undefined;

  return (
    <div className="space-y-6 px-5 py-6">
      {loading ? (
        <div className="space-y-4">
          <div className="h-28 rounded-[24px] shimmer" />
          <div className="h-24 rounded-[24px] shimmer" />
          <div className="h-12 rounded-[16px] shimmer" />
          <div className="h-12 rounded-[16px] shimmer" />
        </div>
      ) : error || !booking ? (
        <Card className="text-center text-sm text-[#6B6B6B]">
          Failed to load booking confirmation.
        </Card>
      ) : (
        <>
          <SuccessAnimation className="mx-auto h-28 w-28" />
          <div className="rounded-[24px] bg-[#0B0B0B] p-5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#C8A96A]">
              Booking ID
            </p>
            <p className="mt-2 text-xl font-semibold">{booking.id}</p>
            <p className="mt-3 text-sm text-white/80">
              {booking.date} · {booking.time} · {booking.location.label}
            </p>
          </div>
          <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#6B6B6B]">
              Artist
            </p>
            <p className="mt-2 font-semibold">{artist?.name ?? "Artist"}</p>
            <p className="text-sm text-[#6B6B6B]">
              {service?.name ?? "Service"}
            </p>
          </div>
          <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#6B6B6B]">
              Event Details
            </p>
            <div className="mt-2 space-y-1 text-sm text-[#6B6B6B]">
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <p>Location: {booking.location.label}</p>
            </div>
          </div>
          <div className="space-y-3">
            <Link href="/booking/review" className="block">
              <Button fullWidth>Share Post-Booking Review</Button>
            </Link>
            <Link href="/bookings" className="block">
              <Button fullWidth>View My Bookings</Button>
            </Link>
            <Link href="/home" className="block">
              <Button variant="secondary" fullWidth>
                Back to Home
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
