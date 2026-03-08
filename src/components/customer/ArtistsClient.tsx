"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ArtistCard from "@/components/cards/ArtistCard";
import LoadingAnimation from "@/components/feedback/LoadingAnimation";
import { useArtists } from "@/hooks/useArtists";

const filterOptions = {
  location: ["HSR", "Koramangala", "Indiranagar", "Whitefield"],
  budget: ["₹3000–₹5000", "₹5000–₹10000", "₹10000–₹20000", "₹20000+"],
  availability: ["Today", "This week", "Weekend"],
  rating: ["4.8+", "4.6+", "4.4+"],
};
const beautyStyles = [
  "Soft Glam",
  "Glass Skin",
  "Bridal HD",
  "Minimal Bridal",
  "Smokey Glam",
];

export default function ArtistsClient() {
  const { data, loading, error } = useArtists();
  const searchParams = useSearchParams();
  const event = searchParams.get("event") ?? "Bridal";
  const location = searchParams.get("location") ?? "Bengaluru";
  const budget = searchParams.get("budget") ?? "₹10000–₹20000";
  const skinType = searchParams.get("skinType");
  const skinTone = searchParams.get("skinTone");
  const filters = [
    event,
    location,
    budget,
    skinType,
    skinTone,
  ].filter(Boolean) as string[];
  const [selectedFilters, setSelectedFilters] = useState({
    location: filterOptions.location[2],
    budget: filterOptions.budget[2],
    availability: filterOptions.availability[0],
    rating: filterOptions.rating[0],
  });
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const updateFilter = (key: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };
  const getSpecialization = (services: { name: string }[]) => {
    const names = services.map((service) => service.name.toLowerCase());
    if (names.some((name) => name.includes("bridal"))) return "Bridal";
    if (names.some((name) => name.includes("party"))) return "Party";
    if (names.some((name) => name.includes("editorial"))) return "Photoshoot";
    if (names.some((name) => name.includes("corporate"))) return "Corporate";
    return "Glam";
  };
  const styleMatches = (artist: (typeof data)[number]) => {
    if (!selectedStyle) return true;
    const haystack = [
      artist.about ?? "",
      ...artist.services.map((service) => service.name),
    ]
      .join(" ")
      .toLowerCase();
    const terms =
      selectedStyle === "Soft Glam"
        ? ["soft", "glam"]
        : selectedStyle === "Glass Skin"
          ? ["glass", "skin", "luminous", "dewy"]
          : selectedStyle === "Bridal HD"
            ? ["bridal", "hd"]
            : selectedStyle === "Minimal Bridal"
              ? ["minimal", "bridal"]
              : ["smokey", "smoky", "glam"];
    return terms.some((term) => haystack.includes(term));
  };
  const filteredArtists = data.filter((artist) => styleMatches(artist));

  return (
    <div className="space-y-6 px-5 py-6">
      <div className="rounded-[24px] bg-[#0B0B0B] p-6 text-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <p className="text-xs uppercase tracking-[0.35em] text-[#C8A96A]">
          The MUA Universe
        </p>
        <p className="mt-3 font-[family:var(--font-display)] text-3xl">
          {event} artists near {location}
        </p>
        <p className="mt-2 text-sm text-white/80">
          Premium portfolios and verified professionals, tailored to your
          preferences.
        </p>
      </div>
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-[#C8A96A]">
          Filters
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {beautyStyles.map((style) => {
            const isActive = selectedStyle === style;
            return (
              <button
                key={style}
                type="button"
                onClick={() =>
                  setSelectedStyle((prev) => (prev === style ? null : style))
                }
                className={`whitespace-nowrap rounded-full px-3 py-1 text-sm transition ${
                  isActive
                    ? "bg-[#0B0B0B] text-white"
                    : "bg-gray-100 text-[#0B0B0B]"
                }`}
              >
                {style}
              </button>
            );
          })}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {(Object.keys(filterOptions) as Array<keyof typeof filterOptions>).map(
            (key) => (
              <div key={key} className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-[#6B6B6B]">
                  {key}
                </p>
                <div className="flex flex-wrap gap-2">
                  {filterOptions[key].map((option, index) => {
                    const isActive = selectedFilters[key] === option;
                    return (
                      <button
                        key={`${option}-${index}`}
                        type="button"
                        onClick={() => updateFilter(key, option)}
                        className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                          isActive
                            ? "border-[#0B0B0B] bg-[#0B0B0B] text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                            : "border-[#E7DED0] bg-white text-[#0B0B0B] shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-white"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <div
            key={`${filter}-${index}`}
            className="rounded-full border border-[#E7DED0] bg-white px-4 py-2 text-xs font-semibold text-[#0B0B0B] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-white"
          >
            {filter}
          </div>
        ))}
      </div>
      {error ? (
        <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 text-sm text-[#6B6B6B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          {error}
        </div>
      ) : null}
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <LoadingAnimation className="h-24 w-24" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredArtists.map((artist, index) => (
            <ArtistCard
              key={artist.id}
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
              availableLabel="Available"
              verified={artist.verified}
              availabilityToday={index % 2 === 0}
              distance={`${(2.3 + index * 0.5).toFixed(1)} km`}
              specialization={getSpecialization(artist.services)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
