import Link from "next/link";
import HeaderBar from "@/components/layout/HeaderBar";
import KpiCard from "@/components/cards/KpiCard";
import Card from "@/components/layout/Card";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <HeaderBar title="Admin Dashboard" subtitle="Platform overview" />
      <div className="space-y-6 px-5 py-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <KpiCard label="GMV" value="₹24.6L" hint="Last 30 days" />
          <KpiCard label="Active Artists" value="1,240" hint="Verified" />
          <KpiCard label="Bookings" value="3,840" hint="All statuses" />
          <KpiCard label="Disputes" value="24" hint="Open cases" />
        </div>
        <section className="space-y-3">
          <p className="font-[family:var(--font-display)] text-2xl text-[#0B0B0B]">
            Operational queues
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/admin/verification" className="block">
              <Card>
                <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                  Artist approvals
                </p>
                <p className="mt-2 text-lg font-semibold text-[#0B0B0B]">
                  18 waiting
                </p>
                <p className="mt-1 text-sm text-[#6B6B6B]">
                  Review and verify new talent.
                </p>
              </Card>
            </Link>
            <Link href="/admin/bookings" className="block">
              <Card>
                <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                  Booking monitoring
                </p>
                <p className="mt-2 text-lg font-semibold text-[#0B0B0B]">
                  96 active
                </p>
                <p className="mt-1 text-sm text-[#6B6B6B]">
                  Track live bookings and statuses.
                </p>
              </Card>
            </Link>
            <Link href="/admin/disputes" className="block">
              <Card>
                <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                  Dispute management
                </p>
                <p className="mt-2 text-lg font-semibold text-[#0B0B0B]">
                  24 open
                </p>
                <p className="mt-1 text-sm text-[#6B6B6B]">
                  Resolve escalations quickly.
                </p>
              </Card>
            </Link>
            <Card>
              <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                Revenue analytics
              </p>
              <p className="mt-2 text-lg font-semibold text-[#0B0B0B]">
                ₹6.4L weekly
              </p>
              <p className="mt-1 text-sm text-[#6B6B6B]">
                Monitor marketplace growth.
              </p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
