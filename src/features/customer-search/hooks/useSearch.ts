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

  const handleApplySpeciesFilter = useCallback((species: string[]) => {
    setSelectedSpecies(species);
  }, [setSelectedSpecies]);

  const searchParams = useMemo(() => ({
    searchText: searchText.trim() || undefined,
    species: selectedSpecies.length > 0 ? selectedSpecies : undefined,
  }), [searchText, selectedSpecies]);

  // Auto-search для текста
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      refetch({
        searchText: searchText.trim() || undefined,
        species: selectedSpecies.length > 0 ? selectedSpecies : undefined,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText, refetch, selectedSpecies]);

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
    handleApplySpeciesFilter,
    performSearch,
    clearAll,
  };
};
