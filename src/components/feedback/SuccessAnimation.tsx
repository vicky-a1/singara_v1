"use client";

import Lottie from "lottie-react";
import matchingAnimation from "@/assets/lottie/matching.json";

type SuccessAnimationProps = {
  className?: string;
};

export default function SuccessAnimation({ className }: SuccessAnimationProps) {
  return (
    <div className={className}>
      <Lottie animationData={matchingAnimation} loop={false} />
    </div>
  );
}
