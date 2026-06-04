alter table public.properties
  add column if not exists images_url text[] not null default '{}';

update public.properties p
set images_url = coalesce(
  (
    select array_agg(pi.image_url order by pi.sort_order)
    from public.property_images pi
    where pi.property_id = p.id
  ),
  array[p.image]
)
where coalesce(array_length(p.images_url, 1), 0) = 0;

alter table public.properties
  drop constraint if exists properties_images_url_limit;

alter table public.properties
  add constraint properties_images_url_limit
  check (coalesce(array_length(images_url, 1), 0) between 1 and 5);

drop policy if exists "Public can read property images" on public.property_images;

drop table if exists public.property_images;

alter table public.properties
  drop column if exists image;
