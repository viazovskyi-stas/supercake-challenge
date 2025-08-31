'use client';

import { Customer } from '../../../shared/types';
import { Badge } from '../../../shared/ui';
import { animalIcons, AnimalSpecies } from '../../../shared/ui/AnimalIcons';
import { getSpeciesDisplayName } from '../../../shared/utils/species';
import { cn } from '../../../shared/utils/cn';

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
      <div className={cn('flex items-center justify-center py-12', className)}>
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-600 border-t-transparent"></div>
          <span className="text-neutral-600 text-sm">Loading customers...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('flex items-center justify-center py-12', className)}>
        <div className="text-center">
          <div className="text-error-600 mb-2 font-medium">Error loading customers</div>
          <div className="text-sm text-neutral-600">{error}</div>
        </div>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className={cn('flex items-center justify-center py-12', className)}>
        <div className="text-center">
          <div className="text-neutral-500 mb-2">No customers found</div>
          <div className="text-sm text-neutral-400">
            Try adjusting your search criteria or filters
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-6 text-sm text-neutral-600">
        {customers.length} customer{customers.length !== 1 ? 's' : ''} found
      </div>
      
      <div className="space-y-3">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-neutral-900 mb-1">{customer.name}</h3>
                <div className="text-sm text-neutral-600 space-y-0.5">
                  <div>📧 {customer.email}</div>
                  {customer.phone && (
                    <div>📞 {customer.phone}</div>
                  )}
                </div>
              </div>
              <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                ID: {customer.id}
              </span>
            </div>
            
            {/* Pets */}
            {customer.pets.length > 0 ? (
              <div>
                <div className="text-xs text-neutral-600 mb-2 font-medium">
                  Pets ({customer.pets.length})
                </div>
                <div className="flex flex-wrap gap-2">
                  {customer.pets.map((pet) => {
                    const IconComponent = animalIcons[pet.species as AnimalSpecies];
                    return (
                      <div
                        key={pet.id}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 rounded-md text-xs"
                      >
                        {IconComponent && (
                          <IconComponent size={14} className="text-neutral-600" />
                        )}
                        <span className="font-medium text-neutral-800">{pet.name}</span>
                        <span className="text-neutral-600">•</span>
                        <span className="text-neutral-600">{getSpeciesDisplayName(pet.species)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-xs text-neutral-400 italic">No pets registered</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
