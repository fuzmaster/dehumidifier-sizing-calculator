import type { AffiliateMessage, BudgetRange, CapacityTier, CalculatorInputs } from '../types/calculator';

const tierHeadlines: Record<CapacityTier, string> = {
  small_20_22: 'Start with a 20-22 pint replacement class',
  medium_30_35: 'Start with a 30-35 pint replacement class',
  large_45_50: 'Start with a 45-50 pint replacement class',
  large_45_50_pump: 'Start with a 45-50 pint pump-equipped class',
  premium_basement: 'Start with a premium 50-pint basement class',
};

const budgetDescriptors: Record<BudgetRange, string> = {
  budget: 'Value-focused picks',
  mid: 'Balanced feature picks',
  premium: 'Higher-end basement picks',
};

export const affiliateDisclosureText =
  'Affiliate disclosure: This page may earn a commission from retailer links. Product matches are based on static catalog rules. Retailer price may change.';

export function buildAffiliateMessage(capacityTier: CapacityTier, inputs: CalculatorInputs): AffiliateMessage {
  let subheadline = budgetDescriptors[inputs.budgetRange];

  if (inputs.drainagePreference === 'pump_needed') {
    subheadline = 'Pump drainage matters here, so compare pump-equipped options first.';
  } else if (inputs.basementTemperature === 'under_60') {
    subheadline = 'Cold-basement performance matters here, so compare operating range before buying.';
  } else if (inputs.confusionMode === 'replace_old_70') {
    subheadline = 'This result is tuned for shoppers replacing an older 70-pint dehumidifier.';
  } else if (inputs.confusionMode === 'replace_old_50') {
    subheadline = 'This result is tuned for shoppers replacing an older 50-pint dehumidifier.';
  } else if (inputs.confusionMode === 'replace_old_30') {
    subheadline = 'This result is tuned for shoppers replacing an older 30-pint dehumidifier.';
  }

  return {
    headline: tierHeadlines[capacityTier],
    subheadline,
    ctaLabel: `Shop matched ${tierHeadlines[capacityTier].replace('Best ', '').toLowerCase()}`,
  };
}
