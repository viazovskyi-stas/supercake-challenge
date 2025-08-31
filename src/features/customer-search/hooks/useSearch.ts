'use client';

import { useCallback, useMemo, useEffect } from 'react';
import { useCustomers } from '../../../shared/hooks/useCustomers';
import { useUrlSearchParams } from '../../../shared/hooks/useSearchParams';

export const useSearch = () => {
  const {
    searchText,
    selectedSpecies,
    setSearchText,
    setSelectedSpecies,
    clearAll,
  } = useUrlSearchParams();
  
  const { customers, loading, error, refetch } = useCustomers();

  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
  }, [setSearchText]);

  const handleSpeciesToggle = useCallback((species: string) => {
    setSelectedSpecies(
      selectedSpecies.includes(species) 
        ? selectedSpecies.filter(s => s !== species)
        : [...selectedSpecies, species]
    );
  }, [selectedSpecies, setSelectedSpecies]);

  const handleSpeciesClear = useCallback(() => {
    setSelectedSpecies([]);
  }, [setSelectedSpecies]);

  const searchParams = useMemo(() => ({
    searchText: searchText.trim() || undefined,
    species: selectedSpecies.length > 0 ? selectedSpecies : undefined,
  }), [searchText, selectedSpecies]);

  // Auto-search for text input with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const textSearchParams = {
        searchText: searchText.trim() || undefined,
        // Don't auto-apply species filter - only on manual Apply
        species: undefined,
      };
      refetch(textSearchParams);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText, refetch]);

  // Apply filter when URL params change (for both search and species)
  useEffect(() => {
    refetch(searchParams);
  }, [selectedSpecies, refetch, searchParams]);

  const performSearch = useCallback(() => {
    refetch(searchParams);
  }, [refetch, searchParams]);

  return {
    searchText,
    selectedSpecies,
    customers,
    loading,
    error,
    handleSearch,
    handleSpeciesToggle,
    handleSpeciesClear,
    performSearch,
    clearAll,
  };
};
