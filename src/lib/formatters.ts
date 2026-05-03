import type {
  BasementTemperature,
  BudgetRange,
  CapacityTier,
  ConfusionMode,
  DrainagePreference,
  HumiditySeverity,
} from '../types/calculator';

export const humidityLabels: Record<HumiditySeverity, string> = {
  slightly_damp: 'Slightly damp',
  damp: 'Damp',
  wet: 'Wet',
  very_wet: 'Very wet',
  flooded: 'Flooded',
};

export const temperatureLabels: Record<BasementTemperature, string> = {
  under_60: 'Under 60°F',
  '60_65': '60-65°F',
  '65_75': '65-75°F',
  above_75: 'Above 75°F',
};

export const drainageLabels: Record<DrainagePreference, string> = {
  manual_bucket: 'Manual bucket emptying',
  gravity_drain: 'Gravity drain available',
  pump_needed: 'Pump needed',
};

export const confusionModeLabels: Record<ConfusionMode, string> = {
  first_unit: 'This is my first dehumidifier',
  replace_old_30: 'Replacing an old 30-pint unit',
  replace_old_50: 'Replacing an old 50-pint unit',
  replace_old_70: 'Replacing an old 70-pint unit',
  replace_old_unknown: 'Replacing an older unit, not sure of the rating',
};

export const budgetLabels: Record<BudgetRange, string> = {
  budget: 'Budget',
  mid: 'Mid-range',
  premium: 'Premium',
};

export const capacityLabels: Record<CapacityTier, string> = {
  small_20_22: '20-22 pint current DOE rating',
  medium_30_35: '30-35 pint current DOE rating',
  large_45_50: '45-50 pint current DOE rating',
  large_45_50_pump: '45-50 pint current DOE rating with pump',
  premium_basement: 'Premium 50-pint basement model',
};

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}
