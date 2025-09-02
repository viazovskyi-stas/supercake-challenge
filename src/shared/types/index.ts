import { TagName, Species } from "@/shared/utils/species";

export interface Pet {
  id: string;
  name: string;
  species: Species;
  tags?: TagName[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  pets: Pet[];
}

export interface CustomersResponse {
  customers: Customer[];
}

export interface SearchParams {
  searchText?: string;
  species?: Species[];
  tags?: TagName[];
}
