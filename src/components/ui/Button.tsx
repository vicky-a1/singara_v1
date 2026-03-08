import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const base =
  "inline-flex items-center justify-center rounded-[16px] px-5 py-3 text-sm font-semibold tracking-wide transition shadow-[0_10px_30px_rgba(0,0,0,0.08)]";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-[#0B0B0B] text-white hover:opacity-90",
  secondary:
    "border border-[#C8A96A] text-[#0B0B0B] hover:bg-[#F4ECDD]",
  ghost: "text-[#C8A96A] hover:text-[#0B0B0B]",
};

export default function Button({
  children,
  variant = "primary",
  fullWidth,
  type = "button",
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
