# Luxe Frontend

Frontend inmobiliario construido con `Next.js 16`, `React 19`, `TypeScript` y `Tailwind CSS v4`.

La home consume propiedades desde `Supabase` con renderizado del lado del servidor, filtros por búsqueda/tipo/modo de listing y paginación server-side.

## Funcionalidades

- Home con secciones `Featured Collections` y `New in Market`.
- Consulta de propiedades desde `Supabase` usando `@supabase/ssr` y `@supabase/supabase-js`.
- Filtros sincronizados con `query params`:
  - búsqueda por texto
  - tipo de propiedad
  - modo de publicación (`buy` / `rent`)
- Paginación server-side con controles `Anterior`, páginas numeradas y `Siguiente`.
- Formularios con `react-hook-form`.
- Migración versionada para la tabla `public.properties` en `supabase/migrations/`.

## Stack

- `next` `16.2.7`
- `react` `19.2.4`
- `react-dom` `19.2.4`
- `@supabase/ssr`
- `@supabase/supabase-js`
- `react-hook-form`
- `tailwindcss` `v4`
- `eslint` `v9`

## Variables de entorno

Crea tu archivo `.env.local` tomando como base .env.template:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Desarrollo

Instala dependencias:

```bash
pnpm install
```

Inicia el servidor local:

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura relevante

- [app/page.tsx](/Users/robmx/Projects/luxe/luxe-frontend/app/page.tsx): entrada de la home y fetch server-side.
- [components/home/home-screen.tsx](/Users/robmx/Projects/luxe/luxe-frontend/components/home/home-screen.tsx): UI principal y controles de filtros/paginación.
- [lib/supabase/home-properties.ts](/Users/robmx/Projects/luxe/luxe-frontend/lib/supabase/home-properties.ts): consultas y mapeo de propiedades.
- [lib/supabase/server.ts](/Users/robmx/Projects/luxe/luxe-frontend/lib/supabase/server.ts): cliente servidor de Supabase.
- [supabase/migrations/202606041700_create_properties.sql](/Users/robmx/Projects/luxe/luxe-frontend/supabase/migrations/202606041700_create_properties.sql): esquema y seed inicial.

## Notas

- La home se renderiza de forma dinámica porque depende de `searchParams` y consultas al servidor.
- La tabla `public.properties` tiene `RLS` habilitado con política pública de solo lectura para esta primera versión.
