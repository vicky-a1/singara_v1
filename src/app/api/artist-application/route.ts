import { NextResponse } from "next/server";
import {
  addArtistApplication,
  listArtistApplications,
  updateArtistApplicationStatus,
} from "@/lib/artistApplicationsStore";
import { ArtistStatus } from "@/types/marketplace";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

type ApplicationPayload = {
  name: string;
  phone: string;
  city: string;
  experience: number;
  instagram: string;
  services: string;
  starting_price: number;
  portfolio_images: string[];
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone");
  const applications = listArtistApplications();
  if (phone) {
    const match = applications.find((item) => item.phone === phone);
    return NextResponse.json({ application: match ?? null });
  }
  return NextResponse.json({ applications });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ApplicationPayload;
  const application = addArtistApplication({
    name: payload.name,
    phone: payload.phone,
    city: payload.city,
    experience: payload.experience,
    instagram: payload.instagram,
    services: payload.services,
    startingPrice: payload.starting_price,
    portfolioImages: payload.portfolio_images,
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.headers.get("origin") || "";
  const reviewLink = `${baseUrl}/admin/artist-applications`;
  const resendApiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || "admin@singara.com";

  if (resendApiKey) {
    await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Singara <onboarding@singara.com>",
        to: [adminEmail],
        subject: "New Artist Application - Singara",
        html: `
          <h2>New Artist Application</h2>
          <p><strong>Name:</strong> ${application.name}</p>
          <p><strong>City:</strong> ${application.city}</p>
          <p><strong>Experience:</strong> ${application.experience} years</p>
          <p><strong>Instagram:</strong> ${application.instagram}</p>
          <p><strong>Portfolio:</strong> ${application.portfolioImages.join(", ")}</p>
          <p><a href="${reviewLink}">Review applications</a></p>
        `,
      }),
    });
  }

  return NextResponse.json({ application });
}

export async function PATCH(request: Request) {
  const payload = (await request.json()) as {
    id: string;
    status: ArtistStatus;
  };
  const updated = updateArtistApplicationStatus(payload.id, payload.status);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ application: updated });
}
