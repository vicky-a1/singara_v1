type KpiCardProps = {
  label: string;
  value: string;
  hint?: string;
};

export default function KpiCard({ label, value, hint }: KpiCardProps) {
  return (
    <div className="rounded-[24px] bg-[#0B0B0B] p-5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      {hint ? <p className="text-xs text-white/70">{hint}</p> : null}
    </div>
  );
}
