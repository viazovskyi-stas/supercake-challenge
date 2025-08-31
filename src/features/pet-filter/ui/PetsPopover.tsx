'use client';

import { useState } from 'react';
import { Popover, Button, ChevronDownIcon, animalIcons, AnimalSpecies } from '../../../shared/ui';
import { getSpeciesDisplayName } from '../../../shared/utils/species';
import { cn } from '../../../shared/utils/cn';

export interface PetsPopoverProps {
  availableSpecies: string[];
  selectedSpecies: string[];
  onSpeciesToggle: (species: string) => void;
  onClear: () => void;
  onApply: () => void;
  className?: string;
}

export const PetsPopover: React.FC<PetsPopoverProps> = ({
  availableSpecies,
  selectedSpecies,
  onSpeciesToggle,
  onClear,
  onApply,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasAnySelected = selectedSpecies.length > 0;
  const allSelected = selectedSpecies.length === availableSpecies.length;

  const handleAnyAnimalClick = () => {
    if (hasAnySelected) {
      onClear();
    }
  };

  const handleApply = () => {
    onApply();
    setIsOpen(false);
  };

  const handleReset = () => {
    onClear();
  };

  const popoverContent = (
    <div className="w-80">
      {/* Any Animal button */}
      <div className="mb-4">
        <button
          onClick={handleAnyAnimalClick}
          className={cn(
            'w-full px-4 py-3 rounded-lg text-left font-medium text-sm transition-colors',
            !hasAnySelected 
              ? 'bg-primary-600 text-white' 
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          )}
        >
          Any Animal
        </button>
      </div>

      {/* Species buttons grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {availableSpecies.map((species) => {
          const isSelected = selectedSpecies.includes(species);
          const IconComponent = animalIcons[species as AnimalSpecies];
          
          return (
            <button
              key={species}
              onClick={() => onSpeciesToggle(species)}
              className={cn(
                'flex flex-col items-center gap-2 p-3 rounded-lg text-sm font-medium transition-all',
                'border-2',
                isSelected
                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
              )}
            >
              {IconComponent && (
                <IconComponent 
                  size={20} 
                  className={cn(
                    'transition-colors',
                    isSelected ? 'text-primary-600' : 'text-neutral-500'
                  )}
                />
              )}
              <span>{getSpeciesDisplayName(species)}</span>
            </button>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex justify-between gap-3 pt-2 border-t border-neutral-200">
        <Button
          variant="ghost"
          onClick={handleReset}
          className="flex-1 text-neutral-600 hover:text-neutral-800"
        >
          Reset
        </Button>
        <Button
          onClick={handleApply}
          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  const displayText = hasAnySelected 
    ? `${selectedSpecies.length} selected`
    : 'Pets';

  return (
    <div className={className}>
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        content={popoverContent}
        side="bottom"
        align="end"
        sideOffset={12}
      >
        <button
          className={cn(
            'flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700',
            'hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            'transition-colors min-w-[100px]'
          )}
        >
          <span>{displayText}</span>
          <ChevronDownIcon 
            size={16} 
            className={cn(
              'text-neutral-500 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>
      </Popover>
    </div>
  );
};
