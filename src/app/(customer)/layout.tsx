"use client";

import PageTransition from "@/components/layout/PageTransition";
import BottomNav from "@/components/layout/BottomNav";
import BrandHeader from "@/components/layout/BrandHeader";
import {
  CalendarBlank,
  House,
  MagnifyingGlass,
  User,
} from "phosphor-react";

const HomeIcon = (props: { className?: string }) => (
  <House {...props} weight="thin" size={24} />
);
const ExploreIcon = (props: { className?: string }) => (
  <MagnifyingGlass {...props} weight="thin" size={24} />
);
const BookingsIcon = (props: { className?: string }) => (
  <CalendarBlank {...props} weight="thin" size={24} />
);
const ProfileIcon = (props: { className?: string }) => (
  <User {...props} weight="thin" size={24} />
);

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-20">
      <BrandHeader variant="app" />
      <PageTransition>{children}</PageTransition>
      <BottomNav
        items={[
          { label: "Home", href: "/home", icon: HomeIcon },
          { label: "Explore", href: "/artists", icon: ExploreIcon },
          { label: "Bookings", href: "/bookings", icon: BookingsIcon },
          { label: "Profile", href: "/profile", icon: ProfileIcon },
        ]}
      />
    </div>
  );
}
