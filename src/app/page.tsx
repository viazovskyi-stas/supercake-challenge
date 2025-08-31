import { ServerCustomersApi } from '../shared/api/server-customers';
import { CustomerSearchPage } from '../widgets/customer-search-page';

interface HomePageProps {
  searchParams: Promise<{
    search?: string;
    species?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  // Извлекаем параметры из URL (await для Next.js 15+)
  const resolvedSearchParams = await searchParams;
  const searchText = resolvedSearchParams.search || '';
  const selectedSpecies = resolvedSearchParams.species 
    ? resolvedSearchParams.species.split(',').filter(Boolean) 
    : [];

  // Выполняем серверный запрос с учетом параметров
  const customersData = await ServerCustomersApi.getCustomers({
    searchText: searchText || undefined,
    species: selectedSpecies.length > 0 ? selectedSpecies : undefined,
  });

  return (
    <CustomerSearchPage
      initialCustomers={customersData.customers}
      initialSearchText={searchText}
      initialSelectedSpecies={selectedSpecies}
    />
  );
}
