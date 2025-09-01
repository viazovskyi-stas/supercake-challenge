'use client';

import { useMemo } from 'react';
import { PetsPopover } from '../../../features/pet-filter';
import { CustomerList } from '../../customer-list';
import { getAllSpecies } from '../../../shared/utils/species';
import { SearchInput } from '../../../shared/ui';
import { useAllCustomers } from '../../../shared/hooks/useAllCustomers';
import { useUrlSearchParams } from '../../../shared/hooks/useSearchParams';
import { Customer } from '../../../shared/types';

interface CustomerSearchPageProps {
  initialCustomers: Customer[];
  searchText: string;
  selectedSpecies: string[];
}

export const CustomerSearchPage: React.FC<CustomerSearchPageProps> = ({
  initialCustomers,
  searchText,
  selectedSpecies,
}) => {
  const {
    searchText: urlSearchText,
    selectedSpecies: urlSelectedSpecies,
    setSearchText,
    setSelectedSpecies,
  } = useUrlSearchParams();

  const { allCustomers } = useAllCustomers();

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const handleApplySpeciesFilter = (species: string[]) => {
    setSelectedSpecies(species);
  };

  const availableSpecies = useMemo(() => {
    return getAllSpecies(allCustomers.length > 0 ? allCustomers : initialCustomers);
  }, [allCustomers, initialCustomers]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Customers and Pets
          </h1>
        </div>

        <div className="mb-8">
          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <SearchInput
                value={urlSearchText}
                onChange={handleSearch}
                placeholder="Search by ID, name, email or phone"
                className="w-full"
              />
            </div>

            <PetsPopover
              availableSpecies={availableSpecies}
              selectedSpecies={urlSelectedSpecies}
              onApplyFilter={handleApplySpeciesFilter}
            />
          </div>
        </div>

        <CustomerList
          searchText={urlSearchText}
          selectedSpecies={urlSelectedSpecies}
        />
      </div>
    </div>
  );
};