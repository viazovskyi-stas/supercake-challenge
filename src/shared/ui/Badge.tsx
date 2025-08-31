import { cn } from '../utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default', 
  className 
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-blue-100 text-blue-800': variant === 'default',
          'bg-gray-100 text-gray-800': variant === 'secondary',
          'bg-green-100 text-green-800': variant === 'success',
          'bg-yellow-100 text-yellow-800': variant === 'warning',
          'bg-red-100 text-red-800': variant === 'destructive',
        },
        className
      )}
    >
      {children}
    </span>
  );
};
