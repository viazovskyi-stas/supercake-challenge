'use client';

import { Badge, Button } from '../../../shared/ui';
import { getSpeciesDisplayName } from '../../../shared/utils/species';

export interface SpeciesFilterProps {
  availableSpecies: string[];
  selectedSpecies: string[];
  onSpeciesToggle: (species: string) => void;
  onClear: () => void;
  className?: string;
}

export const SpeciesFilter: React.FC<SpeciesFilterProps> = ({
  availableSpecies,
  selectedSpecies,
  onSpeciesToggle,
  onClear,
  className
}) => {
  if (availableSpecies.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Filter by Pet Species
        </label>
        {selectedSpecies.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-xs"
          >
            Clear all
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {availableSpecies.map((species) => {
          const isSelected = selectedSpecies.includes(species);
          return (
            <button
              key={species}
              onClick={() => onSpeciesToggle(species)}
              className={`
                inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full 
                border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${isSelected 
                  ? 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              {getSpeciesDisplayName(species)}
              {isSelected && (
                <span className="ml-1.5 text-blue-600">✓</span>
              )}
            </button>
          );
        })}
      </div>
      
      {selectedSpecies.length > 0 && (
        <div className="mt-3 text-sm text-gray-600">
          Filtering by: {selectedSpecies.map(getSpeciesDisplayName).join(', ')}
        </div>
      )}
    </div>
  );
};
