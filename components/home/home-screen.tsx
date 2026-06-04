"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  ArrowRightIcon,
  BellIcon,
  BuildingIcon,
  ChevronDownIcon,
  FilterIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/home/icons";
import { FilterChip } from "@/components/home/filter-chip";
import { AvatarBadge, IconButton, NavLink } from "@/components/home/navigation";
import {
  FeaturedPropertyCard,
  PropertyCard,
} from "@/components/home/property-card";
import {
  listingModes,
  propertyTypes,
  type ListingMode,
  type PropertyType,
} from "@/components/home/property-model";
import type { HomePropertiesPage } from "@/lib/supabase/home-properties";
import { cn } from "@/lib/utils";

type HomeFormValues = {
  search: string;
  propertyType: "all" | PropertyType;
};

type HomeScreenProps = HomePropertiesPage;

export function HomeScreen({
  featuredProperties,
  marketProperties,
  filters,
  pagination,
}: HomeScreenProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { handleSubmit, register, reset, setValue, getValues } =
    useForm<HomeFormValues>({
      defaultValues: {
        search: filters.search,
        propertyType: filters.propertyType,
      },
    });

  useEffect(() => {
    reset({
      search: filters.search,
      propertyType: filters.propertyType,
    });
  }, [filters.propertyType, filters.search, reset]);

  const totalPages = Math.max(1, Math.ceil(pagination.total / pagination.pageSize));
  const pageStart = pagination.total === 0
    ? 0
    : (pagination.page - 1) * pagination.pageSize + 1;
  const pageEnd = pagination.total === 0
    ? 0
    : pageStart + marketProperties.length - 1;
  const pageItems = useMemo(
    () => buildPageItems(pagination.page, totalPages),
    [pagination.page, totalPages],
  );
  const previousHref = useMemo(
    () =>
      createHref(pathname, searchParams, {
        page: String(Math.max(1, pagination.page - 1)),
      }),
    [pagination.page, pathname, searchParams],
  );
  const nextHref = useMemo(
    () =>
      createHref(pathname, searchParams, {
        page: String(Math.min(totalPages, pagination.page + 1)),
      }),
    [pagination.page, pathname, searchParams, totalPages],
  );

  const onSubmit = handleSubmit((values) => {
    pushFilters({
      search: values.search.trim(),
      propertyType: values.propertyType,
      listingMode: filters.listingMode,
    });
  });

  const handlePropertyTypeChange = (value: "all" | PropertyType) => {
    setValue("propertyType", value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: false,
    });

    pushFilters({
      search: getValues("search").trim(),
      propertyType: value,
      listingMode: filters.listingMode,
    });
  };

  const handleListingModeChange = (value: "all" | ListingMode) => {
    pushFilters({
      search: getValues("search").trim(),
      propertyType: getValues("propertyType"),
      listingMode: value,
    });
  };

  const handleReset = () => {
    reset({
      search: "",
      propertyType: "all",
    });
    pushFilters({
      search: "",
      propertyType: "all",
      listingMode: "all",
    });
  };

  function pushFilters(nextFilters: {
    search: string;
    propertyType: "all" | PropertyType;
    listingMode: "all" | ListingMode;
  }) {
    const href = createHref(pathname, searchParams, {
      search: nextFilters.search || null,
      propertyType:
        nextFilters.propertyType === "all" ? null : nextFilters.propertyType,
      listingMode:
        nextFilters.listingMode === "all" ? null : nextFilters.listingMode,
      page: null,
    });

    router.push(href);
  }

  return (
    <div className="min-h-screen bg-(--color-clear) text-(--color-nordic)">
      <header className="sticky top-0 z-50 border-b border-[rgba(25,50,47,0.08)] bg-[rgba(238,246,246,0.92)] backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-(--color-nordic) text-white shadow-[0_8px_16px_rgba(25,50,47,0.18)]">
              <BuildingIcon className="h-4.5 w-4.5" />
            </div>
            <span className="text-[20px] font-semibold tracking-[-0.02em]">
              LuxeEstate
            </span>
          </div>

          <nav className="hidden items-center gap-7 md:flex">
            <NavLink href="#" active>
              Buy
            </NavLink>
            <NavLink href="#">Rent</NavLink>
            <NavLink href="#">Sell</NavLink>
            <NavLink href="#">Saved Homes</NavLink>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <IconButton aria-label="Search">
              <SearchIcon className="h-5 w-5" />
            </IconButton>
            <IconButton aria-label="Notifications" badge>
              <BellIcon className="h-5 w-5" />
            </IconButton>
            <div className="hidden h-9 w-px bg-[rgba(25,50,47,0.08)] sm:block" />
            <div className="hidden sm:block">
              <AvatarBadge />
            </div>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(25,50,47,0.08)] bg-white text-(--color-nordic) shadow-[0_6px_16px_rgba(25,50,47,0.06)] transition-colors hover:text-(--color-mosque) md:hidden"
              onClick={() => setMobileMenuOpen((value) => !value)}
              aria-label="Toggle navigation"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className={cn(
            "overflow-hidden border-t border-[rgba(25,50,47,0.06)] bg-(--color-clear) transition-[max-height,opacity] duration-300 md:hidden",
            mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="space-y-1 px-4 py-3 sm:px-6">
            <NavLink
              href="#"
              active
              className="block rounded-xl bg-[rgba(0,102,85,0.08)] px-3 py-2"
            >
              Buy
            </NavLink>
            <NavLink href="#" className="block rounded-xl px-3 py-2">
              Rent
            </NavLink>
            <NavLink href="#" className="block rounded-xl px-3 py-2">
              Sell
            </NavLink>
            <NavLink href="#" className="block rounded-xl px-3 py-2">
              Saved Homes
            </NavLink>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[clamp(2.8rem,5vw,4.9rem)] font-light leading-[0.95] tracking-tighter text-(--color-nordic)">
              Find your{" "}
              <span className="relative inline-block font-semibold">
                sanctuary
                <span className="absolute inset-x-0 bottom-2 -z-10 h-3 -rotate-1 rounded-sm bg-[rgba(0,102,85,0.18)]" />
              </span>
              .
            </h1>

            <form className="mx-auto mt-10 max-w-3xl" onSubmit={onSubmit}>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-[rgba(25,50,47,0.5)]">
                  <SearchIcon className="h-5 w-5" />
                </div>
                <input
                  {...register("search")}
                  placeholder="Search by city, neighborhood, or address..."
                  className="h-16 w-full rounded-[22px] border border-white bg-white pl-14 pr-32 text-[15px] text-(--color-nordic) shadow-[0_8px_24px_rgba(25,50,47,0.07)] outline-none transition-all placeholder:text-[rgba(25,50,47,0.42)] focus:border-[rgba(0,102,85,0.3)] focus:shadow-[0_12px_34px_rgba(25,50,47,0.09)]"
                />
                <button
                  type="submit"
                  className="absolute inset-y-2 right-2 rounded-2xl bg-(--color-mosque) px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(0,102,85,0.24)] transition-colors hover:bg-[rgba(0,102,85,0.92)]"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="mt-7 flex items-center justify-center gap-3 overflow-x-auto pb-1">
              {propertyTypes.map((chip) => (
                <FilterChip
                  key={chip.value}
                  active={filters.propertyType === chip.value}
                  onClick={() => handlePropertyTypeChange(chip.value)}
                >
                  {chip.label}
                </FilterChip>
              ))}
              <div className="mx-1 h-6 w-px shrink-0 bg-[rgba(25,50,47,0.12)]" />
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-(--color-nordic) transition-colors hover:bg-[rgba(25,50,47,0.05)]"
              >
                <FilterIcon className="h-4.5 w-4.5" />
                Filters
                <ChevronDownIcon className="h-4 w-4 opacity-80" />
              </button>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[28px] font-light tracking-[-0.04em] text-(--color-nordic)">
                Featured Collections
              </h2>
              <p className="mt-1 text-sm text-[rgba(25,50,47,0.65)]">
                Curated properties for the discerning eye.
              </p>
            </div>

            <button
              type="button"
              className="hidden items-center gap-1 text-sm font-medium text-(--color-mosque) transition-opacity hover:opacity-75 sm:inline-flex"
            >
              View all
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>

          {featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {featuredProperties.map((property) => (
                <FeaturedPropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-[rgba(25,50,47,0.08)] bg-white p-8 text-sm text-[rgba(25,50,47,0.65)]">
              No featured properties match the current filters.
            </div>
          )}
        </section>

        <section>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[28px] font-light tracking-[-0.04em] text-(--color-nordic)">
                New in Market
              </h2>
              <p className="mt-1 text-sm text-[rgba(25,50,47,0.65)]">
                Fresh opportunities added this week.
              </p>
            </div>

            <div className="hidden rounded-xl bg-white p-1 shadow-[0_4px_16px_rgba(25,50,47,0.04)] md:flex">
              {listingModes.map((mode) => {
                const active = filters.listingMode === mode.value;

                return (
                  <button
                    key={mode.value}
                    type="button"
                    onClick={() => handleListingModeChange(mode.value)}
                    className={cn(
                      "rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-(--color-nordic) text-white shadow-[0_4px_12px_rgba(25,50,47,0.12)]"
                        : "text-[rgba(25,50,47,0.62)] hover:text-(--color-nordic)",
                    )}
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-6 flex gap-2 overflow-x-auto pb-1 md:hidden">
            {listingModes.map((mode) => {
              const active = filters.listingMode === mode.value;

              return (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() => handleListingModeChange(mode.value)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-(--color-nordic) text-white"
                      : "border border-[rgba(25,50,47,0.08)] bg-white text-[rgba(25,50,47,0.62)]",
                  )}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>

          {marketProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {marketProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              <div className="mt-6 text-center text-sm text-[rgba(25,50,47,0.58)]">
                Showing {pageStart}-{pageEnd} of {pagination.total} properties
              </div>

              <div className="mt-12 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-[28px] bg-white/88 p-2 shadow-[0_12px_32px_rgba(25,50,47,0.08)] backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={() => router.push(previousHref, { scroll: false })}
                    disabled={pagination.page <= 1}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                      pagination.page > 1
                        ? "text-[rgba(25,50,47,0.72)] hover:bg-[rgba(25,50,47,0.05)] hover:text-(--color-nordic)"
                        : "cursor-not-allowed text-[rgba(25,50,47,0.28)]",
                    )}
                  >
                    <span className="text-base leading-none">‹</span>
                    Prvious
                  </button>

                  <div className="flex items-center gap-2">
                    {pageItems.map((item, index) =>
                      item === "ellipsis" ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-1 text-sm font-semibold tracking-[0.2em] text-[rgba(25,50,47,0.42)]"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            router.push(
                              createHref(pathname, searchParams, {
                                page: String(item),
                              }),
                              { scroll: false },
                            )
                          }
                          aria-current={item === pagination.page ? "page" : undefined}
                          className={cn(
                            "grid h-12 min-w-12 place-items-center rounded-2xl px-3 text-base font-semibold transition-all",
                            item === pagination.page
                              ? "bg-(--color-nordic) text-white shadow-[0_10px_24px_rgba(25,50,47,0.18)]"
                              : "text-(--color-nordic) hover:bg-[rgba(25,50,47,0.05)]",
                          )}
                        >
                          {item}
                        </button>
                      ),
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push(nextHref, { scroll: false })}
                    disabled={pagination.page >= totalPages}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all",
                      pagination.page < totalPages
                        ? "bg-[rgba(248,248,246,0.96)] text-(--color-nordic) shadow-[0_8px_20px_rgba(25,50,47,0.08)] hover:bg-white"
                        : "cursor-not-allowed bg-[rgba(248,248,246,0.7)] text-[rgba(25,50,47,0.28)]",
                    )}
                  >
                    Next
                    <span className="text-base leading-none">›</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-[rgba(25,50,47,0.08)] bg-white p-8 text-sm text-[rgba(25,50,47,0.65)]">
              No market properties match the current filters.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function createHref(
  pathname: string,
  searchParams: URLSearchParams | { toString(): string },
  updates: Record<string, string | null>,
) {
  const params = new URLSearchParams(searchParams.toString());

  for (const [key, value] of Object.entries(updates)) {
    if (!value || value === "1") {
      params.delete(key);
      continue;
    }

    params.set(key, value);
  }

  const query = params.toString();
  return query.length > 0 ? `${pathname}?${query}` : pathname;
}

function buildPageItems(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis", totalPages] as const;
  }

  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [1, "ellipsis", currentPage, currentPage + 1, "ellipsis", totalPages] as const;
}
