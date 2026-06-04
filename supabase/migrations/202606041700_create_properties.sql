create table if not exists public.properties (
  id text primary key,
  title text not null,
  location text not null,
  price numeric(12, 2) not null,
  listing_mode text not null check (listing_mode in ('buy', 'rent')),
  property_type text not null check (property_type in ('house', 'apartment', 'villa', 'penthouse', 'studio', 'cabin', 'loft')),
  beds integer not null check (beds >= 0),
  baths numeric(4, 1) not null check (baths >= 0),
  area numeric(10, 2) not null check (area >= 0),
  image text not null,
  badge text not null,
  featured boolean not null default false,
  surface text not null check (surface in ('collection', 'market')),
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists properties_featured_idx
  on public.properties (featured, property_type, created_at desc, id asc);

create index if not exists properties_market_idx
  on public.properties (surface, listing_mode, property_type, created_at desc, id asc);

create index if not exists properties_listing_mode_idx
  on public.properties (listing_mode);

create index if not exists properties_property_type_idx
  on public.properties (property_type);

alter table public.properties enable row level security;

grant select on public.properties to anon;
grant select on public.properties to authenticated;

drop policy if exists "Public can read properties" on public.properties;

create policy "Public can read properties"
on public.properties
for select
to anon, authenticated
using (true);

drop function if exists public.create_property_image_seed(text, text, text, text, text, text, text, text, text);

create or replace function public.create_property_image_seed(
  property_title text,
  property_location text,
  sky text,
  building text,
  accent text,
  floor text,
  shape text,
  foliage text default null,
  second_building text default null
)
returns text
language plpgsql
as $$
declare
  shape_markup text;
  svg text;
begin
  shape_markup :=
    case shape
      when 'villa' then format(
        '<rect x="174" y="126" width="264" height="132" rx="14" fill="%1$s" opacity="0.98"/><rect x="116" y="156" width="124" height="102" rx="12" fill="%2$s" opacity="0.86"/><rect x="446" y="158" width="96" height="100" rx="12" fill="%2$s" opacity="0.86"/><rect x="246" y="98" width="84" height="42" rx="8" fill="%3$s" opacity="0.85"/><rect x="304" y="168" width="42" height="90" rx="8" fill="%3$s" opacity="0.62"/>',
        building,
        coalesce(second_building, building),
        accent
      )
      when 'penthouse' then format(
        '<rect x="146" y="118" width="330" height="132" rx="16" fill="%1$s" opacity="0.96"/><rect x="206" y="80" width="210" height="54" rx="12" fill="%2$s" opacity="0.82"/><rect x="186" y="136" width="52" height="120" rx="8" fill="%3$s" opacity="0.72"/><rect x="404" y="136" width="52" height="120" rx="8" fill="%3$s" opacity="0.72"/>',
        building,
        accent,
        coalesce(second_building, building)
      )
      when 'house' then format(
        '<path d="M140 190 300 90l160 100v86H140z" fill="%1$s" opacity="0.98"/><rect x="190" y="196" width="120" height="78" rx="12" fill="%2$s" opacity="0.8"/><rect x="338" y="180" width="84" height="114" rx="12" fill="%3$s" opacity="0.84"/>',
        building,
        accent,
        coalesce(second_building, building)
      )
      when 'apartment' then format(
        '<rect x="194" y="86" width="212" height="184" rx="18" fill="%1$s" opacity="0.97"/><rect x="226" y="114" width="42" height="42" rx="8" fill="%2$s" opacity="0.72"/><rect x="282" y="114" width="42" height="42" rx="8" fill="%2$s" opacity="0.72"/><rect x="338" y="114" width="42" height="42" rx="8" fill="%2$s" opacity="0.72"/><rect x="226" y="172" width="42" height="42" rx="8" fill="%2$s" opacity="0.72"/><rect x="282" y="172" width="42" height="42" rx="8" fill="%2$s" opacity="0.72"/><rect x="338" y="172" width="42" height="42" rx="8" fill="%2$s" opacity="0.72"/>',
        building,
        accent
      )
      when 'loft' then format(
        '<rect x="176" y="116" width="248" height="148" rx="14" fill="%1$s" opacity="0.96"/><path d="M176 156h248" stroke="%2$s" stroke-width="10" opacity="0.32"/><rect x="214" y="148" width="160" height="70" rx="10" fill="%2$s" opacity="0.7"/>',
        building,
        accent
      )
      when 'cabin' then format(
        '<path d="M176 184 300 92l124 92v88H176z" fill="%1$s" opacity="0.98"/><rect x="252" y="198" width="96" height="74" rx="10" fill="%2$s" opacity="0.72"/>',
        building,
        accent
      )
      else format(
        '<rect x="206" y="112" width="188" height="148" rx="16" fill="%1$s" opacity="0.97"/><rect x="236" y="144" width="128" height="84" rx="10" fill="%2$s" opacity="0.74"/>',
        building,
        accent
      )
    end;

  svg := format(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img" aria-label="%1$s in %2$s"><defs><linearGradient id="sky" x1="0" x2="1" y1="0" y2="1"><stop offset="0%%" stop-color="%3$s" /><stop offset="100%%" stop-color="#eef6f6" /></linearGradient><linearGradient id="sun" x1="0" x2="1" y1="0" y2="1"><stop offset="0%%" stop-color="#ffffff" stop-opacity="0.9" /><stop offset="100%%" stop-color="%4$s" stop-opacity="0.2" /></linearGradient></defs><rect width="640" height="480" fill="url(#sky)" /><circle cx="506" cy="92" r="56" fill="url(#sun)" /><circle cx="164" cy="104" r="24" fill="%4$s" opacity="0.18" /><path d="M0 314C92 288 168 288 232 312c64 24 118 26 184 8 66-18 128-18 224 6v166H0z" fill="%5$s" /><path d="M0 322c94-18 170-18 232 0 66 18 120 18 180 0 66-18 130-18 228 0v18c-98-16-162-16-228 0-60 18-114 18-180 0-62-18-138-18-232 0z" fill="%6$s" opacity="0.16" /><g transform="translate(0 74)">%7$s</g><rect x="20" y="400" width="280" height="58" rx="18" fill="rgba(255,255,255,0.74)" stroke="rgba(25,50,47,0.06)" /><text x="52" y="423" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" fill="#19322f">%2$s</text><text x="52" y="442" font-family="Arial, Helvetica, sans-serif" font-size="12" fill="#5c706d">Premium listing</text></svg>',
    property_title,
    property_location,
    sky,
    accent,
    floor,
    coalesce(foliage, accent),
    shape_markup
  );

  return 'data:image/svg+xml;base64,' || encode(convert_to(svg, 'UTF8'), 'base64');
end;
$$;

insert into public.properties (
  id,
  title,
  location,
  price,
  listing_mode,
  property_type,
  beds,
  baths,
  area,
  image,
  badge,
  featured,
  surface
)
values
  ('glass-pavilion', 'The Glass Pavilion', 'Beverly Hills, California', 5250000, 'buy', 'villa', 5, 4.5, 4200, public.create_property_image_seed('The Glass Pavilion', 'Beverly Hills, California', '#98c3f0', '#203a36', '#d9ecc8', '#4f7f8c', 'villa'), 'Exclusive', true, 'collection'),
  ('azure-heights', 'Azure Heights Penthouse', 'Downtown, Vancouver', 3800000, 'buy', 'penthouse', 3, 3, 2100, public.create_property_image_seed('Azure Heights Penthouse', 'Downtown, Vancouver', '#cad4df', '#33424a', '#d9ecc8', '#7f8f9a', 'penthouse'), 'New Arrival', true, 'collection'),
  ('modern-family-home', 'Modern Family Home', '123 Pine St, Seattle', 850000, 'buy', 'house', 3, 2, 120, public.create_property_image_seed('Modern Family Home', '123 Pine St, Seattle', '#94c7f4', '#2d4d45', '#d9ecc8', '#6f9676', 'house'), 'For Sale', false, 'market'),
  ('urban-loft', 'Urban Loft', '456 Elm Ave, Portland', 3200, 'rent', 'loft', 1, 1, 85, public.create_property_image_seed('Urban Loft', '456 Elm Ave, Portland', '#d6c8b4', '#5d4e46', '#d9ecc8', '#c1b29d', 'loft'), 'For Rent', false, 'market'),
  ('highland-retreat', 'Highland Retreat', '789 Mountain Rd, Bend', 620000, 'buy', 'cabin', 2, 2, 98, public.create_property_image_seed('Highland Retreat', '789 Mountain Rd, Bend', '#b6c4b0', '#203025', '#d9ecc8', '#6f8a62', 'cabin'), 'For Sale', false, 'market'),
  ('sea-view-penthouse', 'Sea View Penthouse', '321 Ocean Dr, Miami', 4500, 'rent', 'penthouse', 3, 3, 180, public.create_property_image_seed('Sea View Penthouse', '321 Ocean Dr, Miami', '#9fd2ef', '#344b4f', '#d9ecc8', '#6aa7a1', 'penthouse'), 'For Rent', false, 'market'),
  ('central-studio', 'Central Studio', '555 Main St, Chicago', 550000, 'buy', 'studio', 1, 1, 50, public.create_property_image_seed('Central Studio', '555 Main St, Chicago', '#eadfc7', '#4d4d45', '#d9ecc8', '#cfc0a0', 'studio'), 'For Sale', false, 'market'),
  ('garden-villa', 'Garden Villa', '999 Oak Ln, Austin', 2800, 'rent', 'villa', 2, 2, 110, public.create_property_image_seed('Garden Villa', '999 Oak Ln, Austin', '#c9dfc5', '#304a34', '#d9ecc8', '#7aa06e', 'villa'), 'For Rent', false, 'market'),
  ('lakeside-residence', 'Lakeside Residence', '18 Shoreline Dr, Lake Tahoe', 2950000, 'buy', 'villa', 6, 5, 530, public.create_property_image_seed('Lakeside Residence', '18 Shoreline Dr, Lake Tahoe', '#9dc9ef', '#274044', '#d9ecc8', '#5d8d96', 'villa'), 'Premier', false, 'market'),
  ('skyline-apartment', 'Skyline Apartment', '88 Market St, San Francisco', 6100, 'rent', 'apartment', 2, 2, 96, public.create_property_image_seed('Skyline Apartment', '88 Market St, San Francisco', '#d3dbe7', '#36444e', '#d9ecc8', '#8a99a8', 'apartment'), 'For Rent', false, 'market'),
  ('cedar-house', 'Cedar House', '204 Cedar Ln, Denver', 975000, 'buy', 'house', 4, 3, 214, public.create_property_image_seed('Cedar House', '204 Cedar Ln, Denver', '#d9c7b1', '#4c362b', '#d9ecc8', '#9a7f67', 'house'), 'For Sale', false, 'market'),
  ('coastal-loft', 'Coastal Loft', '640 Bay Blvd, San Diego', 4100, 'rent', 'loft', 1, 1, 78, public.create_property_image_seed('Coastal Loft', '640 Bay Blvd, San Diego', '#b6e0ef', '#5d6a70', '#d9ecc8', '#7db6c1', 'loft'), 'For Rent', false, 'market'),
  ('monarch-penthouse', 'Monarch Penthouse', '500 King St, New York', 7250000, 'buy', 'penthouse', 4, 4.5, 360, public.create_property_image_seed('Monarch Penthouse', '500 King St, New York', '#c8d0dc', '#27333c', '#d9ecc8', '#6d7b88', 'penthouse'), 'Signature', false, 'market'),
  ('pine-cabin', 'Pine Cabin', '92 Forest Rd, Asheville', 2400, 'rent', 'cabin', 2, 1, 72, public.create_property_image_seed('Pine Cabin', '92 Forest Rd, Asheville', '#cad6c0', '#243226', '#d9ecc8', '#6c865b', 'cabin'), 'For Rent', false, 'market'),
  ('atrium-studio', 'Atrium Studio', '11 Orchard Ave, Boston', 475000, 'buy', 'studio', 1, 1, 48, public.create_property_image_seed('Atrium Studio', '11 Orchard Ave, Boston', '#e6d9c7', '#51453d', '#d9ecc8', '#c2b19b', 'studio'), 'For Sale', false, 'market'),
  ('harbor-apartment', 'Harbor Apartment', '77 Dockside Ave, Seattle', 3650, 'rent', 'apartment', 2, 2, 88, public.create_property_image_seed('Harbor Apartment', '77 Dockside Ave, Seattle', '#c8e2ef', '#3d4e54', '#d9ecc8', '#7fa5b2', 'apartment'), 'For Rent', false, 'market'),
  ('ridge-villa', 'Ridge Villa', '901 Summit Dr, Boulder', 1840000, 'buy', 'villa', 5, 4, 280, public.create_property_image_seed('Ridge Villa', '901 Summit Dr, Boulder', '#b8ccce', '#30454a', '#d9ecc8', '#71878c', 'villa'), 'Limited', false, 'market'),
  ('walnut-townhouse', 'Walnut Townhouse', '303 Walnut St, Philadelphia', 2950, 'rent', 'house', 3, 2, 142, public.create_property_image_seed('Walnut Townhouse', '303 Walnut St, Philadelphia', '#ddcfb8', '#5a4630', '#d9ecc8', '#ad8c63', 'house'), 'For Rent', false, 'market')
on conflict (id) do update
set
  title = excluded.title,
  location = excluded.location,
  price = excluded.price,
  listing_mode = excluded.listing_mode,
  property_type = excluded.property_type,
  beds = excluded.beds,
  baths = excluded.baths,
  area = excluded.area,
  image = excluded.image,
  badge = excluded.badge,
  featured = excluded.featured,
  surface = excluded.surface;

drop function if exists public.create_property_image_seed(text, text, text, text, text, text, text, text, text);
