import Image from "next/image";

type PortfolioGridProps = {
  items: { id: string; url?: string; altText?: string }[];
};

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative aspect-[3/4] w-full overflow-hidden rounded-[24px] bg-[#0B0B0B]/5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
        >
          {item.url ? (
            <Image
              src={item.url}
              alt={item.altText ?? "Portfolio image"}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
