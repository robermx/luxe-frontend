import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
};

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  badge?: boolean;
};

export function NavLink({ active = false, className, children, ...props }: NavLinkProps) {
  return (
    <a
      className={cn(
        "px-1 py-1 text-sm font-medium transition-colors",
        active
          ? "border-b-2 border-(--color-mosque) text-(--color-mosque)"
          : "text-[rgba(25,50,47,0.7)] hover:text-(--color-nordic) hover:border-b-2 hover:border-[rgba(25,50,47,0.12)]",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function IconButton({ badge, className, children, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "relative grid h-10 w-10 place-items-center rounded-full text-(--color-nordic) transition-colors hover:text-(--color-mosque)",
        className,
      )}
      {...props}
    >
      {children}
      {badge ? (
        <span className="absolute right-px top-px h-2 w-2 rounded-full border-2 border-(--color-clear) bg-red-500" />
      ) : null}
    </button>
  );
}

export function AvatarBadge() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(25,50,47,0.08)] bg-[linear-gradient(135deg,#f2d8c5,#e7b38c)] text-[13px] font-semibold text-(--color-nordic) shadow-[0_6px_16px_rgba(25,50,47,0.08)]">
      RE
    </div>
  );
}
