import HeaderBar from "@/components/layout/HeaderBar";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ArtistProfileEditPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="Profile" subtitle="Artist settings" />
      <div className="space-y-6 px-5 py-6">
        <div className="space-y-3 rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <Input label="Display Name" placeholder="Aira Khan" />
          <Input label="City" placeholder="Bengaluru" />
          <Input label="Signature Style" placeholder="Soft glam, dewy finish" />
        </div>
        <div className="space-y-3 rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <p className="text-sm uppercase tracking-[0.3em] text-[#6B6B6B]">
            Pricing
          </p>
          <Input label="Bridal Package" placeholder="₹18,000" />
          <Input label="Party Glam" placeholder="₹9,500" />
        </div>
        <Button fullWidth>Save Changes</Button>
      </div>
    </div>
  );
}
