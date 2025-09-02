import { SearchParams, CustomersResponse } from "@/shared/types";

export class CustomersApi {
  private static baseUrl = "/api/customers";

  static async getCustomers(
    params: SearchParams = {},
  ): Promise<CustomersResponse> {
    const searchParams = new URLSearchParams();

    if (params.searchText) {
      searchParams.append("searchText", params.searchText);
    }

    if (params.species?.length) {
      params.species.forEach(s => searchParams.append("species", s));
    }

    if (params.tags?.length) {
      params.tags.forEach(t => searchParams.append("tags", t));
    }

    const url = `${this.baseUrl}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch customers: ${response.statusText}`);
    }

    return response.json();
  }
}
