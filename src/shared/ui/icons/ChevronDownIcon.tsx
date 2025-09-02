import React from "react";
import { IconProps } from "./SearchIcon";

export const ChevronDownIcon: React.FC<IconProps> = ({
  size,
  width = 16,
  height = 16,
  className,
}) => {
  const finalWidth = size ? `${size / 16}rem` : width;
  const finalHeight = size ? `${size / 16}rem` : height;
  
  return (
    <svg
      width={finalWidth}
      height={finalHeight}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
      fill="currentColor"
        />
  </svg>
  );
};
