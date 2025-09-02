"use client";

import { useState, useEffect } from "react";
import { Popover, Button, Badge, Input } from "@/shared/ui";
import { ChevronDownIcon } from "@/shared/ui/icons/ChevronDownIcon";
import {
  animalIcons,
  type AnimalSpecies,
} from "@/shared/ui/icons/AnimalIcons";
import { getSpeciesDisplayName } from "@/shared/utils/species";
import { cn } from "@/shared/utils/cn";

export interface PetsPopoverProps {
  availableSpecies: string[];
  selectedSpecies: string[];
  availableTags: string[];
  selectedTags: string[];
  onApplyFilter: (species: string[], tags: string[]) => void;
  className?: string;
}

export const PetsPopover: React.FC<PetsPopoverProps> = ({
  availableSpecies,
  selectedSpecies,
  availableTags,
  selectedTags,
  onApplyFilter,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedSpecies, setTempSelectedSpecies] = useState<string[]>([]);
  const [tempSelectedTags, setTempSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    setTempSelectedSpecies([...selectedSpecies]);
    setTempSelectedTags([...selectedTags]);
  }, [selectedSpecies, selectedTags]);

  const hasAnySelected = tempSelectedSpecies.length > 0 || tempSelectedTags.length > 0;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setTempSelectedSpecies([...selectedSpecies]);
      setTempSelectedTags([...selectedTags]);
    } else {
      setTagInput("");
    }
  };

  const handleTempSpeciesToggle = (species: string) => {
    setTempSelectedSpecies((prev) =>
      prev.includes(species)
        ? prev.filter((s) => s !== species)
        : [...prev, species],
    );
  };

  const handleTempTagAdd = (tag: string) => {
    if (!tempSelectedTags.includes(tag)) {
      setTempSelectedTags((prev) => [...prev, tag]);
    }
    setTagInput("");
  };

  const handleTempTagRemove = (tagToRemove: string) => {
    setTempSelectedTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleAnyAnimalClick = () => {
    setTempSelectedSpecies([]);
    setTempSelectedTags([]);
  };

  const handleApply = () => {
    onApplyFilter([...tempSelectedSpecies], [...tempSelectedTags]);
    setIsOpen(false);
  };

  const handleReset = () => {
    setTempSelectedSpecies([]);
    setTempSelectedTags([]);
    onApplyFilter([], []);
    setIsOpen(false);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      handleTempTagAdd(tagInput.trim());
    }
  };

  const filteredTags = availableTags.filter((tag) =>
    tag.toLowerCase().includes(tagInput.toLowerCase()) &&
    !tempSelectedTags.includes(tag)
  );

  const popoverContent = (
    <div className="min-w-40 w-[20rem]">
      {/* Species Section */}
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

      {/* Tags Section */}
      <div className="border-t border-gray-200 p-4">
        <Input
          type="text"
          placeholder="Filter by tag..."
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagInputKeyDown}
          className="mb-3"
        />

        {/* Selected Tags */}
        {tempSelectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tempSelectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="filter-selected"
                onClick={() => handleTempTagRemove(tag)}
                className="cursor-pointer flex items-center gap-1"
              >
                {tag}
                <span className="text-xs ml-1">×</span>
              </Badge>
            ))}
          </div>
        )}

        {/* Available Tags Dropdown */}
        {tagInput && filteredTags.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-md shadow-sm max-h-32 overflow-y-auto">
            {filteredTags.slice(0, 5).map((tag) => (
              <div
                key={tag}
                className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                onClick={() => handleTempTagAdd(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
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

  const totalSelected = selectedSpecies.length + selectedTags.length;
  const displayText = totalSelected > 0 ? `${totalSelected} selected` : "Pets";

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
        <Button variant="outline" className="h-full">
          <span>{displayText}</span>
          <ChevronDownIcon
            size={16}
            className={cn(
              "text-gray-500 transition-transform duration-200",
              isOpen && "rotate-180 border-gray-300",
            )}
          />
        </Button>
      </Popover>
    </div>
  );
};
