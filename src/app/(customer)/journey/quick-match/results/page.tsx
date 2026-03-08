import { Suspense } from "react";
import HeaderBar from "@/components/layout/HeaderBar";
import QuickMatchResultsClient from "@/components/journey/QuickMatchResultsClient";
import LoadingAnimation from "@/components/feedback/LoadingAnimation";

export default function QuickMatchResultsPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="Quick Match" subtitle="Top recommendations" />
      <Suspense
        fallback={
          <div className="space-y-6 px-5 py-6">
            <LoadingAnimation className="mx-auto h-24 w-24" />
            <div className="h-40 rounded-[24px] shimmer" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={`match-skeleton-${index}`} className="space-y-3">
                  <div className="h-56 rounded-[24px] shimmer" />
                  <div className="h-20 rounded-[24px] shimmer" />
                </div>
              ))}
            </div>
          </div>
        }
      >
        <QuickMatchResultsClient />
      </Suspense>
    </div>
  );
}
