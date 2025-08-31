import { Badge } from '../../../shared/ui';
import { Pet } from '../../../shared/types';
import { getSpeciesDisplayName } from '../../../shared/utils/species';

export interface PetBadgeProps {
  pet: Pet;
  className?: string;
}

const getSpeciesVariant = (species: string) => {
  switch (species.toLowerCase()) {
    case 'dog':
      return 'default';
    case 'cat':
      return 'secondary';
    case 'bird':
      return 'success';
    case 'hamster':
      return 'warning';
    case 'rat':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export const PetBadge: React.FC<PetBadgeProps> = ({ pet, className }) => {
  return (
    <Badge 
      variant={getSpeciesVariant(pet.species)}
      className={className}
    >
      {pet.name} • {getSpeciesDisplayName(pet.species)}
    </Badge>
  );
};
