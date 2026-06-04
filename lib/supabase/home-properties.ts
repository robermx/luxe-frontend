import {
  type ListingMode,
  type PropertyListing,
  type PropertySurface,
  type PropertyType,
} from "@/components/home/property-model";
import { createClient } from "@/lib/supabase/server";

const DEFAULT_PAGE = 1;
const PAGE_SIZE = 6;
const VALID_PROPERTY_TYPES = new Set<PropertyType>([
  "house",
  "apartment",
  "villa",
  "penthouse",
  "studio",
  "cabin",
  "loft",
]);
const VALID_LISTING_MODES = new Set<ListingMode>(["buy", "rent"]);

type RawSearchParams = Record<string, string | string[] | undefined>;

type PropertyRow = {
  id: string;
  title: string;
  location: string;
  price: number;
  listing_mode: ListingMode;
  property_type: PropertyType;
  beds: number;
  baths: number;
  area: number;
  image: string;
  badge: string;
  featured: boolean;
  surface: PropertySurface;
  created_at: string;
};

export type HomeFilters = {
  search: string;
  propertyType: "all" | PropertyType;
  listingMode: "all" | ListingMode;
};

export type HomePropertiesPage = {
  featuredProperties: PropertyListing[];
  marketProperties: PropertyListing[];
  filters: HomeFilters;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
    loadedCount: number;
  };
};

export function parseHomeFilters(searchParams: RawSearchParams): HomeFilters & { page: number } {
  const search = readSingleValue(searchParams.search).trim();
  const propertyTypeParam = readSingleValue(searchParams.propertyType);
  const listingModeParam = readSingleValue(searchParams.listingMode);
  const pageParam = Number.parseInt(readSingleValue(searchParams.page), 10);

  return {
    search,
    propertyType: VALID_PROPERTY_TYPES.has(propertyTypeParam as PropertyType)
      ? (propertyTypeParam as PropertyType)
      : "all",
    listingMode: VALID_LISTING_MODES.has(listingModeParam as ListingMode)
      ? (listingModeParam as ListingMode)
      : "all",
    page:
      Number.isFinite(pageParam) && pageParam > 0
        ? pageParam
        : DEFAULT_PAGE,
  };
}

export async function getHomePropertiesPage(
  filters: HomeFilters & { page: number },
): Promise<HomePropertiesPage> {
  const supabase = await createClient();
  const searchTerm = sanitizeSearchTerm(filters.search);
  const from = (filters.page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let featuredQuery = supabase
    .from("properties")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .order("id", { ascending: true });

  let marketQuery = supabase
    .from("properties")
    .select("*", { count: "exact" })
    .eq("surface", "market")
    .order("created_at", { ascending: false })
    .order("id", { ascending: true })
    .range(from, to);

  if (filters.propertyType !== "all") {
    featuredQuery = featuredQuery.eq("property_type", filters.propertyType);
    marketQuery = marketQuery.eq("property_type", filters.propertyType);
  }

  if (filters.listingMode !== "all") {
    marketQuery = marketQuery.eq("listing_mode", filters.listingMode);
  }

  if (searchTerm.length > 0) {
    const searchPattern = `%${searchTerm}%`;
    const searchClause = [
      `title.ilike.${searchPattern}`,
      `location.ilike.${searchPattern}`,
      `badge.ilike.${searchPattern}`,
      `property_type.ilike.${searchPattern}`,
      `listing_mode.ilike.${searchPattern}`,
    ].join(",");

    featuredQuery = featuredQuery.or(searchClause);
    marketQuery = marketQuery.or(searchClause);
  }

  const [
    { data: featuredRows, error: featuredError },
    { data: marketRows, error: marketError, count },
  ] = await Promise.all([featuredQuery, marketQuery]);

  if (featuredError) {
    throw new Error(`Unable to load featured properties: ${featuredError.message}`);
  }

  if (marketError) {
    throw new Error(`Unable to load market properties: ${marketError.message}`);
  }

  const marketProperties = (marketRows ?? []).map(mapPropertyRow);
  const total = count ?? 0;

  return {
    featuredProperties: (featuredRows ?? []).map(mapPropertyRow),
    marketProperties,
    filters: {
      search: filters.search,
      propertyType: filters.propertyType,
      listingMode: filters.listingMode,
    },
    pagination: {
      page: filters.page,
      pageSize: PAGE_SIZE,
      total,
      hasMore: filters.page * PAGE_SIZE < total,
      loadedCount: marketProperties.length,
    },
  };
}

function mapPropertyRow(row: PropertyRow): PropertyListing {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    price: Number(row.price),
    listingMode: row.listing_mode,
    propertyType: row.property_type,
    beds: row.beds,
    baths: Number(row.baths),
    area: Number(row.area),
    image: row.image,
    badge: row.badge,
    featured: row.featured,
    surface: row.surface,
  };
}

function readSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function sanitizeSearchTerm(value: string) {
  return value.trim().replaceAll(",", " ").replaceAll("%", "").replaceAll("_", "");
}
