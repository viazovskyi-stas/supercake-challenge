'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { SearchIcon } from './icons';
import { cn } from '../utils/cn';

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
  value?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className={cn('relative', className)}>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <SearchIcon size={16} />
        </div>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          className={cn(
            'w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg',
            'text-sm text-gray-900 placeholder:text-gray-400',
            'hover:border-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
            'focus:outline-none transition-colors'
          )}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
