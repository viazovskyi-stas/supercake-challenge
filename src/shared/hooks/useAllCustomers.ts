"use client";

import { useState, useEffect } from "react";
import { Customer } from "@/shared/types";
import { CustomersApi } from "@/shared/api/customers";


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
