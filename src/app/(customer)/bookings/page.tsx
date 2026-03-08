"use client";

import Link from "next/link";
import BookingCard from "@/components/cards/BookingCard";
import HeaderBar from "@/components/layout/HeaderBar";
import { useBookings } from "@/hooks/useBookings";
import { artists, services } from "@/lib/mockData";

const isPastStatus = (status: string) =>
  status === "completed" || status === "cancelled";

export default function MyBookingsPage() {
  const { data, loading, error } = useBookings({ customerId: "mockCustomer" });

  const upcoming = data.filter((booking) => !isPastStatus(booking.status));
  const past = data.filter((booking) => isPastStatus(booking.status));

  const renderBooking = (bookingId: string, date: string, time: string) =>
    `${date} • ${time}`;

  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="My Bookings" subtitle="Upcoming and past" />
      <div className="space-y-8 px-5 py-6">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`booking-skeleton-${index}`}
                className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              >
                <div className="h-4 w-32 rounded shimmer" />
                <div className="mt-3 h-4 w-48 rounded shimmer" />
                <div className="mt-3 h-4 w-24 rounded shimmer" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 text-sm text-[#6B6B6B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            {error}
          </div>
        ) : data.length === 0 ? (
          <div className="rounded-[24px] border border-[#E7DED0] bg-white p-6 text-center text-sm text-[#6B6B6B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            No bookings yet. Start exploring artists to book your next look.
          </div>
        ) : (
          <>
            <section className="space-y-4">
              <p className="font-[family:var(--font-display)] text-2xl text-[#0B0B0B]">
                Upcoming bookings
              </p>
              {upcoming.length === 0 ? (
                <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 text-sm text-[#6B6B6B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                  No upcoming bookings.
                </div>
              ) : (
                <div className="space-y-4">
                  {upcoming.map((booking) => {
                    const artist =
                      artists.find((item) => item.id === booking.artistId) ??
                      null;
                    const service =
                      services.find((item) => item.id === booking.serviceId) ??
                      null;

                    return (
                      <Link
                        key={booking.id}
                        href={`/bookings/${booking.id}`}
                        className="block"
                      >
                        <BookingCard
                          artist={artist?.name ?? "Artist"}
                          date={booking.date}
                          time={booking.time}
                          status={booking.status}
                        />
                        <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 text-sm text-[#6B6B6B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                          <p className="font-semibold text-[#0B0B0B]">
                            {service?.name ?? "Service"}
                          </p>
                          <p className="mt-2">
                            {renderBooking(booking.id, booking.date, booking.time)}
                          </p>
                          <p>{booking.location.label}</p>
                          <p className="mt-2 font-semibold text-[#0B0B0B]">
                            Total {booking.totalPrice.display}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </section>
            <section className="space-y-4">
              <p className="font-[family:var(--font-display)] text-2xl text-[#0B0B0B]">
                Past bookings
              </p>
              {past.length === 0 ? (
                <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 text-sm text-[#6B6B6B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                  No past bookings yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {past.map((booking) => {
                    const artist =
                      artists.find((item) => item.id === booking.artistId) ??
                      null;
                    const service =
                      services.find((item) => item.id === booking.serviceId) ??
                      null;

                    return (
                      <Link
                        key={booking.id}
                        href={`/bookings/${booking.id}`}
                        className="block"
                      >
                        <BookingCard
                          artist={artist?.name ?? "Artist"}
                          date={booking.date}
                          time={booking.time}
                          status={booking.status}
                        />
                        <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 text-sm text-[#6B6B6B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                          <p className="font-semibold text-[#0B0B0B]">
                            {service?.name ?? "Service"}
                          </p>
                          <p className="mt-2">
                            {renderBooking(booking.id, booking.date, booking.time)}
                          </p>
                          <p>{booking.location.label}</p>
                          <p className="mt-2 font-semibold text-[#0B0B0B]">
                            Total {booking.totalPrice.display}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
