# Old vs New Dehumidifier Rating Calculator

Conversion-focused shopping calculator for homeowners replacing older basement dehumidifiers, especially old 70-pint models that no longer map cleanly to modern DOE labels.

- Live app: https://dehumidifier-sizing-calculator.vercel.app/
- Screenshot: ![Old vs New Dehumidifier Rating Calculator](docs/images/app-screenshot.png)

## Project purpose

- Target intent: old 70-pint dehumidifier replacement calculator.
- Explain why legacy pint labels and current DOE labels differ.
- Produce a clear shopping tier with reasoning, not a black-box output.
- Show affiliate product comparisons only in safe normal sizing states.

## Local setup

```bash
npm install
npm run dev
```

## Build and scenario checks

```bash
npm run build
npm run check:scenarios
```

`check:scenarios` validates key recommendation outcomes and comparison-branch behavior.

## Analytics env vars

Analytics is env-driven and defaults to:

- development: `console`
- production without provider: `none`

Supported providers:

- `console`
- `plausible`
- `ga4`
- `none`

Set in `.env` or Vercel project envs:

```bash
VITE_ANALYTICS_PROVIDER=plausible
VITE_PLAUSIBLE_DOMAIN=dehumidifier-sizing-calculator.vercel.app
VITE_GA4_ID=G-XXXXXXXXXX
```

Tracked events:

- `calculator_started`
- `calculator_completed`
- `result_capacity_tier`
- `affiliate_card_clicked`
- `affiliate_cta_clicked`

## Product catalog policy

- Catalog is static and manually reviewed.
- Retailer pricing is not live and may change.
- Links may be exact model listings, retailer search listings, or category search listings.
- Comparison fallback logic can relax filters to keep options available and this is disclosed in the UI.
- The app does not scrape retailer prices.

## Quarterly manual review policy

- Review every catalog entry at least once per quarter.
- Confirm listing relevance, drainage claims, and low-temperature suitability notes.
- Update outdated links, remove stale entries, and refresh trust timestamps.

## Safety boundaries

This is a shopping guide, not a diagnostic system.

- No diagnosis of mold, leaks, HVAC, foundation, or structural issues.
- No remediation, legal, health, or performance guarantees.
- Flooded or out-of-range scenarios intentionally suppress product recommendations.

## Affiliate disclosure policy

- Affiliate disclosure appears near product comparisons in normal result states.
- Affiliate/product CTAs are hidden in professional-review or out-of-bounds states.
- Footer disclosure remains visible site-wide.

## Vercel deployment notes

This is a static frontend deployment.

- Build command: `npm run build`
- Output directory: `dist`
- No backend, auth, or database required
- Configure analytics via Vite env vars in Vercel project settings

## Project structure

```text
src/
  app/                App composition
  components/         Calculator/result/product/disclosure/content UI
  data/               Static catalog and sizing/content rules
  lib/                Recommendation, filtering, analytics, tracking helpers
  styles/             Global CSS
  types/              Shared TypeScript types
docs/                 Manual scenario matrix and project docs
scripts/              Scenario automation scripts
public/               Static assets
```
