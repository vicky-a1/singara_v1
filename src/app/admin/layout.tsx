import BrandHeader from "@/components/layout/BrandHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <BrandHeader variant="dashboard" />
      {children}
    </div>
  );
}
