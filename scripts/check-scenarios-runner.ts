import { calculateRecommendation } from '../src/lib/calculateRecommendation';
import { filterProducts } from '../src/lib/filterProducts';
import type { CalculatorInputs, CapacityTier, RecommendationResult } from '../src/types/calculator';

interface Scenario {
  name: string;
  inputs: CalculatorInputs;
  expectedStatus: RecommendationResult['status'];
  expectedConfidence: RecommendationResult['confidenceLevel'];
  expectedCapacity: CapacityTier | CapacityTier[] | 'out_of_bounds';
  requiresComparisonBranch?: boolean;
}

function expect(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

const scenarios: Scenario[] = [
  {
    name: 'Flooded 4000 sq ft forces professional review',
    inputs: {
      squareFootage: 4000,
      humiditySeverity: 'flooded',
      basementTemperature: '65_75',
      drainagePreference: 'gravity_drain',
      confusionMode: 'first_unit',
      budgetRange: 'premium',
    },
    expectedStatus: 'out_of_bounds',
    expectedConfidence: 'professional_review',
    expectedCapacity: 'out_of_bounds',
    requiresComparisonBranch: false,
  },
  {
    name: '1000 damp cool with pump old-70 mid',
    inputs: {
      squareFootage: 1000,
      humiditySeverity: 'damp',
      basementTemperature: '60_65',
      drainagePreference: 'pump_needed',
      confusionMode: 'replace_old_70',
      budgetRange: 'mid',
    },
    expectedStatus: 'ok',
    expectedConfidence: 'medium',
    expectedCapacity: ['large_45_50_pump', 'premium_basement'],
    requiresComparisonBranch: true,
  },
  {
    name: '500 slightly damp first unit budget',
    inputs: {
      squareFootage: 500,
      humiditySeverity: 'slightly_damp',
      basementTemperature: '65_75',
      drainagePreference: 'manual_bucket',
      confusionMode: 'first_unit',
      budgetRange: 'budget',
    },
    expectedStatus: 'ok',
    expectedConfidence: 'high',
    expectedCapacity: 'small_20_22',
    requiresComparisonBranch: true,
  },
  {
    name: '1200 damp gravity old-70 mid',
    inputs: {
      squareFootage: 1200,
      humiditySeverity: 'damp',
      basementTemperature: '65_75',
      drainagePreference: 'gravity_drain',
      confusionMode: 'replace_old_70',
      budgetRange: 'mid',
    },
    expectedStatus: 'ok',
    expectedConfidence: 'high',
    expectedCapacity: 'large_45_50',
    requiresComparisonBranch: true,
  },
  {
    name: '2500 very wet under 60 first unit premium',
    inputs: {
      squareFootage: 2500,
      humiditySeverity: 'very_wet',
      basementTemperature: 'under_60',
      drainagePreference: 'gravity_drain',
      confusionMode: 'first_unit',
      budgetRange: 'premium',
    },
    expectedStatus: 'ok',
    expectedConfidence: 'medium',
    expectedCapacity: 'premium_basement',
    requiresComparisonBranch: true,
  },
];

for (const scenario of scenarios) {
  const result = calculateRecommendation(scenario.inputs);

  expect(
    result.status === scenario.expectedStatus,
    `${scenario.name}: expected status ${scenario.expectedStatus} but got ${result.status}`,
  );

  expect(
    result.confidenceLevel === scenario.expectedConfidence,
    `${scenario.name}: expected confidence ${scenario.expectedConfidence} but got ${result.confidenceLevel}`,
  );

  expect(
    toArray(scenario.expectedCapacity).includes(result.capacityTier as CapacityTier | 'out_of_bounds'),
    `${scenario.name}: expected capacity ${toArray(scenario.expectedCapacity).join(' or ')} but got ${result.capacityTier}`,
  );

  const shouldShowComparisonBranch =
    result.status === 'ok' &&
    result.confidenceLevel !== 'professional_review' &&
    result.capacityTier !== 'out_of_bounds';

  if (scenario.requiresComparisonBranch === true) {
    expect(shouldShowComparisonBranch, `${scenario.name}: expected normal comparison branch to be enabled`);
  }

  if (scenario.requiresComparisonBranch === false) {
    expect(!shouldShowComparisonBranch, `${scenario.name}: expected comparison branch to be disabled`);
  }

  if (shouldShowComparisonBranch && result.capacityTier !== 'out_of_bounds') {
    const products = filterProducts({
      capacityTier: result.capacityTier,
      drainagePreference: scenario.inputs.drainagePreference,
      basementTemperature: scenario.inputs.basementTemperature,
      budgetRange: scenario.inputs.budgetRange,
    });

    expect(products.products.length >= 3, `${scenario.name}: expected at least 3 products, got ${products.products.length}`);
  }
}

console.log(`Scenario check passed (${scenarios.length} scenarios).`);
