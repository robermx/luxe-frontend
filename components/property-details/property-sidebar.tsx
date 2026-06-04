import type { PropertyListing } from "@/models/property-model";
import { formatPrice } from "@/models/property-model";
import { ChatIcon, PinIcon, PhoneIcon, HeartIcon } from "@/components/home/icons";
import { PropertyMapCard } from "@/components/property-details/property-map-card";

type PropertySidebarProps = {
  property: PropertyListing;
};

export function PropertySidebar({ property }: PropertySidebarProps) {
  const isRent = property.listingMode === "rent";
  const monthlyEstimate = isRent
    ? formatPrice(property.price, property.listingMode)
    : `${formatPrice(Math.round(property.price * 0.0062), "rent")}`;

  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      <section className="rounded-[28px] border border-[rgba(25,50,47,0.06)] bg-white p-6 shadow-[0_14px_36px_rgba(25,50,47,0.08)]">
        <div className="mb-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-(--color-mosque)">
            {property.badge}
          </p>
          <h1 className="mt-3 text-4xl font-light tracking-tighter text-(--color-nordic)">
            {formatPrice(property.price, property.listingMode)}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-[rgba(25,50,47,0.68)]">
            <PinIcon className="h-4 w-4 shrink-0 text-(--color-mosque)" />
            <span>{property.location}</span>
          </p>
        </div>

        <div className="h-px bg-[rgba(25,50,47,0.08)]" />

        <div className="mt-5 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f2d8c5,#e7b38c)] text-lg font-semibold text-(--color-nordic) shadow-[0_10px_24px_rgba(25,50,47,0.1)]">
            SJ
          </div>
          <div>
            <h2 className="font-semibold text-(--color-nordic)">Sarah Jenkins</h2>
            <p className="mt-1 text-xs font-medium text-(--color-mosque)">Top Rated Agent</p>
          </div>
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full bg-[rgba(0,102,85,0.1)] text-(--color-mosque) transition-colors hover:bg-(--color-mosque) hover:text-white"
              aria-label="Message agent"
            >
              <ChatIcon className="h-4.5 w-4.5" />
            </button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full bg-[rgba(0,102,85,0.1)] text-(--color-mosque) transition-colors hover:bg-(--color-mosque) hover:text-white"
              aria-label="Call agent"
            >
              <PhoneIcon className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-(--color-mosque) px-5 py-4 text-sm font-semibold text-white shadow-[0_16px_28px_rgba(0,102,85,0.18)] transition-colors hover:bg-[rgba(0,102,85,0.92)]"
          >
            <span className="text-base">↗</span>
            {isRent ? "Schedule Tour" : "Schedule Visit"}
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[rgba(25,50,47,0.1)] bg-white px-5 py-4 text-sm font-semibold text-[rgba(25,50,47,0.78)] transition-colors hover:border-(--color-mosque) hover:text-(--color-mosque)"
          >
            <HeartIcon className="h-4.5 w-4.5" />
            Contact Agent
          </button>
        </div>

        <div className="mt-5 rounded-[22px] bg-[rgba(238,246,246,0.82)] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(25,50,47,0.48)]">
            Payment Snapshot
          </p>
          <p className="mt-2 text-sm text-[rgba(25,50,47,0.7)]">
            {isRent
              ? `Current monthly rate from ${monthlyEstimate}.`
              : `Estimated from ${monthlyEstimate} with 20% down.`}
          </p>
        </div>
      </section>

      <PropertyMapCard property={property} />
    </aside>
  );
}
