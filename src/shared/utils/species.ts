import { Customer } from "@/shared/types";

export const getAllSpecies = (customers: Customer[]): string[] => {
  const speciesSet = new Set<string>();

  customers.forEach((customer) => {
    customer.pets.forEach((pet) => {
      speciesSet.add(pet.species);
    });
  });

  return Array.from(speciesSet).sort();
};

export const getAllTags = (customers: Customer[]): string[] => {
  const tagsSet = new Set<string>();

  customers.forEach((customer) => {
    customer.pets.forEach((pet) => {
      if (pet.tags) {
        pet.tags.forEach((tag) => {
          tagsSet.add(tag);
        });
      }
    });
  });

  return Array.from(tagsSet).sort();
};

export const getSpeciesDisplayName = (species: string): string => {
  return species.charAt(0).toUpperCase() + species.slice(1);
};
