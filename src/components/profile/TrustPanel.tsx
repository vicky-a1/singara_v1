import { RatingPill, VerifiedBadge } from "../ui/Badges";

type TrustPanelProps = {
  rating: number;
  reviewCount: number;
  responseTime: string;
  bookingsCompleted: number;
};

export default function TrustPanel({
  rating,
  reviewCount,
  responseTime,
  bookingsCompleted,
}: TrustPanelProps) {
  return (
    <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between">
        <VerifiedBadge />
        <RatingPill value={rating} count={reviewCount} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-[#6B6B6B]">
        <div>
          <p className="text-xs uppercase tracking-[0.2em]">Response</p>
          <p className="text-[#0B0B0B]">{responseTime}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em]">Completed</p>
          <p className="text-[#0B0B0B]">{bookingsCompleted}</p>
        </div>
      </div>
    </div>
  );
}
