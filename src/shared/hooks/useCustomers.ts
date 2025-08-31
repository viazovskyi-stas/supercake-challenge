'use client';

import { useState, useCallback, useEffect } from 'react';
import { Customer, SearchParams } from '../types';
import { CustomersApi } from '../api/customers';

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async (params: SearchParams = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await CustomersApi.getCustomers(params);
      setCustomers(response.customers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    loading,
    error,
    refetch: fetchCustomers,
  };
};
