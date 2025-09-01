'use client';

import { useState, useEffect } from 'react';
import { Popover, Button, ChevronDownIcon, animalIcons, type AnimalSpecies } from '../../../shared/ui';
import { getSpeciesDisplayName } from '../../../shared/utils/species';
import { cn } from '../../../shared/utils/cn';

export interface PetsPopoverProps {
  availableSpecies: string[];
  selectedSpecies: string[];
  onApplyFilter: (species: string[]) => void;
  className?: string;
}

export const PetsPopover: React.FC<PetsPopoverProps> = ({
  availableSpecies,
  selectedSpecies,
  onApplyFilter,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedSpecies, setTempSelectedSpecies] = useState<string[]>([]);

  // Синхронизируем временное состояние с URL при изменении selectedSpecies
  useEffect(() => {
    setTempSelectedSpecies([...selectedSpecies]);
  }, [selectedSpecies]);

  const hasAnySelected = tempSelectedSpecies.length > 0;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      // При открытии берем текущее состояние из URL
      setTempSelectedSpecies([...selectedSpecies]);
    }
  };

  const handleTempSpeciesToggle = (species: string) => {
    setTempSelectedSpecies(prev => 
      prev.includes(species) 
        ? prev.filter(s => s !== species)
        : [...prev, species]
    );
  };

  const handleAnyAnimalClick = () => {
    setTempSelectedSpecies([]);
  };

  const handleApply = async () => {
    setIsApplying(true);
    // Простое применение - заменяем весь массив
    onApplyFilter([...tempSelectedSpecies]);
    
    // Небольшая задержка для UX
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsApplying(false);
    setIsOpen(false);
  };

  const handleReset = async () => {
    setIsApplying(true);
    setTempSelectedSpecies([]);
    onApplyFilter([]);
    
    // Небольшая задержка для UX
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsApplying(false);
    setIsOpen(false);
  };

  const popoverContent = (
    <div className="w-72">
      {/* Any Animal button */}
      <div className="mb-3">
        <button
          onClick={handleAnyAnimalClick}
          className={cn(
            'w-full px-3 py-2.5 rounded-lg text-center font-medium text-sm transition-colors',
            !hasAnySelected 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          Any Animal
        </button>
      </div>

      {/* Species buttons grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {availableSpecies.map((species) => {
          const isSelected = tempSelectedSpecies.includes(species);
          const IconComponent = animalIcons[species as AnimalSpecies];
          
          return (
            <button
              key={species}
              onClick={() => handleTempSpeciesToggle(species)}
              className={cn(
                'flex flex-col items-center gap-1.5 p-2.5 rounded-lg text-xs font-medium transition-all aspect-square',
                'border-2 min-h-[68px]',
                isSelected
                  ? 'border-primary bg-primary-100 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              )}
            >
              {IconComponent && (
                                  <IconComponent 
                  size={18} 
                  className={cn(
                    'transition-colors',
                    isSelected ? 'text-primary' : 'text-gray-500'
                  )}
                />
              )}
              <span className="leading-tight">{getSpeciesDisplayName(species)}</span>
            </button>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex justify-between gap-2 pt-3 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="flex-1 text-gray-600 hover:text-gray-800 h-9"
        >
          Reset
        </Button>
        <Button
          size="sm"
          onClick={handleApply}
          className="flex-1 bg-primary hover:bg-primary-600 text-white h-9"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  const displayText = selectedSpecies.length > 0 
    ? `${selectedSpecies.length} selected`
    : 'Pets';

  return (
    <div className={className}>
      <Popover
        open={isOpen}
        onOpenChange={handleOpenChange}
        content={popoverContent}
        side="bottom"
        align="end"
        sideOffset={12}
      >
        <button
          className={cn(
            'flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700',
            'hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            'transition-colors min-w-[100px]'
          )}
        >
          <span>{displayText}</span>
          <ChevronDownIcon 
            size={16} 
            className={cn(
              'text-gray-500 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>
      </Popover>
    </div>
  );
};
