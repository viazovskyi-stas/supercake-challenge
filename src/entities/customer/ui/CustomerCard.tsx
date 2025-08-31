import { Customer } from '../../../shared/types';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui';
import { PetBadge } from '../../pet';

export interface CustomerCardProps {
  customer: Customer;
  className?: string;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{customer.name}</span>
          <span className="text-sm font-normal text-gray-500">ID: {customer.id}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {/* Contact Info */}
          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-600 w-16">Email:</span>
              <span className="text-gray-900">{customer.email}</span>
            </div>
            {customer.phone && (
              <div className="flex items-center text-sm">
                <span className="font-medium text-gray-600 w-16">Phone:</span>
                <span className="text-gray-900">{customer.phone}</span>
              </div>
            )}
          </div>
          
          {/* Pets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Pets</span>
              <span className="text-xs text-gray-500">
                {customer.pets.length} pet{customer.pets.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {customer.pets.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {customer.pets.map((pet) => (
                  <PetBadge key={pet.id} pet={pet} />
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-400 italic">
                No pets registered
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
