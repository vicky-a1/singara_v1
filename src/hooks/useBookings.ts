import { useEffect, useState } from "react";
import { Booking } from "@/types/marketplace";
import {
  getAllBookings,
  getBookingsByArtist,
  getBookingsByCustomer,
} from "@/services/bookingService";

type BookingQuery =
  | string
  | {
      customerId?: string;
      artistId?: string;
      all?: boolean;
    };

export function useBookings(query?: BookingQuery) {
  const customerId = typeof query === "string" ? query : query?.customerId;
  const artistId = typeof query === "string" ? undefined : query?.artistId;
  const all = typeof query === "string" ? false : query?.all;
  const hasQuery = Boolean(customerId || artistId || all);
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(hasQuery);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const run = async () => {
      if (!customerId && !artistId && !all) {
        setData([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const result = all
          ? await getAllBookings()
          : artistId
            ? await getBookingsByArtist(artistId)
            : await getBookingsByCustomer(customerId as string);
        if (!active) {
          return;
        }
        setData(result);
      } catch (err: unknown) {
        if (!active) {
          return;
        }
        setError(
          err instanceof Error ? err.message : "Failed to load bookings",
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
  }, [artistId, customerId, all]);

  return { data, loading, error };
}
