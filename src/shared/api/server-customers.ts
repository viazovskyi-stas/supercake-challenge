import { SearchParams, CustomersResponse } from "@/shared/types";


export class ServerCustomersApi {
  private static baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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

    const url = `${this.baseUrl}/api/customers${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    try {
      const response = await fetch(url, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch customers: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error("Server API Error:", error);
      return { customers: [] };
    }
  }
  static async getAllCustomers(): Promise<CustomersResponse> {
    return this.getCustomers({});
  }
}
