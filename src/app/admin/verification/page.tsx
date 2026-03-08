import HeaderBar from "@/components/layout/HeaderBar";
import Button from "@/components/ui/Button";

const queue = [
  { name: "Leena Sharma", city: "Hyderabad" },
  { name: "Anaya Bose", city: "Kolkata" },
];

export default function ArtistVerificationPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <HeaderBar title="Verification" subtitle="Pending approvals" />
      <div className="space-y-4 px-5 py-6">
        {queue.map((artist) => (
          <div
            key={artist.name}
            className="rounded-[24px] border border-[#E7DED0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          >
            <p className="font-semibold">{artist.name}</p>
            <p className="text-sm text-[#6B6B6B]">{artist.city}</p>
            <div className="mt-4 flex gap-3">
              <Button variant="secondary" fullWidth>
                Reject
              </Button>
              <Button fullWidth>Approve</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
