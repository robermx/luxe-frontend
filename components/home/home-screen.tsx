"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  ArrowRightIcon,
  BellIcon,
  BuildingIcon,
  ChevronDownIcon,
  FilterIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/home/icons";
import { AvatarBadge, IconButton, NavLink } from "@/components/home/navigation";
import { FilterChip } from "@/components/home/filter-chip";
import {
  FeaturedPropertyCard,
  PropertyCard,
} from "@/components/home/property-card";
import {
  listingModes,
  properties,
  propertyTypes,
  type ListingMode,
  type PropertyType,
} from "@/components/home/property-data";
import { cn } from "@/lib/utils";

type HomeFilters = {
  search: string;
  propertyType: "all" | PropertyType;
};

const INITIAL_VISIBLE_MARKET_PROPERTIES = 6;

export function HomeScreen() {
  const [marketMode, setMarketMode] = useState<"all" | ListingMode>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleMarketCount, setVisibleMarketCount] = useState(
    INITIAL_VISIBLE_MARKET_PROPERTIES,
  );

  const { control, handleSubmit, register, setValue, reset } = useForm<HomeFilters>({
    defaultValues: {
      search: "",
      propertyType: "all",
    },
  });

  const searchValue = useWatch({ control, name: "search" }) ?? "";
  const propertyTypeValue = useWatch({ control, name: "propertyType" }) ?? "all";

  const normalizedSearch = searchValue.trim().toLowerCase();

  const matchesFilters = (property: (typeof properties)[number]) => {
    const searchableText = [
      property.title,
      property.location,
      property.badge,
      property.propertyType,
      property.listingMode,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      normalizedSearch.length === 0 || searchableText.includes(normalizedSearch);
    const matchesType =
      propertyTypeValue === "all" || property.propertyType === propertyTypeValue;

    return matchesSearch && matchesType;
  };

  const featuredProperties = properties.filter((property) => property.featured && matchesFilters(property));

  const marketProperties = properties.filter((property) => {
    const matchesBaseFilters = matchesFilters(property);
    const matchesMarketMode =
      marketMode === "all" || property.listingMode === marketMode;

    return !property.featured && matchesBaseFilters && matchesMarketMode;
  });

  const visibleMarketProperties = marketProperties.slice(0, visibleMarketCount);
  const hasMoreMarketProperties = marketProperties.length > visibleMarketProperties.length;

  const onSubmit = () => {
    setVisibleMarketCount(INITIAL_VISIBLE_MARKET_PROPERTIES);
  };

  const handleFilterChange = (value: "all" | PropertyType) => {
    setValue("propertyType", value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: false,
    });
  };

  const handleReset = () => {
    reset({
      search: "",
      propertyType: "all",
    });
    setMarketMode("all");
  };

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
            <NavLink href="#" active className="block rounded-xl px-3 py-2 bg-[rgba(0,102,85,0.08)]">
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

            <form
              className="mx-auto mt-10 max-w-3xl"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                  active={propertyTypeValue === chip.value}
                  onClick={() => handleFilterChange(chip.value)}
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
                const active = marketMode === mode.value;

                return (
                  <button
                    key={mode.value}
                    type="button"
                    onClick={() => setMarketMode(mode.value)}
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
              const active = marketMode === mode.value;

              return (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() => setMarketMode(mode.value)}
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

          {visibleMarketProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleMarketProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleMarketCount((current) => current + INITIAL_VISIBLE_MARKET_PROPERTIES)
                  }
                  disabled={!hasMoreMarketProperties}
                  className={cn(
                    "rounded-2xl border px-6 py-3 text-sm font-medium transition-all",
                    hasMoreMarketProperties
                      ? "border-[rgba(25,50,47,0.12)] bg-white text-(--color-nordic) hover:border-(--color-mosque) hover:text-(--color-mosque) hover:shadow-[0_10px_24px_rgba(25,50,47,0.08)]"
                      : "cursor-not-allowed border-[rgba(25,50,47,0.08)] bg-[rgba(255,255,255,0.58)] text-[rgba(25,50,47,0.35)]",
                  )}
                >
                  Load more properties
                </button>
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
