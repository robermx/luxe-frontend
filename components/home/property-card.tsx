import Image from "next/image";
import type { ReactNode } from "react";
import {
  AreaIcon,
  BathIcon,
  BedIcon,
  HeartIcon,
  PinIcon,
} from "@/components/home/icons";
import type { PropertyListing } from "@/components/home/property-data";
import { cn } from "@/lib/utils";
import { formatArea, formatPrice } from "@/components/home/property-data";

type PropertyCardProps = {
  property: PropertyListing;
  variant?: "featured" | "market";
};

function Spec({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-[rgba(25,50,47,0.72)] sm:text-xs">
      {icon}
      <span>{children}</span>
    </div>
  );
}

export function PropertyCard({ property, variant = "market" }: PropertyCardProps) {
  const isFeatured = variant === "featured";

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-3xl bg-white shadow-[0_8px_28px_rgba(25,50,47,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(25,50,47,0.12)]",
        isFeatured ? "flex flex-col" : "flex h-full flex-col",
      )}
    >
      <div className={cn("relative overflow-hidden", isFeatured ? "aspect-4/3" : "aspect-4/3")}>
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes={isFeatured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          priority={isFeatured}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_6px_18px_rgba(0,0,0,0.12)]",
            property.listingMode === "rent" ? "bg-(--color-mosque)/90" : "bg-(--color-nordic)/90",
          )}
        >
          {property.badge}
        </span>
        <button
          type="button"
          aria-label={`Save ${property.title}`}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/92 text-(--color-nordic) shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-colors hover:bg-(--color-mosque) hover:text-white"
        >
          <HeartIcon className="h-5 w-5" />
        </button>
      </div>

      <div className={cn("flex flex-1 flex-col", isFeatured ? "p-6" : "p-4")}>
        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className={cn(
                "truncate font-medium tracking-tight text-(--color-nordic) transition-colors group-hover:text-(--color-mosque)",
                isFeatured ? "text-[22px]" : "text-[17px]",
              )}
            >
              {property.title}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-[13px] text-[rgba(25,50,47,0.64)]">
              <PinIcon className="h-4 w-4 shrink-0" />
              <span className="truncate">{property.location}</span>
            </p>
          </div>
          <span
            className={cn(
              "shrink-0 font-semibold tracking-tight text-(--color-mosque)",
              isFeatured ? "text-[22px]" : "text-[17px]",
            )}
          >
            {formatPrice(property.price, property.listingMode)}
          </span>
        </div>

        <div
          className={cn(
            "mt-auto flex items-center justify-between border-t border-[rgba(25,50,47,0.08)] pt-4",
            isFeatured ? "gap-4" : "gap-2",
          )}
        >
          <Spec
            icon={<BedIcon className="h-4 w-4 text-(--color-mosque)" />}
          >
            {property.beds} Beds
          </Spec>
          <Spec
            icon={<BathIcon className="h-4 w-4 text-(--color-mosque)" />}
          >
            {property.baths} Baths
          </Spec>
          <Spec
            icon={<AreaIcon className="h-4 w-4 text-(--color-mosque)" />}
          >
            {formatArea(property.area)}
          </Spec>
        </div>
      </div>
    </article>
  );
}

export function FeaturedPropertyCard({ property }: { property: PropertyListing }) {
  return <PropertyCard property={property} variant="featured" />;
}
