import { ServerCustomersApi } from "@/shared/api/server-customers";
import { CustomerSearchPage } from "@/widgets/customer-search-page";

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
    ? resolvedSearchParams.species 
    : resolvedSearchParams.species ? [resolvedSearchParams.species] : [];
    
  const selectedTags = Array.isArray(resolvedSearchParams.tags) 
    ? resolvedSearchParams.tags 
    : resolvedSearchParams.tags ? [resolvedSearchParams.tags] : [];

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
