type HeaderBarProps = {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
};

export default function HeaderBar({ title, subtitle, rightSlot }: HeaderBarProps) {
  return (
    <header className="flex items-center justify-between gap-4 px-5 pt-7">
      <div>
        <p className="font-[family:var(--font-display)] text-2xl text-[#0B0B0B]">
          {title}
        </p>
        {subtitle ? (
          <p className="text-sm text-[#6B6B6B]">{subtitle}</p>
        ) : null}
      </div>
      {rightSlot}
    </header>
  );
}
