type RatingPillProps = {
  value: number;
  count?: number;
};

export function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#C8A96A] px-2 py-1 text-xs font-semibold text-[#0B0B0B]">
      Verified
    </span>
  );
}

export function RatingPill({ value, count }: RatingPillProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#0B0B0B] px-2 py-1 text-xs font-semibold text-white">
      {value.toFixed(1)}
      {typeof count === "number" ? (
        <span className="text-[#C8A96A]">({count})</span>
      ) : null}
    </span>
  );
}

type StatusPillProps = {
  label: string;
  tone?: "pending" | "confirmed" | "completed" | "cancelled";
};

const statusTone: Record<NonNullable<StatusPillProps["tone"]>, string> = {
  pending: "bg-[#F4ECDD] text-[#0B0B0B]",
  confirmed: "bg-[#1F5B43] text-white",
  completed: "bg-[#0B0B0B] text-white",
  cancelled: "bg-[#A83C2B] text-white",
};

export function StatusPill({ label, tone = "pending" }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${statusTone[tone]}`}
    >
      {label}
    </span>
  );
}
