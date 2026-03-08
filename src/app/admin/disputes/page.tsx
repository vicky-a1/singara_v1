import HeaderBar from "@/components/layout/HeaderBar";
import Button from "@/components/ui/Button";

const disputes = [
  { id: "DSP-104", status: "Open", customer: "Rhea Kapoor" },
  { id: "DSP-103", status: "Review", customer: "Neha Varma" },
];

export default function DisputePanelPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <HeaderBar title="Disputes" subtitle="Resolution queue" />
      <div className="space-y-4 px-5 py-6">
        {disputes.map((caseItem) => (
          <div
            key={caseItem.id}
            className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          >
            <p className="font-semibold">{caseItem.id}</p>
            <p className="text-sm text-[#6B6B6B]">{caseItem.customer}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
              {caseItem.status}
            </p>
            <div className="mt-4 flex gap-3">
              <Button variant="secondary" fullWidth>
                Refund
              </Button>
              <Button fullWidth>Resolve</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
