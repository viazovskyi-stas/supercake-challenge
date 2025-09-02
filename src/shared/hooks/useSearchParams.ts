"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { TagName, Species } from "@/shared/utils/species";

export const useUrlSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchText = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  const selectedSpecies = useMemo(() => {
    return searchParams.getAll("species") as Species[];
  }, [searchParams]);

  const selectedTags = useMemo(() => {
    return searchParams.getAll("tags") as TagName[];
  }, [searchParams]);

  const updateSearchParams = useCallback(
    (newParams: { search?: string; species?: Species[]; tags?: TagName[] }) => {
      const params = new URLSearchParams();

      const currentSearch = searchParams.get("search");
      const currentSpecies = searchParams.getAll("species");
      const currentTags = searchParams.getAll("tags");

      const searchToUse = newParams.search !== undefined ? newParams.search : currentSearch;
      if (searchToUse) {
        params.set("search", searchToUse);
      }

      const speciesToUse = newParams.species !== undefined ? newParams.species : (currentSpecies as Species[]);
      speciesToUse.forEach(species => {
        params.append("species", species);
      });

      const tagsToUse = newParams.tags !== undefined ? newParams.tags : (currentTags as TagName[]);
      tagsToUse.forEach(tag => {
        params.append("tags", tag);
      });

      const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
      router.replace(newUrl);
    },
    [searchParams, router, pathname],
  );

  const setSearchText = (search: string) => updateSearchParams({ search });
  const setSelectedSpecies = (species: Species[]) => updateSearchParams({ species });
  const setSelectedTags = (tags: TagName[]) => updateSearchParams({ tags });
  const setFilters = (species: Species[], tags: TagName[]) => updateSearchParams({ species, tags });

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
