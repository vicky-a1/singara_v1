import { artists, portfolioImages, services } from "@/lib/mockData";
import {
  Artist,
  ArtistStatus,
  PortfolioImage,
  ServicePackage,
} from "@/types/marketplace";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getAllArtists(): Promise<Artist[]> {
  await delay(300);
  return artists.filter((artist) => artist.artistStatus === ArtistStatus.Approved);
}

export async function getArtistById(id: string): Promise<Artist | undefined> {
  await delay(300);
  return artists.find(
    (artist) =>
      artist.id === id && artist.artistStatus === ArtistStatus.Approved,
  );
}

export async function getArtistServices(
  artistId: string,
): Promise<ServicePackage[]> {
  await delay(300);
  return services.filter((service) => service.artistId === artistId);
}

export async function getArtistPortfolio(
  artistId: string,
): Promise<PortfolioImage[]> {
  await delay(300);
  return portfolioImages.filter((image) => image.artistId === artistId);
}
