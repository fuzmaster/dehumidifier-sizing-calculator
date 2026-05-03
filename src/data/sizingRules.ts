import type {
  BasementTemperature,
  CapacityTier,
  CalculatorInputs,
  HumiditySeverity,
} from '../types/calculator';

const severityBaseTier: Record<Exclude<HumiditySeverity, 'flooded'>, CapacityTier> = {
  slightly_damp: 'small_20_22',
  damp: 'medium_30_35',
  wet: 'large_45_50',
  very_wet: 'large_45_50',
};

const squareFootageBreaks = [
  { max: 1200, bump: 0 },
  { max: 1800, bump: 1 },
  { max: 2500, bump: 2 },
  { max: 3000, bump: 3 },
] as const;

const orderedTiers: CapacityTier[] = [
  'small_20_22',
  'medium_30_35',
  'large_45_50',
  'large_45_50_pump',
  'premium_basement',
];

const temperatureAdjustments: Record<BasementTemperature, number> = {
  under_60: 1,
  '60_65': 0,
  '65_75': 0,
  above_75: 0,
};

export const tierLabels: Record<CapacityTier, string> = {
  small_20_22: '20-22 pint current DOE rating',
  medium_30_35: '30-35 pint current DOE rating',
  large_45_50: '45-50 pint current DOE rating',
  large_45_50_pump: '45-50 pint current DOE rating with pump',
  premium_basement: 'Premium 50-pint basement model',
};

export function getTierIndex(tier: CapacityTier): number {
  return orderedTiers.indexOf(tier);
}

export function tierFromIndex(index: number): CapacityTier {
  return orderedTiers[Math.min(Math.max(index, 0), orderedTiers.length - 1)];
}

export function getConditionBasedTier(inputs: CalculatorInputs): CapacityTier {
  const baseTier = severityBaseTier[inputs.humiditySeverity === 'flooded' ? 'very_wet' : inputs.humiditySeverity];
  const squareFootageAdjustment = squareFootageBreaks.find((entry) => inputs.squareFootage <= entry.max)?.bump ?? 3;
  const temperatureAdjustment = temperatureAdjustments[inputs.basementTemperature];

  return tierFromIndex(getTierIndex(baseTier) + squareFootageAdjustment + temperatureAdjustment - 1);
}

export function tierComparisonValue(tier: CapacityTier): number {
  switch (tier) {
    case 'small_20_22':
      return 1;
    case 'medium_30_35':
      return 2;
    case 'large_45_50':
      return 3;
    case 'large_45_50_pump':
      return 4;
    case 'premium_basement':
      return 5;
  }
}
