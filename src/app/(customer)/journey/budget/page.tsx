import Link from "next/link";
import HeaderBar from "@/components/layout/HeaderBar";

const budgets = ["₹3000–₹5000", "₹5000–₹10000", "₹10000–₹20000", "₹20000+"];

type BudgetPageProps = {
  searchParams?: Promise<{ event?: string; location?: string }>;
};

export default async function BudgetSelectionPage({
  searchParams,
}: BudgetPageProps) {
  const resolved = await searchParams;
  const event = resolved?.event ?? "Bridal";
  const location = resolved?.location ?? "HSR";

  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="Budget" subtitle="Find your range" />
      <div className="space-y-6 px-5 py-6">
        <p className="font-[family:var(--font-display)] text-3xl text-[#0B0B0B]">
          What budget feels right for you?
        </p>
        <div className="grid gap-3">
          {budgets.map((range) => (
            <Link
              key={range}
              href={`/journey/skin?event=${encodeURIComponent(
                event,
              )}&location=${encodeURIComponent(
                location,
              )}&budget=${encodeURIComponent(range)}`}
              className="block"
            >
              <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                  Range
                </p>
                <p className="mt-2 font-[family:var(--font-display)] text-2xl text-[#0B0B0B]">
                  {range}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
