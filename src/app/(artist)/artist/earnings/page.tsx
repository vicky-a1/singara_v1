import HeaderBar from "@/components/layout/HeaderBar";
import KpiCard from "@/components/cards/KpiCard";

const payouts = [
  { id: "p1", amount: "₹45,000", date: "July 2026" },
  { id: "p2", amount: "₹38,500", date: "June 2026" },
];

export default function EarningsPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="Earnings" subtitle="Payout history" />
      <div className="space-y-6 px-5 py-6">
        <KpiCard label="Net Earnings" value="₹1.2L" hint="Last 30 days" />
        <div className="space-y-3 rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <p className="text-sm uppercase tracking-[0.3em] text-[#6B6B6B]">
            Payouts
          </p>
          {payouts.map((payout) => (
            <div key={payout.id} className="flex items-center justify-between">
              <span className="text-sm">{payout.date}</span>
              <span className="font-semibold">{payout.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
