"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { PropertyListing } from "@/models/property-model";
import { cn } from "@/lib/utils";

type PropertyGalleryProps = {
  property: PropertyListing;
  images: string[];
};

export function PropertyGallery({ property, images }: PropertyGalleryProps) {
  const sortedImages = useMemo(
    () => images.slice(0, 5),
    [images],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = sortedImages[activeIndex] ?? sortedImages[0];

  if (!activeImage) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="relative overflow-hidden rounded-[28px] border border-[rgba(25,50,47,0.06)] bg-white shadow-[0_14px_40px_rgba(25,50,47,0.08)]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            key={activeImage}
            src={activeImage}
            alt={`${property.title} gallery image ${activeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover object-center transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-linear-to-t from-[rgba(18,32,30,0.22)] via-transparent to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-(--color-nordic)/92 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_8px_18px_rgba(0,0,0,0.1)]">
              {property.badge}
            </span>
            <span className="rounded-full bg-white/88 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-(--color-nordic) backdrop-blur-md shadow-[0_8px_18px_rgba(0,0,0,0.08)]">
              {sortedImages.length} photos
            </span>
          </div>

          <button
            type="button"
            className="absolute bottom-4 right-4 rounded-2xl bg-white/92 px-4 py-2 text-sm font-medium text-(--color-nordic) shadow-[0_8px_20px_rgba(25,50,47,0.12)] backdrop-blur-md transition-colors hover:text-(--color-mosque)"
          >
            View all photos
          </button>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {sortedImages.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={`${property.id}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "group relative flex-none overflow-hidden rounded-2xl border transition-all",
                isActive
                  ? "border-(--color-mosque) ring-2 ring-(--color-mosque) ring-offset-2 ring-offset-(--color-clear)"
                  : "border-[rgba(25,50,47,0.08)] opacity-70 hover:opacity-100",
              )}
              aria-label={`Show gallery image ${index + 1}`}
            >
              <div className="relative h-24 w-32 sm:h-28 sm:w-40">
                <Image
                  src={image}
                  alt={`${property.title} thumbnail ${index + 1}`}
                  fill
                  sizes="160px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
