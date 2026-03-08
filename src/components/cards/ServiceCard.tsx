type ServiceCardProps = {
  name: string;
  duration: string;
  price: string;
};

export default function ServiceCard({
  name,
  duration,
  price,
}: ServiceCardProps) {
  return (
    <div className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <p className="font-semibold">{name}</p>
      <div className="mt-2 flex items-center justify-between text-sm text-[#6B6B6B]">
        <span>{duration}</span>
        <span className="text-[#0B0B0B]">{price}</span>
      </div>
    </div>
  );
}
