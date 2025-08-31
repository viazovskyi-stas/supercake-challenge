'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useCustomers } from '../../../shared/hooks/useCustomers';

export const useSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  
  const { customers, loading, error, refetch } = useCustomers();

  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleSpeciesToggle = useCallback((species: string) => {
    setSelectedSpecies(prev => 
      prev.includes(species) 
        ? prev.filter(s => s !== species)
        : [...prev, species]
    );
  }, []);

  const handleSpeciesClear = useCallback(() => {
    setSelectedSpecies([]);
  }, []);

  const searchParams = useMemo(() => ({
    searchText: searchText.trim() || undefined,
    species: selectedSpecies.length > 0 ? selectedSpecies : undefined,
  }), [searchText, selectedSpecies]);

  // Auto-search only for text input with debouncing, not for species filter
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const textSearchParams = {
        searchText: searchText.trim() || undefined,
        // Don't apply species filter automatically - only on Apply click
        species: undefined,
      };
      refetch(textSearchParams);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText, refetch]);

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
  };
};
