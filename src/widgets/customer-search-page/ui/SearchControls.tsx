"use client";

import { useMemo } from "react";
import { PetsPopover } from "@/features/pet-filter";
import { getAllSpecies, getAllTags } from "@/shared/utils/species";
import { SearchInput } from "@/shared/ui";
import { useAllCustomers } from "@/shared/hooks/useAllCustomers";
import { useUrlSearchParams } from "@/shared/hooks/useSearchParams";
import { Customer } from "@/shared/types";

interface SearchControlsProps {
  initialCustomers: Customer[];
}

export const SearchControls: React.FC<SearchControlsProps> = ({
  initialCustomers,
}) => {
  const { searchText, selectedSpecies, selectedTags, setSearchText, setFilters } =
    useUrlSearchParams();

  const { allCustomers } = useAllCustomers();

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const handleApplyFilter = (species: string[], tags: string[]) => {
    setFilters(species, tags);
  };

  const currentCustomers = allCustomers.length > 0 ? allCustomers : initialCustomers;

  const availableSpecies = useMemo(() => {
    return getAllSpecies(currentCustomers);
  }, [currentCustomers]);

  const availableTags = useMemo(() => {
    return getAllTags(currentCustomers);
  }, [currentCustomers]);

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
        availableTags={availableTags}
        selectedTags={selectedTags}
        onApplyFilter={handleApplyFilter}
      />
    </div>
  );
};
