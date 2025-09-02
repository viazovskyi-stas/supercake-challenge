import { Suspense } from "react";
import { ServerCustomersApi } from "@/shared/api/server-customers";
import { Customer } from "@/shared/types";
import { Badge } from "@/shared/ui";
import { ServerSuspenseLoader } from "@/shared/ui/ServerSuspenseLoader";
import {
  animalIcons,
  type AnimalSpecies,
} from "@/shared/ui/icons/AnimalIcons";
import { getSpeciesDisplayName } from "@/shared/utils/species";
import { cn } from "@/shared/utils/cn";

interface CustomerListProps {
  searchText?: string;
  selectedSpecies?: string[];
  className?: string;
}

async function CustomerListData({
  searchText,
  selectedSpecies,
}: CustomerListProps) {
  const customersData = await ServerCustomersApi.getCustomers({
    searchText: searchText || undefined,
    species: selectedSpecies?.length ? selectedSpecies : undefined,
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

      <div className="space-y-4">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  {customer.name}
                </h3>
                <div className="text-sm text-gray-600 space-y-0.5">
                  <div>📧 {customer.email}</div>
                  {customer.phone && <div>📞 {customer.phone}</div>}
                </div>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                ID: {customer.id}
              </span>
            </div>

            <div>
              {customer.pets?.length > 0 ? (
                <>
                  <div className="text-xs text-gray-600 mb-2 font-medium">
                    Pets ({customer.pets.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {customer.pets.map((pet) => {
                      const IconComponent =
                        animalIcons[pet.species as AnimalSpecies];
                      return (
                        <div
                          key={pet.id}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-md text-xs"
                        >
                          {IconComponent && (
                            <IconComponent
                              size={14}
                              className="text-gray-600"
                            />
                          )}
                          <span className="font-medium text-gray-800">
                            {pet.name}
                          </span>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-600">
                            {getSpeciesDisplayName(pet.species)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-xs text-gray-400 italic">
                  No pets registered
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const CustomerList: React.FC<CustomerListProps> = ({
  searchText,
  selectedSpecies,
  className,
}) => {
  return (
    <div className={className}>
      <Suspense fallback={<ServerSuspenseLoader />}>
        <CustomerListData
          searchText={searchText}
          selectedSpecies={selectedSpecies}
        />
      </Suspense>
    </div>
  );
};
