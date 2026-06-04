import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetailsScreen } from "@/components/property-details/property-details-screen";
import { getPropertyDetailsBySlug } from "@/lib/supabase/property-details";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const details = await getPropertyDetailsBySlug(slug);

  if (!details) {
    return {
      title: "Property not found | Luxe Estate",
      description: "The requested property could not be found.",
    };
  }

  return {
    title: `${details.property.title} | Luxe Estate`,
    description: `Discover ${details.property.title} in ${details.property.location}.`,
  };
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;
  const details = await getPropertyDetailsBySlug(slug);

  if (!details) {
    notFound();
  }

  return <PropertyDetailsScreen {...details} />;
}
