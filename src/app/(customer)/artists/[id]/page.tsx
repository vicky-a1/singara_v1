"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import HeaderBar from "@/components/layout/HeaderBar";
import ServiceCard from "@/components/cards/ServiceCard";
import TrustPanel from "@/components/profile/TrustPanel";
import ContactArtistButton from "@/components/actions/ContactArtistButton";
import { useArtist } from "@/hooks/useArtist";
import Card from "@/components/layout/Card";
import { reviews } from "@/lib/mockData";

const formatDuration = (minutes: number) => {
  const hours = minutes / 60;
  return Number.isInteger(hours) ? `${hours} hrs` : `${hours.toFixed(1)} hrs`;
};

export default function ArtistProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : undefined;
  const { data, loading, error } = useArtist(id);
  const artistReviews = data
    ? reviews.filter((review) => review.artistId === data.id)
    : [];
  const minService =
    data?.services.length && data.services.length > 0
      ? data.services.reduce((min, service) =>
          min.price.amount <= service.price.amount ? min : service,
        )
      : undefined;

  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-36">
      <HeaderBar
        title={data?.name ?? "Artist"}
        subtitle={
          data
            ? `${data.location.city} · Makeup Artist`
            : "Loading profile"
        }
      />
      <div className="space-y-6 px-5 py-6">
        {error ? (
          <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 text-sm text-[#6B6B6B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            {error}
          </div>
        ) : null}
        {loading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`portfolio-skeleton-${index}`}
                  className="aspect-[3/4] w-full rounded-[24px] shimmer"
                />
              ))}
            </div>
            <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between">
                <div className="h-6 w-20 rounded shimmer" />
                <div className="h-6 w-16 rounded shimmer" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="h-8 w-full rounded shimmer" />
                <div className="h-8 w-full rounded shimmer" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-5 w-24 rounded shimmer" />
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={`service-skeleton-${index}`}
                    className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                  >
                    <div className="h-4 w-40 rounded shimmer" />
                    <div className="mt-3 h-4 w-24 rounded shimmer" />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] bg-[#0B0B0B] p-5">
              <div className="h-4 w-24 rounded shimmer" />
              <div className="mt-3 h-4 w-full rounded shimmer" />
              <div className="mt-2 h-4 w-2/3 rounded shimmer" />
            </div>
            <div className="h-12 w-full rounded-[16px] shimmer" />
            <div className="h-12 w-full rounded-[16px] shimmer" />
          </div>
        ) : data ? (
          <>
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-[family:var(--font-display)] text-3xl text-[#0B0B0B]">
                  Portfolio gallery
                </p>
                <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                  {data.portfolio?.length ?? 0} looks
                </span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth touch-pan-x">
                {(data.portfolio ?? []).map((item) => (
                  <div
                    key={item.id}
                    className="relative h-64 w-[260px] shrink-0 snap-start overflow-hidden rounded-[24px] bg-[#0B0B0B]/10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                  >
                    <Image
                      src={item.url}
                      alt={item.altText ?? "Portfolio image"}
                      fill
                      sizes="(max-width: 640px) 240px, 300px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-transparent to-transparent" />
                  </div>
                ))}
              </div>
            </section>
            <Card>
              <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                Artist info
              </p>
              <p className="mt-3 font-[family:var(--font-display)] text-3xl text-[#0B0B0B]">
                {data.name}
              </p>
              <p className="mt-2 text-sm text-[#6B6B6B]">
                {data.location.label} · {data.experienceYears} years experience
              </p>
              <p className="mt-3 text-sm text-[#6B6B6B]">
                {data.about ?? "Luxury makeup artistry tailored to your event."}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-[#6B6B6B]">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em]">
                    Response
                  </p>
                  <p className="mt-1 text-[#0B0B0B]">{data.responseTime}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em]">
                    Completion
                  </p>
                  <p className="mt-1 text-[#0B0B0B]">
                    {data.completionRate}% success
                  </p>
                </div>
              </div>
            </Card>
            <TrustPanel
              rating={data.rating}
              reviewCount={data.reviewCount}
              responseTime={data.responseTime}
              bookingsCompleted={Math.max(1, Math.round(data.reviewCount * 2))}
            />
            <Card>
              <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                Trust signals
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-[#6B6B6B]">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em]">
                    Response time
                  </p>
                  <p className="mt-1 text-base font-semibold text-[#0B0B0B]">
                    {data.responseTime}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em]">
                    Completed bookings
                  </p>
                  <p className="mt-1 text-base font-semibold text-[#0B0B0B]">
                    {Math.max(1, Math.round(data.reviewCount * 2))}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em]">
                    Repeat clients
                  </p>
                  <p className="mt-1 text-base font-semibold text-[#0B0B0B]">
                    {Math.max(18, Math.round(data.completionRate / 2))}%
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em]">
                    Cancellation policy
                  </p>
                  <p className="mt-1 text-sm text-[#0B0B0B]">
                    Free within 24 hours
                  </p>
                </div>
              </div>
            </Card>
            <div className="space-y-3">
              <p className="font-[family:var(--font-display)] text-3xl text-[#0B0B0B]">
                Services
              </p>
              <div className="space-y-3">
                {data.services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    name={service.name}
                    duration={formatDuration(service.durationMinutes)}
                    price={service.price.display}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <p className="font-[family:var(--font-display)] text-3xl text-[#0B0B0B]">
                Products used
              </p>
              <div className="grid gap-3">
                {[
                  "Dior Backstage",
                  "Charlotte Tilbury Airbrush",
                  "Huda Beauty Lashes",
                  "MAC Fix+",
                ].map((product) => (
                  <Card key={product} className="py-4">
                    <p className="text-sm font-semibold text-[#0B0B0B]">
                      {product}
                    </p>
                    <p className="mt-1 text-xs text-[#6B6B6B]">
                      Premium, artist-approved essentials.
                    </p>
                  </Card>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <p className="font-[family:var(--font-display)] text-3xl text-[#0B0B0B]">
                Reviews
              </p>
              {artistReviews.length === 0 ? (
                <Card>
                  <p className="text-sm text-[#6B6B6B]">
                    No reviews yet. Be the first to review.
                  </p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {artistReviews.map((review) => (
                    <Card key={review.id}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#0B0B0B]">
                          {review.authorName}
                        </p>
                        <p className="text-sm text-[#C8A96A]">
                          {"★".repeat(review.rating)}
                        </p>
                      </div>
                      <p className="mt-2 text-sm text-[#6B6B6B]">
                        {review.comment}
                      </p>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            <ContactArtistButton />
          </>
        ) : (
          <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 text-sm text-[#6B6B6B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            Artist not found.
          </div>
        )}
      </div>
      {data ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-[#E7DED0] bg-white p-4 shadow-lg">
          <p className="text-lg font-semibold text-[#0B0B0B]">
            From {minService?.price.display ?? data.priceFrom.display}
          </p>
          <button
            type="button"
            className="rounded-full bg-black px-6 py-3 text-white hover:opacity-90"
            onClick={() => router.push(`/booking?artist=${data.id}`)}
          >
            Book Now
          </button>
        </div>
      ) : null}
    </div>
  );
}
