import { Customer } from "@/shared/types";

export enum Species {
  DOG = "dog",
  CAT = "cat",
  BIRD = "bird",
  HAMSTER = "hamster",
  RAT = "rat",
}

export const speciesConfig = {
  [Species.DOG]: {
    displayName: "Dog",
    icon: "🐕",
  },
  [Species.CAT]: {
    displayName: "Cat",
    icon: "🐱",
  },
  [Species.BIRD]: {
    displayName: "Bird",
    icon: "🐦",
  },
  [Species.HAMSTER]: {
    displayName: "Hamster",
    icon: "🐹",
  },
  [Species.RAT]: {
    displayName: "Rat",
    icon: "🐭",
  },
};

export const getAllSpecies = (customers: Customer[]): Species[] => {
  const speciesSet = new Set<Species>();

  for (const customer of customers) {
    for (const pet of customer.pets) {
      speciesSet.add(pet.species as Species);
    }
  }

  return Array.from(speciesSet).sort();
};

export const getAllTags = (customers: Customer[]): TagName[] => {
  const tagsSet = new Set<TagName>();

  for (const customer of customers) {
    for (const pet of customer.pets) {
      if (pet.tags) {
        for (const tag of pet.tags) {
          tagsSet.add(tag);
        }
      }
    }
  }

  return Array.from(tagsSet).sort();
};

export const getSpeciesDisplayName = (species: Species): string => {
  return speciesConfig[species].displayName;
};

export const getSpeciesIcon = (species: Species): string => {
  return speciesConfig[species].icon;
};

export enum TagName {
  FRIENDLY = "Friendly",
  INDOOR = "Indoor",
  GOOD_BOY = "Good Boy",
  PLAYFUL = "Playful",
  QUIET = "Quiet",
  LAZY = "Lazy",
  TALKATIVE = "Talkative",
  COLORFUL = "Colorful",
  ENERGETIC = "Energetic",
  LOYAL = "Loyal",
  SMART = "Smart",
  MUSICAL = "Musical",
  SMALL = "Small",
  ACTIVE = "Active",
  BIG = "Big",
  GUARD = "Guard",
  BITES = "Bites",
  CLEVER = "Clever",
  LUCKY = "Lucky",
  OUTDOOR = "Outdoor",
  MORNING_SINGER = "Morning Singer",
  NOISY = "Noisy",
  STEALTHY = "Stealthy",
  INDEPENDENT = "Independent",
  OLD = "Old",
  WISE = "Wise",
}

const tagColors: Record<TagName, { bg: string; text: string; border: string; hover: string }> = {
  [TagName.FRIENDLY]: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", hover: "hover:bg-blue-100" },
  [TagName.INDOOR]: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", hover: "hover:bg-green-100" },
  [TagName.GOOD_BOY]: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", hover: "hover:bg-purple-100" },
  [TagName.PLAYFUL]: { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200", hover: "hover:bg-pink-100" },
  [TagName.QUIET]: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", hover: "hover:bg-indigo-100" },
  [TagName.LAZY]: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", hover: "hover:bg-yellow-100" },
  [TagName.TALKATIVE]: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", hover: "hover:bg-red-100" },
  [TagName.COLORFUL]: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", hover: "hover:bg-teal-100" },
  [TagName.ENERGETIC]: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", hover: "hover:bg-orange-100" },
  [TagName.LOYAL]: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200", hover: "hover:bg-cyan-100" },
  [TagName.SMART]: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", hover: "hover:bg-emerald-100" },
  [TagName.MUSICAL]: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", hover: "hover:bg-violet-100" },
  [TagName.SMALL]: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", hover: "hover:bg-rose-100" },
  [TagName.ACTIVE]: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", hover: "hover:bg-amber-100" },
  [TagName.BIG]: { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200", hover: "hover:bg-slate-100" },
  [TagName.GUARD]: { bg: "bg-stone-50", text: "text-stone-700", border: "border-stone-200", hover: "hover:bg-stone-100" },
  [TagName.BITES]: { bg: "bg-red-100", text: "text-red-800", border: "border-red-300", hover: "hover:bg-red-200" },
  [TagName.CLEVER]: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300", hover: "hover:bg-blue-200" },
  [TagName.LUCKY]: { bg: "bg-green-100", text: "text-green-800", border: "border-green-300", hover: "hover:bg-green-200" },
  [TagName.OUTDOOR]: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300", hover: "hover:bg-purple-200" },
  [TagName.MORNING_SINGER]: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300", hover: "hover:bg-yellow-200" },
  [TagName.NOISY]: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300", hover: "hover:bg-orange-200" },
  [TagName.STEALTHY]: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-300", hover: "hover:bg-gray-200" },
  [TagName.INDEPENDENT]: { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-300", hover: "hover:bg-indigo-200" },
  [TagName.OLD]: { bg: "bg-zinc-100", text: "text-zinc-800", border: "border-zinc-300", hover: "hover:bg-zinc-200" },
  [TagName.WISE]: { bg: "bg-sky-100", text: "text-sky-800", border: "border-sky-300", hover: "hover:bg-sky-200" },
};

export const getTagColor = (tag: TagName) => {
  return tagColors[tag];
};
