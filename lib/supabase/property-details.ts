import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { buildPropertyGalleryFallbacks } from "@/lib/property-gallery";
import type {
  ListingMode,
  PropertyDetailsData,
  PropertyListing,
  PropertySurface,
  PropertyType,
} from "@/models/property-model";

type PropertyRow = {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  listing_mode: ListingMode;
  property_type: PropertyType;
  beds: number;
  baths: number;
  area: number;
  latitude: number;
  longitude: number;
  images_url: string[];
  badge: string;
  featured: boolean;
  surface: PropertySurface;
  created_at: string;
};

export const getPropertyDetailsBySlug = cache(async function getPropertyDetailsBySlug(
  slug: string,
): Promise<PropertyDetailsData | null> {
  const supabase = await createClient();

  const { data: propertyRow, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to load property details: ${error.message}`);
  }

  if (!propertyRow) {
    return null;
  }

  const property = mapPropertyRow(propertyRow as PropertyRow);
  const images = normalizePropertyImages(property);

  return {
    property,
    images,
  };
});

function mapPropertyRow(row: PropertyRow): PropertyListing {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    location: row.location,
    price: Number(row.price),
    listingMode: row.listing_mode,
    propertyType: row.property_type,
    beds: row.beds,
    baths: Number(row.baths),
    area: Number(row.area),
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    imagesUrl: row.images_url ?? [],
    badge: row.badge,
    featured: row.featured,
    surface: row.surface,
  };
}

function normalizePropertyImages(property: PropertyListing) {
  const primaryImages = property.imagesUrl.slice(0, 5);

  if (primaryImages.length >= 5) {
    return primaryImages;
  }

  return [...primaryImages, ...buildPropertyGalleryFallbacks(property, primaryImages.length)].slice(0, 5);
}
