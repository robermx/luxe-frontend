export type ListingMode = "buy" | "rent";

export type PropertyType =
  | "house"
  | "apartment"
  | "villa"
  | "penthouse"
  | "studio"
  | "cabin"
  | "loft";

export type PropertySurface = "collection" | "market";

export type PropertyListing = {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  listingMode: ListingMode;
  propertyType: PropertyType;
  beds: number;
  baths: number;
  area: number;
  latitude: number;
  longitude: number;
  imagesUrl: string[];
  badge: string;
  featured: boolean;
  surface: PropertySurface;
};

export type PropertyDetailsData = {
  property: PropertyListing;
  images: string[];
};

export const propertyTypes: Array<{
  label: string;
  value: "all" | PropertyType;
}> = [
  { label: "All", value: "all" },
  { label: "House", value: "house" },
  { label: "Apartment", value: "apartment" },
  { label: "Villa", value: "villa" },
  { label: "Penthouse", value: "penthouse" },
];

export const listingModes: Array<{
  label: string;
  value: "all" | ListingMode;
}> = [
  { label: "All", value: "all" },
  { label: "Buy", value: "buy" },
  { label: "Rent", value: "rent" },
];

export function formatArea(area: number) {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(area)} sqft`;
}

export function formatPrice(price: number, listingMode: ListingMode) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

  return listingMode === "rent" ? `${formattedPrice}/mo` : formattedPrice;
}
