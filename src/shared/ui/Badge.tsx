import { cn } from "../utils/cn";

export interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "destructive"
    | "filter"
    | "filter-selected";
  className?: string;
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className,
  onClick,
}) => {
  const Component = onClick ? "button" : "span";

  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 px-4 py-1.5 text-xs font-medium transition-all h-7",
        {
          "bg-blue-100 text-blue-800 rounded-full": variant === "default",
          "bg-gray-100 text-gray-800 rounded-full": variant === "secondary",
          "bg-green-100 text-green-800 rounded-full": variant === "success",
          "bg-yellow-100 text-yellow-800 rounded-full": variant === "warning",
          "bg-red-100 text-red-800 rounded-full": variant === "destructive",
          "bg-white text-gray-600 border border-gray-200 rounded-full hover:border-gray-300 hover:bg-gray-50":
            variant === "filter",
          "bg-primary text-white border border-primary rounded-full":
            variant === "filter-selected",
        },
        className,
      )}
    >
      {children}
    </Component>
  );
};
