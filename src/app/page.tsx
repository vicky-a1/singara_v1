import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F3EF] px-6">
      <main className="flex w-full max-w-[440px] flex-col gap-6 text-left">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-[#C8A96A]">
            The MUA Universe
          </p>
          <p className="font-[family:var(--font-display)] text-4xl text-[#0B0B0B]">
            Find your perfect makeup artist.
          </p>
          <p className="text-sm text-[#6B6B6B]">
            Discover verified makeup artists and premium services for every
            occasion.
          </p>
        </div>
        <Link href="/login" className="w-full">
          <Button fullWidth>Enter Singara</Button>
        </Link>
      </main>
    </div>
  );
}
