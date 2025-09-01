import React from 'react';
import { Spinner } from './Spinner';
import { cn } from '../utils/cn';

export interface SearchLoadingIndicatorProps {
  show: boolean;
  className?: string;
}

export const SearchLoadingIndicator: React.FC<SearchLoadingIndicatorProps> = ({
  show,
  className
}) => {
  if (!show) return null;

  return (
    <div className={cn(
      'absolute right-3 top-1/2 -translate-y-1/2 transition-opacity',
      show ? 'opacity-100' : 'opacity-0',
      className
    )}>
      <Spinner size="sm" />
    </div>
  );
};
