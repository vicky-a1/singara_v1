import { StatusPill } from "../ui/Badges";

type BookingCardProps = {
  artist: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
};

export default function BookingCard({
  artist,
  date,
  time,
  status,
}: BookingCardProps) {
  return (
    <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-[#0B0B0B]">{artist}</p>
        <StatusPill label={status} tone={status} />
      </div>
      <p className="mt-2 text-sm text-[#6B6B6B]">
        {date} • {time}
      </p>
    </div>
  );
}
