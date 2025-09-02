"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useUrlSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Получение текущих значений из URL
  const searchText = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  const selectedSpecies = useMemo(() => {
    const species = searchParams.get("species");
    return species ? species.split(",").filter(Boolean) : [];
  }, [searchParams]);

  // Обновление URL параметров
  const updateSearchParams = useCallback(
    (newParams: { search?: string; species?: string[] }) => {
      const params = new URLSearchParams(searchParams.toString());

      // Обновляем search параметр
      if (newParams.search !== undefined) {
        if (newParams.search) {
          params.set("search", newParams.search);
        } else {
          params.delete("search");
        }
      }

      // Обновляем species параметр
      if (newParams.species !== undefined) {
        if (newParams.species.length > 0) {
          params.set("species", newParams.species.join(","));
        } else {
          params.delete("species");
        }
      }

      // Обновляем URL
      const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
      router.replace(newUrl);
    },
    [searchParams, router, pathname],
  );

  const setSearchText = useCallback(
    (search: string) => {
      updateSearchParams({ search });
    },
    [updateSearchParams],
  );

  const setSelectedSpecies = useCallback(
    (species: string[]) => {
      updateSearchParams({ species });
    },
    [updateSearchParams],
  );

  const clearAll = useCallback(() => {
    updateSearchParams({ search: "", species: [] });
  }, [updateSearchParams]);

  return {
    searchText,
    selectedSpecies,
    setSearchText,
    setSelectedSpecies,
    updateSearchParams,
    clearAll,
  };
};
