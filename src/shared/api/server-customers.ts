import { SearchParams, CustomersResponse } from "@/shared/types";

// Серверный API клиент для использования в Server Components
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

    if (params.species && params.species.length > 0) {
      searchParams.append("species", params.species.join(","));
    }

    const url = `${this.baseUrl}/api/customers${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    try {
      const response = await fetch(url, {
        // Отключаем кэш для получения актуальных данных
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch customers: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error("Server API Error:", error);
      // Возвращаем пустой результат в случае ошибки
      return { customers: [] };
    }
  }

  // Метод для получения всех клиентов без фильтров (для списка видов)
  static async getAllCustomers(): Promise<CustomersResponse> {
    return this.getCustomers({});
  }
}
