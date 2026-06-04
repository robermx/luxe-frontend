import type { PropertyListing } from "@/models/property-model";

type PropertyImageTheme = {
  sky: string;
  building: string;
  accent: string;
  floor: string;
  foliage?: string;
  secondBuilding?: string;
  shape: "villa" | "penthouse" | "house" | "apartment" | "loft" | "cabin" | "studio";
};

function toDataUri(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createPropertyImage(title: string, location: string, theme: PropertyImageTheme) {
  const shape =
    theme.shape === "villa"
      ? `
        <rect x="174" y="126" width="264" height="132" rx="14" fill="${theme.building}" opacity="0.98"/>
        <rect x="116" y="156" width="124" height="102" rx="12" fill="${theme.secondBuilding ?? theme.building}" opacity="0.86"/>
        <rect x="446" y="158" width="96" height="100" rx="12" fill="${theme.secondBuilding ?? theme.building}" opacity="0.86"/>
        <rect x="246" y="98" width="84" height="42" rx="8" fill="${theme.accent}" opacity="0.85"/>
        <rect x="304" y="168" width="42" height="90" rx="8" fill="${theme.accent}" opacity="0.62"/>
      `
      : theme.shape === "penthouse"
        ? `
          <rect x="146" y="118" width="330" height="132" rx="16" fill="${theme.building}" opacity="0.96"/>
          <rect x="206" y="80" width="210" height="54" rx="12" fill="${theme.accent}" opacity="0.82"/>
          <rect x="186" y="136" width="52" height="120" rx="8" fill="${theme.secondBuilding ?? theme.building}" opacity="0.72"/>
          <rect x="404" y="136" width="52" height="120" rx="8" fill="${theme.secondBuilding ?? theme.building}" opacity="0.72"/>
        `
        : theme.shape === "house"
          ? `
            <path d="M140 190 300 90l160 100v86H140z" fill="${theme.building}" opacity="0.98"/>
            <rect x="190" y="196" width="120" height="78" rx="12" fill="${theme.accent}" opacity="0.8"/>
            <rect x="338" y="180" width="84" height="114" rx="12" fill="${theme.secondBuilding ?? theme.building}" opacity="0.84"/>
          `
          : theme.shape === "apartment"
            ? `
              <rect x="194" y="86" width="212" height="184" rx="18" fill="${theme.building}" opacity="0.97"/>
              <rect x="226" y="114" width="42" height="42" rx="8" fill="${theme.accent}" opacity="0.72"/>
              <rect x="282" y="114" width="42" height="42" rx="8" fill="${theme.accent}" opacity="0.72"/>
              <rect x="338" y="114" width="42" height="42" rx="8" fill="${theme.accent}" opacity="0.72"/>
              <rect x="226" y="172" width="42" height="42" rx="8" fill="${theme.accent}" opacity="0.72"/>
              <rect x="282" y="172" width="42" height="42" rx="8" fill="${theme.accent}" opacity="0.72"/>
              <rect x="338" y="172" width="42" height="42" rx="8" fill="${theme.accent}" opacity="0.72"/>
            `
            : theme.shape === "loft"
              ? `
                <rect x="176" y="116" width="248" height="148" rx="14" fill="${theme.building}" opacity="0.96"/>
                <path d="M176 156h248" stroke="${theme.accent}" stroke-width="10" opacity="0.32"/>
                <rect x="214" y="148" width="160" height="70" rx="10" fill="${theme.accent}" opacity="0.7"/>
              `
              : theme.shape === "cabin"
                ? `
                  <path d="M176 184 300 92l124 92v88H176z" fill="${theme.building}" opacity="0.98"/>
                  <rect x="252" y="198" width="96" height="74" rx="10" fill="${theme.accent}" opacity="0.72"/>
                `
                : `
                  <rect x="206" y="112" width="188" height="148" rx="16" fill="${theme.building}" opacity="0.97"/>
                  <rect x="236" y="144" width="128" height="84" rx="10" fill="${theme.accent}" opacity="0.74"/>
                `;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img" aria-label="${title} in ${location}">
      <defs>
        <linearGradient id="sky" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${theme.sky}" />
          <stop offset="100%" stop-color="#eef6f6" />
        </linearGradient>
        <linearGradient id="sun" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
          <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0.2" />
        </linearGradient>
      </defs>
      <rect width="640" height="480" fill="url(#sky)" />
      <circle cx="506" cy="92" r="56" fill="url(#sun)" />
      <circle cx="164" cy="104" r="24" fill="${theme.accent}" opacity="0.18" />
      <path d="M0 314C92 288 168 288 232 312c64 24 118 26 184 8 66-18 128-18 224 6v166H0z" fill="${theme.floor}" />
      <path d="M0 322c94-18 170-18 232 0 66 18 120 18 180 0 66-18 130-18 228 0v18c-98-16-162-16-228 0-60 18-114 18-180 0-62-18-138-18-232 0z" fill="${theme.foliage ?? theme.accent}" opacity="0.16" />
      <g transform="translate(0 74)">
        ${shape}
      </g>
      <rect x="20" y="400" width="280" height="58" rx="18" fill="rgba(255,255,255,0.74)" stroke="rgba(25,50,47,0.06)" />
      <text x="52" y="423" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" fill="#19322f">${location}</text>
      <text x="52" y="442" font-family="Arial, Helvetica, sans-serif" font-size="12" fill="#5c706d">Premium listing</text>
    </svg>
  `;

  return toDataUri(svg);
}

export const properties: PropertyListing[] = [
  {
    id: "glass-pavilion",
    title: "The Glass Pavilion",
    location: "Beverly Hills, California",
    price: 5250000,
    listingMode: "buy",
    propertyType: "villa",
    beds: 5,
    baths: 4.5,
    area: 4200,
    image: createPropertyImage("The Glass Pavilion", "Beverly Hills, California", {
      sky: "#98c3f0",
      building: "#203a36",
      accent: "#d9ecc8",
      floor: "#4f7f8c",
      shape: "villa",
    }),
    badge: "Exclusive",
    featured: true,
    surface: "collection",
  },
  {
    id: "azure-heights",
    title: "Azure Heights Penthouse",
    location: "Downtown, Vancouver",
    price: 3800000,
    listingMode: "buy",
    propertyType: "penthouse",
    beds: 3,
    baths: 3,
    area: 2100,
    image: createPropertyImage("Azure Heights Penthouse", "Downtown, Vancouver", {
      sky: "#cad4df",
      building: "#33424a",
      accent: "#d9ecc8",
      floor: "#7f8f9a",
      shape: "penthouse",
    }),
    badge: "New Arrival",
    featured: true,
    surface: "collection",
  },
  {
    id: "modern-family-home",
    title: "Modern Family Home",
    location: "123 Pine St, Seattle",
    price: 850000,
    listingMode: "buy",
    propertyType: "house",
    beds: 3,
    baths: 2,
    area: 120,
    image: createPropertyImage("Modern Family Home", "123 Pine St, Seattle", {
      sky: "#94c7f4",
      building: "#2d4d45",
      accent: "#d9ecc8",
      floor: "#6f9676",
      shape: "house",
    }),
    badge: "For Sale",
    featured: false,
    surface: "market",
  },
  {
    id: "urban-loft",
    title: "Urban Loft",
    location: "456 Elm Ave, Portland",
    price: 3200,
    listingMode: "rent",
    propertyType: "loft",
    beds: 1,
    baths: 1,
    area: 85,
    image: createPropertyImage("Urban Loft", "456 Elm Ave, Portland", {
      sky: "#d6c8b4",
      building: "#5d4e46",
      accent: "#d9ecc8",
      floor: "#c1b29d",
      shape: "loft",
    }),
    badge: "For Rent",
    featured: false,
    surface: "market",
  },
  {
    id: "highland-retreat",
    title: "Highland Retreat",
    location: "789 Mountain Rd, Bend",
    price: 620000,
    listingMode: "buy",
    propertyType: "cabin",
    beds: 2,
    baths: 2,
    area: 98,
    image: createPropertyImage("Highland Retreat", "789 Mountain Rd, Bend", {
      sky: "#b6c4b0",
      building: "#203025",
      accent: "#d9ecc8",
      floor: "#6f8a62",
      shape: "cabin",
    }),
    badge: "For Sale",
    featured: false,
    surface: "market",
  },
  {
    id: "sea-view-penthouse",
    title: "Sea View Penthouse",
    location: "321 Ocean Dr, Miami",
    price: 4500,
    listingMode: "rent",
    propertyType: "penthouse",
    beds: 3,
    baths: 3,
    area: 180,
    image: createPropertyImage("Sea View Penthouse", "321 Ocean Dr, Miami", {
      sky: "#9fd2ef",
      building: "#344b4f",
      accent: "#d9ecc8",
      floor: "#6aa7a1",
      shape: "penthouse",
    }),
    badge: "For Rent",
    featured: false,
    surface: "market",
  },
  {
    id: "central-studio",
    title: "Central Studio",
    location: "555 Main St, Chicago",
    price: 550000,
    listingMode: "buy",
    propertyType: "studio",
    beds: 1,
    baths: 1,
    area: 50,
    image: createPropertyImage("Central Studio", "555 Main St, Chicago", {
      sky: "#eadfc7",
      building: "#4d4d45",
      accent: "#d9ecc8",
      floor: "#cfc0a0",
      shape: "studio",
    }),
    badge: "For Sale",
    featured: false,
    surface: "market",
  },
  {
    id: "garden-villa",
    title: "Garden Villa",
    location: "999 Oak Ln, Austin",
    price: 2800,
    listingMode: "rent",
    propertyType: "villa",
    beds: 2,
    baths: 2,
    area: 110,
    image: createPropertyImage("Garden Villa", "999 Oak Ln, Austin", {
      sky: "#c9dfc5",
      building: "#304a34",
      accent: "#d9ecc8",
      floor: "#7aa06e",
      shape: "villa",
    }),
    badge: "For Rent",
    featured: false,
    surface: "market",
  },
  {
    id: "lakeside-residence",
    title: "Lakeside Residence",
    location: "18 Shoreline Dr, Lake Tahoe",
    price: 2950000,
    listingMode: "buy",
    propertyType: "villa",
    beds: 6,
    baths: 5,
    area: 530,
    image: createPropertyImage("Lakeside Residence", "18 Shoreline Dr, Lake Tahoe", {
      sky: "#9dc9ef",
      building: "#274044",
      accent: "#d9ecc8",
      floor: "#5d8d96",
      shape: "villa",
    }),
    badge: "Premier",
    featured: false,
    surface: "market",
  },
  {
    id: "skyline-apartment",
    title: "Skyline Apartment",
    location: "88 Market St, San Francisco",
    price: 6100,
    listingMode: "rent",
    propertyType: "apartment",
    beds: 2,
    baths: 2,
    area: 96,
    image: createPropertyImage("Skyline Apartment", "88 Market St, San Francisco", {
      sky: "#d3dbe7",
      building: "#36444e",
      accent: "#d9ecc8",
      floor: "#8a99a8",
      shape: "apartment",
    }),
    badge: "For Rent",
    featured: false,
    surface: "market",
  },
  {
    id: "cedar-house",
    title: "Cedar House",
    location: "204 Cedar Ln, Denver",
    price: 975000,
    listingMode: "buy",
    propertyType: "house",
    beds: 4,
    baths: 3,
    area: 214,
    image: createPropertyImage("Cedar House", "204 Cedar Ln, Denver", {
      sky: "#d9c7b1",
      building: "#4c362b",
      accent: "#d9ecc8",
      floor: "#9a7f67",
      shape: "house",
    }),
    badge: "For Sale",
    featured: false,
    surface: "market",
  },
  {
    id: "coastal-loft",
    title: "Coastal Loft",
    location: "640 Bay Blvd, San Diego",
    price: 4100,
    listingMode: "rent",
    propertyType: "loft",
    beds: 1,
    baths: 1,
    area: 78,
    image: createPropertyImage("Coastal Loft", "640 Bay Blvd, San Diego", {
      sky: "#b6e0ef",
      building: "#5d6a70",
      accent: "#d9ecc8",
      floor: "#7db6c1",
      shape: "loft",
    }),
    badge: "For Rent",
    featured: false,
    surface: "market",
  },
  {
    id: "monarch-penthouse",
    title: "Monarch Penthouse",
    location: "500 King St, New York",
    price: 7250000,
    listingMode: "buy",
    propertyType: "penthouse",
    beds: 4,
    baths: 4.5,
    area: 360,
    image: createPropertyImage("Monarch Penthouse", "500 King St, New York", {
      sky: "#c8d0dc",
      building: "#27333c",
      accent: "#d9ecc8",
      floor: "#6d7b88",
      shape: "penthouse",
    }),
    badge: "Signature",
    featured: false,
    surface: "market",
  },
  {
    id: "pine-cabin",
    title: "Pine Cabin",
    location: "92 Forest Rd, Asheville",
    price: 2400,
    listingMode: "rent",
    propertyType: "cabin",
    beds: 2,
    baths: 1,
    area: 72,
    image: createPropertyImage("Pine Cabin", "92 Forest Rd, Asheville", {
      sky: "#cad6c0",
      building: "#243226",
      accent: "#d9ecc8",
      floor: "#6c865b",
      shape: "cabin",
    }),
    badge: "For Rent",
    featured: false,
    surface: "market",
  },
  {
    id: "atrium-studio",
    title: "Atrium Studio",
    location: "11 Orchard Ave, Boston",
    price: 475000,
    listingMode: "buy",
    propertyType: "studio",
    beds: 1,
    baths: 1,
    area: 48,
    image: createPropertyImage("Atrium Studio", "11 Orchard Ave, Boston", {
      sky: "#e6d9c7",
      building: "#51453d",
      accent: "#d9ecc8",
      floor: "#c2b19b",
      shape: "studio",
    }),
    badge: "For Sale",
    featured: false,
    surface: "market",
  },
  {
    id: "harbor-apartment",
    title: "Harbor Apartment",
    location: "77 Dockside Ave, Seattle",
    price: 3650,
    listingMode: "rent",
    propertyType: "apartment",
    beds: 2,
    baths: 2,
    area: 88,
    image: createPropertyImage("Harbor Apartment", "77 Dockside Ave, Seattle", {
      sky: "#c8e2ef",
      building: "#3d4e54",
      accent: "#d9ecc8",
      floor: "#7fa5b2",
      shape: "apartment",
    }),
    badge: "For Rent",
    featured: false,
    surface: "market",
  },
  {
    id: "ridge-villa",
    title: "Ridge Villa",
    location: "901 Summit Dr, Boulder",
    price: 1840000,
    listingMode: "buy",
    propertyType: "villa",
    beds: 5,
    baths: 4,
    area: 280,
    image: createPropertyImage("Ridge Villa", "901 Summit Dr, Boulder", {
      sky: "#b8ccce",
      building: "#30454a",
      accent: "#d9ecc8",
      floor: "#71878c",
      shape: "villa",
    }),
    badge: "Limited",
    featured: false,
    surface: "market",
  },
  {
    id: "walnut-townhouse",
    title: "Walnut Townhouse",
    location: "303 Walnut St, Philadelphia",
    price: 2950,
    listingMode: "rent",
    propertyType: "house",
    beds: 3,
    baths: 2,
    area: 142,
    image: createPropertyImage("Walnut Townhouse", "303 Walnut St, Philadelphia", {
      sky: "#ddcfb8",
      building: "#5a4630",
      accent: "#d9ecc8",
      floor: "#ad8c63",
      shape: "house",
    }),
    badge: "For Rent",
    featured: false,
    surface: "market",
  },
];
