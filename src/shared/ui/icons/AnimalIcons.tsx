import { DogIcon } from "./DogIcon";
import { CatIcon } from "./CatIcon";
import { BirdIcon } from "./BirdIcon";
import { HamsterIcon } from "./HamsterIcon";
import { RatIcon } from "./RatIcon";

// Mapping видов к иконкам
export const animalIcons = {
  dog: DogIcon,
  cat: CatIcon,
  bird: BirdIcon,
  hamster: HamsterIcon,
  rat: RatIcon,
} as const;

export type AnimalSpecies = keyof typeof animalIcons;
