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

export function CheckIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m5 12 4 4L19 6" />
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

export function HomeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4.5 11.5 12 5l7.5 6.5" />
      <path d="M6.5 10.5V19h11v-8.5" />
      <path d="M10 19v-5h4v5" />
    </BaseIcon>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M20 14a3 3 0 0 1-3 3H8l-4 4v-4a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h13a3 3 0 0 1 3 3z" />
    </BaseIcon>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 3.8 9.2 6a1.8 1.8 0 0 1 0 2.5L7.9 9.8a13 13 0 0 0 6.3 6.3l1.3-1.3a1.8 1.8 0 0 1 2.5 0l2.2 2.2a1.8 1.8 0 0 1 0 2.5l-1 1a2.6 2.6 0 0 1-2.8.5C10.4 19.4 4.6 13.6 2.8 5.6a2.6 2.6 0 0 1 .5-2.8l1-1a1.8 1.8 0 0 1 2.5 0Z" />
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
