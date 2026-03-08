import Image from "next/image";

export default function Logo({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/brand/singara-logo.svg"
      alt="Singara"
      width={size}
      height={size}
      priority
      className={className}
    />
  );
}
