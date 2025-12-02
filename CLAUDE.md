# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

**NomadTaxPlanner** is a Next.js 16 application providing free tax planning tools for digital nomads.

### Tech Stack
- Next.js 16 with App Router and Turbopack
- React 19, TypeScript, Tailwind CSS v4 (CSS-based config in `globals.css`)
- Zustand for state management with LocalStorage persistence
- class-variance-authority (cva) for component variants

### Core Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── tools/              # 3 interactive calculators
│   │   ├── tax-residency-checker/
│   │   ├── day-tracker/
│   │   └── feie-calculator/
│   ├── guides/             # Country tax guides (5 countries)
│   │   └── [slug]/         # Dynamic route using COUNTRY_GUIDES data
│   ├── sitemap.ts          # Dynamic sitemap generation
│   └── robots.ts           # robots.txt generation
├── components/
│   ├── ui/                 # Base components (Button, Card, Alert, Badge, etc.)
│   ├── tools/              # Tool-specific components (client components)
│   ├── layout/             # Header, Footer, Breadcrumb
│   └── seo/                # JSON-LD structured data components
├── lib/
│   ├── constants.ts        # Site config, tax thresholds, country data
│   ├── calculations/       # Tax calculation logic (tax-residency.ts, feie.ts)
│   ├── country-data.ts     # Country guide content and helpers
│   └── utils.ts            # Utility functions (cn, date helpers)
├── store/
│   └── day-tracker-store.ts # Zustand store with persist middleware
└── types/
    └── index.ts            # TypeScript interfaces for all domain types
```

### Key Patterns

**State Management**: Day Tracker uses Zustand with `persist` middleware for LocalStorage. Handle SSR hydration with `useSyncExternalStore` pattern (see `useHydrated` hook in day-tracker.tsx).

**UI Components**: Built with cva for variants. Import from `@/components/ui`. All use `cn()` utility for className merging.

**SEO**: Each page includes JSON-LD structured data via components in `src/components/seo/json-ld.tsx`. Breadcrumbs use both visual component and BreadcrumbJsonLd.

**Country Data**: `SUPPORTED_COUNTRIES` in constants.ts defines the 5 guide countries. `COUNTRY_GUIDES` in country-data.ts contains full tax info. Add new countries by extending both.

**Calculations**: Tax residency logic in `src/lib/calculations/`. Key thresholds defined in `TAX_THRESHOLDS` constant.

### Adding New Features

**New Tool**: Create page in `src/app/tools/[name]/page.tsx`, component in `src/components/tools/`, add to `TOOL_LINKS` in constants.ts.

**New Country Guide**: Add to `SUPPORTED_COUNTRIES`, create entry in `COUNTRY_GUIDES` with full `CountryTaxInfo` data.

**New UI Component**: Add to `src/components/ui/` using cva pattern, export from index.ts.

## Deployment

Configured for Vercel deployment. See `vercel.json` for headers and caching config.
