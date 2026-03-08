type BookingStepperProps = {
  current: number;
  steps: string[];
};

export default function BookingStepper({ current, steps }: BookingStepperProps) {
  return (
    <div className="flex items-center justify-between gap-2 px-5 pt-6">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-1 flex-col gap-2">
          <div
            className={`h-1 rounded-full ${
              index <= current ? "bg-[#C8A96A]" : "bg-[#E7DED0]"
            }`}
          />
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B]">
            {step}
          </p>
        </div>
      ))}
    </div>
  );
}
