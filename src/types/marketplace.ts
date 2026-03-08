export enum UserRole {
  Customer = "customer",
  Artist = "artist",
  Admin = "admin",
}

export enum BookingStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Completed = "completed",
  Cancelled = "cancelled",
}

export enum PaymentStatus {
  Unpaid = "unpaid",
  Authorized = "authorized",
  Paid = "paid",
  Refunded = "refunded",
}

export enum ArtistStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP";

export interface MoneyAmount {
  amount: number;
  currency: CurrencyCode;
  display: string;
}

export interface Location {
  label: string;
  addressLine1?: string;
  addressLine2?: string;
  city: string;
  region?: string;
  postalCode?: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
  preferredLocation?: Location;
  skinTone?: string;
  skinType?: string;
  stylePreference?: string;
  consentForImages?: boolean;
}

export interface PortfolioImage {
  id: string;
  artistId: string;
  url: string;
  thumbnailUrl?: string;
  altText?: string;
  tags?: string[];
  isFeatured?: boolean;
  sortOrder?: number;
  createdAt: string;
}

export interface ServicePackage {
  id: string;
  artistId: string;
  name: string;
  description?: string;
  durationMinutes: number;
  price: MoneyAmount;
  includes?: string[];
  addOns?: ServicePackageAddOn[];
  isActive: boolean;
}

export interface ServicePackageAddOn {
  id: string;
  name: string;
  price: MoneyAmount;
}

export interface ArtistAvailability {
  id: string;
  artistId: string;
  date?: string;
  dayOfWeek?: number;
  startTime: string;
  endTime: string;
  timezone: string;
  isAvailable: boolean;
}

export interface Artist {
  id: string;
  name: string;
  profileImage?: string;
  rating: number;
  reviewCount: number;
  priceFrom: MoneyAmount;
  verified: boolean;
  artistStatus: ArtistStatus;
  experienceYears: number;
  completionRate: number;
  responseTime: string;
  location: Location;
  services: ServicePackage[];
  availability?: ArtistAvailability[];
  portfolio?: PortfolioImage[];
  about?: string;
}

export interface ArtistApplication {
  id: string;
  name: string;
  phone: string;
  city: string;
  experience: number;
  instagram: string;
  services: string;
  startingPrice: number;
  portfolioImages: string[];
  status: ArtistStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  artistId: string;
  bookingId?: string;
  authorId: string;
  authorName: string;
  authorAvatarUrl?: string;
  rating: number;
  comment?: string;
  images?: string[];
  createdAt: string;
}

export interface PaymentSummary {
  subtotal: MoneyAmount;
  addOnsTotal?: MoneyAmount;
  platformFee: MoneyAmount;
  taxes?: MoneyAmount;
  total: MoneyAmount;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  transactionId?: string;
}

export interface Booking {
  id: string;
  customerId: string;
  artistId: string;
  serviceId: string;
  date: string;
  time: string;
  location: Location;
  totalPrice: MoneyAmount;
  platformFee: MoneyAmount;
  status: BookingStatus;
  createdAt: string;
  skinTone?: string;
  skinType?: string;
  stylePreference?: string;
  consentForImages?: boolean;
  notes?: string;
  payment?: PaymentSummary;
}
