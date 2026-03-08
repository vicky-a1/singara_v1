import { Suspense } from "react";
import HeaderBar from "@/components/layout/HeaderBar";
import RequestsClient from "@/components/artist/RequestsClient";
import LoadingAnimation from "@/components/feedback/LoadingAnimation";

export default function BookingRequestsPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="Requests" subtitle="Respond quickly" />
      <div className="space-y-4 px-5 py-6">
        <Suspense
          fallback={
            <div className="space-y-4">
              <LoadingAnimation className="mx-auto h-24 w-24" />
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={`request-skeleton-${index}`} className="space-y-3">
                  <div className="h-20 rounded-[24px] shimmer" />
                  <div className="h-16 rounded-[24px] shimmer" />
                </div>
              ))}
            </div>
          }
        >
          <RequestsClient />
        </Suspense>
      </div>
    </div>
  );
}
