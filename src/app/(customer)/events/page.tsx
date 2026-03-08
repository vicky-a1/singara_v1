import HeaderBar from "@/components/layout/HeaderBar";

const eventTypes = ["Bridal", "Party", "Editorial", "Corporate", "Haldi"];

export default function EventCategoryPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-6">
      <HeaderBar title="Event Type" subtitle="Select your occasion" />
      <div className="grid grid-cols-2 gap-4 px-5 py-6">
        {eventTypes.map((event) => (
          <div
            key={event}
            className="rounded-[24px] border border-[#E7DED0] bg-white p-5 text-center font-semibold text-[#0B0B0B] shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          >
            {event}
          </div>
        ))}
      </div>
    </div>
  );
}
