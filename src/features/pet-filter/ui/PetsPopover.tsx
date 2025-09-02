"use client";

import { useState, useEffect } from "react";
import { Popover, Button, ChevronDownIcon, Badge } from "../../../shared/ui";
import {
  animalIcons,
  type AnimalSpecies,
} from "../../../shared/ui/icons/AnimalIcons";
import { getSpeciesDisplayName } from "../../../shared/utils/species";
import { cn } from "../../../shared/utils/cn";

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
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedSpecies, setTempSelectedSpecies] = useState<string[]>([]);

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
    setTempSelectedSpecies((prev) =>
      prev.includes(species)
        ? prev.filter((s) => s !== species)
        : [...prev, species],
    );
  };

  const handleAnyAnimalClick = () => {
    setTempSelectedSpecies([]);
  };

  const handleApply = () => {
    onApplyFilter([...tempSelectedSpecies]);
    setIsOpen(false);
  };

  const handleReset = () => {
    setTempSelectedSpecies([]);
    onApplyFilter([]);
    setIsOpen(false);
  };

  const popoverContent = (
    <div className="min-w-40 w-[20rem]">
      <div className="flex flex-wrap gap-2 p-4">
        <Badge
          variant={!hasAnySelected ? "filter-selected" : "filter"}
          onClick={handleAnyAnimalClick}
          className="no-wrap text-sm font-medium"
        >
          Any Animal
        </Badge>
        {availableSpecies.map((species) => {
          const isSelected = tempSelectedSpecies.includes(species);
          const IconComponent = animalIcons[species as AnimalSpecies];
          return (
            <Badge
              key={species}
              variant={isSelected ? "filter-selected" : "filter"}
              onClick={() => handleTempSpeciesToggle(species)}
              className="justify-start min-w-fit px-4 py-1.5"
            >
              {IconComponent ? (
                <IconComponent
                  size={16}
                  className="flex-shrink-0"
                />
              ) : (
                <div className="w-4 h-4 bg-gray-300 rounded flex-shrink-0" />
              )}
              <span className="no-wrap text-sm font-medium">{getSpeciesDisplayName(species)}</span>
            </Badge>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex justify-between gap-2 border-t border-gray-200 p-4">
        <Button
          variant="outline"
          onClick={handleReset}
          className="w-full text-gray-600 hover:text-gray-800"
        >
          Reset
        </Button>
        <Button
          onClick={handleApply}
          className="w-full bg-primary hover:bg-primary-600 text-white">
          Apply Filters
        </Button>
      </div>
    </div>
  );

  const displayText =
    selectedSpecies.length > 0 ? `${selectedSpecies.length} selected` : "Pets";

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
            "flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700",
            "hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            "transition-colors min-w-[6.25rem]",
          )}
        >
          <span>{displayText}</span>
          <ChevronDownIcon
            size={16}
            className={cn(
              "text-gray-500 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </Popover>
    </div>
  );
};
