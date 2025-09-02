import { ServerCustomersApi } from "@/shared/api/server-customers";
import { CustomerSearchPage } from "@/widgets/customer-search-page";
import { Species, TagName } from "@/shared/utils/species";

interface HomePageProps {
  searchParams: Promise<{
    search?: string;
    species?: string | string[];
    tags?: string | string[];
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const searchText = resolvedSearchParams.search || "";
  
  const selectedSpecies = Array.isArray(resolvedSearchParams.species) 
    ? resolvedSearchParams.species as Species[]
    : resolvedSearchParams.species ? [resolvedSearchParams.species as Species] : [];
    
  const selectedTags = Array.isArray(resolvedSearchParams.tags) 
    ? resolvedSearchParams.tags as TagName[]
    : resolvedSearchParams.tags ? [resolvedSearchParams.tags as TagName] : [];

  const customersData = await ServerCustomersApi.getCustomers({
    searchText: searchText || undefined,
    species: selectedSpecies.length ? selectedSpecies : undefined,
    tags: selectedTags.length ? selectedTags : undefined,
  });



  return (
    <CustomerSearchPage
      initialCustomers={customersData.customers}
      searchText={searchText}
      selectedSpecies={selectedSpecies}
      selectedTags={selectedTags}
    />
  );
}
