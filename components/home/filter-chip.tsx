import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type FilterChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export function FilterChip({
  active = false,
  className,
  children,
  ...props
}: FilterChipProps) {
  return (
    <button
      type="button"
      className={cn(
        "whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all",
        active
          ? "bg-(--color-nordic) text-white shadow-[0_8px_20px_rgba(25,50,47,0.18)]"
          : "border border-[rgba(25,50,47,0.08)] bg-white text-[rgba(25,50,47,0.72)] hover:border-[rgba(0,102,85,0.35)] hover:bg-[rgba(0,102,85,0.05)] hover:text-(--color-nordic)",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
