import type { PropertyDetailsData } from "@/models/property-model";
import { PropertyGallery } from "@/components/property-details/property-gallery";
import { PropertySections } from "@/components/property-details/property-sections";
import { PropertySidebar } from "@/components/property-details/property-sidebar";

type PropertyDetailsScreenProps = PropertyDetailsData;

export function PropertyDetailsScreen({
  property,
  images,
}: PropertyDetailsScreenProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mb-8 flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgba(25,50,47,0.48)]">
          Properties / {property.slug}
        </p>
        <h1 className="text-[clamp(2rem,3vw,3rem)] font-light tracking-tighter text-(--color-nordic)">
          {property.title}
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-[rgba(25,50,47,0.68)]">
          Explore the gallery, review the location, and compare the details before you book a
          visit or contact the agent directly.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <PropertyGallery property={property} images={images} />
          <PropertySections property={property} />
        </div>

        <div className="lg:col-span-4">
          <PropertySidebar property={property} />
        </div>
      </div>
    </main>
  );
}
