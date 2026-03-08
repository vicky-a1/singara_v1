import { bookings } from "@/lib/mockData";
import { Booking, BookingStatus } from "@/types/marketplace";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let bookingStore: Booking[] = [...bookings];

export async function getBookingsByCustomer(
  customerId: string,
): Promise<Booking[]> {
  await delay(300);
  return bookingStore.filter((booking) => booking.customerId === customerId);
}

export async function getBookingsByArtist(
  artistId: string,
): Promise<Booking[]> {
  await delay(300);
  return bookingStore.filter((booking) => booking.artistId === artistId);
}

export async function getAllBookings(): Promise<Booking[]> {
  await delay(300);
  return bookingStore;
}

export async function getBookingById(
  id: string,
): Promise<Booking | undefined> {
  await delay(300);
  return bookingStore.find((booking) => booking.id === id);
}

export async function createBooking(booking: Booking): Promise<Booking> {
  await delay(300);
  bookingStore = [booking, ...bookingStore];
  return booking;
}

export async function cancelBooking(id: string): Promise<Booking | undefined> {
  await delay(300);
  const existing = bookingStore.find((booking) => booking.id === id);
  if (!existing) {
    return undefined;
  }
  const updated = { ...existing, status: BookingStatus.Cancelled };
  bookingStore = bookingStore.map((booking) =>
    booking.id === id ? updated : booking,
  );
  return updated;
}
