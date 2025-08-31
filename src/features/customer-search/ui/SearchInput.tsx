'use client';

import { useState, useCallback } from 'react';
import { Input } from '../../../shared/ui';

export interface SearchInputProps {
  onSearch: (searchText: string) => void;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = "Search customers, emails, phones, or pets...",
  defaultValue = "",
  className
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  }, [onSearch]);

  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={className}
      label="Search"
    />
  );
};
