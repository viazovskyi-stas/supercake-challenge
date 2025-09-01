'use client';

import { useMemo } from 'react';
import { Customer } from '../../../shared/types';
import { useSearch } from '../../../features/customer-search';
import { PetsPopover } from '../../../features/pet-filter';
import { CustomerList } from '../../../widgets/customer-list';
import { getAllSpecies } from '../../../shared/utils/species';
import { SearchInput } from '../../../shared/ui';
import { useAllCustomers } from '../../../shared/hooks/useAllCustomers';

export interface CustomerSearchPageProps {
  initialCustomers: Customer[];
  initialSearchText: string;
  initialSelectedSpecies: string[];
}

export const CustomerSearchPage: React.FC<CustomerSearchPageProps> = ({
  initialCustomers,
  initialSearchText,
  initialSelectedSpecies,
}) => {
  const {
    searchText,
    selectedSpecies,
    customers,
    loading,
    error,
    handleSearch,
    handleApplySpeciesFilter,
    performSearch,
  } = useSearch();

  // Получаем всех клиентов для списка видов (без фильтров)
  const { allCustomers } = useAllCustomers();

  // Используем клиентские данные если загружены, иначе серверные
  const displayCustomers = loading || customers.length > 0 ? customers : initialCustomers;

  // Получаем все доступные виды из всех клиентов (не отфильтрованных)
  const availableSpecies = useMemo(() => {
    return getAllSpecies(allCustomers.length > 0 ? allCustomers : initialCustomers);
  }, [allCustomers, initialCustomers]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Customers and Pets
          </h1>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex gap-3 items-center">
            {/* Search Input */}
            <div className="flex-1">
              <SearchInput
                value={searchText}
                onChange={handleSearch}
                placeholder="Search by ID, name, email or phone"
                className="w-full"
              />
            </div>
            
            {/* Pets Filter Popover */}
            <PetsPopover
              availableSpecies={availableSpecies}
              selectedSpecies={selectedSpecies}
              onApplyFilter={handleApplySpeciesFilter}
            />
          </div>
        </div>

        {/* Results */}
        <CustomerList
          customers={displayCustomers}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};
