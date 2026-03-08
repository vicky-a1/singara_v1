import Link from "next/link";
import HeaderBar from "@/components/layout/HeaderBar";

const clusters = ["HSR", "Koramangala", "Indiranagar", "Whitefield"];

type LocationPageProps = {
  searchParams?: Promise<{ event?: string }>;
};

export default async function LocationSelectionPage({
  searchParams,
}: LocationPageProps) {
  const resolved = await searchParams;
  const event = resolved?.event ?? "Bridal";

  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="Location" subtitle="Choose your cluster" />
      <div className="space-y-6 px-5 py-6">
        <p className="font-[family:var(--font-display)] text-3xl text-[#0B0B0B]">
          Where is your event happening?
        </p>
        <div className="grid gap-3">
          {clusters.map((cluster) => (
            <Link
              key={cluster}
              href={`/journey/budget?event=${encodeURIComponent(
                event,
              )}&location=${encodeURIComponent(cluster)}`}
              className="block"
            >
              <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                  Cluster
                </p>
                <p className="mt-2 font-[family:var(--font-display)] text-2xl text-[#0B0B0B]">
                  {cluster}
                </p>
                <p className="mt-2 text-sm text-[#6B6B6B]">
                  Curated artists near {cluster}.
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
