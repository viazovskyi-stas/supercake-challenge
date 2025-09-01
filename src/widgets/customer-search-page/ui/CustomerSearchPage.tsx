import { CustomerList } from '../../customer-list';
import { SearchControls } from './SearchControls';
import { Customer } from '../../../shared/types';

interface CustomerSearchPageProps {
  initialCustomers: Customer[];
  searchText: string;
  selectedSpecies: string[];
}

export const CustomerSearchPage: React.FC<CustomerSearchPageProps> = ({
  initialCustomers,
  searchText,
  selectedSpecies,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Customers and Pets
          </h1>
        </div>

        <div className="mb-8">
          <SearchControls initialCustomers={initialCustomers} />
        </div>

        <CustomerList
          searchText={searchText}
          selectedSpecies={selectedSpecies}
        />
      </div>
    </div>
  );
};