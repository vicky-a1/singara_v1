import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({
  label,
  type = "text",
  className,
  ...rest
}: InputProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm">
      {label ? <span className="text-[#0B0B0B]">{label}</span> : null}
      <input
        type={type}
        className={`h-12 w-full rounded-[14px] border border-[#E7DED0] bg-white px-4 text-[#0B0B0B] outline-none ring-[#C8A96A] focus:ring-2 ${
          className ?? ""
        }`}
        {...rest}
      />
    </label>
  );
}
