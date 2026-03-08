"use client";

import { useState } from "react";
import BrandHeader from "@/components/layout/BrandHeader";
import Card from "@/components/layout/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const emptyForm = {
  name: "",
  phone: "",
  city: "",
  experience: "",
  instagram: "",
  services: "",
  startingPrice: "",
};

export default function ArtistApplyPage() {
  const [form, setForm] = useState(emptyForm);
  const [portfolioImages, setPortfolioImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) {
      setPortfolioImages([]);
      return;
    }
    setPortfolioImages(Array.from(files).map((file) => file.name));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/artist-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          city: form.city,
          experience: Number(form.experience || 0),
          instagram: form.instagram,
          services: form.services,
          starting_price: Number(form.startingPrice || 0),
          portfolio_images: portfolioImages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setSuccess(true);
      setForm(emptyForm);
      setPortfolioImages([]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3EF] pb-24">
      <BrandHeader variant="auth" />
      <div className="px-5 py-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#C8A96A]">
              Artist onboarding
            </p>
            <p className="mt-2 font-[family:var(--font-display)] text-3xl text-[#0B0B0B]">
              Become a Verified Makeup Artist on Singara
            </p>
            <p className="mt-2 text-sm text-[#6B6B6B]">
              Share your profile and portfolio to unlock premium bookings.
            </p>
          </div>

          <Card>
            {success ? (
              <div className="space-y-2 text-sm text-[#0B0B0B]">
                <p className="font-semibold">
                  Application submitted successfully. Our team will review it
                  within 24 hours.
                </p>
                <p className="text-[#6B6B6B]">
                  We will contact you via SMS once a decision is made.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Full Name"
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  required
                />
                <Input
                  label="Phone Number"
                  value={form.phone}
                  onChange={(event) =>
                    handleChange("phone", event.target.value)
                  }
                  required
                />
                <Input
                  label="City"
                  value={form.city}
                  onChange={(event) => handleChange("city", event.target.value)}
                  required
                />
                <Input
                  label="Years of Experience"
                  type="number"
                  value={form.experience}
                  onChange={(event) =>
                    handleChange("experience", event.target.value)
                  }
                  required
                />
                <Input
                  label="Instagram Profile"
                  value={form.instagram}
                  onChange={(event) =>
                    handleChange("instagram", event.target.value)
                  }
                />
                <Input
                  label="Service Types"
                  placeholder="Bridal, Party, Editorial"
                  value={form.services}
                  onChange={(event) =>
                    handleChange("services", event.target.value)
                  }
                  required
                />
                <Input
                  label="Starting Price"
                  type="number"
                  value={form.startingPrice}
                  onChange={(event) =>
                    handleChange("startingPrice", event.target.value)
                  }
                  required
                />
                <div className="space-y-2 text-sm text-[#6B6B6B]">
                  <label className="text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                    Portfolio Images Upload
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(event) => handleFiles(event.target.files)}
                    className="w-full rounded-[14px] border border-[#E7DED0] bg-white p-3 text-sm text-[#0B0B0B]"
                  />
                </div>
                {error ? (
                  <p className="text-sm text-red-500">{error}</p>
                ) : null}
                <Button type="submit" fullWidth disabled={submitting}>
                  {submitting ? "Submitting..." : "Apply for Verification"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
