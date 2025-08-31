'use client';

import { useMemo } from 'react';
import { useSearch } from '../features/customer-search';
import { PetsPopover } from '../features/pet-filter';
import { CustomerList } from '../widgets/customer-list';
import { getAllSpecies } from '../shared/utils/species';
import { SearchInput } from '../shared/ui';
import { useAllCustomers } from '../shared/hooks/useAllCustomers';

export default function Home() {
  const {
    searchText,
    selectedSpecies,
    customers,
    loading,
    error,
    handleSearch,
    handleSpeciesToggle,
    handleSpeciesClear,
    performSearch,
  } = useSearch();

  // Get all customers for species list (without filters)
  const { allCustomers } = useAllCustomers();

  // Get all available species from all customers (not filtered ones)
  const availableSpecies = useMemo(() => {
    return getAllSpecies(allCustomers);
  }, [allCustomers]);

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
              onSpeciesToggle={handleSpeciesToggle}
              onClear={handleSpeciesClear}
              onApply={performSearch}
            />
          </div>
        </div>

        {/* Results */}
        <CustomerList
          customers={customers}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
