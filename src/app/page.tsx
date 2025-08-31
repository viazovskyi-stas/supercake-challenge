'use client';

import { useMemo } from 'react';
import { SearchInput, useSearch } from '../features/customer-search';
import { SpeciesFilter } from '../features/pet-filter';
import { CustomerList } from '../widgets/customer-list';
import { getAllSpecies } from '../shared/utils/species';

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
  } = useSearch();

  // Get all available species from initial load
  const availableSpecies = useMemo(() => {
    return getAllSpecies(customers);
  }, [customers]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🐾 Veterinary Customer Search
          </h1>
          <p className="text-gray-600">
            Search for customers and filter by their pets
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
              {/* Search */}
              <div className="lg:col-span-2">
                <SearchInput
                  onSearch={handleSearch}
                  placeholder="Search by customer name, email, phone, or pet name..."
                />
              </div>
              
              {/* Species Filter */}
              <div className="lg:col-span-1">
                <SpeciesFilter
                  availableSpecies={availableSpecies}
                  selectedSpecies={selectedSpecies}
                  onSpeciesToggle={handleSpeciesToggle}
                  onClear={handleSpeciesClear}
                />
              </div>
            </div>
            
            {/* Active Filters Display */}
            {(searchText || selectedSpecies.length > 0) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Active filters: </span>
                  {searchText && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                      Search: "{searchText}"
                    </span>
                  )}
                  {selectedSpecies.length > 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Species: {selectedSpecies.length} selected
                    </span>
                  )}
                </div>
              </div>
            )}
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
