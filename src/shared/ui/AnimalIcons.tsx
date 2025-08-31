import React from 'react';

export interface AnimalIconProps {
  className?: string;
  size?: number;
}

// Собачка
export const DogIcon: React.FC<AnimalIconProps> = ({ className, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
  >
    <path d="M10.5 5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
    <path d="M11.5 6.5c.276 0 .5-.448.5-1s-.224-1-.5-1-.5.448-.5 1 .224 1 .5 1"/>
    <path d="M4.5 6.5c.276 0 .5-.448.5-1s-.224-1-.5-1-.5.448-.5 1 .224 1 .5 1"/>
    <path d="M16 8c0 .76-.39 1.47-.98 2.07-.66.66-1.63 1.1-2.64 1.1-.76 0-1.48-.3-2.01-.83-.54.53-1.25.83-2.01.83s-1.47-.3-2.01-.83c-.53.53-1.25.83-2.01.83-1.01 0-1.98-.44-2.64-1.1C.39 9.47 0 8.76 0 8c0-1.57 1.26-2.84 2.8-2.84.8 0 1.56.37 2.06.95.5-.58 1.26-.95 2.06-.95s1.56.37 2.06.95c.5-.58 1.26-.95 2.06-.95C14.74 5.16 16 6.43 16 8"/>
  </svg>
);

// Кошка
export const CatIcon: React.FC<AnimalIconProps> = ({ className, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
  >
    <path d="m8 1 1.88 1.88.94-.94 1.06 1.06-.94.94L12 5c.26.26.45.62.5 1H14a.5.5 0 0 1 0 1h-1.5c-.05.38-.24.74-.5 1l-1.06-1.06-.94.94-1.06-1.06.94-.94L8 5 6.94 4.94l.94-.94-1.06-1.06-.94.94L4 2c-.26.26-.45.62-.5 1H2a.5.5 0 0 0 0 1h1.5c.05.38.24.74.5 1l1.06-1.06.94.94 1.06-1.06-.94-.94L8 1z"/>
    <path d="M2.5 15a.5.5 0 1 0 0-1H2a2 2 0 0 1-2-2c0-.5.5-1 1-1h1.5a.5.5 0 0 0 0-1H2c-1 0-2 .5-2 1.5S.5 14 2 14h.5a.5.5 0 0 0 0 1"/>
    <path d="M13.5 15a.5.5 0 1 1 0-1H14a2 2 0 0 0 2-2c0-.5-.5-1-1-1h-1.5a.5.5 0 0 1 0-1H14c1 0 2 .5 2 1.5s-.5 2.5-2 2.5h-.5a.5.5 0 0 1 0 1"/>
  </svg>
);

// Птица
export const BirdIcon: React.FC<AnimalIconProps> = ({ className, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
  >
    <path d="M1 8c0-4.4 3.6-8 8-8 3.1 0 5.8 1.8 7.1 4.4.3.6-.1 1.2-.7 1.2H14c-1.1 0-2 .9-2 2v.8c0 .6-.4 1-1 1H8c-2.2 0-4-1.8-4-4 0-.6-.4-1-1-1s-1 .4-1 1v3.6c0 2.2-1.8 4-4 4"/>
    <circle cx="12" cy="4" r="1"/>
  </svg>
);

// Хомяк  
export const HamsterIcon: React.FC<AnimalIconProps> = ({ className, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
  >
    <path d="M7 3c1.9 0 3.5 1.1 4.3 2.7.6 1.2.2 2.7-.9 3.4L9.6 9.8c-.4.3-1 .3-1.2-.1-.3-.4-.1-1 .3-1.2l.8-.6c.7-.5.9-1.4.4-2.1C9.3 5.2 8.2 5 7.6 5.6l-.8.6c-.4.3-1 .1-1.2-.3-.3-.4-.1-1 .3-1.2l.8-.6C7.4 3.4 8.2 3 9 3h-2z"/>
    <path d="M7 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0"/>
    <circle cx="5.5" cy="7.5" r="0.5"/>
    <circle cx="8.5" cy="7.5" r="0.5"/>
  </svg>
);

// Крыса
export const RatIcon: React.FC<AnimalIconProps> = ({ className, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
  >
    <path d="M6.5 7.5C6.5 6.67 7.17 6 8 6s1.5.67 1.5 1.5S8.83 9 8 9s-1.5-.67-1.5-1.5"/>
    <path d="M3 4.5C3 5.88 4.12 7 5.5 7S8 5.88 8 4.5 6.88 2 5.5 2 3 3.12 3 4.5"/>
    <path d="M1.5 13c-.83 0-1.5-.67-1.5-1.5S.67 10 1.5 10 3 10.67 3 11.5 2.33 13 1.5 13"/>
    <path d="M13.5 12c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5"/>
    <path d="M4 10c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v1c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-1"/>
    <path d="M2 6c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1V6"/>
  </svg>
);

// Иконка поиска
export const SearchIcon: React.FC<AnimalIconProps> = ({ className, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
  >
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
  </svg>
);

// Иконка шеврона вниз
export const ChevronDownIcon: React.FC<AnimalIconProps> = ({ className, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
  >
    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
  </svg>
);

// Mapping видов к иконкам
export const animalIcons = {
  dog: DogIcon,
  cat: CatIcon, 
  bird: BirdIcon,
  hamster: HamsterIcon,
  rat: RatIcon,
} as const;

export type AnimalSpecies = keyof typeof animalIcons;
