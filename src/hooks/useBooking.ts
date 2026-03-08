import { useEffect, useState } from "react";
import { Booking } from "@/types/marketplace";
import { getBookingById } from "@/services/bookingService";

export function useBooking(id?: string) {
  const [data, setData] = useState<Booking | null>(null);
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
        const result = await getBookingById(id);
        if (!active) {
          return;
        }
        setData(result ?? null);
      } catch (err: unknown) {
        if (!active) {
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to load booking");
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
