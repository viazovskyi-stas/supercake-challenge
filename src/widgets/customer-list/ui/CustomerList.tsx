'use client';

import { Customer } from '../../../shared/types';
import { CustomerCard } from '../../../entities/customer';

export interface CustomerListProps {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  className?: string;
}

export const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  loading,
  error,
  className
}) => {
  if (loading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading customers...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-center">
          <div className="text-red-600 mb-2">❌ Error loading customers</div>
          <div className="text-sm text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-center">
          <div className="text-gray-400 text-lg mb-2">🔍 No customers found</div>
          <div className="text-sm text-gray-600">
            Try adjusting your search criteria or filters
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-4 text-sm text-gray-600">
        Found {customers.length} customer{customers.length !== 1 ? 's' : ''}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {customers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </div>
  );
};
