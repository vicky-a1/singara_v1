"use client";

import { usePathname } from "next/navigation";
import BrandHeader from "@/components/layout/BrandHeader";

export default function LandingBrandHeader() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return <BrandHeader variant="landing" />;
}
