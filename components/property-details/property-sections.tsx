import type { ReactNode } from "react";
import {
  ArrowRightIcon,
  AreaIcon,
  BathIcon,
  BedIcon,
  CheckIcon,
  HomeIcon,
} from "@/components/home/icons";
import { formatArea, formatPrice, type PropertyListing } from "@/models/property-model";

type PropertySectionsProps = {
  property: PropertyListing;
};

const AMENITIES = [
  "Smart home system",
  "Swimming pool",
  "Central heating & cooling",
  "Electric vehicle charging",
  "Private gym",
  "Wine cellar",
];

export function PropertySections({ property }: PropertySectionsProps) {
  const isRent = property.listingMode === "rent";
  const monthlyEstimate = isRent
    ? formatPrice(property.price, property.listingMode)
    : formatPrice(Math.round(property.price * 0.0062), "rent");

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-[rgba(25,50,47,0.06)] bg-white p-7 shadow-[0_14px_36px_rgba(25,50,47,0.08)]">
        <h2 className="text-lg font-semibold text-(--color-nordic)">Property Features</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <FeatureStat icon={<AreaIcon className="h-5 w-5" />} label="Area" value={formatArea(property.area)} />
          <FeatureStat icon={<BedIcon className="h-5 w-5" />} label="Bedrooms" value={`${property.beds}`} />
          <FeatureStat icon={<BathIcon className="h-5 w-5" />} label="Bathrooms" value={`${property.baths}`} />
          <FeatureStat icon={<HomeIcon className="h-5 w-5" />} label="Type" value={property.propertyType} />
        </div>
      </section>

      <section className="rounded-[28px] border border-[rgba(25,50,47,0.06)] bg-white p-7 shadow-[0_14px_36px_rgba(25,50,47,0.08)]">
        <h2 className="text-lg font-semibold text-(--color-nordic)">About this home</h2>
        <div className="prose mt-4 max-w-none text-[15px] leading-7 text-[rgba(25,50,47,0.72)]">
          <p>
            {property.title} blends editorial calm with practical luxury, pairing generous
            natural light, softened materials, and a layout designed for both gathering and
            quiet retreat in {property.location}.
          </p>
          <p>
            The interior narrative is guided by clean lines and warm transitions, while the
            plan supports modern daily life with open social zones, private bedrooms, and
            spaces that adapt effortlessly to work, hosting, or relaxing.
          </p>
        </div>

        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-(--color-mosque) transition-colors hover:gap-3"
        >
          Read more
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </section>

      <section className="rounded-[28px] border border-[rgba(25,50,47,0.06)] bg-white p-7 shadow-[0_14px_36px_rgba(25,50,47,0.08)]">
        <h2 className="text-lg font-semibold text-(--color-nordic)">Amenities</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {AMENITIES.map((amenity) => (
            <div key={amenity} className="flex items-center gap-3 text-sm text-[rgba(25,50,47,0.72)]">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[rgba(0,102,85,0.08)] text-(--color-mosque)">
                <CheckIcon className="h-4 w-4" />
              </span>
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-[rgba(0,102,85,0.12)] bg-[rgba(0,102,85,0.06)] p-6 shadow-[0_12px_28px_rgba(25,50,47,0.06)]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-(--color-mosque) shadow-[0_8px_18px_rgba(25,50,47,0.08)]">
              <span className="text-lg">⌘</span>
            </div>
            <div>
              <h3 className="font-semibold text-(--color-nordic)">Estimated Payment</h3>
              <p className="mt-1 text-sm text-[rgba(25,50,47,0.68)]">
                {isRent
                  ? `Monthly commitment from ${monthlyEstimate}.`
                  : `Starting from ${monthlyEstimate} with 20% down.`}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl border border-[rgba(25,50,47,0.08)] bg-white px-4 py-3 text-sm font-semibold text-(--color-nordic) transition-colors hover:border-(--color-mosque) hover:text-(--color-mosque)"
          >
            Calculate Mortgage
          </button>
        </div>
      </section>
    </div>
  );
}

function FeatureStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[20px] border border-[rgba(0,102,85,0.08)] bg-[rgba(0,102,85,0.04)] p-4 text-center">
      <span className="mb-2 text-(--color-mosque)">{icon}</span>
      <span className="text-[22px] font-semibold tracking-tight text-(--color-nordic)">
        {value}
      </span>
      <span className="mt-1 text-xs uppercase tracking-[0.16em] text-[rgba(25,50,47,0.48)]">
        {label}
      </span>
    </div>
  );
}
