import { Suspense } from "react";
import HeaderBar from "@/components/layout/HeaderBar";
import AvailabilityClient from "@/components/availability/AvailabilityClient";
import LoadingAnimation from "@/components/feedback/LoadingAnimation";

export default function AvailabilityPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="Availability" subtitle="Set your schedule" />
      <div className="space-y-6 px-5 py-6">
        <Suspense
          fallback={
            <div className="space-y-4">
              <LoadingAnimation className="mx-auto h-24 w-24" />
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`availability-skeleton-${index}`}
                  className="h-28 rounded-[24px] shimmer"
                />
              ))}
            </div>
          }
        >
          <AvailabilityClient />
        </Suspense>
      </div>
    </div>
  );
}
