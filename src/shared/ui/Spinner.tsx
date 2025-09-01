import React from 'react';
import { cn } from '../utils/cn';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: 'primary' | 'white' | 'gray';
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  className,
  color = 'primary'
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2', 
    lg: 'h-8 w-8 border-2',
  };

  const colorClasses = {
    primary: 'border-primary border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-300 border-t-transparent',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
};
