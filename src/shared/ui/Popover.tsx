"use client";

import * as RadixPopover from "@radix-ui/react-popover";
import { cn } from "../utils/cn";

export interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const Popover: React.FC<PopoverProps> = ({
  children,
  content,
  open,
  onOpenChange,
  side = "bottom",
  align = "start",
  sideOffset = 8,
}) => {
  return (
    <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger asChild>{children}</RadixPopover.Trigger>

      <RadixPopover.Portal>
        <RadixPopover.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "z-50 min-w-[12.5rem] rounded-xl bg-white shadow-popover",
            "border border-gray-200",
            "animate-slide-down",
            "data-[state=closed]:animate-fade-out",
          )}
        >
          {content}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};
