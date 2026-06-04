"use client";

import dynamic from "next/dynamic";
import type { PropertyListing } from "@/models/property-model";

const PropertyMap = dynamic(
  () => import("@/components/property-details/property-map").then((module) => module.PropertyMap),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full min-h-75 place-items-center rounded-[22px] bg-[rgba(25,50,47,0.04)] text-sm text-[rgba(25,50,47,0.56)]">
        Loading map...
      </div>
    ),
  },
);

type PropertyMapCardProps = {
  property: Pick<PropertyListing, "latitude" | "longitude" | "title" | "location">;
};

export function PropertyMapCard({ property }: PropertyMapCardProps) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-[rgba(25,50,47,0.06)] bg-white p-2 shadow-[0_14px_36px_rgba(25,50,47,0.08)]">
      <div className="relative h-80 overflow-hidden rounded-[22px] bg-[rgba(25,50,47,0.04)]">
        <div className="pointer-events-none absolute left-4 top-4 z-[450] max-w-72 rounded-2xl border border-white/80 bg-white/92 px-4 py-3 shadow-[0_10px_24px_rgba(25,50,47,0.14)] backdrop-blur-md">
          <p className="text-sm font-semibold text-(--color-nordic)">{property.title}</p>
          <p className="mt-1 text-xs text-[rgba(25,50,47,0.68)]">{property.location}</p>
        </div>

        <div className="absolute bottom-4 right-4 z-[450]">
          <a
            href={`https://www.google.com/maps?q=${property.latitude},${property.longitude}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-2xl bg-white/92 px-3 py-2 text-xs font-medium text-(--color-nordic) shadow-[0_8px_20px_rgba(25,50,47,0.12)] backdrop-blur-md transition-colors hover:text-(--color-mosque)"
          >
            View on map
          </a>
        </div>

        <PropertyMap
          latitude={property.latitude}
          longitude={property.longitude}
        />
      </div>
    </section>
  );
}
