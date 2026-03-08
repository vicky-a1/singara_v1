import { useEffect, useState } from "react";
import { Artist } from "@/types/marketplace";
import { getArtistById } from "@/services/artistService";

export function useArtist(id?: string) {
  const [data, setData] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const run = async () => {
      if (!id) {
        setData(null);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const result = await getArtistById(id);
        if (!active) {
          return;
        }
        setData(result ?? null);
      } catch (err: unknown) {
        if (!active) {
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to load artist");
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
  }, [id]);

  return { data, loading, error };
}
