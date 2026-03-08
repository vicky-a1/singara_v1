import { useEffect, useState } from "react";
import { Artist } from "@/types/marketplace";
import { getAllArtists } from "@/services/artistService";

export function useArtists() {
  const [data, setData] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getAllArtists();
        if (!active) {
          return;
        }
        setData(result);
      } catch (err: unknown) {
        if (!active) {
          return;
        }
        setError(
          err instanceof Error ? err.message : "Failed to load artists",
        );
      } finally {
        if (!active) {
          return;
        }
        setLoading(false);
      }
    };

    run();

    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}
