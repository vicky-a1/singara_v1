import { Suspense } from "react";
import HeaderBar from "@/components/layout/HeaderBar";
import BookingConfirmationClient from "@/components/booking/BookingConfirmationClient";
import LoadingAnimation from "@/components/feedback/LoadingAnimation";

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="Confirmed" subtitle="Your artist is booked" />
      <Suspense
        fallback={
          <div className="space-y-6 px-5 py-6">
            <LoadingAnimation className="mx-auto h-24 w-24" />
            <div className="h-28 rounded-[24px] shimmer" />
            <div className="h-24 rounded-[24px] shimmer" />
            <div className="h-12 rounded-[16px] shimmer" />
            <div className="h-12 rounded-[16px] shimmer" />
          </div>
        }
      >
        <BookingConfirmationClient />
      </Suspense>
    </div>
  );
}
