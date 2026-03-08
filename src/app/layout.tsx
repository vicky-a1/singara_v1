import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import LandingBrandHeader from "@/components/layout/LandingBrandHeader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Singara",
  description: "Luxury marketplace for verified makeup artists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen bg-[#F7F3EF] antialiased`}
      >
        <LandingBrandHeader />
        {children}
      </body>
    </html>
  );
}
