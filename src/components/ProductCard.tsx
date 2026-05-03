import type { ProductRecord } from '../types/calculator';

interface ProductCardProps {
  product: ProductRecord;
  capacityTier: string;
  productPosition: number;
  onCtaClick: (product: ProductRecord, productPosition: number) => void;
}

function getRetailerCta(retailer: string): string {
  if (retailer === 'Amazon') {
    return 'Compare at Amazon';
  }

  if (retailer === 'Home Depot') {
    return 'Compare at Home Depot';
  }

  return 'Compare retailer options';
}

export function ProductCard({ product, capacityTier, productPosition, onCtaClick }: ProductCardProps) {
  const modelLabel = product.modelNumber?.trim() ? product.modelNumber : 'Model varies by retailer listing';

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="block overflow-hidden bg-mist">
        <img src={product.imagePath} alt={product.name} className="h-52 w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {product.badges.map((badge) => (
            <span key={badge} className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-lake">
              {badge}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-moss">{product.brand}</p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight text-ink">{product.name}</h3>
        <p className="mt-2 text-sm text-ink/70">Model: {modelLabel}</p>
        <dl className="mt-5 grid gap-3 text-sm text-ink/80">
          <div className="flex items-center justify-between gap-4">
            <dt>Capacity</dt>
            <dd className="font-semibold text-ink">{product.capacityLabel}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt>Price tier</dt>
            <dd className="font-semibold capitalize text-ink">{product.priceTier}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt>Drainage</dt>
            <dd className="font-semibold text-ink">{product.hasPump ? 'Pump + gravity drain' : product.supportsGravityDrain ? 'Gravity drain' : 'Bucket only'}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt>Low-temp fit</dt>
            <dd className="font-semibold capitalize text-ink">{product.lowTemperatureSuitability}</dd>
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
            <span className="font-semibold text-ink">Last reviewed:</span> {product.lastReviewed}
          </p>
          <p>
            <span className="font-semibold text-ink">Listing status:</span> Retailer search listing
          </p>
          <p>
            <span className="font-semibold text-ink">Catalog status:</span> Catalog manually reviewed
          </p>
          <p>
            <span className="font-semibold text-ink">Price status:</span> Prices not live
          </p>
        </div>
        <ul className="mt-5 flex flex-wrap gap-2 text-xs text-ink/70">
          {product.smartFeatures.map((feature) => (
            <li key={feature} className="rounded-full border border-ink/10 px-3 py-1">
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-ink/60">Matched to your {capacityTier}</p>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noreferrer sponsored"
            onClick={() => onCtaClick(product, productPosition)}
            className="inline-flex items-center rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-lake"
          >
            {getRetailerCta(product.retailer)}
          </a>
        </div>
      </div>
    </article>
  );
}
