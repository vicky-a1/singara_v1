import HeaderBar from "@/components/layout/HeaderBar";
import PortfolioGrid from "@/components/gallery/PortfolioGrid";
import Button from "@/components/ui/Button";
import { portfolioImages } from "@/lib/mockData";

export default function PortfolioManagerPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <HeaderBar title="Portfolio" subtitle="Showcase your artistry" />
      <div className="space-y-6 px-5 py-6">
        <Button fullWidth>Upload New Look</Button>
        <PortfolioGrid
          items={portfolioImages.slice(0, 8)}
        />
      </div>
    </div>
  );
}
