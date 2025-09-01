'use client';

import { useMemo } from 'react';
import { PetsPopover } from '../../../features/pet-filter';
import { getAllSpecies } from '../../../shared/utils/species';
import { SearchInput } from '../../../shared/ui';
import { useAllCustomers } from '../../../shared/hooks/useAllCustomers';
import { useUrlSearchParams } from '../../../shared/hooks/useSearchParams';
import { Customer } from '../../../shared/types';

interface SearchControlsProps {
  initialCustomers: Customer[];
}

export const SearchControls: React.FC<SearchControlsProps> = ({ initialCustomers }) => {
  const {
    searchText,
    selectedSpecies,
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
    <div className="flex gap-3 items-center">
      <div className="flex-1">
        <SearchInput
          value={searchText}
          onChange={handleSearch}
          placeholder="Search by ID, name, email or phone"
          className="w-full"
        />
      </div>

      <PetsPopover
        availableSpecies={availableSpecies}
        selectedSpecies={selectedSpecies}
        onApplyFilter={handleApplySpeciesFilter}
      />
    </div>
  );
};
