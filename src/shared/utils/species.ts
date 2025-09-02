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

export const getSpeciesDisplayName = (species: string): string => {
  return species.charAt(0).toUpperCase() + species.slice(1);
};
