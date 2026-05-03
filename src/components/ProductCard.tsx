import type { ProductRecord } from '../types/calculator';

interface ProductCardProps {
  product: ProductRecord;
  capacityTier: string;
  productPosition: number;
  rankLabel: string;
  onCtaClick: (product: ProductRecord, productPosition: number, rankLabel: string) => void;
}

function getRetailerCta(retailer: string): string {
  if (retailer === 'Amazon') {
    return 'Check current price at Amazon';
  }

  if (retailer === 'Home Depot') {
    return 'Compare current listing at Home Depot';
  }

  return 'Check current retailer listing';
}

function formatLastReviewed(dateStr: string): string {
  const [year, month] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function getVerificationLabel(verificationStatus: ProductRecord['verificationStatus']): string {
  switch (verificationStatus) {
    case 'exact_model':
      return 'Exact model listing';
    case 'retailer_search':
      return 'Retailer search listing';
    case 'category_search':
      return 'Category comparison search';
  }
}

export function ProductCard({ product, capacityTier, productPosition, rankLabel, onCtaClick }: ProductCardProps) {
  const hasSpecificModel = typeof product.modelNumber === 'string' && product.modelNumber.trim().length > 0;
  const trustLine = `Manually reviewed ${formatLastReviewed(product.lastReviewed)} · Retailer price may change`;
  const isPrimaryCard = productPosition === 1;
  const visibleBadges = product.badges.slice(0, 2);

  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-2xl ${
      isPrimaryCard ? 'border-lake/40 ring-1 ring-lake/20 lg:-translate-y-1' : 'border-ink/10'
    }`}>
      <div className={`h-2 w-full ${isPrimaryCard ? 'bg-lake' : 'bg-mist'}`} aria-hidden="true" />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${isPrimaryCard ? 'bg-lake text-white' : 'bg-ink text-white'}`}>
            {rankLabel}
          </span>
          {product.verificationStatus === 'exact_model' ? (
            <span className="rounded-full bg-moss/15 px-3 py-1 text-xs font-semibold text-moss">Exact model</span>
          ) : null}
          {visibleBadges.map((badge) => (
            <span key={badge} className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-lake">
              {badge}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-moss">{product.brand}</p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight text-ink">{product.name}</h3>
        {hasSpecificModel ? <p className="mt-2 text-sm text-ink/70">Model: {product.modelNumber}</p> : null}
        <dl className="mt-5 grid gap-3 text-sm text-ink/80">
          <div className="flex items-center justify-between gap-4">
            <dt>Capacity</dt>
            <dd className="font-semibold text-ink">{product.capacityLabel}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt>Drainage</dt>
            <dd className="font-semibold text-ink">{product.hasPump ? 'Pump + gravity drain' : product.supportsGravityDrain ? 'Gravity drain' : 'Bucket only'}</dd>
          </div>
        </dl>
        <div className="mt-5 space-y-3 rounded-2xl bg-sand/70 p-4 text-sm text-ink/75">
          <p>
            <span className="font-semibold text-ink">Best for:</span> {product.bestFor}
          </p>
          <p>
            <span className="font-semibold text-ink">Watch-out:</span> {product.knownDownside}
          </p>
          <p>
            <span className="font-semibold text-ink">Trust:</span> {trustLine}
          </p>
        </div>
        <details className="mt-5 rounded-2xl border border-ink/10 p-4 text-sm text-ink/75">
          <summary className="cursor-pointer font-semibold text-ink">More details</summary>
          <div className="mt-3 space-y-3">
            <p><span className="font-semibold text-ink">Low-temp fit:</span> <span className="capitalize">{product.lowTemperatureSuitability}</span></p>
            <p><span className="font-semibold text-ink">Price tier:</span> <span className="capitalize">{product.priceTier}</span></p>
            <p><span className="font-semibold text-ink">Listing type:</span> {getVerificationLabel(product.verificationStatus)}</p>
            {product.smartFeatures.length > 0 ? (
              <ul className="flex flex-wrap gap-2 text-xs text-ink/70">
                {product.smartFeatures.map((feature) => (
                  <li key={feature} className="rounded-full border border-ink/10 px-3 py-1">
                    {feature}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </details>
        <div className="mt-6 space-y-4">
          <p className="text-sm text-ink/60">Matched to your {capacityTier}</p>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noreferrer sponsored"
            onClick={() => onCtaClick(product, productPosition, rankLabel)}
            className={`inline-flex w-full items-center justify-center rounded-full px-5 py-4 text-sm font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lake ${
              isPrimaryCard ? 'bg-lake hover:bg-ink' : 'bg-ink hover:bg-lake'
            }`}
          >
            {getRetailerCta(product.retailer)}
          </a>
        </div>
      </div>
    </article>
  );
}
