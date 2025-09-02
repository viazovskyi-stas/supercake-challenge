import { ServerCustomersApi } from "@/shared/api/server-customers";
import { CustomerSearchPage } from "@/widgets/customer-search-page";

interface HomePageProps {
  searchParams: Promise<{
    search?: string;
    species?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const searchText = resolvedSearchParams.search || "";
  const selectedSpecies = resolvedSearchParams.species
    ? resolvedSearchParams.species.split(",").filter(Boolean)
    : [];

  const customersData = await ServerCustomersApi.getCustomers({
    searchText: searchText || undefined,
    species: selectedSpecies.length > 0 ? selectedSpecies : undefined,
  });

  return (
    <CustomerSearchPage
      initialCustomers={customersData.customers}
      searchText={searchText}
      selectedSpecies={selectedSpecies}
    />
  );
}
