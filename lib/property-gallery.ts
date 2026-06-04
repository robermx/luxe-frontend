import type { PropertyListing } from "@/models/property-model";

type GalleryTheme = {
  sky: string;
  haze: string;
  mass: string;
  soil: string;
  accent: string;
  shape: "villa" | "penthouse" | "house" | "apartment" | "loft" | "cabin" | "studio";
};

const THEME_MAP: Record<PropertyListing["propertyType"], GalleryTheme[]> = {
  villa: [
    { sky: "#c2d9e7", haze: "#edf4f1", mass: "#274842", soil: "#6a8f8a", accent: "#d9ecc8", shape: "villa" },
    { sky: "#d7e3c8", haze: "#f4f4eb", mass: "#314c39", soil: "#7c9d72", accent: "#d9ecc8", shape: "villa" },
    { sky: "#d8d2c3", haze: "#f4eee3", mass: "#3c473f", soil: "#8a745e", accent: "#d9ecc8", shape: "villa" },
    { sky: "#c6d8f0", haze: "#eef5fb", mass: "#25414b", soil: "#6f93a3", accent: "#d9ecc8", shape: "villa" },
    { sky: "#d8e4d8", haze: "#f5f8f1", mass: "#395041", soil: "#87a17b", accent: "#d9ecc8", shape: "villa" },
  ],
  penthouse: [
    { sky: "#dce3ea", haze: "#f3f6fb", mass: "#34424a", soil: "#93a3b1", accent: "#d9ecc8", shape: "penthouse" },
    { sky: "#e0d5c2", haze: "#f6efe4", mass: "#56453d", soil: "#b39d86", accent: "#d9ecc8", shape: "penthouse" },
    { sky: "#c8d8e9", haze: "#f1f6fb", mass: "#2f4251", soil: "#7e99ac", accent: "#d9ecc8", shape: "penthouse" },
    { sky: "#d5e0d0", haze: "#f4f8f1", mass: "#3a4a39", soil: "#8aa17a", accent: "#d9ecc8", shape: "penthouse" },
    { sky: "#e2d6d4", haze: "#f8f1ef", mass: "#4d3b3d", soil: "#b28e8d", accent: "#d9ecc8", shape: "penthouse" },
  ],
  house: [
    { sky: "#b9d3e8", haze: "#eff6fb", mass: "#2f4d45", soil: "#6f9676", accent: "#d9ecc8", shape: "house" },
    { sky: "#d8c5b0", haze: "#f7efe6", mass: "#5b4630", soil: "#b1916d", accent: "#d9ecc8", shape: "house" },
    { sky: "#cfdac8", haze: "#f4f7f0", mass: "#304734", soil: "#7f9a72", accent: "#d9ecc8", shape: "house" },
    { sky: "#d7dfe8", haze: "#f4f7fb", mass: "#404d57", soil: "#8a99a8", accent: "#d9ecc8", shape: "house" },
    { sky: "#e1d0ba", haze: "#f8f0e3", mass: "#5b4130", soil: "#af8f63", accent: "#d9ecc8", shape: "house" },
  ],
  apartment: [
    { sky: "#ccd9e5", haze: "#f1f7fa", mass: "#36444e", soil: "#8a99a8", accent: "#d9ecc8", shape: "apartment" },
    { sky: "#d9cbb8", haze: "#f6f1e6", mass: "#55453d", soil: "#b6a28a", accent: "#d9ecc8", shape: "apartment" },
    { sky: "#d3e3d7", haze: "#f4f9f4", mass: "#30423c", soil: "#90a88c", accent: "#d9ecc8", shape: "apartment" },
    { sky: "#d5d8e2", haze: "#f2f4f8", mass: "#3d4752", soil: "#9da6b7", accent: "#d9ecc8", shape: "apartment" },
    { sky: "#e0d1c5", haze: "#f8f1ea", mass: "#564b42", soil: "#b09a84", accent: "#d9ecc8", shape: "apartment" },
  ],
  loft: [
    { sky: "#d7c9b5", haze: "#f7f0e7", mass: "#5d4e46", soil: "#c1b29d", accent: "#d9ecc8", shape: "loft" },
    { sky: "#c8d6df", haze: "#f3f7fa", mass: "#40515a", soil: "#9aa7b1", accent: "#d9ecc8", shape: "loft" },
    { sky: "#d8e1d0", haze: "#f4f8f1", mass: "#3c4c3f", soil: "#8ea089", accent: "#d9ecc8", shape: "loft" },
    { sky: "#e1d7c5", haze: "#f7f2e9", mass: "#5a4c42", soil: "#b7a08a", accent: "#d9ecc8", shape: "loft" },
    { sky: "#d3d9e7", haze: "#f4f7fb", mass: "#414d5a", soil: "#9ea9b9", accent: "#d9ecc8", shape: "loft" },
  ],
  cabin: [
    { sky: "#c0ccb7", haze: "#f3f6ef", mass: "#243226", soil: "#6c865b", accent: "#d9ecc8", shape: "cabin" },
    { sky: "#d0c2ae", haze: "#f7efe2", mass: "#45362c", soil: "#9d866d", accent: "#d9ecc8", shape: "cabin" },
    { sky: "#c9d6c6", haze: "#f4f8f1", mass: "#2d3a2e", soil: "#7f9c71", accent: "#d9ecc8", shape: "cabin" },
    { sky: "#d7d0c1", haze: "#f8f3ea", mass: "#4d4036", soil: "#ad9a81", accent: "#d9ecc8", shape: "cabin" },
    { sky: "#cdd6de", haze: "#f4f8fb", mass: "#36424d", soil: "#8aa0b1", accent: "#d9ecc8", shape: "cabin" },
  ],
  studio: [
    { sky: "#e3d9c7", haze: "#faf3e8", mass: "#4d4d45", soil: "#cfc0a0", accent: "#d9ecc8", shape: "studio" },
    { sky: "#d6d0db", haze: "#f6f3f9", mass: "#47424e", soil: "#b8afc2", accent: "#d9ecc8", shape: "studio" },
    { sky: "#d1dfd9", haze: "#f4faf7", mass: "#36504a", soil: "#94b0a7", accent: "#d9ecc8", shape: "studio" },
    { sky: "#ddd7cb", haze: "#f8f3ea", mass: "#53483f", soil: "#bba98f", accent: "#d9ecc8", shape: "studio" },
    { sky: "#cfd8e4", haze: "#f4f8fb", mass: "#404f5d", soil: "#99aab9", accent: "#d9ecc8", shape: "studio" },
  ],
};

export function buildPropertyGalleryFallbacks(
  property: PropertyListing,
  alreadyHave = 0,
): string[] {
  const themes = THEME_MAP[property.propertyType];

  return Array.from({ length: Math.max(0, 5 - alreadyHave) }, (_, offset) => {
    const theme = themes[offset % themes.length];
    return createGalleryImage(property.title, property.location, theme, offset);
  });
}

function createGalleryImage(
  title: string,
  location: string,
  theme: GalleryTheme,
  variant: number,
) {
  const houseOffset = 24 + variant * 12;
  const buildingWidth = 200 + variant * 10;
  const baseX = 164 + variant * 8;
  const secondaryWidth = 92 + (variant % 2) * 18;
  const footerY = 392 - variant * 2;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img" aria-label="${title} in ${location}">
      <defs>
        <linearGradient id="sky-${variant}" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${theme.sky}" />
          <stop offset="100%" stop-color="#eef6f6" />
        </linearGradient>
        <linearGradient id="sun-${variant}" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.88" />
          <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0.2" />
        </linearGradient>
      </defs>
      <rect width="640" height="480" fill="url(#sky-${variant})" />
      <circle cx="518" cy="92" r="54" fill="url(#sun-${variant})" />
      <circle cx="148" cy="110" r="26" fill="${theme.accent}" opacity="0.18" />
      <path d="M0 318C84 292 158 290 228 310c60 18 120 24 182 8 74-18 130-18 230 8v154H0z" fill="${theme.soil}" />
      <path d="M0 328c92-20 164-20 230 0 64 18 116 18 178 0 70-18 132-18 232 0v18c-100-16-162-16-232 0-62 18-114 18-178 0-66-20-138-20-230 0z" fill="${theme.haze}" opacity="0.22" />
      <g transform="translate(0 ${houseOffset})">
        ${theme.shape === "villa"
          ? `
            <rect x="${baseX}" y="120" width="${buildingWidth}" height="126" rx="16" fill="${theme.mass}" opacity="0.98"/>
            <rect x="${baseX - 58}" y="148" width="118" height="98" rx="12" fill="${theme.mass}" opacity="0.88"/>
            <rect x="${baseX + 270}" y="150" width="${secondaryWidth}" height="96" rx="12" fill="${theme.mass}" opacity="0.84"/>
            <rect x="${baseX + 64}" y="92" width="78" height="38" rx="8" fill="${theme.accent}" opacity="0.86"/>
            <rect x="${baseX + 128}" y="166" width="42" height="86" rx="8" fill="${theme.accent}" opacity="0.64"/>
          `
          : theme.shape === "penthouse"
            ? `
              <rect x="${baseX + 14}" y="104" width="${buildingWidth + 56}" height="136" rx="16" fill="${theme.mass}" opacity="0.96"/>
              <rect x="${baseX + 72}" y="72" width="178" height="48" rx="12" fill="${theme.accent}" opacity="0.82"/>
              <rect x="${baseX - 4}" y="132" width="56" height="124" rx="8" fill="${theme.mass}" opacity="0.76"/>
              <rect x="${baseX + 314}" y="132" width="56" height="124" rx="8" fill="${theme.mass}" opacity="0.76"/>
            `
            : theme.shape === "house"
              ? `
                <path d="M${baseX - 8} 176 ${baseX + 138} 88l146 88v82H${baseX - 8}z" fill="${theme.mass}" opacity="0.98"/>
                <rect x="${baseX + 20}" y="184" width="100" height="72" rx="12" fill="${theme.accent}" opacity="0.8"/>
                <rect x="${baseX + 176}" y="168" width="74" height="108" rx="12" fill="${theme.mass}" opacity="0.84"/>
              `
              : theme.shape === "apartment"
                ? `
                  <rect x="${baseX + 22}" y="86" width="182" height="186" rx="18" fill="${theme.mass}" opacity="0.97"/>
                  <rect x="${baseX + 48}" y="114" width="38" height="38" rx="8" fill="${theme.accent}" opacity="0.72"/>
                  <rect x="${baseX + 102}" y="114" width="38" height="38" rx="8" fill="${theme.accent}" opacity="0.72"/>
                  <rect x="${baseX + 156}" y="114" width="38" height="38" rx="8" fill="${theme.accent}" opacity="0.72"/>
                  <rect x="${baseX + 48}" y="170" width="38" height="38" rx="8" fill="${theme.accent}" opacity="0.72"/>
                  <rect x="${baseX + 102}" y="170" width="38" height="38" rx="8" fill="${theme.accent}" opacity="0.72"/>
                  <rect x="${baseX + 156}" y="170" width="38" height="38" rx="8" fill="${theme.accent}" opacity="0.72"/>
                `
                : theme.shape === "loft"
                  ? `
                    <rect x="${baseX + 4}" y="112" width="250" height="152" rx="14" fill="${theme.mass}" opacity="0.96"/>
                    <path d="M${baseX + 4} 154h250" stroke="${theme.accent}" stroke-width="10" opacity="0.32"/>
                    <rect x="${baseX + 42}" y="146" width="160" height="72" rx="10" fill="${theme.accent}" opacity="0.7"/>
                  `
                  : theme.shape === "cabin"
                    ? `
                      <path d="M${baseX + 14} 180 ${baseX + 132} 92l118 88v86H${baseX + 14}z" fill="${theme.mass}" opacity="0.98"/>
                      <rect x="${baseX + 92}" y="196" width="92" height="72" rx="10" fill="${theme.accent}" opacity="0.72"/>
                    `
                    : `
                      <rect x="${baseX + 24}" y="112" width="188" height="148" rx="16" fill="${theme.mass}" opacity="0.97"/>
                      <rect x="${baseX + 54}" y="144" width="128" height="84" rx="10" fill="${theme.accent}" opacity="0.74"/>
                    `}
      </g>
      <rect x="20" y="${footerY}" width="276" height="56" rx="18" fill="rgba(255,255,255,0.74)" stroke="rgba(25,50,47,0.06)" />
      <text x="48" y="${footerY + 24}" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" fill="#19322f">${location}</text>
      <text x="48" y="${footerY + 42}" font-family="Arial, Helvetica, sans-serif" font-size="12" fill="#5c706d">Gallery view ${variant + 1}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
