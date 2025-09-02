"use client";

import { useState, useEffect } from "react";
import { Customer } from "../types";
import { CustomersApi } from "../api/customers";

// Hook for getting all customers without any filters (for species list)
export const useAllCustomers = () => {
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCustomers = async () => {
      setLoading(true);
      try {
        const response = await CustomersApi.getCustomers({});
        setAllCustomers(response.customers);
      } catch (error) {
        console.error("Failed to fetch all customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCustomers();
  }, []);

  return { allCustomers, loading };
};
