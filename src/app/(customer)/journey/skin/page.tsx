import Link from "next/link";
import HeaderBar from "@/components/layout/HeaderBar";

const skinTypes = ["Dry", "Oily", "Combination"];
const skinTones = ["Fair", "Medium", "Deep"];

type SkinPageProps = {
  searchParams?: Promise<{
    event?: string;
    location?: string;
    budget?: string;
  }>;
};

export default async function SkinSelectionPage({
  searchParams,
}: SkinPageProps) {
  const resolved = await searchParams;
  const event = resolved?.event ?? "Bridal";
  const location = resolved?.location ?? "HSR";
  const budget = resolved?.budget ?? "₹10000–₹20000";

  const baseQuery = `event=${encodeURIComponent(
    event,
  )}&location=${encodeURIComponent(location)}&budget=${encodeURIComponent(
    budget,
  )}`;

  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="Skin Profile" subtitle="Optional, but helpful" />
      <div className="space-y-8 px-5 py-6">
        <div className="space-y-4">
          <p className="font-[family:var(--font-display)] text-3xl text-[#111111]">
            Tell us about your skin type.
          </p>
          <div className="grid gap-3">
            {skinTypes.map((type) => (
              <Link
                key={type}
                href={`/artists?${baseQuery}&skinType=${encodeURIComponent(
                  type,
                )}`}
                className="block"
              >
                <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                    Type
                  </p>
                  <p className="mt-2 font-[family:var(--font-display)] text-2xl text-[#111111]">
                    {type}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <p className="font-[family:var(--font-display)] text-3xl text-[#111111]">
            Choose your skin tone.
          </p>
          <div className="grid gap-3">
            {skinTones.map((tone) => (
              <Link
                key={tone}
                href={`/artists?${baseQuery}&skinTone=${encodeURIComponent(
                  tone,
                )}`}
                className="block"
              >
                <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                    Tone
                  </p>
                  <p className="mt-2 font-[family:var(--font-display)] text-2xl text-[#111111]">
                    {tone}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Link href={`/artists?${baseQuery}`} className="block">
          <div className="rounded-[24px] border border-[#E7DED0] bg-[#0B0B0B] p-5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
              Skip for now
            </p>
            <p className="mt-2 font-[family:var(--font-display)] text-2xl">
              Continue to artists
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
