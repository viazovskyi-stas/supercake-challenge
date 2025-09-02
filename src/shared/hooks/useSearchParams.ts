"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useUrlSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchText = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  const selectedSpecies = useMemo(() => {
    return searchParams.getAll("species");
  }, [searchParams]);

  const selectedTags = useMemo(() => {
    return searchParams.getAll("tags");
  }, [searchParams]);

  const updateSearchParams = useCallback(
    (newParams: { search?: string; species?: string[]; tags?: string[] }) => {
      const params = new URLSearchParams();

      const currentSearch = searchParams.get("search");
      const currentSpecies = searchParams.getAll("species");
      const currentTags = searchParams.getAll("tags");

      const searchToUse = newParams.search !== undefined ? newParams.search : currentSearch;
      if (searchToUse) {
        params.set("search", searchToUse);
      }

      const speciesToUse = newParams.species !== undefined ? newParams.species : currentSpecies;
      speciesToUse.forEach(species => {
        params.append("species", species);
      });

      const tagsToUse = newParams.tags !== undefined ? newParams.tags : currentTags;
      tagsToUse.forEach(tag => {
        params.append("tags", tag);
      });

      const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
      router.replace(newUrl);
    },
    [searchParams, router, pathname],
  );

  const setSearchText = (search: string) => updateSearchParams({ search });
  const setSelectedSpecies = (species: string[]) => updateSearchParams({ species });
  const setSelectedTags = (tags: string[]) => updateSearchParams({ tags });
  const setFilters = (species: string[], tags: string[]) => updateSearchParams({ species, tags });

  const clearAll = () => router.replace(pathname);

  return {
    searchText,
    selectedSpecies,
    selectedTags,
    setSearchText,
    setSelectedSpecies,
    setSelectedTags,
    setFilters,
    updateSearchParams,
    clearAll,
  };
};
