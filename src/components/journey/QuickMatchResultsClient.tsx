"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ArtistCard from "@/components/cards/ArtistCard";
import Card from "@/components/layout/Card";
import Button from "@/components/ui/Button";
import LoadingAnimation from "@/components/feedback/LoadingAnimation";
import { artists } from "@/lib/mockData";

const matchScores = [92, 89, 86];

export default function QuickMatchResultsClient() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const event = searchParams.get("event") ?? "Bridal";
  const location = searchParams.get("location") ?? "Indiranagar";
  const budget = searchParams.get("budget") ?? "₹10000–₹20000";
  const skinTone = searchParams.get("skinTone") ?? "Medium";
  const style = searchParams.get("style") ?? "Soft glam";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const recommendations = useMemo(() => {
    return artists
      .map((artist, index) => ({
        ...artist,
        matchScore: matchScores[index % matchScores.length] ?? 85,
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  }, []);

  const getSpecialization = (services: { name: string }[]) => {
    const names = services.map((service) => service.name.toLowerCase());
    if (names.some((name) => name.includes("bridal"))) return "Bridal";
    if (names.some((name) => name.includes("party"))) return "Party";
    if (names.some((name) => name.includes("editorial"))) return "Photoshoot";
    if (names.some((name) => name.includes("corporate"))) return "Corporate";
    return "Glam";
  };

  const topService = recommendations[0]?.services?.[0];

  return (
    <div className="space-y-6 px-5 py-6">
      <div className="rounded-[24px] bg-[#0B0B0B] p-6 text-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <p className="text-xs uppercase tracking-[0.35em] text-[#C8A96A]">
          Match summary
        </p>
        <p className="mt-3 font-[family:var(--font-display)] text-3xl">
          {event} artists curated for you.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {[event, location, budget, skinTone, style].map((value, index) => (
            <span
              key={`${value}-${index}`}
              className="rounded-full border border-white/30 px-3 py-1 text-white/80"
            >
              {value}
            </span>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <LoadingAnimation className="h-24 w-24" />
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((artist, index) => (
          <div key={artist.id} className="space-y-3">
            <ArtistCard
              artistId={artist.id}
              name={artist.name}
              rating={artist.rating}
              reviewCount={artist.reviewCount}
              priceFrom={artist.priceFrom.display}
              location={artist.location.city}
              portfolioImages={(artist.portfolio ?? [])
                .map((item) => item.url)
                .filter(Boolean)}
              imageUrl={artist.portfolio?.[0]?.url ?? artist.profileImage}
              verified={artist.verified}
              availabilityToday={index === 0}
              distance={`${(2.1 + index * 0.6).toFixed(1)} km`}
              specialization={getSpecialization(artist.services)}
              matchScore={artist.matchScore}
            />
            <Card className="text-sm text-[#6B6B6B]">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                  Match {artist.matchScore}%
                </p>
                <p className="text-xs text-[#6B6B6B]">Top recommendation</p>
              </div>
              <div className="mt-3 space-y-1">
                <p>Good for {event.toLowerCase()} events</p>
                <p>Works in {location}</p>
                <p>Budget match for {budget}</p>
                <p>Style fit: {style}</p>
              </div>
            </Card>
          </div>
          ))}
        </div>
      )}
      {recommendations.length > 0 ? (
        <Button
          fullWidth
          onClick={() => {
            const topArtist = recommendations[0];
            const target = topService
              ? `/booking?artistId=${topArtist.id}&serviceId=${topService.id}`
              : `/artists/${topArtist.id}`;
            window.location.href = target;
          }}
        >
          Book the top match
        </Button>
      ) : (
        <Button fullWidth>Book the top match</Button>
      )}
    </div>
  );
}
