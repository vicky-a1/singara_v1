import { Suspense } from "react";
import HeaderBar from "@/components/layout/HeaderBar";
import ArtistsClient from "@/components/customer/ArtistsClient";
import LoadingAnimation from "@/components/feedback/LoadingAnimation";

export default function ArtistListingPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-6">
      <HeaderBar title="Discover" subtitle="Curated artists for your event" />
      <Suspense
        fallback={
          <div className="space-y-6 px-5 py-6">
            <LoadingAnimation className="mx-auto h-24 w-24" />
            <div className="h-36 rounded-[24px] shimmer" />
            <div className="h-32 rounded-[24px] shimmer" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`artist-skeleton-${index}`}
                  className="overflow-hidden rounded-[24px] border border-[#E7DED0] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                >
                  <div className="aspect-[3/4] w-full shimmer" />
                  <div className="space-y-3 p-4">
                    <div className="h-4 w-2/3 rounded shimmer" />
                    <div className="h-4 w-1/2 rounded shimmer" />
                    <div className="h-4 w-1/3 rounded shimmer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <ArtistsClient />
      </Suspense>
    </div>
  );
}
