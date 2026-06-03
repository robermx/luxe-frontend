import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 20h16" />
      <path d="M6 20V6h6v14" />
      <path d="M14 20V4h4v16" />
      <path d="M8 8h2" />
      <path d="M8 11h2" />
      <path d="M8 14h2" />
      <path d="M16 7h1" />
      <path d="M16 10h1" />
      <path d="M16 13h1" />
    </BaseIcon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16.25 16.25 4.25 4.25" />
    </BaseIcon>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6.5 17.5h11" />
      <path d="M8.5 17.5V11a3.5 3.5 0 0 1 7 0v6.5" />
      <path d="M10 17.5a2 2 0 0 0 4 0" />
    </BaseIcon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </BaseIcon>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M20.2 8.5c0 4.6-8.2 10.7-8.2 10.7S3.8 13.1 3.8 8.5A4.3 4.3 0 0 1 12 6.4a4.3 4.3 0 0 1 8.2 2.1Z" />
    </BaseIcon>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 21s5-4.5 5-10a5 5 0 1 0-10 0c0 5.5 5 10 5 10Z" />
      <circle cx="12" cy="11" r="1.75" />
    </BaseIcon>
  );
}

export function BedIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 18v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
      <path d="M4 13v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
      <path d="M4 18h16" />
    </BaseIcon>
  );
}

export function BathIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
      <path d="M5 13h14" />
      <path d="M7 13v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1" />
      <path d="M6 7h3" />
    </BaseIcon>
  );
}

export function AreaIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 19V5h14" />
      <path d="M7 17 17 7" />
      <path d="M13 7h4v4" />
    </BaseIcon>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 6h16" />
      <path d="M7 6v0" />
      <path d="M4 12h16" />
      <path d="M13 12v0" />
      <path d="M4 18h16" />
      <path d="M17 18v0" />
    </BaseIcon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </BaseIcon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m6 9 6 6 6-6" />
    </BaseIcon>
  );
}
