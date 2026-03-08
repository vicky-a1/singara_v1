"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RatingPill, VerifiedBadge } from "../ui/Badges";

type ArtistCardProps = {
  name: string;
  rating: number;
  reviewCount: number;
  priceFrom: string;
  location: string;
  specialization?: string;
  distance?: string;
  availabilityToday?: boolean;
  matchScore?: number;
  availableLabel?: string;
  imageUrl?: string;
  artistId?: string;
  portfolioImages?: string[];
  verified?: boolean;
};

export default function ArtistCard({
  name,
  rating,
  reviewCount,
  priceFrom,
  location,
  specialization,
  distance,
  availabilityToday,
  matchScore,
  availableLabel,
  imageUrl,
  artistId,
  portfolioImages,
  verified = true,
}: ArtistCardProps) {
  const router = useRouter();
  const repeatClients = Math.max(12, Math.round(reviewCount * 0.6));
  const bookingsCount = Math.max(12, Math.round(reviewCount * 2));
  const normalizedPrice = priceFrom.trim().startsWith("₹")
    ? priceFrom.trim()
    : `₹${priceFrom.trim()}`;
  const specializationLabel = specialization
    ? specialization === "Bridal"
      ? "Bridal Specialist"
      : specialization === "Photoshoot"
        ? "Editorial Artist"
        : specialization === "Party"
          ? "Celebrity MUA"
          : specialization === "Corporate"
            ? "Corporate Artist"
            : `${specialization} Artist`
    : undefined;
  const chipLabels = Array.from(
    new Set(
      [specializationLabel, rating >= 4.8 ? "Celebrity MUA" : undefined].filter(
        Boolean,
      ) as string[],
    ),
  );
  const previewImages = (portfolioImages ?? []).filter(Boolean).slice(0, 3);

  const primaryAvailability = availabilityToday
    ? "Today"
    : availableLabel ?? "Tomorrow";
  const availabilityPreview = [primaryAvailability, "Sat", "Sun"];

  return (
    <motion.div
      className="overflow-hidden rounded-xl bg-white transition duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      <div className="relative aspect-[3/4] w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0B]/20 to-[#0B0B0B]/70" />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs text-[#0B0B0B] shadow-md">
          ⚡ Instant Book
        </div>
        {verified ? (
          <div className="absolute left-3 top-12">
            <VerifiedBadge />
          </div>
        ) : null}
        {matchScore !== undefined ? (
          <div className="absolute right-3 top-3 rounded bg-black px-2 py-1 text-xs text-white">
            {matchScore}% Match
          </div>
        ) : null}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          {chipLabels.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {chipLabels.map((label, index) => (
                <span
                  key={`${label}-${index}`}
                  className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white"
                >
                  {label}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="space-y-3 px-4 pb-5 pt-4 text-[#0B0B0B]">
        <div>
          <p className="font-[family:var(--font-display)] text-xl">{name}</p>
          <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-500">
            {verified ? <span>✔ Verified Artist</span> : null}
            <span>⭐ {rating.toFixed(1)}</span>
            <span>{bookingsCount}+ bookings</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-[#6B6B6B]">
            <RatingPill value={rating} count={reviewCount} />
            <span>
              {location}
              {distance ? ` · ${distance}` : ""}
            </span>
          </div>
        </div>
        <p className="text-xs text-red-500">Only 2 slots left today</p>
        <div className="flex gap-2 text-xs">
          {availabilityPreview.map((label, index) => (
            <span
              key={`${label}-${index}`}
              className={
                index === 0
                  ? "rounded bg-green-100 px-2 py-1 text-green-700"
                  : "rounded bg-gray-100 px-2 py-1 text-[#0B0B0B]"
              }
            >
              {label}
            </span>
          ))}
        </div>
        {previewImages.length > 0 ? (
          <div className="flex gap-2 overflow-x-auto">
            {previewImages.map((img, index) => (
              <Image
                key={`${img}-${index}`}
                src={img}
                alt="portfolio"
                width={80}
                height={80}
                className="h-20 w-20 rounded-md object-cover"
              />
            ))}
          </div>
        ) : null}
        <p className="text-lg font-semibold">From {normalizedPrice}</p>
        <div className="text-xs text-[#6B6B6B]">
          ★ {repeatClients} repeat clients
        </div>
        <button
          type="button"
          onClick={() => {
            if (artistId) {
              router.push(`/booking?artist=${artistId}`);
            }
          }}
          className="mt-3 rounded-full bg-black px-5 py-2 text-white hover:opacity-90"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
}
