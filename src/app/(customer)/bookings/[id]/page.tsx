"use client";

import { useParams } from "next/navigation";
import HeaderBar from "@/components/layout/HeaderBar";
import { StatusPill } from "@/components/ui/Badges";
import ContactArtistButton from "@/components/actions/ContactArtistButton";
import Button from "@/components/ui/Button";
import Card from "@/components/layout/Card";
import { useBooking } from "@/hooks/useBooking";
import { artists, services } from "@/lib/mockData";

export default function BookingDetailPage() {
  const params = useParams();
  const bookingId =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : undefined;
  const { data: booking, loading, error } = useBooking(bookingId);

  const artist = booking
    ? artists.find((item) => item.id === booking.artistId)
    : undefined;
  const service = booking
    ? services.find((item) => item.id === booking.serviceId)
    : undefined;

  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="Booking Detail" subtitle={bookingId ?? "Booking"} />
      <div className="space-y-6 px-5 py-6">
        {loading ? (
          <div className="space-y-4">
            <div className="h-24 rounded-[24px] shimmer" />
            <div className="h-24 rounded-[24px] shimmer" />
            <div className="h-12 rounded-[16px] shimmer" />
            <div className="h-12 rounded-[16px] shimmer" />
          </div>
        ) : error || !booking ? (
          <Card className="text-center text-sm text-[#6B6B6B]">
            Failed to load booking details.
          </Card>
        ) : (
          <>
            <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{artist?.name ?? "Artist"}</p>
                <StatusPill label={booking.status} tone={booking.status} />
              </div>
              <p className="mt-2 text-sm text-[#6B6B6B]">
                {booking.date} · {booking.time}
              </p>
              <p className="text-sm text-[#6B6B6B]">
                {booking.location.label}
              </p>
            </div>
            <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 text-sm text-[#6B6B6B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <p className="text-xs uppercase tracking-[0.2em]">Service</p>
              <p className="mt-2 text-base font-semibold text-[#0B0B0B]">
                {service?.name ?? "Service"}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span>Service price</span>
                <span>{booking.totalPrice.display}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span>Platform fee</span>
                <span>{booking.platformFee.display}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-base font-semibold text-[#0B0B0B]">
                <span>Total</span>
                <span>{booking.totalPrice.display}</span>
              </div>
            </div>
            <div className="rounded-[24px] bg-[#0B0B0B] p-5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <p className="text-sm uppercase tracking-[0.3em] text-[#C8A96A]">
                Event
              </p>
              <p className="mt-2 text-sm text-white/80">
                {booking.date} · {booking.time}
              </p>
              <p className="text-sm text-white/70">
                {booking.location.label}
              </p>
            </div>
            <ContactArtistButton />
            <Button variant="secondary" fullWidth>
              Cancel Booking
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
