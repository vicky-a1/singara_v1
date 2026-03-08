import Image from "next/image";
import Link from "next/link";
import ArtistCard from "@/components/cards/ArtistCard";
import Button from "@/components/ui/Button";
import { artists, portfolioImages } from "@/lib/mockData";

const eventCategories = [
  {
    label: "Bridal",
    image: "/images/beauty/bridal-2.jpg",
  },
  {
    label: "Party",
    image: "/images/beauty/party-2.jpg",
  },
  {
    label: "Editorial",
    image: "/images/beauty/editorial-1.jpg",
  },
  {
    label: "Corporate",
    image: "/images/beauty/editorial-2.jpg",
  },
  {
    label: "Haldi",
    image: "/images/beauty/haldi-2.jpg",
  },
  {
    label: "Engagement",
    image: "/images/beauty/engagement-2.jpg",
  },
];

export default function HomePage() {
  const trendingArtists = artists.slice(0, 6);
  const topRatedArtists = [...artists]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  const trendingLooks = portfolioImages.slice(0, 8);
  const inspirationLooks = [
    {
      title: "Royal Bridal",
      image: "/images/beauty/bridal-2.jpg",
      height: 240,
    },
    { title: "Soft Glam", image: "/images/beauty/party-2.jpg", height: 200 },
    {
      title: "Glass Skin Bridal",
      image: "/images/beauty/glam-1.jpg",
      height: 260,
    },
    {
      title: "Minimal Bridal",
      image: "/images/beauty/bridal-3.jpg",
      height: 210,
    },
    {
      title: "South Indian Bridal",
      image: "/images/beauty/haldi-2.jpg",
      height: 240,
    },
    {
      title: "Smokey Glam",
      image: "/images/beauty/editorial-1.jpg",
      height: 230,
    },
  ];

  const getArtistImage = (artist: (typeof artists)[number]) =>
    artist.portfolio?.[0]?.url ?? artist.profileImage;
  const getSpecialization = (artist: (typeof artists)[number]) => {
    const names = artist.services.map((service) => service.name.toLowerCase());
    if (names.some((name) => name.includes("bridal"))) return "Bridal";
    if (names.some((name) => name.includes("party"))) return "Party";
    if (names.some((name) => name.includes("editorial"))) return "Photoshoot";
    if (names.some((name) => name.includes("corporate"))) return "Corporate";
    return "Glam";
  };

  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-6">
      <div className="space-y-16 px-5 py-10">
        <div className="rounded-[24px] bg-[#0B0B0B] p-7 text-center text-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <p className="text-xs uppercase tracking-[0.35em] text-[#C8A96A]">
            The MUA Universe
          </p>
          <p className="mt-4 font-[family:var(--font-display)] text-5xl leading-tight sm:text-6xl">
            Find your perfect makeup artist.
          </p>
          <p className="mt-3 text-sm text-white/80">
            Handpicked professionals, premium experiences, and a seamless
            beauty journey.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/journey/event" className="flex-1">
              <Button fullWidth>Start Journey</Button>
            </Link>
            <Link href="/artists" className="flex-1">
              <Button
                variant="secondary"
                fullWidth
                className="bg-white text-[#0B0B0B]"
              >
                Explore
              </Button>
            </Link>
          </div>
        </div>
        <div className="rounded-[24px] border border-[#E7DED0] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#C8A96A]">
                Quick Match
              </p>
              <p className="mt-2 font-[family:var(--font-display)] text-3xl text-[#111111]">
                Find your artist in 30 seconds.
              </p>
              <p className="mt-2 text-sm text-[#6B6B6B]">
                Answer five quick questions and get curated matches instantly.
              </p>
            </div>
            <Link href="/journey/quick-match">
              <Button>Start Quick Match</Button>
            </Link>
          </div>
        </div>

        <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
              Search
            </span>
            <span className="text-xs text-[#6B6B6B]">
              Find artists by city or event
            </span>
          </div>
          <input
            placeholder="Search artists, services, or locations"
            className="mt-4 h-12 w-full rounded-[14px] border border-[#E7DED0] bg-[#F7F3EF] px-4 text-sm text-[#0B0B0B] outline-none focus:border-[#C8A96A]"
          />
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-[family:var(--font-display)] text-3xl text-[#0B0B0B]">
              Trending artists
            </p>
            <Button variant="ghost">View all</Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth touch-pan-x">
            {trendingArtists.map((artist, index) => (
              <div
                key={artist.id}
                className="w-[260px] shrink-0 snap-start"
              >
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
                  availableLabel="Today"
                  imageUrl={getArtistImage(artist)}
                  verified={artist.verified}
                  availabilityToday={index % 2 === 0}
                  distance={`${(2.1 + index * 0.6).toFixed(1)} km`}
                  specialization={getSpecialization(artist)}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <p className="font-[family:var(--font-display)] text-3xl text-[#0B0B0B]">
            Event categories
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {eventCategories.map((item) => (
              <div
                key={item.label}
                className="group relative h-48 overflow-hidden rounded-[24px] bg-[#0B0B0B]/10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/85 via-[#0B0B0B]/35 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                    Event
                  </p>
                  <p className="mt-2 font-[family:var(--font-display)] text-2xl">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <p className="font-[family:var(--font-display)] text-3xl text-[#0B0B0B]">
            Top rated artists
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {topRatedArtists.map((artist, index) => (
              <ArtistCard
                artistId={artist.id}
                key={artist.id}
                name={artist.name}
                rating={artist.rating}
                reviewCount={artist.reviewCount}
                priceFrom={artist.priceFrom.display}
                location={artist.location.city}
                portfolioImages={(artist.portfolio ?? [])
                  .map((item) => item.url)
                  .filter(Boolean)}
                imageUrl={getArtistImage(artist)}
                verified={artist.verified}
                availabilityToday={index % 2 === 0}
                distance={`${(1.8 + index * 0.7).toFixed(1)} km`}
                specialization={getSpecialization(artist)}
              />
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-[family:var(--font-display)] text-3xl text-[#0B0B0B]">
              Trending makeup looks
            </p>
            <Button variant="ghost">See looks</Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth touch-pan-x">
            {trendingLooks.map((look) => (
              <div
                key={look.id}
                className="relative h-56 w-[220px] shrink-0 snap-start overflow-hidden rounded-[24px] bg-[#0B0B0B]/10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              >
                <Image
                  src={look.url}
                  alt={look.altText ?? "Trending look"}
                  fill
                  sizes="(max-width: 640px) 220px, 240px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                    Look
                  </p>
                  <p className="mt-1 text-sm font-semibold">{look.altText}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-6">
          <p className="font-[family:var(--font-display)] text-3xl text-[#0B0B0B]">
            Beauty inspiration gallery
          </p>
          <div className="columns-2 gap-6 space-y-6 md:columns-3">
            {inspirationLooks.map((look, index) => (
              <div
                key={`${look.title}-${index}`}
                className="relative break-inside-avoid overflow-hidden rounded-[24px] bg-[#0B0B0B]/10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              >
                <div
                  className="relative w-full"
                  style={{ height: `${look.height}px` }}
                >
                  {look.image ? (
                    <Image
                      src={look.image}
                      alt={look.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                    Look
                  </p>
                  <p className="mt-2 font-[family:var(--font-display)] text-xl">
                    {look.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
