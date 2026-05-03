import { buildAffiliateMessage } from '../data/affiliateRules';
import { doeConversionCopy, doeConversionRules } from '../data/doeConversionRules';
import {
  getConditionBasedTier,
  tierComparisonValue,
  tierLabels,
} from '../data/sizingRules';
import type { CalculatorInputs, CapacityTier, RecommendationResult } from '../types/calculator';

function chooseHigherTier(firstTier: CapacityTier, secondTier: CapacityTier): CapacityTier {
  return tierComparisonValue(firstTier) >= tierComparisonValue(secondTier) ? firstTier : secondTier;
}

function getConfidenceLevel(inputs: CalculatorInputs): RecommendationResult['confidenceLevel'] {
  if (inputs.squareFootage > 3000 || inputs.humiditySeverity === 'flooded') {
    return 'professional_review';
  }

  if (
    inputs.humiditySeverity === 'very_wet' ||
    inputs.basementTemperature === 'under_60' ||
    inputs.drainagePreference === 'pump_needed' ||
    inputs.squareFootage >= 2000
  ) {
    return 'medium';
  }

  return 'high';
}

function getConfidenceLabel(level: RecommendationResult['confidenceLevel']): string {
  switch (level) {
    case 'high':
      return 'High confidence';
    case 'medium':
      return 'Medium confidence';
    case 'professional_review':
      return 'Professional review needed';
  }
}

function getDrainageRecommendation(inputs: CalculatorInputs): string {
  if (inputs.drainagePreference === 'pump_needed') {
    return 'Start by comparing pump-equipped models because you need condensate moved upward or away from the unit.';
  }

  if (inputs.drainagePreference === 'gravity_drain') {
    return 'Start by comparing gravity-drain compatible models so you can avoid frequent bucket-emptying.';
  }

  return 'If you plan to empty the bucket manually, compare tank size, shutoff behavior, and how easy the tank is to carry.';
}

function getTemperatureNote(inputs: CalculatorInputs, selectedTier: CapacityTier): string {
  if (inputs.basementTemperature === 'under_60') {
    return 'Cold basements need extra care. Compare models that mention defrost support or low-temperature operation before you buy.';
  }

  if (inputs.basementTemperature === '60_65') {
    return 'A cool basement can narrow the field, so it is worth checking the stated operating range even when the capacity tier looks right.';
  }

  if (selectedTier === 'premium_basement') {
    return 'At this size tier, compare controls, noise, and drainage flexibility instead of assuming every premium unit behaves the same.';
  }

  return 'Normal basement temperatures make capacity and drainage fit more important than extra smart features.';
}

function getOldRatingTranslationNote(inputs: CalculatorInputs, selectedTier: CapacityTier, conditionTier: CapacityTier): string {
  if (inputs.confusionMode in doeConversionRules) {
    const convertedTier = doeConversionRules[inputs.confusionMode as keyof typeof doeConversionRules];
    if (selectedTier !== convertedTier) {
      return `${doeConversionCopy[inputs.confusionMode as keyof typeof doeConversionCopy]} Your basement conditions point higher, so this tool starts you in the safer shopping tier first.`;
    }

    return doeConversionCopy[inputs.confusionMode as keyof typeof doeConversionCopy];
  }

  if (inputs.confusionMode === 'replace_old_unknown') {
    return 'Because the old pint rating is unknown, this result stays anchored to current basement conditions rather than guessing from the old label.';
  }

  if (selectedTier !== conditionTier) {
    return 'Newer DOE labels can look smaller than older marketing labels, so compare the recommended modern class before assuming you need the same printed pint number.';
  }

  return 'If you are comparing old and new labels, focus on the modern DOE class first because the old pint number can be misleading.';
}

export function calculateRecommendation(inputs: CalculatorInputs): RecommendationResult {
  const confidenceLevel = getConfidenceLevel(inputs);
  const confidenceLabel = getConfidenceLabel(confidenceLevel);

  if (inputs.squareFootage > 3000 || inputs.humiditySeverity === 'flooded') {
    return {
      status: 'out_of_bounds',
      capacityTier: 'out_of_bounds',
      capacityLabel: 'Portable dehumidifier sizing is not the right next step',
      plainEnglishExplanation:
        'This input set points beyond normal portable-unit shopping, so the responsible next step is fixing the water problem before comparing products.',
      reasoningSteps: [
        'The space or moisture condition entered is outside the range where a portable basement dehumidifier is a reliable first comparison.',
      ],
      drainageRecommendation:
        'Compare drainage and moisture-entry solutions first, because a portable unit alone may not match the conditions entered here.',
      temperatureNote:
        'Temperature and operating range still matter, but the bigger issue here is that the overall scenario is outside a normal portable-unit shopping decision.',
      oldRatingTranslationNote:
        'Older pint labels do not change the main takeaway here: this result needs a broader site-specific review than a simple capacity swap.',
      safetyNote: 'This does not diagnose leaks, mold, HVAC problems, or foundation issues.',
      confidenceLevel,
      confidenceLabel,
      affiliateMessage: {
        headline: 'Professional assessment recommended',
        subheadline: 'A portable dehumidifier may not be enough for this scenario.',
        ctaLabel: 'Review basement moisture guidance',
      },
      recommendedBudget: inputs.budgetRange,
    };
  }

  const conditionTier = getConditionBasedTier(inputs);
  let finalTier = conditionTier;
  const reasoningSteps = [
    `Condition-based sizing points to ${tierLabels[conditionTier]} for the square footage and moisture level entered.`,
  ];

  if (inputs.confusionMode in doeConversionRules) {
    const convertedTier = doeConversionRules[inputs.confusionMode as keyof typeof doeConversionRules];
    finalTier = chooseHigherTier(conditionTier, convertedTier);
    reasoningSteps.push(doeConversionCopy[inputs.confusionMode as keyof typeof doeConversionCopy]);

    if (finalTier !== convertedTier) {
      reasoningSteps.push('Your basement conditions suggest stepping up beyond the old-rating conversion, so the larger tier wins.');
    }
  } else if (inputs.confusionMode === 'replace_old_unknown') {
    reasoningSteps.push('Without the old pint rating, this recommendation stays anchored to basement conditions instead of guesswork.');
  }

  if (inputs.drainagePreference === 'pump_needed') {
    finalTier = finalTier === 'premium_basement' ? 'premium_basement' : 'large_45_50_pump';
    reasoningSteps.push('Because you need pumped drainage, the recommendation shifts to a pump-equipped basement model.');
  } else if (inputs.drainagePreference === 'gravity_drain') {
    reasoningSteps.push('Gravity drainage is available, so a pump is optional unless your layout needs one.');
  }

  if (inputs.basementTemperature === 'under_60' && finalTier === 'large_45_50') {
    reasoningSteps.push('Cooler basements often benefit from models with stronger low-temperature performance.');
  }

  if (inputs.budgetRange === 'premium' && finalTier === 'large_45_50') {
    finalTier = 'premium_basement';
    reasoningSteps.push('You selected a premium budget range, so a premium basement-class 50-pint model is the better fit inside this tier.');
  }

  if (reasoningSteps.length < 3) {
    reasoningSteps.push(`For ${inputs.squareFootage} sq ft, this is the safest shopping tier to compare first.`);
  }

  const limitedReasoningSteps = reasoningSteps.slice(0, 5);

  return {
    status: 'ok',
    capacityTier: finalTier,
    capacityLabel: tierLabels[finalTier],
    plainEnglishExplanation: `Start by comparing ${tierLabels[finalTier]} models first. This is the safest shopping tier to compare first for the basement conditions you entered.`,
    reasoningSteps: limitedReasoningSteps,
    drainageRecommendation: getDrainageRecommendation(inputs),
    temperatureNote: getTemperatureNote(inputs, finalTier),
    oldRatingTranslationNote: getOldRatingTranslationNote(inputs, finalTier, conditionTier),
    safetyNote: 'This does not diagnose leaks, mold, HVAC problems, or foundation issues.',
    confidenceLevel,
    confidenceLabel,
    affiliateMessage: buildAffiliateMessage(finalTier, inputs),
    recommendedBudget: inputs.budgetRange,
    fallbackTier: conditionTier,
  };
}
