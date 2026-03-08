"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Card from "@/components/layout/Card";
import LoadingAnimation from "@/components/feedback/LoadingAnimation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useArtist } from "@/hooks/useArtist";
import { createBooking } from "@/services/bookingService";
import { Booking, BookingStatus, MoneyAmount } from "@/types/marketplace";
import {
  CalendarCheck,
  CircleWavyCheck,
  LockKey,
  ShieldCheck,
} from "phosphor-react";

const money = (amount: number): MoneyAmount => ({
  amount,
  currency: "INR",
  display: `₹${amount.toLocaleString("en-IN")}`,
});

export default function BookingClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const artistId =
    searchParams.get("artistId") ?? searchParams.get("artist") ?? "";
  const serviceId = searchParams.get("serviceId") ?? "";

  const { data: artist, loading, error } = useArtist(artistId || undefined);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const service =
    artist?.services.find((item) => item.id === serviceId) ??
    artist?.services[0];
  const price = service?.price.amount ?? 0;
  const platformFeeAmount = Math.round(price * 0.15);
  const totalAmount = price + platformFeeAmount;

  async function handleBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!artist || !service || !date || !time || !location) {
      return;
    }

    setSubmitting(true);

    try {
      const booking: Booking = {
        id: crypto.randomUUID(),
        customerId: "mockCustomer",
        artistId: artist.id,
        serviceId: service.id,
        date,
        time,
        location: {
          label: location,
          addressLine1: location,
          city: location,
          country: "India",
        },
        totalPrice: money(totalAmount),
        platformFee: money(platformFeeAmount),
        status: BookingStatus.Pending,
        createdAt: new Date().toISOString(),
      };

      await createBooking(booking);
      router.push("/booking/confirm");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6 px-5 py-6">
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <LoadingAnimation className="h-24 w-24" />
        </div>
      ) : error || !artist ? (
        <Card className="text-center text-sm text-[#6B6B6B]">
          Failed to load artist.
        </Card>
      ) : !service ? (
        <Card className="text-center text-sm text-[#6B6B6B]">
          Selected service not found.
        </Card>
      ) : (
        <>
          <Card className="space-y-2">
            <div className="text-lg font-semibold">{artist.name}</div>
            <div className="text-sm text-[#6B6B6B]">{service.name}</div>
          </Card>
          <Card className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
              Price breakdown
            </p>
            <div className="flex justify-between text-sm">
              <span>Service</span>
              <span>{service.price.display}</span>
            </div>
            <div className="flex justify-between text-sm text-[#6B6B6B]">
              <span>Platform fee</span>
              <span>{money(platformFeeAmount).display}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total amount</span>
              <span>{money(totalAmount).display}</span>
            </div>
          </Card>
          <Card className="space-y-3 text-sm text-[#6B6B6B]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
              Booking protection
            </p>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <LockKey className="h-6 w-6 text-[#C8A96A]" weight="thin" />
                Secure escrow payment
              </span>
              <span className="text-[#0B0B0B]">Protected checkout</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-[#C8A96A]" weight="thin" />
                Verified artist
              </span>
              <span className="text-[#0B0B0B]">Background checked</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CircleWavyCheck
                  className="h-6 w-6 text-[#C8A96A]"
                  weight="thin"
                />
                Secure bookings
              </span>
              <span className="text-[#0B0B0B]">Escrow-backed payouts</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CalendarCheck className="h-6 w-6 text-[#C8A96A]" weight="thin" />
                Free reschedule
              </span>
              <span className="text-[#0B0B0B]">Up to 24 hours</span>
            </div>
          </Card>
          <form onSubmit={handleBooking} className="space-y-4">
            <Input
              label="Event Date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
            <Input
              label="Event Time"
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              required
            />
            <Input
              label="Location"
              placeholder="Event Location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              required
            />
            <Button type="submit" fullWidth disabled={submitting}>
              {submitting ? "Booking..." : "Confirm Booking"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
