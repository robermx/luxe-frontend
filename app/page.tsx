import { HomeScreen } from "@/components/home/home-screen";
import {
  getHomePropertiesPage,
  parseHomeFilters,
} from "@/lib/supabase/home-properties";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const filters = parseHomeFilters(resolvedSearchParams);
  const homeProperties = await getHomePropertiesPage(filters);

  return <HomeScreen {...homeProperties} />;
}
