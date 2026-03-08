import { Suspense } from "react";
import HeaderBar from "@/components/layout/HeaderBar";
import BookingStepper from "@/components/booking/BookingStepper";
import BookingClient from "@/components/booking/BookingClient";
import LoadingAnimation from "@/components/feedback/LoadingAnimation";

export default function BookingFlowPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="Book Artist" subtitle="Confirm your details" />
      <BookingStepper
        current={1}
        steps={["Schedule", "Preferences", "Confirm"]}
      />
      <Suspense
        fallback={
          <div className="space-y-6 px-5 py-6">
            <LoadingAnimation className="mx-auto h-24 w-24" />
            <div className="h-28 rounded-[24px] shimmer" />
            <div className="h-40 rounded-[24px] shimmer" />
            <div className="h-12 rounded-[16px] shimmer" />
          </div>
        }
      >
        <BookingClient />
      </Suspense>
    </div>
  );
}
