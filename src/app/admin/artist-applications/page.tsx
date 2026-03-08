"use client";

import { useEffect, useState } from "react";
import HeaderBar from "@/components/layout/HeaderBar";
import Card from "@/components/layout/Card";
import Button from "@/components/ui/Button";
import LoadingAnimation from "@/components/feedback/LoadingAnimation";
import { ArtistApplication, ArtistStatus } from "@/types/marketplace";

export default function ArtistApplicationsPage() {
  const [applications, setApplications] = useState<ArtistApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const response = await fetch("/api/artist-application");
      const data = (await response.json()) as {
        applications: ArtistApplication[];
      };
      setApplications(data.applications ?? []);
      setLoading(false);
    };
    run();
  }, []);

  const updateStatus = async (id: string, status: ArtistStatus) => {
    const response = await fetch("/api/artist-application", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!response.ok) {
      return;
    }
    const data = (await response.json()) as { application: ArtistApplication };
    setApplications((prev) =>
      prev.map((item) => (item.id === id ? data.application : item)),
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <HeaderBar
        title="Artist Applications"
        subtitle="Review onboarding submissions"
      />
      <div className="space-y-4 px-5 py-6">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <LoadingAnimation className="h-24 w-24" />
          </div>
        ) : applications.length === 0 ? (
          <Card className="text-center text-sm text-[#6B6B6B]">
            No applications yet.
          </Card>
        ) : (
          <div className="overflow-hidden rounded-[24px] border border-[#E7DED0] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-5 gap-4 border-b border-[#E7DED0] bg-[#F7F3EF] px-5 py-4 text-xs uppercase tracking-[0.2em] text-[#6B6B6B]">
              <span>Artist Name</span>
              <span>City</span>
              <span>Experience</span>
              <span>Instagram</span>
              <span>Portfolio</span>
            </div>
            {applications.map((application) => (
              <div
                key={application.id}
                className="grid grid-cols-5 gap-4 border-b border-[#E7DED0] px-5 py-4 text-sm text-[#0B0B0B]"
              >
                <div>
                  <p className="font-semibold">{application.name}</p>
                  <p className="text-xs text-[#6B6B6B]">
                    {application.status}
                  </p>
                </div>
                <span>{application.city}</span>
                <span>{application.experience} yrs</span>
                <span className="truncate">{application.instagram}</span>
                <div className="space-y-2">
                  <div className="text-xs text-[#6B6B6B]">
                    {application.portfolioImages.join(", ") || "No files"}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() =>
                        updateStatus(application.id, ArtistStatus.Rejected)
                      }
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() =>
                        updateStatus(application.id, ArtistStatus.Approved)
                      }
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
