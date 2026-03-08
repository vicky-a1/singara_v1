"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import PageTransition from "@/components/layout/PageTransition";
import BottomNav from "@/components/layout/BottomNav";
import BrandHeader from "@/components/layout/BrandHeader";
import {
  CalendarBlank,
  EnvelopeSimple,
  Layout,
  User,
} from "phosphor-react";

const DashboardIcon = (props: { className?: string }) => (
  <Layout {...props} weight="thin" size={24} />
);
const RequestsIcon = (props: { className?: string }) => (
  <EnvelopeSimple {...props} weight="thin" size={24} />
);
const CalendarIcon = (props: { className?: string }) => (
  <CalendarBlank {...props} weight="thin" size={24} />
);
const ProfileIcon = (props: { className?: string }) => (
  <User {...props} weight="thin" size={24} />
);

export default function ArtistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/artist/dashboard") {
      return;
    }
    const status = localStorage.getItem("artist_status");
    if (status !== "approved") {
      router.replace("/artist/login");
    }
  }, [pathname, router]);

  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-20">
      <BrandHeader variant="dashboard" />
      <PageTransition>{children}</PageTransition>
      <BottomNav
        items={[
          { label: "Dashboard", href: "/artist/dashboard", icon: DashboardIcon },
          { label: "Requests", href: "/artist/requests", icon: RequestsIcon },
          { label: "Calendar", href: "/artist/availability", icon: CalendarIcon },
          { label: "Profile", href: "/artist/profile", icon: ProfileIcon },
        ]}
      />
    </div>
  );
}
