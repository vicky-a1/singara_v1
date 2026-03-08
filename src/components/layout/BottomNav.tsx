"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import Logo from "@/components/brand/Logo";

type NavItem = {
  label: string;
  href: string;
  active?: boolean;
  icon?: ComponentType<{ className?: string }>;
};

type BottomNavProps = {
  items: NavItem[];
  showLogo?: boolean;
};

export default function BottomNav({ items, showLogo }: BottomNavProps) {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-[#E7DED0] bg-[#0B0B0B] px-5 py-3">
      {showLogo ? (
        <div className="absolute left-5 top-1/2 -translate-y-1/2">
          <div className="rounded-full bg-white/90 p-1 shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
            <Logo size={22} />
          </div>
        </div>
      ) : null}
      <div className="mx-auto flex max-w-[720px] items-center justify-between">
        {items.map((item) => {
          const isActive =
            item.active ??
            (item.href === "/home"
              ? pathname === "/home"
              : pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-[11px] font-semibold ${
                isActive
                  ? "text-[#C8A96A] scale-[1.05] transition-transform duration-200"
                  : "text-white/70"
              }`}
            >
              {item.icon ? <item.icon className="h-5 w-5" /> : null}
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
