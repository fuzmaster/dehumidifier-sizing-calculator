import type { CapacityTier, ConfusionMode } from '../types/calculator';

export const doeConversionRules: Record<Exclude<ConfusionMode, 'first_unit' | 'replace_old_unknown'>, CapacityTier> = {
  replace_old_30: 'small_20_22',
  replace_old_50: 'medium_30_35',
  replace_old_70: 'large_45_50',
};

export const doeConversionCopy = {
  replace_old_30: 'Older 30-pint models usually line up with today\'s 20-22 pint DOE rating.',
  replace_old_50: 'Older 50-pint models usually line up with today\'s 30-35 pint DOE rating.',
  replace_old_70: 'Older 70-pint models usually line up with today\'s 45-50 pint DOE rating.',
} as const;
