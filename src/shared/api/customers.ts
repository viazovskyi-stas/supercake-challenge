import { SearchParams, CustomersResponse } from "../types";

export class CustomersApi {
  private static baseUrl = "/api/customers";

  static async getCustomers(
    params: SearchParams = {},
  ): Promise<CustomersResponse> {
    const searchParams = new URLSearchParams();

    if (params.searchText) {
      searchParams.append("searchText", params.searchText);
    }

    if (params.species && params.species.length > 0) {
      searchParams.append("species", params.species.join(","));
    }

    const url = `${this.baseUrl}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch customers: ${response.statusText}`);
    }

    return response.json();
  }
}
