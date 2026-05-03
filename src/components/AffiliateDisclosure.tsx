interface AffiliateDisclosureProps {
  className?: string;
  compact?: boolean;
}

export function AffiliateDisclosure({ className = '', compact = false }: AffiliateDisclosureProps) {
  return (
    <div
      className={`rounded-2xl border border-clay/20 bg-clay/10 text-ink/80 ${compact ? 'px-4 py-3 text-sm' : 'px-5 py-4 text-sm md:text-base'} ${className}`.trim()}
      role="note"
      aria-label="Affiliate disclosure"
    >
      Affiliate disclosure: This page may earn a commission from retailer links. Product matches are based on static catalog rules, not live prices.
    </div>
  );
}
