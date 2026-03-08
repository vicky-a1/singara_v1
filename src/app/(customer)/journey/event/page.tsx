import Image from "next/image";
import Link from "next/link";
import HeaderBar from "@/components/layout/HeaderBar";

const events = [
  {
    label: "Bridal",
    image: "/images/beauty/bridal-1.jpg",
  },
  {
    label: "Party",
    image: "/images/beauty/party-1.jpg",
  },
  {
    label: "Photoshoot",
    image: "/images/beauty/editorial-1.jpg",
  },
  {
    label: "Corporate",
    image: "/images/beauty/editorial-2.jpg",
  },
];

export default function EventSelectionPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="The MUA Universe" subtitle="Select your event" />
      <div className="space-y-5 px-5 py-6">
        <p className="font-[family:var(--font-display)] text-3xl text-[#0B0B0B]">
          What are you getting ready for?
        </p>
        <div className="grid gap-4">
          {events.map((event) => (
            <Link
              key={event.label}
              href={`/journey/location?event=${encodeURIComponent(event.label)}`}
              className="block"
            >
              <div className="relative h-44 overflow-hidden rounded-[24px] bg-[#0B0B0B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <Image
                  src={event.image}
                  alt={event.label}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/85 via-[#0B0B0B]/45 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                    Event
                  </p>
                  <p className="mt-2 font-[family:var(--font-display)] text-2xl">
                    {event.label}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
