import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
