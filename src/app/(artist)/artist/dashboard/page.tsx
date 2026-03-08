import HeaderBar from "@/components/layout/HeaderBar";
import KpiCard from "@/components/cards/KpiCard";
import BookingCard from "@/components/cards/BookingCard";
import Card from "@/components/layout/Card";
import PortfolioGrid from "@/components/gallery/PortfolioGrid";
import Button from "@/components/ui/Button";
import { portfolioImages } from "@/lib/mockData";

export default function ArtistDashboardPage() {
  const todayBookings = [
    { id: "SNGR-3001", name: "Rhea Kapoor", time: "10:00 AM" },
    { id: "SNGR-3004", name: "Asha Rao", time: "2:00 PM" },
  ];

  const pendingRequests = [
    { id: "SNGR-3012", name: "Maya K", time: "4:30 PM" },
    { id: "SNGR-3013", name: "Tara Singh", time: "7:00 PM" },
  ];

  const portfolioPreview = portfolioImages.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="Artist Dashboard" subtitle="Today overview" />
      <div className="space-y-8 px-5 py-6">
        <div className="grid grid-cols-2 gap-3">
          <KpiCard label="Revenue" value="₹1.2L" hint="This month" />
          <KpiCard label="Pending" value="8" hint="Requests" />
        </div>

        <section className="space-y-3">
          <p className="font-[family:var(--font-display)] text-2xl text-[#0B0B0B]">
            Today bookings
          </p>
          <div className="space-y-3">
            {todayBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                artist={booking.name}
                date="Today"
                time={booking.time}
                status="confirmed"
              />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <p className="font-[family:var(--font-display)] text-2xl text-[#0B0B0B]">
            Pending requests
          </p>
          <div className="space-y-3">
            {pendingRequests.map((booking) => (
              <BookingCard
                key={booking.id}
                artist={booking.name}
                date="Awaiting"
                time={booking.time}
                status="pending"
              />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <p className="font-[family:var(--font-display)] text-2xl text-[#0B0B0B]">
            Revenue summary
          </p>
          <Card className="grid grid-cols-2 gap-4 text-sm text-[#6B6B6B]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em]">Today</p>
              <p className="mt-1 text-lg font-semibold text-[#0B0B0B]">
                ₹18,500
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em]">This week</p>
              <p className="mt-1 text-lg font-semibold text-[#0B0B0B]">
                ₹74,200
              </p>
            </div>
          </Card>
        </section>

        <section className="space-y-3">
          <p className="font-[family:var(--font-display)] text-2xl text-[#0B0B0B]">
            Referral system
          </p>
          <Card className="space-y-4">
            <div className="flex items-center justify-between text-sm text-[#6B6B6B]">
              <span>Referral earnings</span>
              <span className="text-lg font-semibold text-[#0B0B0B]">
                ₹18,200
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-[#6B6B6B]">
              <span>Your referral network</span>
              <span className="text-[#0B0B0B]">12 artists</span>
            </div>
            <Button fullWidth>Invite another artist</Button>
          </Card>
        </section>

        <section className="space-y-3">
          <p className="font-[family:var(--font-display)] text-2xl text-[#0B0B0B]">
            Portfolio manager
          </p>
          <PortfolioGrid items={portfolioPreview} />
        </section>

        <section className="space-y-3">
          <p className="font-[family:var(--font-display)] text-2xl text-[#0B0B0B]">
            Availability calendar
          </p>
          <Card>
            <div className="grid grid-cols-3 gap-3 text-center text-sm text-[#6B6B6B]">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="rounded-[16px] border border-[#E7DED0] bg-[#F7F3EF] px-3 py-4 text-[#0B0B0B]"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C8A96A]">
                    {day}
                  </p>
                  <p className="mt-2 text-sm">4 slots</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
