import { Suspense, memo } from "react";
import { ServerCustomersApi } from "@/shared/api/server-customers";
import { Customer } from "@/shared/types";
import { Badge } from "@/shared/ui";
import { ServerSuspenseLoader } from "@/shared/ui/ServerSuspenseLoader";
import {
  animalIcons,
  type AnimalSpecies,
} from "@/shared/ui/icons/AnimalIcons";
import { getSpeciesDisplayName } from "@/shared/utils/species";

interface CustomerListProps {
  searchText?: string;
  selectedSpecies?: string[];
  selectedTags?: string[];
  className?: string;
}

async function CustomerListData({
  searchText,
  selectedSpecies,
  selectedTags,
}: CustomerListProps) {
  const customersData = await ServerCustomersApi.getCustomers({
    searchText: searchText || undefined,
    species: selectedSpecies?.length ? selectedSpecies : undefined,
    tags: selectedTags?.length ? selectedTags : undefined,
  });

  const customers = customersData.customers;

  if (customers.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-gray-500 mb-2">No customers found</div>
          <div className="text-sm text-gray-400">
            Try adjusting your search criteria or filters
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <div className="text-sm text-gray-600">
          {customers.length} customer{customers.length !== 1 ? "s" : ""} found
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-200 group"
          >
            {/* Customer Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">
                  {customer.name}
                </h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">{customer.email}</span>
                  </div>
                  {customer.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{customer.phone}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="ml-3 flex-shrink-0">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  #{customer.id}
                </span>
              </div>
            </div>

            {/* Pets Section */}
            <div className="border-t border-gray-100 pt-4">
              {customer.pets?.length > 0 ? (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      Pets ({customer.pets.length})
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {customer.pets.map((pet) => {
                      const IconComponent = animalIcons[pet.species as AnimalSpecies];
                      return (
                        <div key={pet.id} className="bg-gray-50 rounded-lg p-3">
                          {/* Pet Header */}
                          <div className="flex items-center gap-2 mb-2">
                            {IconComponent && (
                              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-white rounded-full border border-gray-200">
                                <IconComponent
                                  size={14}
                                  className="text-gray-600"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 text-sm truncate">
                                {pet.name}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {getSpeciesDisplayName(pet.species)}
                              </p>
                            </div>
                          </div>
                          
                          {/* Pet Tags */}
                          {pet.tags && pet.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {pet.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border-blue-200 border hover:bg-blue-100 transition-colors"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <p className="text-sm text-gray-400">No pets registered</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const CustomerList = memo<CustomerListProps>(({
  searchText,
  selectedSpecies,
  selectedTags,
  className,
}) => {
  return (
    <div className={className}>
      <Suspense fallback={<ServerSuspenseLoader />}>
        <CustomerListData
          searchText={searchText}
          selectedSpecies={selectedSpecies}
          selectedTags={selectedTags}
        />
      </Suspense>
    </div>
  );
});
