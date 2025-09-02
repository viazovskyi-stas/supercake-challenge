import data from "./customers.json";
import { Customer } from "@/shared/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("searchText")?.toLowerCase() || "";
  
  const species = searchParams.getAll("species")
    .map((s) => s.trim())
    .filter(Boolean);
  
  const tags = searchParams.getAll("tags")
    .map((t) => t.trim())
    .filter(Boolean);

  let filteredCustomers: Customer[] = data.customers;

  if (searchText) {
    filteredCustomers = filteredCustomers.filter(
      (customer) =>
        customer.id.toLowerCase().includes(searchText) ||
        customer.name.toLowerCase().includes(searchText) ||
        customer.email.toLowerCase().includes(searchText) ||
        customer.phone.toLowerCase().includes(searchText) ||
        customer.pets.some(
          (pet) =>
            pet.name.toLowerCase().includes(searchText) ||
            pet.id.toLowerCase().includes(searchText),
        ),
    );
  }

  if (species.length > 0) {
    filteredCustomers = filteredCustomers.filter((customer) =>
      customer.pets.some((pet) => species.includes(pet.species)),
    );
  }

  if (tags.length > 0) {
    filteredCustomers = filteredCustomers.filter((customer) =>
      customer.pets.some((pet) => 
        pet.tags && tags.some((tag) => 
          pet.tags!.some((petTag) => 
            petTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      ),
    );
  }

  return new Response(JSON.stringify({ customers: filteredCustomers }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
