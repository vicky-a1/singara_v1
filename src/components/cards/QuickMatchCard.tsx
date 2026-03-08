import Button from "../ui/Button";

type QuickMatchCardProps = {
  title: string;
  description: string;
};

export default function QuickMatchCard({
  title,
  description,
}: QuickMatchCardProps) {
  return (
    <div className="rounded-[24px] bg-[#0B0B0B] p-6 text-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <p className="font-[family:var(--font-display)] text-xl">{title}</p>
      <p className="mt-2 text-sm text-white/80">{description}</p>
      <div className="mt-4">
        <Button variant="secondary" fullWidth>
          Match Me Now
        </Button>
      </div>
    </div>
  );
}
