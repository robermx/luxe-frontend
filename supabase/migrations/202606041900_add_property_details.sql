alter table public.properties
  add column if not exists slug text,
  add column if not exists latitude numeric(10, 6),
  add column if not exists longitude numeric(10, 6);

update public.properties
set slug = coalesce(nullif(slug, ''), id);

update public.properties
set latitude = case id
  when 'glass-pavilion' then 34.0736
  when 'azure-heights' then 49.2827
  when 'modern-family-home' then 47.6062
  when 'urban-loft' then 45.5152
  when 'highland-retreat' then 44.0582
  when 'sea-view-penthouse' then 25.7617
  when 'central-studio' then 41.8781
  when 'garden-villa' then 30.2672
  when 'lakeside-residence' then 38.9399
  when 'skyline-apartment' then 37.7749
  when 'cedar-house' then 39.7392
  when 'coastal-loft' then 32.7157
  when 'monarch-penthouse' then 40.7128
  when 'pine-cabin' then 35.5951
  when 'atrium-studio' then 42.3601
  when 'harbor-apartment' then 47.6062
  when 'ridge-villa' then 40.0150
  when 'walnut-townhouse' then 39.9526
  else 0
end,
longitude = case id
  when 'glass-pavilion' then -118.4004
  when 'azure-heights' then -123.1207
  when 'modern-family-home' then -122.3321
  when 'urban-loft' then -122.6784
  when 'highland-retreat' then -121.3153
  when 'sea-view-penthouse' then -80.1918
  when 'central-studio' then -87.6298
  when 'garden-villa' then -97.7431
  when 'lakeside-residence' then -119.9772
  when 'skyline-apartment' then -122.4194
  when 'cedar-house' then -104.9903
  when 'coastal-loft' then -117.1611
  when 'monarch-penthouse' then -74.0060
  when 'pine-cabin' then -82.5515
  when 'atrium-studio' then -71.0589
  when 'harbor-apartment' then -122.3321
  when 'ridge-villa' then -105.2705
  when 'walnut-townhouse' then -75.1652
  else 0
end;

alter table public.properties
  alter column slug set not null,
  alter column latitude set not null,
  alter column longitude set not null;

create unique index if not exists properties_slug_idx
  on public.properties (slug);

alter table public.properties enable row level security;

grant select on public.properties to anon;
grant select on public.properties to authenticated;

drop policy if exists "Public can read properties" on public.properties;

create policy "Public can read properties"
on public.properties
for select
to anon, authenticated
using (true);

create table if not exists public.property_images (
  id text primary key,
  property_id text not null references public.properties(id) on delete cascade,
  image_url text not null,
  alt_text text not null,
  sort_order smallint not null check (sort_order between 1 and 5),
  is_primary boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  unique (property_id, sort_order)
);

create unique index if not exists property_images_one_primary_idx
  on public.property_images (property_id)
  where is_primary;

alter table public.property_images enable row level security;

grant select on public.property_images to anon;
grant select on public.property_images to authenticated;

drop policy if exists "Public can read property images" on public.property_images;

create policy "Public can read property images"
on public.property_images
for select
to anon, authenticated
using (true);

insert into public.property_images (
  id,
  property_id,
  image_url,
  alt_text,
  sort_order,
  is_primary
)
select
  p.id || '-image-1',
  p.id,
  p.image,
  p.title,
  1,
  true
from public.properties p
on conflict (id) do update
set
  property_id = excluded.property_id,
  image_url = excluded.image_url,
  alt_text = excluded.alt_text,
  sort_order = excluded.sort_order,
  is_primary = excluded.is_primary;
