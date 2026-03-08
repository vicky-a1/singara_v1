"use client";

import Lottie from "lottie-react";
import matchingAnimation from "@/assets/lottie/matching.json";

type LoadingAnimationProps = {
  className?: string;
};

export default function LoadingAnimation({ className }: LoadingAnimationProps) {
  return (
    <div className={className}>
      <Lottie animationData={matchingAnimation} loop />
    </div>
  );
}
