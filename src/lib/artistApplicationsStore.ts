import { ArtistApplication, ArtistStatus } from "@/types/marketplace";

const applications: ArtistApplication[] = [];

export function listArtistApplications() {
  return applications;
}

export function addArtistApplication(
  payload: Omit<ArtistApplication, "id" | "status" | "createdAt">,
) {
  const application: ArtistApplication = {
    ...payload,
    id: crypto.randomUUID(),
    status: ArtistStatus.Pending,
    createdAt: new Date().toISOString(),
  };
  applications.unshift(application);
  return application;
}

export function updateArtistApplicationStatus(
  id: string,
  status: ArtistStatus,
) {
  const index = applications.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  applications[index] = { ...applications[index], status };
  return applications[index];
}
