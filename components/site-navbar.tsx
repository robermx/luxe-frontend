"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  BellIcon,
  BuildingIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/home/icons";
import { AvatarBadge, IconButton, NavLink } from "@/components/home/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Buy", href: "/#" },
  { label: "Rent", href: "/#" },
  { label: "Sell", href: "/#" },
  { label: "Saved Homes", href: "/#" },
] as const;

export function SiteNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isBuyActive = pathname === "/" || pathname.startsWith("/properties/");
  const isRentActive =
    pathname === "/" && searchParams.get("listingMode") === "rent";

  const activeMap = useMemo(
    () =>
      new Map<string, boolean>([
        ["/", isBuyActive],
        ["/?listingMode=rent", isRentActive],
      ]),
    [isBuyActive, isRentActive],
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(25,50,47,0.08)] bg-[rgba(238,246,246,0.92)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-(--color-nordic) text-white shadow-[0_8px_16px_rgba(25,50,47,0.18)]">
            <BuildingIcon className="h-4.5 w-4.5" />
          </div>
          <span className="text-[20px] font-semibold tracking-tight">
            LuxeEstate
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              active={activeMap.get(item.href) ?? false}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <IconButton aria-label="Search">
            <SearchIcon className="h-5 w-5" />
          </IconButton>
          <IconButton aria-label="Notifications" badge>
            <BellIcon className="h-5 w-5" />
          </IconButton>
          <div className="hidden h-9 w-px bg-[rgba(25,50,47,0.08)] sm:block" />
          <div className="hidden sm:block">
            <AvatarBadge />
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(25,50,47,0.08)] bg-white text-(--color-nordic) shadow-[0_6px_16px_rgba(25,50,47,0.06)] transition-colors hover:text-(--color-mosque) md:hidden"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-[rgba(25,50,47,0.06)] bg-(--color-clear) transition-[max-height,opacity] duration-300 md:hidden",
          mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="space-y-1 px-4 py-3 sm:px-6">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              active={activeMap.get(item.href) ?? false}
              className={cn(
                "block rounded-xl px-3 py-2",
                activeMap.get(item.href) && "bg-[rgba(0,102,85,0.08)]",
              )}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
