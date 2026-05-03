import { productCatalog } from '../data/productCatalog';
import type {
  BasementTemperature,
  CapacityTier,
  DrainagePreference,
  FilterProductsOptions,
  FilterProductsResult,
  LowTemperatureSuitability,
  ProductRecord,
  VerificationStatus,
} from '../types/calculator';

function requiredTemperatureLevel(temperature: BasementTemperature): LowTemperatureSuitability {
  switch (temperature) {
    case 'under_60':
      return 'cold';
    case '60_65':
      return 'cool';
    case '65_75':
    case 'above_75':
      return 'standard';
  }
}

function meetsTemperatureRequirement(product: ProductRecord, basementTemperature: BasementTemperature): boolean {
  const productRank: Record<LowTemperatureSuitability, number> = {
    standard: 1,
    cool: 2,
    cold: 3,
  };

  return productRank[product.lowTemperatureSuitability] >= productRank[requiredTemperatureLevel(basementTemperature)];
}

function meetsDrainageRequirement(product: ProductRecord, drainagePreference: DrainagePreference): boolean {
  switch (drainagePreference) {
    case 'manual_bucket':
      return true;
    case 'gravity_drain':
      return product.supportsGravityDrain;
    case 'pump_needed':
      return product.hasPump;
  }
}

function getAdjacentTiers(tier: CapacityTier): CapacityTier[] {
  switch (tier) {
    case 'small_20_22':
      return ['small_20_22', 'medium_30_35'];
    case 'medium_30_35':
      return ['medium_30_35', 'small_20_22', 'large_45_50'];
    case 'large_45_50':
      return ['large_45_50', 'premium_basement', 'large_45_50_pump', 'medium_30_35'];
    case 'large_45_50_pump':
      return ['large_45_50_pump', 'premium_basement', 'large_45_50'];
    case 'premium_basement':
      return ['premium_basement', 'large_45_50_pump', 'large_45_50'];
  }
}

function verificationRank(status: VerificationStatus): number {
  switch (status) {
    case 'exact_model':
      return 0;
    case 'retailer_search':
      return 1;
    case 'category_search':
      return 2;
  }
}

function dedupeProducts(products: ProductRecord[]): ProductRecord[] {
  return Array.from(new Map(products.map((product) => [product.id, product])).values());
}

export function filterProducts(options: FilterProductsOptions): FilterProductsResult {
  const fallbackStepsUsed: string[] = [];
  const pumpNeeded = options.drainagePreference === 'pump_needed';

  function sortProducts(products: ProductRecord[]): ProductRecord[] {
    return [...products].sort((left, right) => {
      const verificationDiff = verificationRank(left.verificationStatus) - verificationRank(right.verificationStatus);
      if (verificationDiff !== 0) {
        return verificationDiff;
      }

      if (pumpNeeded) {
        const leftPump = left.hasPump ? 1 : 0;
        const rightPump = right.hasPump ? 1 : 0;
        if (leftPump !== rightPump) {
          return rightPump - leftPump;
        }
      }

      const leftCapacityMatch = left.capacityTier === options.capacityTier ? 1 : 0;
      const rightCapacityMatch = right.capacityTier === options.capacityTier ? 1 : 0;
      if (leftCapacityMatch !== rightCapacityMatch) {
        return rightCapacityMatch - leftCapacityMatch;
      }

      const leftBudgetMatch = left.priceTier === options.budgetRange ? 1 : 0;
      const rightBudgetMatch = right.priceTier === options.budgetRange ? 1 : 0;
      if (leftBudgetMatch !== rightBudgetMatch) {
        return rightBudgetMatch - leftBudgetMatch;
      }

      return right.affiliatePriority - left.affiliatePriority;
    });
  }

  function addFallbackStep(step: string): void {
    if (!fallbackStepsUsed.includes(step)) {
      fallbackStepsUsed.push(step);
    }
  }

  const strictMatches = sortProducts(
    productCatalog.filter(
      (product) =>
        product.capacityTier === options.capacityTier &&
        meetsDrainageRequirement(product, options.drainagePreference) &&
        meetsTemperatureRequirement(product, options.basementTemperature) &&
        product.priceTier === options.budgetRange,
    ),
  );

  if (strictMatches.length >= 3) {
    return {
      products: strictMatches.slice(0, 3),
      fallbackStepsUsed,
    };
  }

  let candidates = [...strictMatches];

  const relaxedBudget = sortProducts(
    productCatalog.filter(
      (product) =>
        product.capacityTier === options.capacityTier &&
        meetsDrainageRequirement(product, options.drainagePreference) &&
        meetsTemperatureRequirement(product, options.basementTemperature),
    ),
  );
  candidates = dedupeProducts([...candidates, ...relaxedBudget]);
  if (candidates.length >= 3) {
    addFallbackStep('Relaxed budget to keep comparison options available.');
    return { products: candidates.slice(0, 3), fallbackStepsUsed };
  }

  const relaxedTemperature = sortProducts(
    productCatalog.filter(
      (product) =>
        product.capacityTier === options.capacityTier &&
        meetsDrainageRequirement(product, options.drainagePreference),
    ),
  );
  candidates = dedupeProducts([...candidates, ...relaxedTemperature]);
  if (candidates.length >= 3) {
    addFallbackStep('Relaxed budget to keep comparison options available.');
    addFallbackStep('Relaxed the temperature filter to keep comparison options available.');
    return { products: candidates.slice(0, 3), fallbackStepsUsed };
  }

  const adjacentCapacity = sortProducts(
    productCatalog.filter(
      (product) =>
        getAdjacentTiers(options.capacityTier).includes(product.capacityTier) &&
        meetsDrainageRequirement(product, options.drainagePreference),
    ),
  );
  candidates = dedupeProducts([...candidates, ...adjacentCapacity]);
  if (candidates.length >= 3) {
    addFallbackStep('Relaxed budget to keep comparison options available.');
    addFallbackStep('Relaxed the temperature filter to keep comparison options available.');
    addFallbackStep('Expanded to adjacent compatible capacity tiers.');
    return { products: candidates.slice(0, 3), fallbackStepsUsed };
  }

  const relaxedDrainage = sortProducts(
    productCatalog.filter((product) => getAdjacentTiers(options.capacityTier).includes(product.capacityTier)),
  );
  candidates = dedupeProducts([...candidates, ...relaxedDrainage]);
  if (candidates.length >= 3) {
    addFallbackStep('Relaxed budget to keep comparison options available.');
    addFallbackStep('Relaxed the temperature filter to keep comparison options available.');
    addFallbackStep('Expanded to adjacent compatible capacity tiers.');
    addFallbackStep('Relaxed the drainage filter to keep comparison options available.');
    return { products: candidates.slice(0, 3), fallbackStepsUsed };
  }

  const finalFallback = dedupeProducts([...candidates, ...sortProducts(productCatalog)]).slice(0, 3);
  addFallbackStep('Relaxed budget to keep comparison options available.');
  addFallbackStep('Relaxed the temperature filter to keep comparison options available.');
  addFallbackStep('Expanded to adjacent compatible capacity tiers.');
  addFallbackStep('Relaxed the drainage filter to keep comparison options available.');
  addFallbackStep('Added highest-priority catalog items as a final fallback.');

  return {
    products: finalFallback,
    fallbackStepsUsed,
  };
}
