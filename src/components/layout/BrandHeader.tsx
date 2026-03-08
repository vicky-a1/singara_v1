"use client";

import Logo from "@/components/brand/Logo";

type Variant = "landing" | "auth" | "app" | "dashboard";

export default function BrandHeader({
  variant = "app",
}: {
  variant?: Variant;
}) {
  const sizeMap = {
    landing: 56,
    auth: 44,
    app: 40,
    dashboard: 36,
  };

  const logoSize = sizeMap[variant];

  return (
    <div className="w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
        <Logo size={logoSize} />
        <p className="whitespace-nowrap text-sm font-light tracking-wide text-neutral-600 md:text-base">
          Luxury beauty, curated for you
        </p>
      </div>
    </div>
  );
}
