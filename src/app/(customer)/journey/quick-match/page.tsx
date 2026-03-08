"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import HeaderBar from "@/components/layout/HeaderBar";
import matchingAnimation from "@/assets/lottie/matching.json";

const steps = [
  {
    key: "event",
    label: "Event",
    options: ["Bridal", "Party", "Photoshoot", "Corporate"],
  },
  {
    key: "location",
    label: "Location",
    options: ["HSR", "Koramangala", "Indiranagar", "Whitefield"],
  },
  {
    key: "budget",
    label: "Budget",
    options: ["₹3000–₹5000", "₹5000–₹10000", "₹10000–₹20000", "₹20000+"],
  },
  {
    key: "skinTone",
    label: "Skin tone",
    options: ["Fair", "Medium", "Deep"],
  },
  {
    key: "style",
    label: "Style",
    options: ["Soft glam", "Dewy", "Bold", "Classic"],
  },
];

export default function QuickMatchPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const currentStep = steps[stepIndex];

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep.key]: value }));
    setStepIndex((prev) => Math.min(prev + 1, steps.length));
  };

  const canShowResults = stepIndex >= steps.length;
  useEffect(() => {
    if (!canShowResults) {
      return;
    }
    const params = new URLSearchParams(answers).toString();
    const timeout = setTimeout(() => {
      router.push(`/journey/quick-match/results?${params}`);
    }, 900);
    return () => clearTimeout(timeout);
  }, [answers, canShowResults, router]);

  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar
        title="Quick Match"
        subtitle="Find your artist in 30 seconds"
      />
      <div className="space-y-6 px-5 py-6">
        {!canShowResults ? (
          <div className="rounded-[24px] bg-[#0B0B0B] p-6 text-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <p className="text-xs uppercase tracking-[0.35em] text-[#C8A96A]">
              Step {stepIndex + 1} of {steps.length}
            </p>
            <p className="mt-3 font-[family:var(--font-display)] text-3xl">
              {currentStep.label}
            </p>
            <p className="mt-2 text-sm text-white/80">
              Choose the option that fits you best.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {currentStep.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white hover:text-[#111111]"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {canShowResults ? (
          <div className="rounded-[24px] border border-[#E7DED0] bg-white p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <div className="mx-auto h-28 w-28">
              <Lottie animationData={matchingAnimation} loop />
            </div>
            <p className="mt-4 font-[family:var(--font-display)] text-2xl text-[#0B0B0B]">
              Matching you with top artists...
            </p>
            <p className="mt-2 text-sm text-[#6B6B6B]">
              Finding the best fit for your look.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
